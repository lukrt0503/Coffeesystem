import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IInforUser, IUserbanned } from '../types/user.type';


class UserService {
    changeUserRole(rowId: number | undefined, arg1: string) {
        throw new Error('Method not implemented.');
    }
    getAllUser(): Promise<AxiosResponse<IInforUser[]>> {
        return httpsNoToken.get('/User/List')

    }
    getUserById(userId: number): Promise<AxiosResponse<IInforUser>> {
        return httpsNoToken.get(`/User/Detail/${userId}`)
    }
    updateUser(body: IInforUser) {
        return httpsNoToken.put(`/User/Update`, body)
    }

    searchUser(search: string): Promise<AxiosResponse<IInforUser>> {
        return httpsNoToken.get(`/User/Search/${search}`)
    }
    banUser(body: IUserbanned): Promise<AxiosResponse<void>> {
        return httpsNoToken.put(`/Account/UpdateBan`, body);
    }


    getBannedUsers(): Promise<AxiosResponse<IInforUser[]>> {
        return httpsNoToken.get('/User/Banned/');
    }
    unbanUser(body: IUserbanned): Promise<AxiosResponse<void>> {
        return httpsNoToken.put(`/Account/UpdateBan`, body);
    }


}

export const userService = new UserService()
