// 如果没有这个文件，那么请求的时候试图获取返回参数的时候会报错
// Property 'list' does not exist on type 'AxiosResponse<any>'
// 详情见： https://segmentfault.com/q/1010000021268239

import * as axios from 'axios'

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}