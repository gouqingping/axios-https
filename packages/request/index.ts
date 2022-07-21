/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-04-15 10:36:27
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:12:49
 */
import Request from './request'
import { AxiosResponse } from 'axios'

const request = new Request({
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config: any) => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => result
    },
})
// 取消请求
export const cancelRequest = (url: string | string[]) => request.cancelRequest(url);
// 取消全部请求
export const cancelAllRequest = () => request.cancelAllRequest();

export default request