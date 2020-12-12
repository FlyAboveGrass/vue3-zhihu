import axios from 'axios'
import store from '@/store/store'
import $message from '@/components/message/createMessage'


// 接口校验码
const icode = 'E219C6BE1D9368AF' // 48C5907EDC0D3D8C

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((config: any) => {
  store.commit('setLoading', true)
  // 统一接口登录管理
  config.params = {
    ...config.params,
    icode
  }
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    config.data = {
      ...config.data,
      icode
    }
  }
  const token = localStorage.getItem('zhihu-token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

request.interceptors.response.use(
  (response: any) => {
    store.commit('setLoading', false)
    const data = response.data
    if (data.code === 0) {
      return data.data
    } else {
      $message('error：' + data.error, 'danger')
      return Promise.reject(data.error)
    }
  },
  (error: {code: number; error: string; response?: any}) => {
    const { status, data } = error.response
    let message = data.error

    if (status === 422) {
      message = data.detail[0].message
    }

    store.commit('setLoading', false)
    $message(message, 'danger')

    return Promise.reject(message)
  }
)

export default request
