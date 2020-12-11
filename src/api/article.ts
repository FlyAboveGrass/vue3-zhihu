import { IArticleDetail } from '@/interface/article';
import Api from './api';
import request from './request';

// 文章内容格式
interface ArticleProps {
    title: string;
    content: string;
    column: string;
    image?: string;
    author: string;
}

export function getArticle(id: string): Promise<IArticleDetail> {
    return request({
        url: `${Api.ARTICLE}/${id}`,
        method: 'get'
    })
}

export function addArticle(data: ArticleProps) {
    return request({
        url: Api.ARTICLE,
        method: 'post',
        data
    })
}

export function uploadFile(data: FormData) {
    return request({
        url: Api.UPLOAD,
        method: 'post',
        data,
        headers: {
            enctype: 'multipart/*', // 在上传文件的时候，input的enctype一定要设置成multipart/form-data。 https://www.w3school.com.cn/tags/att_form_enctype.asp
        }
    })
}