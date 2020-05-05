import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Orders extends Component{

    componentDidMount() {
        this.props.onOrdersFetch()
    }
    

    render(){
        const orders = this.props.orders.map(order=>{
            return <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
        })
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrdersFetch: ()=>{dispatch(actions.fetchOrders())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));

