import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount() {
        const token = this.props.token;
        const userId = this.props.userId;
        this.props.onOrdersFetch(token, userId)
    }
    

    render(){

        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order=>{
                return <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
            })
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrdersFetch: (token,userId)=>{dispatch(actions.fetchOrders(token,userId))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));

