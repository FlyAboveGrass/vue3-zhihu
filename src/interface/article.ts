import { IUserProps } from './user';

// 文章详情
export interface IArticleDetail {
    _id: string
    title: string
    image?: {
        _id: string
        url: string
    }
    isHTML: boolean
    author: IUserProps
    content: string
    createdAt: string
}

// 上传成功返回内容
export interface IUploadProps {
    _id: string
    url: string
}
