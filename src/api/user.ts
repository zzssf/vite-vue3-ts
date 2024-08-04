import request from "@/utils/request"

// 定义请求参数和返回结果的类型
interface ILoginDataType {
  username: string
  password: string
}

interface IResponseType<T = unknown> {
  code: number
  message: string
  data: T
}

interface IUserInfoResponseType {
  roles: string[]
  name: string
  avatar: string
  introduction: string
}

// 用户登录
export function login(data: ILoginDataType): Promise<IResponseType<{ token: string }>> {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data
  })
}

// 获取用户信息
export function getInfo(token: string): Promise<IResponseType<IUserInfoResponseType>> {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token }
  })
}

// 用户登出
export function logout(token: string): Promise<IResponseType> {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
    params: { token }
  })
}
