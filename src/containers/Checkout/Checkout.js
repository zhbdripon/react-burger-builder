import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component{
    

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ingds){
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingds}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    /> 
                    <Route 
                        path={this.props.match.path+'/contact-data'} 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) =>{
    return {
        ingds : state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);