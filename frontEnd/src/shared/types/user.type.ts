export interface IAuthenticated {
  token: string
}
export interface IInforUser {
  user_id?: number;
  isFollowing: any;
  userId: number;
  address: string;
  email: string;
  phone: string;
  coffeeShopName: string;
  avatar: string,
}
export interface IUserRegister {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar: string,
}

export interface IUserbanned {
  profileId: number;
  role: string;
}
export interface IInforUserStored {
  age?: number;
  customerId: number; // Thêm thuộc tính customerId
  userId: number;
  id: string;
  profileId: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  aud: string;
  iss: string;
  nbf: number;
  exp: number;
  iat: number;
  avatar: string;
}