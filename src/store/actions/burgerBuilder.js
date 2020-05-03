import * as actionType from './actionTypes'

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