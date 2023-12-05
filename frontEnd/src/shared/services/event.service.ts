import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/http.config';
import { IEvent, IEventAdd } from '../types/event.type';


class EventService {
    getAllEvent(): Promise<AxiosResponse<IEvent[]>> {
        return httpsNoToken.get('/Event/List')
    }
    newEvent(body:IEventAdd) {
        return httpsNoToken.post("/Event/Add", body)
    }
    updateEvent(body:IEvent) {
        return httpsNoToken.put(`/Event/Update`, body)
    }
    getEventById(id: number): Promise<AxiosResponse<IEvent>> {
        return httpsNoToken.get(`/Event/Detail/${id}`)
    }
    deleteEvent(id: number) {
        return httpsNoToken.delete(`/Event/Delete/${id}`)
    }
}

export const eventService = new EventService()
