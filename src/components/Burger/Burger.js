import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredien from './BurgerIngredient/BurgerIngredient'
const burger = (props) =>{
    return (
        <div className={classes.Burger}>
            <BurgerIngredien type="bread-top" />
            <BurgerIngredien type="cheese" />
            <BurgerIngredien type="meat" />
            <BurgerIngredien type="bread-bottom" />
        </div>
    )
};

export default burger;