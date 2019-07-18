import React, { Component } from 'react'

import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
    totalPrice: 4
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
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    // disabledInfo = {salad:true, meat:false, ...}

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
