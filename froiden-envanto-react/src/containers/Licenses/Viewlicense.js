import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class ViewLicense extends Component{
   componentDidMount(){
      this.props.viewLicenceDetails(this.props.token,this.props.match.params.id)
   }
   render(){
       let data=<Spinner/>
       if(!this.props.loading){
           let license=this.props.licenses.map((p)=>{
               return (
                   <div className="row" key={p.id}>
                        <div className="col-md-6">
                            <label>ID</label>
                            <p>{p.id}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Domain</label>
                            <p>{p.domain}</p>
                        </div>
                        <div className="col-md-6">
                            <label>APP URL</label>
                            <p>{p.app_url}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Purchase Code </label>
                            <p>{p.purchase_code}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Purchased On </label>
                            <p>{p.purchased_on}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Supported Until </label>
                            <p>{p.supported_until}</p>
                        </div>
                        <div className="col-md-6">
                            <label>License Type </label>
                            <p>{p.license_type}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Envanto Item Id </label>
                            <p>{p.envato_item_id}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Item Name </label>
                            <p>{p.item_name}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Buyer Username </label>
                            <p>{p.buyer_username}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Item Icon URL </label>
                            <p>{p.item_icon_url}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Item Image URL</label>
                            <p>{p.item_image_url}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Status </label>
                            <p>{p.status}</p>
                        </div>
                        <div className="col-md-6">
                            <label>Earning </label>
                            <p>{p.earning}</p>
                        </div>
                   </div>
                   )
           })
            data=(
                <div className="container">
                    {license}
                </div>
            )
       }
      return(
        <div>
            {data}
        </div>
      )
   }
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
        viewLicenceDetails:(token,id)=>dispatch(actionCreators.fetchOneLicense(token,id))
})
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewLicense);