import React, {Component} from 'react';
import Classes from './Auth.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';



class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            }
        }
    }
    checkValidity(value, rules) {
        let valid = true;
        if (rules.required) {
            valid = valid && value.trim() !== '';
        }
        if (rules.minLength) {
            valid = valid && value.length >= rules.minLength
        }
        if (rules.maxLength) {
            valid = valid && value.length <= rules.maxLength
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            valid = valid && pattern.test(value)
        }
        return valid;
    }

    inputChangedHandler = (event, elementName) => {
        const updatedControls = {
            ...this.state.controls,
            [elementName]:{
                ...this.state.controls[elementName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value,this.state.controls[elementName].validation)
            }
        };
        this.setState({controls: updatedControls});
    }

    render(){
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formElementArray.map(element=>{
            return (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                />  
            )
        })
        return (
            <div className={Classes.Auth}>
                <form action="">
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
            </div>
        )
    }
}

export default Auth;