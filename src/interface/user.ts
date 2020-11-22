export interface IUserProps {
  isLogin: boolean
  name: string
  _id: string
  avatar?: {
    _id: string
    url: string
  }
  description?: string
}
