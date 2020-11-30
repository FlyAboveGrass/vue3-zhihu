import Api from './api'
import request from './request'

// 获取专栏列表
export function getColumnList(currentPage: number, pageSize: number) {
    return request({
        url: Api.COLUMN_LIST,
        method: 'get',
        params: {
            currentPage,
            pageSize
        }
    })
}

// 获取专栏文章
export function getArticleList(columnId: string, currentPage = 1, pageSize = 5) {
    return request({
        url: `${Api.COLUMN_LIST}/${columnId}/posts`,
        method: 'get',
        params: {
            currentPage,
            pageSize
        }
    })
}
