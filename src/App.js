import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import Checkout from './components/Checkout'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // ✅ Load cart from localStorage
  componentDidMount() {
    const storedCart = localStorage.getItem('cartData')
    if (storedCart) {
      this.setState({cartList: JSON.parse(storedCart)})
    }
  }

  // ✅ Save helper
  saveCartToStorage = cartList => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  // 🛒 Add to Cart
  addCartItem = product => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.id === product.id,
      )

      let updatedCart

      if (existingItem) {
        updatedCart = prevState.cartList.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item,
        )
      } else {
        updatedCart = [...prevState.cartList, product]
      }

      this.saveCartToStorage(updatedCart)
      return {cartList: updatedCart}
    })
  }

  // ❌ Delete item
  deleteCartItem = id => {
    this.setState(prevState => {
      const updatedCart = prevState.cartList.filter(item => item.id !== id)

      this.saveCartToStorage(updatedCart)
      return {cartList: updatedCart}
    })
  }

  // 🔼 Increment
  incrementItem = id => {
    this.setState(prevState => {
      const updatedCart = prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      )

      this.saveCartToStorage(updatedCart)
      return {cartList: updatedCart}
    })
  }

  // 🔽 Decrement
  decrementItem = id => {
    this.setState(prevState => {
      const updatedCart = prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0)

      this.saveCartToStorage(updatedCart)
      return {cartList: updatedCart}
    })
  }

  // 🧹 Remove all
  removeAllCartItems = () => {
    this.saveCartToStorage([])
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <>
        <BrowserRouter>
          <CartContext.Provider
            value={{
              cartList,
              addCartItem: this.addCartItem,
              deleteCartItem: this.deleteCartItem,
              incrementItem: this.incrementItem,
              decrementItem: this.decrementItem,
              removeAllCartItems: this.removeAllCartItems,
            }}
          >
            <Switch>
              <Route exact path="/login" component={LoginForm} />

              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/products" component={Products} />
              <ProtectedRoute
                exact
                path="/products/:id"
                component={ProductItemDetails}
              />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/checkout" component={Checkout} />

              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </CartContext.Provider>
        </BrowserRouter>

        {/* 🔥 Toast container */}
        <Toaster position="top-right" />
      </>
    )
  }
}

export default App
