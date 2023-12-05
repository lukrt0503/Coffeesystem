import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IServiceCoffee, IServiceCoffeeAdd } from '../types/serviceCoffee.type';


class ServiceCoffeeService {
    getAllServiceCoffee(): Promise<AxiosResponse<IServiceCoffee[]>> {
        return httpsNoToken.get('/Service/List')
    }
    newServiceCoffee(body: IServiceCoffeeAdd) {
        return httpsNoToken.post("/Service/Add", body)
    }
    updateServiceCoffee(body: IServiceCoffee) {
        return httpsNoToken.put(`/Service/Update`, body)
    }
    getServiceCoffeeById(id: number): Promise<AxiosResponse<IServiceCoffee>> {
        return httpsNoToken.get(`/Service/Detail/${id}`)
    }
    deleteServiceCoffee(id: number) {
        return httpsNoToken.delete(`/Service/Delete/${id}`)
    }
}

export const serviceCoffeeService = new ServiceCoffeeService()
