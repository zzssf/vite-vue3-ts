import { createRouter, createWebHistory } from "vue-router" // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw } from "vue-router"

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const asyncRoutes: RouteRecordRaw[] = []

console.log("BASE_URL=", import.meta.env)

const createTheRouter = (): Router =>
  createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    // 注意，如果要配置 HTML5 模式，则需要修改nginx配置，参考资料：
    // https://router.vuejs.org/zh/guide/essentials/history-mode.html
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
  })

interface RouterPro extends Router {
  matcher: unknown
}

const router = createTheRouter() as RouterPro

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter() as RouterPro
  router.matcher = newRouter.matcher // reset router
}

export default router
