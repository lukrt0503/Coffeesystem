import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IRequest } from '../types/request.type';

class RequestService {
  getAllRequest(): Promise<AxiosResponse<IRequest[]>> {
    return httpsNoToken.get('/Waiting/List')
  }
  sendRequest(id: number): Promise<AxiosResponse<any>> {
    return httpsNoToken.post(`Waiting/Request?customerId=${id}`)
  }
  acceptRequest(requestId: number): Promise<AxiosResponse<any>> {
    return httpsNoToken.post(`Waiting/Accept?id=${requestId}`);
  }
  // Hàm từ chối yêu cầu
  declineRequest(customerId: number): Promise<AxiosResponse<any>> {
    return httpsNoToken.post(`Waiting/Deny?customerId=${customerId}`);
  }
}

export const requestService = new RequestService()
