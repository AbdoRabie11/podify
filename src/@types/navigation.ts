
interface NewUserResponse {
  id?: string;
  name: string;
  email: string;
}

export type AuthSatckParamList = {
  signUp:undefined;
  signIn:undefined
  lostPassword:undefined
  verification:{userInfo:NewUserResponse}
}