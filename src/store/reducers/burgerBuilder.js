import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    ingredients : null,
    totalPrice: 2,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    chesse: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 }
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            return updateObject(state,{
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            })
        case actionType.REMOVE_INGREDIENT:
            const updatedIngred = { [action.ingredient]: state.ingredients[action.ingredient] - 1 }
            const updatedIngreds = updateObject(state.ingredients, updatedIngred)
            return updateObject(state, {
                ingredients: updatedIngreds,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            })
        case actionType.SET_INGREDIENTS:
            const ingredients = {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                chesse: action.ingredients.chesse,
                meat: action.ingredients.meat
            }
            return updateObject(state,{
                ingredients:ingredients,
                totalPrice: 2,
                error: false
            })
        case actionType.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{
                ingredients: null,
                error: true
            })
        default:
            return state;
    }
}

export default reducer;