import { truncateSync } from 'fs'
import { ICartProduct } from '../../interfaces'
import { CartState } from './'
import { ShippingAddress } from './'

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cookies | storage'
      payload: ICartProduct[]
    }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Change cart quantity'; payload: ICartProduct }
  | { type: '[Cart] - Remove product in cart'; payload: ICartProduct }
  | {
      type: '[Cart] - Update order summary'
      payload: {
        numberOfItems: number
        subTotal: number
        tax: number
        total: number
      }
    }
  | { type: '[Cart] - LoadAddress from Cookie'; payload: ShippingAddress }

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      }

    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      }

    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          return product._id === action.payload._id &&
            product.size === action.payload.size
            ? action.payload
            : product
        }),
      }

    case '[Cart] - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      }

    case '[Cart] - Update order summary':
      return {
        ...state,
        orderSummary: action.payload,
      }
    
    case '[Cart] - LoadAddress from Cookie':
      return {
        ...state,
        shippingAddress: action.payload
      }

    default:
      return state
  }
}
