import { IUserProps } from '@/interface/user';
import Api from './api';
import request from './request';

export function userLogin(user: {email: string; password: string}) {
    return request({
        method: 'post',
        url: Api.USER_LOGIN,
        data: user
    })
}

export function checkLogin(): Promise<IUserProps> {
    return request({
        url: Api.CHECK_LOGIN,
        method: 'get'
    })
}