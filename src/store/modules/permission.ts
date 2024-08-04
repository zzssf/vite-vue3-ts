import { ref } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { defineStore } from "pinia"
import { asyncRoutes, constantRoutes } from "@/router"
import store from "@/store"

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.roles) {
    const rolesArr = route.meta.roles as string[]
    return roles.some((role) => rolesArr.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): Array<RouteRecordRaw> {
  const res: Array<RouteRecordRaw> = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])

  function setRoutes(newRoutes: RouteRecordRaw[]) {
    addRoutes.value = newRoutes
    routes.value = constantRoutes.concat(newRoutes)
  }

  function generateRoutes(roles: string[]): RouteRecordRaw[] {
    let accessedRoutes: RouteRecordRaw[]
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    setRoutes(accessedRoutes)
    return accessedRoutes
  }

  return {
    routes,
    addRoutes,
    setRoutes,
    generateRoutes
  }
})

export default usePermissionStore

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
