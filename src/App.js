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

  getUsername = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value })
    console.log(this.state.username);
  }

  getUserPassword = (e) => {
    e.preventDefault();
    this.setState({ userPassword: e.target.value })
    console.log(this.state.userPassword);
  }

  getVerifiedPassword = (e) => {
    e.preventDefault();
    this.setState({ verifiedPassword: e.target.value })
    console.log(this.state.verifiedPassword);
  }
  

  render() {
    return (
      <div className="mainBackground">
        <Route path="/" exact render={() => 
          <LoginForm  loginForm={this.loginForm}
                      getUsername={this.getUsername}
                      getUserPassword={this.getUserPassword} 
                      getVerifiedPassword={this.getVerifiedPassword}
                      username={this.state.username}
                      userPassword={this.state.userPassword}
                      verifiedPassword={this.state.verifiedPassword}
                      verifyPassword={this.verifyPassword}
                      showCreateButton={this.state.showCreateButton}
                      showPasswordField={this.state.showPasswordField}/>} />
        <Route path="/account-info" exact render={() =>
          <AccountInfo loginForm={this.loginForm}
                        username={this.state.username}
                        userPassword={this.state.userPassword}
                        showCreateButton={this.state.showCreateButton}/>}/>
        <Route path="/home" exact render={() =>
          <Home loginForm={this.loginForm}
                        username={this.state.username}
                        userPassword={this.state.userPassword}
                        showCreateButton={this.state.showCreateButton}/>}/>
      </div>
    );
  }
}

export default App;
