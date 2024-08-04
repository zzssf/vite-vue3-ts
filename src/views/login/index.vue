<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model:visible="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="togglePasswordVisibility">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="margin-bottom: 30px; width: 100%"
        @click.prevent="handleLogin"
      >
        Login
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog = true"> Or connect with </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" v-model:visible="showDialog">
      Can not be simulated on local, so please combine your own business simulation!
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, nextTick, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { FormItemRule, FormInstance } from "element-plus"
import { useUserStore } from "@/store/modules/user"
import { validUsername } from "@/utils/validate"
import SocialSign from "./components/SocialSignin.vue"

// State
const loginForm = reactive({
  username: "admin",
  password: "111111"
})

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

const passwordRef = ref<HTMLDivElement | null>(null)
const usernameRef = ref<HTMLDivElement | null>(null)

const passwordType = ref("password")
const capsTooltip = ref(false)
const loading = ref(false)
const showDialog = ref(false)
const store = useUserStore()
const route = useRoute()
const router = useRouter()
const redirect = ref<string | undefined>()
const otherQuery = ref<Record<string, any>>({})

const validateUsername: FormItemRule["validator"] = (_rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error("Please enter the correct user name"))
  } else {
    callback()
  }
}

const validatePassword: FormItemRule["validator"] = (_rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"))
  } else {
    callback()
  }
}

// Validation rules
const loginRules = ref({
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }]
})

// Methods
const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e

  capsTooltip.value = Boolean(key && key.length === 1 && key >= "A" && key <= "Z")
}

const togglePasswordVisibility = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password"
  nextTick(() => {
    passwordRef.value?.focus()
  })
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true
      store
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || "/", query: otherQuery.value })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      console.log("error submit!!")
      return false
    }
  })
}

const getOtherQuery = (query: Record<string, any>) => {
  return Object.keys(query).reduce(
    (acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur]
      }
      return acc
    },
    {} as Record<string, any>
  )
}

// Watch
watch(
  () => route.query,
  (query) => {
    if (query) {
      redirect.value = query.redirect as string | undefined
      otherQuery.value = getOtherQuery(query)
    }
  },
  { immediate: true }
)

// Lifecycle hooks
onMounted(() => {
  if (loginForm.username === "") {
    usernameRef.value?.focus()
  } else if (loginForm.password === "") {
    passwordRef.value?.focus()
  }
})

onUnmounted(() => {
  // window.removeEventListener('storage', afterQRScan)
})
</script>

<style lang="scss">
/* Your styles here */
</style>

<style lang="scss" scoped>
/* Your scoped styles here */
</style>
