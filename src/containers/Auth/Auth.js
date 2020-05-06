import React, {Component} from 'react';
import Classes from './Auth.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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
            },
        },
        isSignup: true
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

    submitHandler = (event) =>{
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignup = this.state.isSignup;
        this.props.onAuth(email,password,isSignup);
    }

    switchAuthModeHandler = () =>{
        this.setState({isSignup: !this.state.isSignup});
    }

    render(){
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(element=>{
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
        if(this.props.loading) form = <Spinner/>

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={Classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger" 
                    >Switch to {this.state.isSignup?'SIGN IN':'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth: (email,password,isSignup) => {dispatch(actions.auth(email,password,isSignup))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);