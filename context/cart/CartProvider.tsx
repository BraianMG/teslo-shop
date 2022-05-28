import React, { FC, useEffect, useReducer } from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'
import Cookie from 'js-cookie'
import { OrderSummary } from '../../components/cart/OrderSummary'

export interface CartState {
  cart: ICartProduct[]
  orderSummary: {
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
  }
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  orderSummary: { numberOfItems: 0, subTotal: 0, tax: 0, total: 0 },
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cookieCart = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []

      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: cookieCart,
      })
    } catch (error) {
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: [],
      })
    }
  }, [])

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, curr) => curr.quantity + prev,
      0
    )
    const subTotal = state.cart.reduce(
      (prev, curr) => curr.price * curr.quantity + prev,
      0
    )
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    )

    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })

    const updatedCart = state.cart.map((p) => {
      if (p._id === product._id && p.size === product.size)
        p.quantity += product.quantity

      return p
    })

    dispatch({ type: '[Cart] - Update products in cart', payload: updatedCart })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
