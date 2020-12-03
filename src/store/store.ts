import { createStore } from 'vuex'
import { IUserProps } from '@/interface/user.ts'
import { IColumnDetailProps, IColumnProps } from '@/interface/column'
import { getArticleList, getColumnList } from '@/api/column'
import { PageProps } from '@/interface'

export interface StoreProps {
    isLoading: boolean;
    userInfo: IUserProps | null;
    userToken: string;
    columnList: Array<IColumnProps>; // IColumnProps[]
    columnDetail: Array<IColumnDetailProps>;
}

export default createStore<StoreProps>({
    state: {
        isLoading: false,
        userInfo: {
            // todo: 暂时改成登录正太
            isLogin: true,
            name: 'yjdh',
            _id: '1',
            columnId: '1'
        },
        userToken: '',
        columnList: [],
        columnDetail: []
    },
    mutations: {
        login: (state) => {
            state.userInfo = Object.assign(state.userInfo, {isLogin: true, name: 'yjj', _id: '1'})
        },
        setColumnList(state, list) {
            state.columnList = list
        },
        setColumnDetail(state, list) {
            state.columnDetail = list
        },
        setLoading(state, loading: boolean) {
            if(loading){
                state.isLoading = loading
            }else{
                setTimeout(() => {
                    state.isLoading = loading
                }, 1000)
            }
        }
    },
    actions: {
        // 获取专栏列表， 参数使用了参数解构的方式获得对应的参数
        async getColumnList({ commit, state }, {currentPage = 1, pageSize = 5 }: PageProps) {
            const result = await getColumnList(currentPage, pageSize)
            commit('setColumnList', result.list)
        },
        async getArticleList({commit}, {columnId = '', currentPage = 1, pageSize = 5 }) {
            if(columnId) {
                const result = await getArticleList(columnId, currentPage, pageSize)
                console.log('file: store.ts ~ line 49 ~ getArticleList ~ result', result);
                commit('setColumnDetail', result.list)
            }
        }
    }
})