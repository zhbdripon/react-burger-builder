import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-order'

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
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
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }else{
            this.props.history.push('./auth');
        }
        
    }

    purchaseCancelledHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinuedHandler = () =>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }
 
    render(){
        const disabledIngredients = {...this.props.indgs}
        for (let ingredient in disabledIngredients){
            disabledIngredients[ingredient] = disabledIngredients[ingredient]<1
        }
        
        let orderSummary = <Spinner />
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.indgs) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.indgs}
                    price={this.props.price}
                    purchaseCancel={this.purchaseCancelledHandler}
                    purchaseContinue={this.purchaseContinuedHandler}
                />
            ) 
        }
        
        if(this.props.indgs){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.indgs} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabledIngredients={disabledIngredients}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.indgs)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
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
        indgs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientAdd : (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemove : (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase: ()=> dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));