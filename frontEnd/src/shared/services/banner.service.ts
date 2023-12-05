import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IBanner } from '../types/banner.type';


class BannerService {
    getAllBanner(): Promise<AxiosResponse<IBanner[]>> {
        return httpsNoToken.get('/Banner/List')
    }
    newBanner(body: { userId: number, imageUrl: string }) {
        return httpsNoToken.post("/Banner/Add", body)
    }
    updateBanner(body: IBanner) {
        return httpsNoToken.put(`/Banner/Update`, body)
    }
    getBannerById(id: number): Promise<AxiosResponse<IBanner>> {
        return httpsNoToken.get(`/Banner/Detail?id=/${id}`)
    }
    deleteBanner(id: number) {
        return httpsNoToken.delete(`/Banner/Delete/${id}`)
    }
}

export const bannerService = new BannerService()
