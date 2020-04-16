import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
    state = {
        ingredients:{
            cheese:1,
            meat:1,
            bacon:1,
            salad:1
        }
    }

    componentDidMount() {
        const ingredients = {}
        const searchParams = new URLSearchParams(this.props.location.search);
        for(let param of searchParams.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredients})
    }
    

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                /> 
                <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;