import { AxiosResponse } from 'axios';
import type { AxiosInstance } from 'axios';
import type { RequestConfig, RequestInterceptors, CancelRequestSource } from './types';
declare class Request {
    instance: AxiosInstance;
    interceptorsObj?: RequestInterceptors<AxiosResponse>;
    cancelRequestSourceList?: CancelRequestSource[];
    requestUrlList?: string[];
    constructor(config: RequestConfig);
    private getSourceIndex;
    private delUrl;
    request<T>(config: RequestConfig<T>): Promise<T>;
    cancelRequest(url: string | string[]): void;
    cancelAllRequest(): void;
}
export default Request;
export { RequestConfig, RequestInterceptors };
