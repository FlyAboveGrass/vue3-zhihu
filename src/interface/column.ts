// 图片字段
interface ImageProps {
  _id?: string
  url?: string
}

//专栏列表
export interface IColumnProps {
  _id: string
  title: string
  description: string
  avatar?: ImageProps
}

// 专栏文章
export interface IColumnDetailProps {
  _id: string
  title: string
  excerpt: string
  image?: ImageProps
  createdAt: string
  column: string
}