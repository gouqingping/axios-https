/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-04-15 10:36:02
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-26 18:26:25
 */
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
export interface RequestInterceptors<T> {
    // 请求拦截
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    // 响应拦截
    responseInterceptors?: (config: T) => T
    responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}
export interface CancelRequestSource {
    [index: string]: () => void
}
export interface AnyObject { 
    [key: string]: any;
}
export interface AnyFcuntion { 
    [key: string]: ()=>void;
}

export interface IRequest { 
    instance: AxiosInstance;
    useConfig: (key: string | AnyObject, value?: any) => void;
    useResponse: (reslove: (config: AxiosResponse) => AxiosResponse, reject?: (error: any) => any) => void;
    useRequest: (reslove: (config: AxiosRequestConfig) => AxiosRequestConfig, reject?: (error: any) => any) => void;
    useBase: <D = any, T = any>(config: IRequestConfig<D, T>) => Promise<any>;
    getBlob: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    formData: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    json: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    upload: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    dlt: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    head: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    patch: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    put: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    get: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    post: <D = any, T = any>(url: string, data?: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    generatePathQuery: (path: string, obj?: AnyObject)=>string;
}



export interface IResponse<T> {
    statusCode: number
    desc: string
    result: T
}

export interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
    data?: T
}