import request from "./request";
export { cancelRequest, cancelAllRequest } from "./request";
import { DEFAULT_MULTIPART, DEFAULT_JSON, isObject, isString } from "./request/utils";
;
;
export function useBase(config) {
    const { method = 'GET' } = config;
    if (['get', 'GET', 'Get'].includes(method)) {
        config.params = config.data;
    }
    return request.request(config);
}
export function generatePathQuery(path, obj) {
    if (!path)
        return path;
    return path + Object.entries(obj || {}).reduce((total, [k, v]) => (total += `${k}=${encodeURIComponent(v)}&`), "?").slice(0, -1);
}
;
export function post(url, data, o) {
    const params = { headers: DEFAULT_MULTIPART, data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'post',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function get(url, data, o) {
    const params = { data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'get',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function put(url, data, o) {
    const params = { data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'put',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function patch(url, data, o) {
    const params = { data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'patch',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function head(url, data, o) {
    const params = { data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'head',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function dlt(url, data, o) {
    const params = { data, ...(o || {}) };
    return new Promise((resolve, reject) => useBase({
        method: 'delete',
        url,
        data,
        ...params,
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function upload(url, data, o) {
    return post(url, data, { withCredentials: true, ...o });
}
;
export function json(url, data, o) {
    return post(url, JSON.stringify(data), { ...o });
}
;
export function formData(url, data, o) {
    const FORM_DATA = new FormData();
    if (typeof data === "object") {
        Object.keys(data || {}).forEach((item) => FORM_DATA.append(item, data[item]));
    }
    return new Promise((resolve, reject) => useBase({
        method: 'post',
        url,
        headers: DEFAULT_MULTIPART,
        data: FORM_DATA, ...(o || {})
    }).then((res) => resolve(res), (err) => reject(err)).catch((error) => reject(error)));
}
;
export function getBlob(url, data, o) {
    return get(url, data, { headers: DEFAULT_JSON, responseType: 'blob', ...o });
}
;
export const useRequest = (reslove, reject) => request.instance.interceptors.request.use(reslove, reject);
export const useResponse = (reslove, reject) => request.instance.interceptors.response.use(reslove, reject);
export const useConfig = (key, value) => {
    if (isString(key)) {
        request.instance.defaults[key] = value;
    }
    ;
    if (isObject(key)) {
        const currentConfig = key;
        Object.keys(currentConfig).forEach((name) => {
            request.instance.defaults[name] = currentConfig[name];
        });
    }
    ;
};
const requests = { useBase, get, post, put, patch, head, dlt, formData, json, upload, useRequest, useResponse };
Object.keys(requests).forEach((name) => (request[name] = requests[name]));
export default request;
