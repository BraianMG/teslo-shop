import { IUser } from './'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem[]
  shippingAddress: ShippingAddress
  paymentResult?: string
  orderSummary: OrderSummary
  isPaid: boolean
  paidAt?: string
}

export interface IOrderItem {
  _id: string
  title: string
  size: string
  quantity: number
  slug: string
  image: string
  price: number
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string
  phone: string
}

export interface OrderSummary {
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
}
