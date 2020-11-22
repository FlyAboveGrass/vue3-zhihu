interface ImageProps {
  _id?: string
  url?: string
}

export interface IColumnProps {
  _id: string
  title: string
  description: string
  avatar?: ImageProps
}
