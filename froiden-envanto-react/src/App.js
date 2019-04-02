import React, { Component } from 'react';
import './App.css';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login';
import Licenses from './containers/Licenses/Licenses';
import Dashboard from './containers/Dashboard/Dashboard';
import Viewlicense from './containers/Licenses/Viewlicense';   
import Editlicense from './containers/Licenses/Editlicense';   
import AddLicense from './containers/Licenses/Addlicense';   
import {connect} from 'react-redux';


class App extends Component {
  render() {
    let routes=(
      <Switch>
        <Route path='/' exact component={Login}/>
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuth){
      routes=(
        <Switch>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/licenses' exact component={Licenses}/>
          <Route path='/addLicense' component={AddLicense} />
          <Route path='/licenses/view/:id'  component={Viewlicense}/>
          <Route path='/licenses/edit/:id' component={Editlicense}/>
          <Redirect to='/dashboard' />
        </Switch>
      )
    }
    return (
      <div className="App">
          <Layout isAuth={this.props.isAuth}>
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuth:state.auth.isAuth
  }
}

export default withRouter(connect(mapStateToProps,null)(App));
