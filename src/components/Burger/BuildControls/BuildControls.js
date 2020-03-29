import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import Aux from '../../../hoc/Aux'
import { string } from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Chesse', type: 'chesse' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) =>{
    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={props.ingredientAdded.bind(this,ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabledIngredients[ctrl.type]}
                />
            ))}
        </div>
    )
}

export default buildControls;