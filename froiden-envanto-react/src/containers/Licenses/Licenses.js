import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import {NavLink} from 'react-router-dom';
import classes from './Licenses.css';
import withErrHandler from '../../hoc/withErrHandler/withErrHandler';
import axios from '../../axios';
import Modal from '../../components/Modal/Modal';

class Licenses extends Component{

 viewLicenceHandler =(event,id)=>{
    event.preventDefault();
    this.props.history.push(this.props.match.url+'/view/'+id);

}

editLicenseHandler =(event,id)=>{
    event.preventDefault();
    this.props.history.push(this.props.match.url+'/edit/'+id);
}

deleteConfirmHandler =(event,id)=>{
    event.preventDefault();
    this.props.showModal(id);
}

onCancelModalHandler =(event)=>{
    this.props.onCancelModal()
}

onDeleteModalHandler=(event)=>{
    this.props.deleteLicense(this.props.token,this.props.id)
    this.props.onCancelModal()
    
}

componentDidMount=()=>{
     this.props.fetchAllLicenses(this.props.token)
 }   

 render(){
    let license = '';
    let tdata='';

    if(this.props.loading){
            license=<Spinner/>
        }
    else{
         license = this.props.licenses.map((item,index)=>{
            console.log(item.id)
            return(
                <tr key={item+index}>
                    <td>{item.item_name}</td>
                    <td>{item.domain}</td>
                    <td>{item.buyer_username}</td>
                    <td>{item.purchase_code}</td>
                    <td>
                        <button className={[classes.Button,classes.View].join(' ')} 
                                onClick={(event)=>this.viewLicenceHandler(event,item.id)}>View</button>
                        <button className={[classes.Button,classes.Edit].join(' ')} 
                                onClick={(event)=>this.editLicenseHandler(event,item.id)}>Edit</button>
                        <button className={[classes.Button,classes.Delete].join(' ')}
                                onClick={(event)=>this.deleteConfirmHandler(event,item.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
     }
     if(!this.props.err){
      tdata = (
         <div className="container">
             <NavLink to="/addLicense" className={classes.NavLink} >Add new license details</NavLink>
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
              <Modal show={this.props.show} clicked={this.toggleModal}>
                   <div>
                      <h4>Are you sure? </h4>
                      <p className={classes.Text}>Do you really want to delete this records? This process cannot be undone.</p>
                      <button className={[classes.Button, classes.Cancel].join(' ')}
                                onClick={(event)=>{this.onCancelModalHandler(event)}}
                      >Cancel</button>
                      <button className={[classes.Button, classes.Delete].join(' ')} 
                                onClick={(event)=>{this.onDeleteModalHandler(event)}}
                      >Delete</button>
                  </div>
              </Modal>
         </div>
     )}
     return (
        <Aux>
            {this.props.loading?license : tdata}
        </Aux>)
 }
}

const mapStateToProps = (state)=>{
    return({
        token:state.auth.idToken,
        licenses:state.license.licenses,
        loading:state.license.loading,
        err:state.license.error,
        show:state.license.show,
        id:state.license.id
    })
}

const mapDispatchToProps = dispatch=>{
    return({
        fetchAllLicenses:(token)=>dispatch(actionCreators.fetchAllLicenses(token)),
        showModal:(id)=>dispatch(actionCreators.showModal(id)),
        onCancelModal:()=>dispatch(actionCreators.cancelModal()),
        deleteLicense:(token,id)=>dispatch(actionCreators.deleteLicense(token,id))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrHandler(Licenses,axios));