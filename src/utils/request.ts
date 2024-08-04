import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios"
import { ElMessage, ElMessageBox } from "element-plus"
import { useUserStoreHook } from "@/store/modules/user"
import { getToken } from "@/utils/auth"

// TODO:待补充定义响应数据的类型
interface IApiResponseType<T = unknown> {
  code: number
  message: string
  data: T
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API as string, // url = base url + request url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token: string | undefined = useUserStoreHook().state.token
    if (token && config.headers) {
      // 每个请求都带上 token
      config.headers["X-Token"] = getToken() as string
    }
    return config
  },
  (error: AxiosError): Promise<never> => {
    // 处理请求错误
    console.error(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  <T>(response: AxiosResponse<IApiResponseType<T>>) => {
    const res = response.data

    // 如果自定义的状态码不是 20000，则判定为错误
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      })

      // 处理特定错误代码
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          useUserStoreHook().resetToken()
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res.data
    }
  },
  (error: AxiosError): Promise<never> => {
    console.error("err" + error) // 用于调试
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
