import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Form/Input/Input'

import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    orderForm : {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: ''
			},
		},
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
		this.setState( {loading: true} )
		
		const formData = {}
		for(let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}

		const order = {
		   ingredients: this.props.ingredients,
			 price: this.props.price, // TODO: Move this to backend as we don't want end users changing price in the code
			 orderData: formData
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
	
	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm }
		// Deeply clone the inside of the element being updated
		const updatedFormElement = { ...this.state.orderForm[inputIdentifier] }

		updatedFormElement.value = event.target.value
		updatedOrderForm[inputIdentifier] = updatedFormElement
		this.setState({ orderForm: updatedOrderForm })
	}

  render () {
		let formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}

    let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)} />
				))}		
				<Button btnType='Success'>ORDER</Button>
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