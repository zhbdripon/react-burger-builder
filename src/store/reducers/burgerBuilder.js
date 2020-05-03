import * as actionType from '../actions/actionTypes'

const initialState = {
    ingredients : {
        salad: 0,
        bacon: 0,
        chesse: 0,
        meat: 0
    },
    totalPrice: 2
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient] : state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            }
        default:
            return state;
    }
}

export default reducer;