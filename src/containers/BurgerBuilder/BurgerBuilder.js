import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/action'

class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then((response)=>{
        //         this.setState({ingredients:response.data})
        //     })
        //     .catch((error)=>{

        //     })
        //     .finally(()=>{

        //     })
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(key=>{
                return ingredients[key]
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0)

        return sum>0;
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelledHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinuedHandler = () =>{
        const queryParams = [];
        for(let ingredient in this.props.indgs){
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.indgs[ingredient]))
        }
        queryParams.push('price='+this.props.price)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        })
    }
 
    render(){
        const disabledIngredients = {...this.props.indgs}
        for (let ingredient in disabledIngredients){
            disabledIngredients[ingredient] = disabledIngredients[ingredient]<1
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.indgs}
                price={this.props.price}
                purchaseCancel={this.purchaseCancelledHandler}
                purchaseContinue={this.purchaseContinuedHandler}
            />
        )

        let burger = (
            <Aux>
                <Burger ingredients={this.props.indgs} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdd}
                    ingredientRemoved={this.props.onIngredientRemove}
                    disabledIngredients={disabledIngredients}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.indgs)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )

        if(!this.props.indgs){
            burger = <Spinner/>
        }

        if (this.state.loading || !this.props.indgs){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        indgs: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientAdd : (ingredient) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredient:ingredient}),
        onIngredientRemove : (ingredient) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));