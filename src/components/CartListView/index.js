import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)

      const totalPrice = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      return (
        <div className="cart-main-container">
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>

          {/* 🔥 Proper Summary Card */}
          <div className="cart-summary-container">
            <h1 className="order-total">
              Order Total: <span>Rs {totalPrice}/-</span>
            </h1>

            <p className="total-items">{totalItems} Items in cart</p>

            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
