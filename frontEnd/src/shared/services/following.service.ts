import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IFollowing, IFollowingAdd } from '../types/following.type';


class FollowingService {
    async unfollow(followingData: IFollowingAdd): Promise<AxiosResponse<void>> {
        try {
            const response = await httpsNoToken.delete('/api/Follow/Unfollow', {
                data: followingData, // Send followingData as the request body
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    getCustomerList(customerId: number): Promise<AxiosResponse<IFollowing[]>> {
        return httpsNoToken.get(`/Follow/CustomerList/${customerId}`)
    }
    getUserList(userId: number): Promise<AxiosResponse<IFollowing[]>> {
        return httpsNoToken.get(`/Follow/UserList/${userId}`)
    }
    newFollowing(body: IFollowingAdd) {
        return httpsNoToken.post(`/Follow/Follow`, body)
    }

}

export const followingService = new FollowingService()
