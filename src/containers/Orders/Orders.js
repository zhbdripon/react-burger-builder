import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrder = []
                for(let key in response.data){
                    fetchedOrder.push({
                        id:key,
                        ...response.data[key]
                    })
                }
                this.setState({orders:fetchedOrder})
            })
            .catch(error=>{
            
            })
            .finally(()=>{
                this.setState({
                    loading: false
                })
            })
    }

    render(){
        const orders = this.state.orders.map(order=>{
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

export default withErrorHandler(Orders,axios);

