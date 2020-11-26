import { createStore } from 'vuex'
import { IUserProps } from '@/interface/user.ts'

export interface StoreProps {
    isLoading: boolean;
    userInfo: IUserProps | null;
    userToken: string;
}

export default createStore<StoreProps>({
    state: {
        isLoading: false,
        userInfo: {
            isLogin: false,
            name: '',
            _id: ''
        },
        userToken: ''
    }
})