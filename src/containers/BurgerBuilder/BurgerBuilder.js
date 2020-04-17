import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    chesse: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice:2,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then((response)=>{
                this.setState({ingredients:response.data})
            })
            .catch((error)=>{

            })
            .finally(()=>{

            })
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(key=>{
                return ingredients[key]
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0)
        this.setState({purchasable:sum>0})
    }

    addIngredientHandler = (type) =>{
        const updatedIngredients = { ...this.state.ingredients}
        updatedIngredients[type] = this.state.ingredients[type]+1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type]<1) return;
        const updatedIngredients = { ...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelledHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinuedHandler = () =>{
        const queryParams = [];
        for(let ingredient in this.state.ingredients){
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]))
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        })
    }
 
    render(){
        const {ingredients,totalPrice} = this.state
        const disabledIngredients = {...ingredients}
        for (let ingredient in disabledIngredients){
            disabledIngredients[ingredient] = disabledIngredients[ingredient]<1
        }

        let orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                price={this.state.totalPrice}
                purchaseCancel={this.purchaseCancelledHandler}
                purchaseContinue={this.purchaseContinuedHandler}
            />
        )

        let burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledIngredients={disabledIngredients}
                    price={totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )

        if(!this.state.ingredients){
            burger = <Spinner/>
        }

        if (this.state.loading || !this.state.ingredients){
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

export default withErrorHandler(BurgerBuilder,axios);