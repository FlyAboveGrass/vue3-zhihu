import { createStore } from 'vuex'
import { IUserProps } from '@/interface/user.ts'
import { IColumnDetailProps, IColumnProps } from '@/interface/column'
import { getArticleList, getColumnList } from '@/api/column'
import { PageProps } from '@/interface'
import { checkLogin, userLogin } from '@/api/user'
import { resolveComponent } from 'vue'
import { useRouter } from 'vue-router'

export interface StoreProps {
    isLoading: boolean;
    userInfo: IUserProps | null;
    userToken: string;
    columnList: Array<IColumnProps>; // IColumnProps[]
    columnDetail: Array<IColumnDetailProps>;
    columnLength: number;
}

export default createStore<StoreProps>({
    state: {
        isLoading: false,
        userInfo: {
            // todo: 暂时改成登录正太
            isLogin: false,
            nickName: '',
            _id: '',
            column: ''
        },
        userToken: '',
        columnList: [],
        columnLength: 0,
        columnDetail: []
    },
    mutations: {
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
        },
        setUserInfo(state, user: IUserProps){
            state.userInfo = user
        },
        setToken: (state, token) => {
            state.userToken = token || null;
        },
        logOut(state) {
            state.userInfo = {
                // todo: 暂时改成登录正太
                isLogin: false,
                nickName: '',
                _id: '',
                column: ''
            }
            localStorage.removeItem('zhihu-token')
        }
    },
    actions: {
        // 获取专栏列表， 参数使用了参数解构的方式获得对应的参数
        async getColumnList({ commit, state }, {currentPage = 1, pageSize = 5 }: PageProps) {
            const result = await getColumnList(currentPage, pageSize)
            state.columnLength = result.count;
            commit('setColumnList', result.list)
        },
        async loadMoreColumn({commit, state}, {currentPage = 1, pageSize = 5 }: PageProps){
            const result = await getColumnList(currentPage, pageSize)
            commit('setColumnList', state.columnList.concat(result.list))
            return 
        },
        async getArticleList({commit}, {column = '', currentPage = 1, pageSize = 5 }) {
            if(column) {
                const result = await getArticleList(column, currentPage, pageSize)
                commit('setColumnDetail', result.list)
            }
        },
        async userLogin({commit}, {email, password}) {
            const { token } = await userLogin({email, password})
            localStorage.setItem('zhihu-token', token)
            commit('setToken', token)

            const currentUser: IUserProps = await checkLogin()
            if(currentUser) {
                commit('setUserInfo', Object.assign(currentUser, { isLogin: true}))
                return true
            }
            return false
        },
        async checkLogin({commit}){
            const currentUser: IUserProps = await checkLogin()
            if(currentUser) {
                commit('setUserInfo', Object.assign(currentUser, { isLogin: true}))
                return true
            }else{
                const router = useRouter()
                router.push('/login')
                return false;
            }
        }
    }
})