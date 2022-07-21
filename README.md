<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-04 09:33:17
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:37:06
-->
# @request/axios

基于 axios 二次封装的 HTTP 库, 全面支持按需引入。

## Install

```node
$ npm install @request/axios
```


## IRequest

```js
interface IRequest { 
    instance: AxiosInstance;
    useConfig: (key: string | AnyObject, value?: any) => void;
    useResponse: (reslove: (config: AxiosResponse) => AxiosResponse, reject?: (error: any) => any) => void;
    useRequest: (reslove: (config: AxiosRequestConfig) => AxiosRequestConfig, reject?: (error: any) => any) => void;
    useBase: <D = any, T = any>(config: IRequestConfig<D, T>) => Promise<any>;
    getBlob: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    formData: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    json: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    upload: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    dlt: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    head: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    patch: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    put: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    get: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    post: <D = any, T = any>(url: string, data: D, h?: AnyObject, o?: AnyObject)=> Promise<T>;
    generatePathQuery: (path: string, obj?: AnyObject)=>string;
}
```

## Demo

```js

import { get, useRequest,useResponse,useConfig } from "@elgis/request";
// 设置默认全局配置
useConfig('timeout',500);


// 添加请求拦截器
useRequest(function (config) {
        console.log('config',config)
    // 在发送请求之前做些什么
    return config;
});

// 添加响应拦截器
useResponse(function (response) {
    console.log('response',response)
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 发起Get请求
get('./tiles.json').then((res: any) => {
    console.log(res)
}).catch((err: any) => {
    console.error(err)
})
```