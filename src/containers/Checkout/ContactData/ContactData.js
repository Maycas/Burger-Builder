import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
		this.setState( {loading: true} )
		const order = {
		   ingredients: this.props.ingredients,
	     price: this.props.price, // TODO: Move this to backend as we don't want end users changing price in the code
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
		   .then(response => {
         this.setState({loading: false})
         this.props.history.push('/')
       })
       .catch(error => {
         this.setState({loading: false})
       })
  }

  render () {
    let form = (
			<form>
				<input type='text' name='name' placeholder='Your name'></input>
				<input type='email' name='email' placeholder='Your email'></input>
				<input type='text' name='street' placeholder='Street'></input>
				<input type='text' name='postalCode' placeholder='Postal Code'></input>
				<Button btnType='Success' clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
    ) 
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
			<div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
				{form}
			</div>
		)
  }
}

export default ContactData