import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { INews, INewsAdd } from '../types/news.type';


class NewsService {
    getAllNews(): Promise<AxiosResponse<INews[]>> {
        return httpsNoToken.get('/News/List')
    }
    createNews(body:INewsAdd) {
        return httpsNoToken.post("/News/Create", body)
    }
    updateNews(body:INews) {
        return httpsNoToken.put(`/News/Update`, body)
    }
    getNewsById(id: number): Promise<AxiosResponse<INews>> {
        return httpsNoToken.get(`/News/Detail/${id}`)
    }
    deleteNews(id: number) {
        return httpsNoToken.delete(`/News/Delete/${id}`)
    }
}

export const newsService = new NewsService()
