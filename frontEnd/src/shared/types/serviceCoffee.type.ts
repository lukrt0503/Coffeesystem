export interface IServiceCoffee {
  serviceId: number;
  name: string;
  description: string;
  userId: number;
  imageUrl: string;
}
export interface IServiceCoffeeAdd {
  name: string;
  description: string;
  userId: number;
  imageUrl: string;
}