
import React,{Component} from 'react';
import axios from '../../axios';
import Aux from '../Auxiliary/Auxiliary'; 
import Modal from '../../components/Modal/Modal';

const withErrHandler =(WrappedComponent,axios) =>{
    return class extends Component{
    state={
        error : null,
        show:false
    }
    componentWillMount=()=>{
        this.reqInterceptor = axios.interceptors.request.use(req=>{
            // console.log(req);
            //can change any request
            return req;
        },
        err=>{
            // console.log('in req ',err);
            this.setState({
                error:err
            })
            // return Promise.reject(err); //show something locally
        })


        this.resInterceptor = axios.interceptors.response.use(res=>{
            // console.log(res);
            // console.log(res.status)
            return res;
        },
        err=>{
            // console.log('in response',err.status);
            this.setState({
                error:err
                        })
            // return Promise.reject(err)
        })
    }

    componentWillUnmount(){
        // console.log('will unmount',this.reqInterceptor)
        axios.interceptors.request.eject(this.reqInterceptor)
        axios.interceptors.response.eject(this.resInterceptor)
    }
    onClickHandler =()=>{
        this.setState({error:null})
    }
    render(){
        // console.log('in withErrHanler')
        // console.log(this.state.error)
        return(
            <Aux>
                <Modal show={this.state.error} clicked={this.onClickHandler}>
                    {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props}/> 
            </Aux>
        )
    }
}
}
export default withErrHandler;              