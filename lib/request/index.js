import Request from './request';
const request = new Request({
    interceptors: {
        requestInterceptors: (config) => config,
        responseInterceptors: (result) => result
    },
});
export const cancelRequest = (url) => request.cancelRequest(url);
export const cancelAllRequest = () => request.cancelAllRequest();
export default request;
