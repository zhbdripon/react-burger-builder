import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid : false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formValid:false,
        loading:false
    }

    checkValidity(value,rules){
        let valid = true;
        if(rules.required){
            valid = valid && value.trim() !== '';
        }
        if (rules.minLength) {
            valid = valid && value.length >= rules.minLength
        }
        if (rules.maxLength) {
            valid = valid && value.length <= rules.maxLength
        }
        return valid;
    }

    orderHandler = (event) =>{
        event.preventDefault()

        const formData = {}

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingds,
            price: +this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        const token = this.props.token;
        this.props.onBurgerOrder(token,order);

    }

    inputChangedHandler = (event,element_id) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[element_id]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[element_id] = updatedFormElement;

        let formValidity = true;
        for(let key in updatedOrderForm){
            formValidity = formValidity && updatedOrderForm[key].valid;
        }

        this.setState({
            orderForm:updatedOrderForm,
            formValid: formValidity
        });
    }

    render(){

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(element=>(
                        <Input
                            key={element.id} 
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            changed={(event)=>this.inputChangedHandler(event,element.id)}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                        />
                    )
                )}
                <Button btnType="Success" disabled={!this.state.formValid} >Order</Button>
            </form>
        )

        if(this.props.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBurgerOrder: (token,orderData) => { dispatch(actions.purchaseBurger(token,orderData)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));