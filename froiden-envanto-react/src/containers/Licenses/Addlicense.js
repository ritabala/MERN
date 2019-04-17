import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';


class editLicense extends Component {
    constructor(props){
        super(props);
        this.state={
            newLicense: {
                app_url: "",
                buyer_username: "",
                domain: "",
                earning: 0,
                envato_item_id: "",
                id: 0,
                item_icon_url: "",
                item_image_url: "",
                item_name: "",
                license_type: "",
                purchase_code: "",
                purchased_on: "",
                status: "",
                supported_until: ""
            }
        }
    }
    
    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.addLicense(this.props.token,this.state.newLicense)
        this.props.history.push('/licenses')
    }

    onChangeHandler=(event)=>{
        this.setState({
            newLicense:{
                ...this.state.newLicense,
                [event.target.name]:event.target.value
            }
        })
    }


    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="domain">Domain</label>
                        <input type="text" className="form-control" id='domain' value={this.state.newLicense.domain} name='domain'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="app_url">APP URL</label>
                        <input type="text" className="form-control" id='app_url' value={this.state.newLicense.app_url} name='app_url'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchase_code">Purchase Code</label>
                        <input type="text" className="form-control" id='purchase_code' value={this.state.newLicense.purchase_code} name='purchase_code'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchase_date">Purchased Date</label>
                        <input type="text" className="form-control" id='purchase_date' value={this.state.newLicense.purchase_date} name='purchase_date'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="supported_until">Supported Until</label>
                        <input type="text" className="form-control" id='supported_until' value={this.state.newLicense.supported_until} name='supported_until'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="license_type">License Type</label>
                        <input type="text" className="form-control" id='license_type' value={this.state.newLicense.license_type} name='license_type'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="envanto_item_id">Envanto Item Id</label>
                        <input type="text" className="form-control" id='envanto_item_id' value={this.state.newLicense.envanto_item_id} name='envanto_item_id'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="item_name">Item Name</label>
                        <input type="text" className="form-control" id='item_name' value={this.state.newLicense.item_name} name='item_name'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="buyer_username">Buyer Username</label>
                        <input type="text" className="form-control" id='buyer_username' value={this.state.newLicense.buyer_username} name='buyer_name'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="item_icon_url">Item Icon URL</label>
                        <input type="text" className="form-control" id='item_icon_url' value={this.state.newLicense.item_icon_url} name='item_icon_url'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="item_image_url">Item Image URL</label>
                        <input type="text" className="form-control" id='item_image_url' value={this.state.newLicense.item_image_url} name='item_image_url'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text" className="form-control" id='status' value={this.state.newLicense.status} name='status'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="earning">Earning</label>
                        <input type="text" className="form-control" id='earning' value={this.state.newLicense.earning} name='earning'
                            onChange={(event) => this.onChangeHandler(event)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
    )}
}

const mapStateToProps = (state)=>{
    return({
        token:state.auth.idToken
    })
 }
 
 const mapDispatchToProps = dispatch=>{
    return({
        addLicense:(token,newLicense)=>dispatch(actionCreators.addLicense(token,newLicense))

 })
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(editLicense);