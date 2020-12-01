import { IArticleDetail } from '@/interface/article';
import Api from './api';
import request from './request';

export function getArticle(id: string): Promise<IArticleDetail> {
    return request({
        url: `${Api.ARTICLE}/${id}`,
        method: 'get'
    })
}