import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  deleteCartItem: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
