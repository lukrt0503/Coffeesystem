import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/utils/constants';
import { IInforUserStored } from '../types/user.type';


type APPSTATE = {
    followingData: any;
    user: IInforUserStored | undefined,
    isLogined: boolean,
}

const initialState: APPSTATE = {
    user: undefined,
    isLogined: false,
}
export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any | undefined>) => {
            state.user = action.payload
            state.isLogined = true
        },
        logout: (state) => {
            state.user = undefined
            state.isLogined = false
            deleteCookie(APP_SAVE_KEY.TOKEN_KEY)
            deleteCookie(APP_SAVE_KEY.LOGIN_STATUS)
        },
    }
}
)
export const { login, logout} = appSlice.actions
export default appSlice.reducer
