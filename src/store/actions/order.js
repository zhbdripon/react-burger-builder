import * as actionTypes from './actionTypes';
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(orderData, response.data.name);
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseBurgerFail(error));
            })
            .finally(() => {

            })
    }
}

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () =>{
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrder = []
                for(let key in response.data){
                    fetchedOrder.push({
                        id:key,
                        ...response.data[key]
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrder))
            })
            .catch(error=>{
                dispatch(fetchOrdersFail(error))
            })
            .finally(()=>{

            })
    }
}