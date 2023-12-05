export interface ISchedule {
    scheduleId: number;
    event: Event;
    customer: Customer;
    ticketCount: number;
}

interface Customer {
    customerId: number;
    name: string;
    phone: string;
    address: string;
    email: string;
    avatar?: string;
}

interface Event {
    eventId: number;
    name: string;
    address: string;
    date: string;
    imageUrl?: any;
    description: string;
    startTime: string;
    endTime: string;
    seatCount: number;
    price: number;
    coffeeShopName: string;
}

export interface IScheduleAdd {
    event: number;
    customer: number;
    ticketCount: number;
}

interface CustomerAdd {
    customerId: string;
}

interface EventAdd {
    eventId: string;
}