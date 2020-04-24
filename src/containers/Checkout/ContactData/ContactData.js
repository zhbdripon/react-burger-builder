import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
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
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            }
        },
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault()
        this.setState({loading:true})

        const formData = {}

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }



        const order = {
            ingredients: this.props.ingredients,
            price: +this.props.price.toFixed(2),
            orderData: formData
        }

        axios.post('/orders.json',order)
            .then(response=>{
                console.log(response);
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error=>{
                console.log(error);

            })
            .finally(()=>{
                
            })
    }

    inputChangedHandler = (event,id) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[id]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
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
                        />
                    )
                )}
                <Button btnType="Success" >Order</Button>
            </form>
        )

        if(this.state.loading){
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

export default ContactData;