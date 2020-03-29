import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientName=>{
            return [...Array(props.ingredients[ingredientName])].map((_,index)=>{
                return <BurgerIngredient key={ingredientName+index} type={ingredientName}/>
            })
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[])

    if(transformedIngredients.length<1){
        transformedIngredients = <p>Please start adding ingredients to your burger</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;