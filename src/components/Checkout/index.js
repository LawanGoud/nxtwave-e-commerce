import CartContext from '../../context/CartContext'
import Header from '../Header'

const Checkout = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      return (
        <>
          <Header />
          <div style={{padding: '40px'}}>
            <h1>Checkout</h1>
            <h2>Total Amount: ₹{totalPrice}</h2>
            <p>Order placed successfully 🎉</p>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Checkout
