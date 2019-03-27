import React ,{Component} from 'react';
import * as actionTypes from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Login.css';

class Login extends Component{
    state={
        authForm:{
            userName:{
                elementType:'input',
                elementConfiq:{
                    type:"username",
                    placeholder:"enter your user name"
                },
                value:'',
                validation:{
                    required:true,
                    length:6
                },
                isValid:false  ,
                errorMessage:''  ,
                touched:false              
            },
            email:{
                elementType:'input',
                elementConfiq:{
                    type:"email",
                    placeholder:"enter email address"
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                isValid:false ,
                errorMessage:'',
                touched:false                                                
            },
            password:{
                elementType:'input',
                elementConfiq:{
                    type:"password",
                    placeholder:"enter your passsword"
                },                    
                value:'',
                validation:{
                    required:true,
                    length:6
                    } ,
                isValid:false,
                errorMessage:''    ,
                touched:false              
                               
            }
        },
        isSignIn : false,
        formUntouched: true
    }

    checkValidity = (value,rules)=>{
        let valid=true;
        let errorMessage='';
        if(rules){
            if(rules.required===true && valid){
                valid=value.trim()!=='';
                if (valid === false){
                    errorMessage = "value is required";
                }
            }
            if(rules.isEmail && valid){
                const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                valid=pattern.test(value);
                if (valid === false){
                    errorMessage = "invalid email";
                }
            }
            if(rules.length && valid){
                valid=(value.trim().length === rules.length);
                if (valid === false){
                    errorMessage = "invalid length";
                }
            }
            return {valid,errorMessage};
        }
    }

    onChangeHandler = (event,id) =>{
        // console.log(id) // email password 
        const newForm = {...this.state.authForm}
        const newFormFields = {...this.state.authForm[id]}
        newFormFields.value = event.target.value
        newFormFields.isValid = this.checkValidity(event.target.value,newFormFields.validation).valid
        newFormFields.errorMessage = this.checkValidity(event.target.value,newFormFields.validation).errorMessage

        newFormFields.touched = true
        
        newForm[id]= newFormFields
        this.setState({
            authForm : newForm,
            formUntouched: false
        })
    }

    onClickHandler =()=>{
        this.setState(prevState=>{
            return{
                isSignIn:!prevState.isSignIn
            }
        })
    }
    onSubmitHandler = (event)=>{
        event.preventDefault();
        if(this.state.formUntouched){
            this.props.authFail('Please fill the form fields')
        }
        else{
        this.props.onLogin(this.state.authForm.userName.value,
                            this.state.authForm.email.value,
                            this.state.authForm.password.value,
                            this.state.isSignIn);
        }                  
    }       

    render(){
        let formArray = Object.keys(this.state.authForm)
        .map((p)=>{
            return {
                id: p,
                data: this.state.authForm[p]
            }
         })

        let form ='';
        if (this.props.loading){
            form=<Spinner/>
        } 
        else{
            form=formArray.map((p,index)=>{
                let inputClass=[];
                inputClass.push(classes.InputElement);

                if(!p.data.isValid && p.data.touched) {
                    inputClass.push(classes.Invalid)
                }
                return (
                    <div  key={index + p.id}>
                        <input 
                    //  key={index + p.id}
                        value={p.data.value} 
                        placeholder={p.data.elementConfiq.placeholder} 
                        type={p.data.elementConfiq.type} 
                        onChange={(event)=>this.onChangeHandler(event,p.id)}
                        className={inputClass.join(' ')}/>                                            
                        {(!p.data.isValid)?<p className={classes.ValidationError}>{p.data.errorMessage}</p>:null}
   
                    </div>
                )
            })
        }

        let err='';
        if(this.props.error){
            err = <p className={classes.ValidationError}>{this.props.error}</p>
        }

        return(
                <div className={classes.Auth}>
                    <h3>Enter your credentials</h3>
                    {err}
                    <form onSubmit={this.onSubmitHandler} >
                        {form}
                        <button className={[classes.Button,classes.Success].join(' ')}>SUBMIT</button>
                    </form>
                    <button className={[classes.Button,classes.Danger].join(' ')}
                                onClick={this.onClickHandler}>SWITCH TO 
                                {(!this.state.isSignIn)?' SIGN IN': ' SIGN UP'}</button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return({
        email:state.auth.email,
        pwd:state.auth.pwd,
        loading:state.auth.loading,
        error:state.auth.error  ,
        path:state.auth.authRedirectUrl  ,
        isAuth:state.auth.isAuth
    })
}
const mapDispatchToProps = dispatch =>{
    return({
        onLogin:(userName,email,pwd,isSignIn)=>dispatch(actionTypes.auth(userName,email,pwd,isSignIn)),
        // authRedirectUrl : (path)=>dispatch(actionTypes.authRedirectUrl(path)),
        authFail: (err)=>dispatch(actionTypes.authFail(err))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);