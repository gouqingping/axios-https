/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-12-20 17:17:27
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-28 16:39:34
 */
import request, { get, useRequest, useResponse, useConfig, formData, post } from "../lib/index";

window.onload = () => {
    useConfig('timeout', 500)
    // 添加请求拦截器
    useRequest(function (config) {
        console.log('config', config)
        // 在发送请求之前做些什么
        return config;
    });

    // 添加响应拦截器
    useResponse(function (response) {
        console.log('response', response)
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    formData('./tiles.json', { addd: 2222 }, {
        headers: {
            authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3cURhelV6VDAzQzBGZ0lDdUhvTGtnPT0iLCJleHAiOjE2NTExNDU0MTYsInVzZXIiOnsiaWQiOjEsInVzZXJOYW1lIjoiYWRtaW4iLCJ1c2VyUHdkIjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMiLCJjb25maWdTdHIiOm51bGwsImRlc2NyaWJlIjpudWxsLCJyb2xlIjoxLCJzdGF0ZSI6bnVsbCwiY3JlYXRlRGF0ZSI6bnVsbCwiZGVsZXRlRGF0ZSI6bnVsbH0sImlhdCI6MTY1MTEzMTAxNiwianRpIjoiMGI3NDBmYzgtMGMwYy00MTE2LTkyNTQtMWQ4ZDNjODBiNWQ2In0.T-wIv_l8eowh34pjESwCae84two7xAP5DoISuQguWo8',
        },
    }).then((res: any) => {
        console.log(res)
    }).catch((err: any) => {
        console.error(err)
    })
}
