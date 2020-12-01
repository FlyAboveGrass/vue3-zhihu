import { IUserProps } from './user';

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
