export interface IUserProps {
  isLogin: boolean;
  nickName?: string;
  _id: string;
  columnId: string;
  avatar?: {
    _id: string;
    url: string;
  };
  description?: string;
}
