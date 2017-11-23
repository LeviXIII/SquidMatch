import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
      verifyMessage: '',
      isLoggedIn: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,
    }
  
  }

  //Check if the token is still valid.
  verifyToken = () => {
    axios.post('/verify-token', {
      currentToken: localStorage.getItem('token')
    })
    .then(result => {
      if (result.data.token === false) {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  verifyPassword = () => {
    this.setState({
      showPasswordField: true,
      showCreateButton: true,
    });
  }

  //Registers a new user.
  registerInfo = () => {
    axios.post('/register', {
        username: this.state.username,
        password: this.state.userPassword,
        email: this.state.userEmail,
        nsid: this.state.userNsid,
        age: this.state.userAge,
        location: this.state.userLocation,
        rank: this.state.userRank,
        mode: this.state.userMode,
        weapon: this.state.userWeapon,
        status: this.state.userStatus,
        avatar: this.state.userAvatar,
    })
    .then(result => {
        console.log(result);
        // if (result.data.signedUp === false) {
          
        // }
        // else {
          localStorage.setItem('token', result.data.token);
          this.setState({ isLoggedIn: true });
        //}
    })
    .catch(error => {
      this.setState({ 
        verifyMessage: "Your email or NSID are incorrect.",
      })
      console.log("There was an error: " + error);
    })
  }

  loginForm = (e) => {
    e.preventDefault();
    
    //Post the info to the database to check if the user exists.
    axios.post('/login', {
      username: this.state.username,
      password: this.state.userPassword,
    })
    .then(result => {
      if (result.data.message === undefined || null) {
        localStorage.setItem('token', result.data.token);
        this.setState({ isLoggedIn: true });
      }
      else {
        this.setState({ verifyMessage: result.data.message });
      }
    })
    .catch(error => {
      console.log("There was an error: " + error)
    })

    //Decide whether to show the Create Button on the Create Account
    //form.
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
  }

  //Check password length and validation.
  checkPassword = () => {
    if (this.state.verifiedPassword === this.state.userPassword &&
        this.state.userPassword.length >= 8) {

        this.setState({
          accountRedirect: true,
          verifyMessage: ''
        });
    }
    else {
      this.setState({
        verifyMessage: "Your password doesn't match or is too short."
      })
    }
  }

  render() {
    return (
      <div className="mainBackground">
        <Route path="/" exact render={() => 
          <LoginForm  username={this.state.username}
                      userPassword={this.state.userPassword}
                      verifiedPassword={this.state.verifiedPassword}
                      verifyMessage={this.state.verifyMessage}
                      accountRedirect={this.state.accountRedirect}
                      showCreateButton={this.state.showCreateButton}
                      showPasswordField={this.state.showPasswordField}
                      isLoggedIn={this.state.isLoggedIn}
                      loginForm={this.loginForm}
                      getUserLoginInput={this.getUserLoginInput}
                      verifyToken={this.verifyToken}
                      verifyPassword={this.verifyPassword}
                      checkPassword={this.checkPassword}/>} />
                      
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
                        isLoggedIn={this.state.isLoggedIn}
                        verifyMessage={this.state.verifyMessage}
                        registerInfo={this.registerInfo}
                        getAccountInfo={this.getAccountInfo}/>}/>
                        {/* showCreateButton={this.state.showCreateButton} */}
        
        {this.state.isLoggedIn &&
        <Route path="/home" exact render={() =>
          <Home username={this.state.username}
                userPassword={this.state.userPassword}/>}/>
                // showCreateButton={this.state.showCreateButton}
        }
      </div>
    );
  }
}

export default App;
