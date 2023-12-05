import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IAuthentication } from '../types/authentication.type';
import { IUserRegister } from '../types/user.type';


class AuthService {
    authenticated(body: { username: string; password: string }): Promise<AxiosResponse<IAuthentication>> {
        return httpsNoToken.post('/Account/Login', body)
    }
    register(body: IUserRegister): Promise<AxiosResponse> {
        return httpsNoToken.post('/Account/Register', body)
    }
    resetPassword(body: { accountId: number, password: string }): Promise<AxiosResponse> {
        return httpsNoToken.post('/ResetPassword', body)
    }
    forgetPassword(body: { email: string }): Promise<AxiosResponse> {
        return httpsNoToken.post('/Forget', body)
    }
    forgetPasswordNew(body: { username: string, password: string }): Promise<AxiosResponse> {
        return httpsNoToken.post('/Account/ForgotPassword', body)
    }
}

export const authService = new AuthService()
