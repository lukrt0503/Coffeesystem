export interface IEvent {
  userId?: number;
  eventId: number;
  name: string;
  address?: string;
  date: string;
  imageUrl: string;
  description: string;
  startTime: string;
  endTime: string;
  seatCount: number;
  price: number;
  coffeeShopName: string;
  fromAge?: number;
  toAge?: number;
}
export interface IEventAdd {
  eventId: number;
  name: string;
  address?: string;
  date: string;
  imageUrl: string;
  description: string;
  startTime: string;
  endTime: string;
  seatCount: number;
  price: number;
  coffeeShopName: string;
  fromAge?: number;
  toAge?: number;
}