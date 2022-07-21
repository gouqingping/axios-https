import { AxiosRequestConfig, AxiosResponse } from "axios";
export { cancelRequest, cancelAllRequest } from "./request";
import type { AnyObject, IRequestConfig, IRequest } from "./request/types";
export interface RequestConfig extends AxiosRequestConfig {
}
export interface Response extends AxiosResponse {
}
export declare function useBase<D = any, T = any>(config: IRequestConfig<D, T>): Promise<any>;
export declare function generatePathQuery(path: string, obj?: AnyObject): string;
export declare function post<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function get<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function put<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function patch<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function head<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function dlt<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function upload<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function json<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function formData<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare function getBlob<D = any, T = any>(url: string, data?: D, o?: RequestConfig): Promise<T>;
export declare const useRequest: (reslove: (config: RequestConfig) => RequestConfig, reject?: ((error: any) => any) | undefined) => number;
export declare const useResponse: (reslove: (config: Response) => Response, reject?: ((error: any) => any) | undefined) => number;
export declare const useConfig: (key: string | AnyObject, value?: any) => void;
declare const _default: IRequest;
export default _default;
