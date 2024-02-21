import request, { useBase, useRequest, useResponse, useConfig, formData, post, get } from "../lib/index";

window.onload = () => {
    // useConfig('timeout', 500)
    useConfig({
        timeout: 1500
    })
    // 添加请求拦截器
    useRequest((config) => {
        console.log('config', config)
        // 在发送请求之前做些什么
        return config;
    });

    // 添加响应拦截器
    useResponse((response) => {
        console.log('response', response)
        // 对响应数据做点什么
        return response;
    }, (error) => Promise.reject(error));

    get('http://120.48.170.226:8098/api/v1/apps/all_tags', { addd: 2222 }).then((res: any) => {
        console.log(res)
    }).catch((err: any) => {
        console.error(err)
    })
}
