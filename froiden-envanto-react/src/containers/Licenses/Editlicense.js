import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

const DATABASE_LABELS={
    id:'ID',
    domain:'Domain',
    app_url:'APP URL',
    purchase_code:'Purchase Code',
    purchased_on:'Purchased Date',
    supported_until:'Supported Until',
    license_type:'License Type',
    envato_item_id:'Envato Item Id',
    item_name:'Item Name',
    buyer_username:'Buyer Username',
    item_icon_url:'Item Icon Url',
    item_image_url:'Item Image Url',
    status:'Status',
    earning:'Earning'
}

class editLicense extends Component {
    
    constructor(props){
        super(props);
        this.state={
            editLicense:{}
        }
    }
    onChangeHandler=(event)=>{
        this.setState({
            editLicense :{
                ...this.state.editLicense,
                [event.target.name]:event.target.value
            }
        })
    }

    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.updateLicenseData(this.props.token,this.props.match.params.id,this.state.editLicense)
        this.props.history.push('/licenses')
    }

    componentDidMount=()=>{
        this.props.viewLicenceDetails(this.props.token,this.props.match.params.id)
        this.setState({
            editLicense:this.props.licenses[0]
        },()=>{
            console.log(this.state.editLicense)
        })
    }
    render(){
        let formdata=<Spinner/>;
        if(!this.props.loading){
            
            // let license=Object.keys(this.props.licenses[0])
            let license=Object.keys(this.state.editLicense)
            .map(key=>{
                return [
                    key,
                    // this.props.licenses[0][key]
                    this.state.editLicense[key]
                ]
            })

            let form=license.map((p,index)=>{
                return(
                <div className="form-group" key={p[0]}>
                    <label htmlFor={p[0]}> {DATABASE_LABELS[p[0]]}</label>
                    <input type="text" className="form-control" 
                            id={p[0]} 
                            value={p[1]} 
                            name={p[0]}
                            onChange={(event) => this.onChangeHandler(event)} />
                </div>)
            })

            formdata=(
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )
        }
        return(
            <div className="container">
                {formdata}
            </div>
    )}
}

const mapStateToProps = (state)=>{
    return({
        token:state.auth.idToken,
        licenses:state.license.licenses,
        loading:state.license.loading,
        err:state.license.error
    })
 }
 
 const mapDispatchToProps = dispatch=>{
    return({
         updateLicenseData:(token,id,newVal)=>dispatch(actionCreators.updateLicense(token,id,newVal)),
         viewLicenceDetails:(token,id)=>dispatch(actionCreators.fetchOneLicense(token,id))

 })
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(editLicense);