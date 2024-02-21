/*
 * @Autor        : Pat
 * @Description  : I Request
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-04-15 10:57:06
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-28 16:16:44
 */
import request from "./request";
import { AxiosRequestConfig, AxiosResponse } from "axios";
export { cancelRequest, cancelAllRequest } from "./request";
import { DEFAULT_MULTIPART, DEFAULT_JSON, isObject, isString } from "./request/utils";
import type { AnyObject, IRequestConfig, IResponse, IRequest } from "./request/types";
export interface RequestConfig extends AxiosRequestConfig { };
export interface Response extends AxiosResponse { };

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {IRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export function useBase<D = any, T = any>(config: IRequestConfig<D, T>): Promise<any> {
    const { method = 'GET' } = config
    if (['get', 'GET', 'Get'].includes(method)) {
        config.params = config.data
    }
    return request.request<IResponse<T>>(config)
}
/**
 * @description: 使用查询字符串生成路径
 * @param {string} path 路径符串
 * @param {AnyObject} obj 条件对象
 * @return {string} generatePathQuery("/user", { name: "Orkhan", age: 30 });  // "/user?name=Orkhan&age=30"
 * @Date: 2021-02-01 11:43:34
 * @author: Pat
 */
export function generatePathQuery(path: string, obj?: AnyObject): string {
    if (!path) return path;
    return path + Object.entries(obj || {}).reduce((total, [k, v]) => (total += `${k}=${encodeURIComponent(v as string)}&`), "?").slice(0, -1);
};
/**
 * @description:  post 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function post<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { headers: DEFAULT_MULTIPART, data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'post',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};
/**
 * @description:  get 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function get<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'get',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  put 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function put<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'put',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  patch 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function patch<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'patch',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  head 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function head<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'head',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  delete 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function dlt<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const params: AnyObject = { data, ...(o || {}) };
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'delete',
            url,
            data,
            ...params,
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  文件上传
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function upload<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    return post<D, T>(url, data, { withCredentials: true, ...o });
};

/**
 * @description:  json 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function json<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    return post<string, T>(url, JSON.stringify(data), { ...o });
};
/**
 * @description:  FormData 格式提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function formData<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    const FORM_DATA = new FormData();
    if (typeof data === "object") {
        Object.keys(data || {}).forEach((item: string) => FORM_DATA.append(item, (data as AnyObject)[item]));
    }
    return new Promise(
        (resolve, reject) => useBase<D, T>({
            method: 'post',
            url,
            headers: DEFAULT_MULTIPART,
            data: FORM_DATA, ...(o || {})
        }).then((res: T) => resolve(res), (err: any) => reject(err)).catch((error: any) => reject(error))
    )

};

/**
 * @description:  getBlob 提交
 * @param {string} url
 * @param {D} data
 * @param {AnyObject} o
 * @return {Promise<any>}
 * @Date: 2022-04-15 15:21:13
 * @author: Pat
 */
export function getBlob<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T> {
    return get<D, T>(url, data, { headers: DEFAULT_JSON, responseType: 'blob', ...o });
};
// 请求拦截器
export const useRequest = (reslove: (config: RequestConfig) => RequestConfig, reject?: (error: any) => any) => request.instance.interceptors.request.use(reslove as any, reject);
// 响应拦截器
export const useResponse = (reslove: (config: Response) => Response, reject?: (error: any) => any) => request.instance.interceptors.response.use(reslove, reject);
// 设置配置项
export const useConfig = (key: string | AnyObject, value?: any) => {
    if (isString(key)) {
        (request as AnyObject).instance.defaults[key as string] = value;
    };
    if (isObject(key)) {
        const currentConfig: AnyObject = (key as AnyObject);
        Object.keys(currentConfig).forEach((name: string) => {
            (request as AnyObject).instance.defaults[name] = currentConfig[name];
        })
    };
}
const requests: AnyObject = { useBase, get, post, put, patch, head, dlt, formData, json, upload, useRequest, useResponse };
Object.keys(requests).forEach((name: string) => ((request as AnyObject)[name] = requests[name]));
export default request as unknown as IRequest;