import toast from 'react-hot-toast'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                {/* ✅ Top Section */}
                <div className="cart-header">
                  <h1 className="cart-heading">My Cart</h1>

                  {/* ✅ Remove All button TOP RIGHT */}
                  <button
                    type="button"
                    className="remove-all-button"
                    onClick={() => {
                      removeAllCartItems()
                      toast.success('Cart cleared successfully')
                    }}
                  >
                    Remove All
                  </button>
                </div>

                <CartListView />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
