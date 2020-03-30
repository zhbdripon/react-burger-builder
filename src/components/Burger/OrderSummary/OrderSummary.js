import React from 'react';
import Aux from '../../../hoc/Aux'

const orderSummary = (props) =>{
    const ingredientSummary = props.ingredients;
    const listOfIngredient = Object.keys(ingredientSummary)
        .map(ingredientName =>{
            return (
                <li key={ingredientName}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientName}</span>:{ingredientSummary[ingredientName]}
                </li>
            )
        })

    return (
        <Aux>
            <h3> Your Order</h3>
            <p>Burger with the following ingredients:</p>
            <ul>
                {listOfIngredient}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary;