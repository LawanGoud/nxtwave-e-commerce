import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0)

      const totalPrice = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      return (
        <>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>

          {/* ✅ Summary */}
          <div className="cart-summary">
            <h3>Total Items: {totalItems}</h3>
            <h2>Total Price: ₹{totalPrice}</h2>

            {/* ✅ Remove All Button */}
            <button
              type="button"
              className="remove-all-button"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
