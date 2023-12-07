import { Types } from 'mongoose';
import  Product  from "./Product.js";

export interface Address {
    country: string;
    city: string;
    street: string;
    cellPhone?: string;
    zipCode: string;
}

export enum OrderStatusEnum {
    Waiting = 'Waiting',
    Sent = 'Sent',
    Received = 'Received',
    Canceled = 'Canceled'
}

export const OrderEnum = {
    Express: 'Express',
    Regular: 'Regular',
    SelfCollection: 'SelfCollection'
} as const;

export type OrderEnum = keyof typeof OrderEnum;

export interface ShippingDetailsType {
    address: Address;
    contactNumber: string;
    orderType: OrderEnum;
}

export interface OrderInterface {
    cartItems?: Product[] | [];
    userId: string;
    orderTime: Date;
    userName: string;
    userEmail: string;
    status: OrderStatusEnum;
    totalPrice: number;
    shippingDetails: ShippingDetailsType;
}

export interface GetOrderInterface {
    orders : OrderInterface[];
}



