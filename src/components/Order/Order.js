import React from 'react';
import classes from './Order.module.css'
const order = (props) =>{
    const price = props.price;
    const ingredients = []

    for(let key in props.ingredients){
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        });
    }

    const ingredientsJSX = ingredients.map(item=>{
        return (
            <span 
                style={{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={item.name}
            >{item.name} ({item.amount})</span>
        )
    })
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsJSX}</p>
            <p>Price: <strong>USD {price}</strong></p>
        </div>
    )
}

export default order;