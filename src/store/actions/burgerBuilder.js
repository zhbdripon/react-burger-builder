import * as actionType from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (ingredient) =>{
    return {
        type: actionType.ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredient: ingredient
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) =>{
    return {
        type : actionType.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsFailed())
            })
            .finally(() => {

            })
    }
}