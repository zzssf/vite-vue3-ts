<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue"
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"

export default defineComponent({
  components: {
    ElConfigProvider
  },
  data() {
    return {
      locale: zhCn,
      zIndex: 3000,
      size: "default"
    }
  }
})
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
