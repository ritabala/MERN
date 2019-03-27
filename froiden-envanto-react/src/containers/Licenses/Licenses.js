import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class Licenses extends Component{
 
 componentDidMount=()=>{
     this.props.fetchAllLicenses(this.props.token)
 }   
 render(){
    let license = <Spinner/>;
    console.log(this.props.loading)
     if(!this.props.loading && this.props.licenses){
        license =
        this.props.licenses.map((item,index)=>{
            // console.log(item)
            return(
                <tr key={item+index}>
                    <td>{item.item_name}</td>
                    <td>{item.domain}</td>
                    <td>{item.buyer_username}</td>
                    <td>{item.purchase_code}</td>
                    <td>View | Edit | Delete </td>
                </tr>
            )
        })
     }
     
     return (
         <div className="container">
             <table className="table table-bordered table-hover">
                 <thead>
                     <tr>
                         <th>Item Name</th>
                         <th>Domain</th>
                         <th>Buyer Username</th>
                         <th>Purchase Code</th>
                         <th>Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                     {license}
                 </tbody>
             </table>
         </div>

     )
 }
}

const mapStateToProps = (state)=>{
    return({
        token:state.auth.token,
        licenses:state.license.licenses,
        loading:state.license.loading
    })
}

const mapDispatchToProps = dispatch=>{
    return({
        fetchAllLicenses:(token)=>dispatch(actionCreators.fetchAllLicenses(token))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Licenses);