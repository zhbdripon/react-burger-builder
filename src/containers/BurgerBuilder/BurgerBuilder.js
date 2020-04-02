import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axious from '../../axious-order'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    chesse: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            chesse: 0,
            meat: 0,
        },
        totalPrice:2,
        purchasable: false,
        purchasing: false,
        loading: false
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

        this.setState({loading:true})

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Md. Ziaul Hoque',
                address:{
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Bangladesh'
                },
                email:'someone@example.com'
            },
            deliveryMethod: 'fastest'
        }

        axious.post('/orders.json',order)
            .then(response=>{
                console.log(response);
            })
            .catch(error=>{
                console.log(error);
                
            })
            .finally(()=>{
                this.setState({ loading: false, purchasing: false })
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

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={ingredients}/>
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
    }
}

export default BurgerBuilder;