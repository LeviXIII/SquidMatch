import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './Components/LoginForm';
import AccountInfo from './Components/AccountInfo';
import Home from './Components/Home';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      userPassword: '',
      userEmail: '',
      userNsid: '',
      userAge: '< 20',
      userLocation: 'Canada',
      userRank: 'C',
      userMode: 'Turf War',
      userWeapon: 'Shooters',
      userStatus: 'Available',
      userAvatar: '',
      verifiedPassword: '',
      showPasswordField: false,
      showCreateButton: false,
    }
  
  }

  verifyPassword = () => {
    this.setState({
      showPasswordField: true,
      showCreateButton: true,
    });
  }

  loginForm = (e) => {
    e.preventDefault();
    this.setState({ showCreateButton: false })
  }

  getUserLoginInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    })
  }

  getAccountInfo = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    })
    console.log(e.target.name+' :'+e.target.value);
  }
  

  render() {
    return (
      <div className="mainBackground">
        <Route path="/" exact render={() => 
          <LoginForm  loginForm={this.loginForm}
                      getUserLoginInput={this.getUserLoginInput}
                      username={this.state.username}
                      userPassword={this.state.userPassword}
                      verifiedPassword={this.state.verifiedPassword}
                      verifyPassword={this.verifyPassword}
                      showCreateButton={this.state.showCreateButton}
                      showPasswordField={this.state.showPasswordField}/>} />
        <Route path="/account-info" exact render={() =>
          <AccountInfo  username={this.state.username}
                        userPassword={this.state.userPassword}
                        userEmail={this.state.userEmail}
                        userNsid={this.state.userNsid}
                        userAge={this.state.userAge}
                        userLocation={this.state.userLocation}
                        userRank={this.state.userRank}
                        userMode={this.state.userMode}
                        userWeapon={this.state.userWeapon}
                        userStatus={this.state.userStatus}
                        userAvatar={this.state.userAvatar}
                        getAccountInfo={this.getAccountInfo}
                        showCreateButton={this.state.showCreateButton}/>}/>
        <Route path="/home" exact render={() =>
          <Home username={this.state.username}
                userPassword={this.state.userPassword}
                showCreateButton={this.state.showCreateButton}/>}/>
      </div>
    );
  }
}

export default App;
