import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // ✅ Add to Cart (with quantity handling)
  addCartItem = product => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.id === product.id,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                }
              : item,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, product],
      }
    })
  }

  // ✅ Delete single item
  deleteCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  // ✅ Increment quantity
  incrementItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  // ✅ Decrement quantity
  decrementItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  // ✅ Clear entire cart
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
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

            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
