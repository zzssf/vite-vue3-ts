import type { Pinia, StoreDefinition } from "pinia"
// 导入 Pinia 的类型定义，用于 TypeScript 类型检查。
import { createPinia, acceptHMRUpdate } from "pinia"
// 导入 Pinia 库中的 createPinia 和 acceptHMRUpdate，用于创建 Pinia 实例和处理热模块替换。

// 使用 Vite 的 `import.meta.glob` 函数自动导入 `./modules/` 目录下的所有 .ts 文件。
// `eager: true` 表示在构建时立即导入这些模块，而不是动态导入。
// `modulesFiles` 是一个包含所有匹配文件路径和模块内容的对象。
const modulesFiles = import.meta.glob("./modules/*.ts", { eager: true })

// 初始化一个空对象 `modules`，用来存储每个导入模块的默认导出。
// 这里 `Record<string, StoreDefinition>` 表示 `modules` 是一个键值对，键为字符串，值为 StoreDefinition 类型。
const modules: Record<string, StoreDefinition> = {}

// 遍历 `modulesFiles` 对象的键（即每个模块的路径）。
Object.keys(modulesFiles).forEach((modulePath) => {
  // 提取模块的名称，例如将 './modules/app.ts' 转换为 'app'。
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1")

  // 获取模块的默认导出内容。
  const value = modulesFiles[modulePath] as any

  // 将模块的默认导出存储在 `modules` 对象中，键为模块名称。
  modules[moduleName] = value.default
}, {})

export const setupStore = (app: { use: (arg0: Pinia) => void }) => {
  // 创建 Pinia 实例，并将其挂载到 Vue 应用程序中。
  app.use(createPinia())

  // 遍历所有导入的模块，执行它们的默认导出函数（通常是注册 store 的逻辑）。
  Object.values(modules).forEach((fn) => {
    fn()

    // 如果支持 HMR（热模块替换），则设置 HMR 处理逻辑。
    if (import.meta.hot) {
      // `acceptHMRUpdate` 函数用于处理模块更新时的热替换。
      import.meta.hot.accept(acceptHMRUpdate(fn, import.meta.hot))
    }
  })
}

// console.log('modules=', modules);
// 可以输出 `modules`，查看所有注册的 store 模块。

export default modules
// 导出 `modules` 对象，以便其他地方可以使用这些模块的 store。
