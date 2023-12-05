import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { ICustomer } from '../types/customer.type';


class CustomerService {
    getAllCustomer(): Promise<AxiosResponse<ICustomer[]>> {
        return httpsNoToken.get('/Customer/List')
    }
    updateCustomer(body: ICustomer) {
        return httpsNoToken.put(`/Customer/Update`, body)
    }
    searchCustomer(search: string): Promise<AxiosResponse<ICustomer>> {
        return httpsNoToken.get(`/Customer/Search/${search}`)
    }

}

export const customerService = new CustomerService()
