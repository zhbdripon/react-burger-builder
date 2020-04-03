import React, {Component} from 'react';
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent,axios) =>{
    return class extends Component{
        state = {
            error:null
        }
        componentWillMount(){

            this.reqInterceptor = axios.interceptors.request.use(request=>{
                this.setState({ error: null })
                return request;
            });

            this.respInterceptor = axios.interceptors.response.use(
                response=>{
                    return response;
                },
                error=>{
                    console.log(error)
                    this.setState({error:error})
                });
        }

        componentWillUnmount(){
            this.axios.interceptors.eject(this.reqInterceptor);
            this.axios.interceptors.eject(this.respInterceptor);
        }
        
        errorConfirmHandler = () =>{
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}
                    >
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;