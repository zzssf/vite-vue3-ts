import { reactive } from "vue"
import { defineStore } from "pinia"
import { login as apiLogin, logout as apiLogout, getInfo as apiGetInfo } from "@/api/user"
import router, { resetRouter } from "@/router"
import store from "@/store"
import { getToken, setToken, removeToken } from "@/utils/auth"
import permissionStore from "./permission"
import tagsViewStore from "./tagsView"

// 定义用户状态接口
export interface IUserState {
  token: string
  userId: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

// 定义和导出用户 store
export const useUserStore = defineStore("user", () => {
  // 定义 state，使用 reactive 包裹对象
  const state = reactive<IUserState>({
    token: getToken() || "",
    userId: "",
    name: "",
    avatar: "",
    introduction: "",
    roles: []
  })

  // 用户登录
  const login = async (userInfo: { username: string; password: string }) => {
    const { username, password } = userInfo
    try {
      const response = await apiLogin({ username: username.trim(), password })
      const { data } = response
      state.token = data.token
      setToken(data.token)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 获取用户信息
  const getInfo = async () => {
    try {
      const response = await apiGetInfo(state.token)
      const { data } = response

      if (!data) {
        return Promise.reject("Verification failed, please Login again.")
      }

      const { roles, name, avatar, introduction } = data

      if (!roles || roles.length <= 0) {
        return Promise.reject("getInfo: roles must be a non-null array!")
      }

      state.roles = roles
      state.name = name
      state.avatar = avatar
      state.introduction = introduction

      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 用户登出
  const logout = async () => {
    try {
      await apiLogout(state.token)
      state.token = ""
      state.roles = []
      removeToken()
      resetRouter()

      tagsViewStore().delAllViews()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 重置 token
  const resetToken = () => {
    state.token = ""
    state.roles = []
    removeToken()
  }

  // 动态修改权限
  const changeRoles = async (role: string) => {
    const token = `${role}-token`
    state.token = token
    setToken(token)

    const infoRes = await getInfo()
    const roles = infoRes.roles || []

    resetRouter()

    const accessRoutes = await permissionStore().generateRoutes(roles)
    accessRoutes.forEach((route) => {
      router.addRoute(route)
    })

    tagsViewStore().delAllViews()
  }

  return {
    state,
    login,
    getInfo,
    logout,
    resetToken,
    changeRoles
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
