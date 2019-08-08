import React, { Component } from 'react'

import axios from '../../axios-orders'

import Aux from '../../hoc/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

// TODO Move this to backend as we don't want users tampering with the price
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients) 
      .map(igKey => {
        return ingredients[igKey] 
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    // Update ingredient
    let oldCount = this.state.ingredients[type]
    let updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    // Update prices
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

    // Update state
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})

    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    // Update ingredient
    let oldCount = this.state.ingredients[type]
    if(oldCount <=0) {
      return
    }
    let updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    // Update prices
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

    // Update state
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })

    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    //alert('You continue!')
    this.setState( {loading: true} )
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // TODO: Move this to backend as we don't want end users changing price in the code
      customer: { //TODO: Get customer data from the customer database
        name: 'Marc Maycas',
        address: {
          street: 'teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }

    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false, purchasing: false }))
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    // disabledInfo = {salad:true, meat:false, ...}

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice} />
    
    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
