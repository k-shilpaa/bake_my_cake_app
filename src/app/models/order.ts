import { Cart } from "./cart"
import { ShippingDetails } from "./shipping"

export type Order={
    id:string,
    email:string,
    date:Date;
    shippingDetails:ShippingDetails,
    cart:Cart,
}