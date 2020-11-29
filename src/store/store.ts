import { createStore } from 'vuex'
import { IUserProps } from '@/interface/user.ts'
import { IColumnProps } from '@/interface/column'
import { getColumnList } from '@/api/column'
import { PageProps } from '@/interface'

export interface StoreProps {
    isLoading: boolean;
    userInfo: IUserProps | null;
    userToken: string;
    columnList: Array<IColumnProps>; // IColumnProps[]
}

export default createStore<StoreProps>({
    state: {
        isLoading: false,
        userInfo: {
            isLogin: false,
            name: '',
            _id: ''
        },
        userToken: '',
        columnList: []
    },
    mutations: {
        login: (state) => {
            state.userInfo = { ...state.userInfo, isLogin: true, name: 'yjj', _id: '1' }
        },
        setColumnList(state, list) {
            state.columnList = list
        }
    },
    actions: {
        // 获取专栏列表， 参数使用了参数解构的方式获得对应的参数
        async getColumnList({ commit, state }, {currentPage = 1, pageSize = 5 }: PageProps) {
            const result = await getColumnList(currentPage, pageSize)
            console.log('file: store.ts ~ line 33 ~ list', result.list);
            commit('setColumnList', result.list)
        }
    }
})