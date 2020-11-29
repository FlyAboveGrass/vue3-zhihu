import Api from './api'
import request from './request'

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