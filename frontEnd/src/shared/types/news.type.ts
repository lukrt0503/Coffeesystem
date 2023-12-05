export interface INews {
    userId?: number;
    newsId: number;
    coffeeShopName: string;
    title: string;
    description: string;
    imageUrl: string;
    createdDate?: any;
}
export interface INewsAdd {
    coffeeShopName: string;
    title: string;
    description: string;
    imageUrl: string;
    createdDate?: any;
}