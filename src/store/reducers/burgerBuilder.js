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

const addIngredient = (state,action) =>{
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
    })
}

const removeIngredient = (state, action) => {
    const updatedIngred = { [action.ingredient]: state.ingredients[action.ingredient] - 1 }
    const updatedIngreds = updateObject(state.ingredients, updatedIngred)
    return updateObject(state, {
        ingredients: updatedIngreds,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
    })
}

const setIngredient = (state, action) => {
    const ingredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        chesse: action.ingredients.chesse,
        meat: action.ingredients.meat
    }
    return updateObject(state, {
        ingredients: ingredients,
        totalPrice: 2,
        error: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        ingredients: null,
        error: true
    })
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.ADD_INGREDIENT: return addIngredient(state,action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS: return setIngredient(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;