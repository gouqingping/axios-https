import axios from 'axios';
class Request {
    instance;
    interceptorsObj;
    cancelRequestSourceList;
    requestUrlList;
    constructor(config) {
        this.requestUrlList = [];
        this.cancelRequestSourceList = [];
        this.instance = axios.create(config);
        this.interceptorsObj = config.interceptors;
        this.instance.interceptors.request.use((res) => res, (err) => err);
        this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch);
        this.instance.interceptors.response.use(this.interceptorsObj?.responseInterceptors, this.interceptorsObj?.responseInterceptorsCatch);
        this.instance.interceptors.response.use((res) => {
            return res;
        }, (err) => err);
    }
    getSourceIndex(url) {
        return this.cancelRequestSourceList?.findIndex((item) => {
            return Object.keys(item)[0] === url;
        });
    }
    delUrl(url) {
        const urlIndex = this.requestUrlList?.findIndex(u => u === url);
        const sourceIndex = this.getSourceIndex(url);
        urlIndex !== -1 && this.requestUrlList?.splice(urlIndex, 1);
        sourceIndex !== -1 &&
            this.cancelRequestSourceList?.splice(sourceIndex, 1);
    }
    request(config) {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config);
            }
            const url = config.url;
            if (url) {
                this.requestUrlList?.push(url);
                config.cancelToken = new axios.CancelToken(c => {
                    this.cancelRequestSourceList?.push({
                        [url]: c,
                    });
                });
            }
            ;
            this.instance.request(config).then(res => {
                if (config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors(res);
                }
                resolve(res);
            })
                .catch((err) => reject(err))
                .finally(() => url && this.delUrl(url));
        });
    }
    cancelRequest(url) {
        if (typeof url === 'string') {
            const sourceIndex = this.getSourceIndex(url);
            sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
        }
        else {
            url.forEach(u => {
                const sourceIndex = this.getSourceIndex(u);
                sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
            });
        }
    }
    cancelAllRequest() {
        this.cancelRequestSourceList?.forEach(source => {
            const key = Object.keys(source)[0];
            source[key]();
        });
    }
}
export default Request;
