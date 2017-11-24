import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './Components/LoginForm';
import AccountInfo from './Components/AccountInfo';
import Home from './Components/Home';
import SiteHeader from './Components/SiteHeader';
import ChooseCriteria from './Components/ChooseCriteria';
import Search from './Components/Search';

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
      searchAge: '< 20',
      searchLocation: 'Canada',
      searchRank: 'C',
      searchMode: 'Turf War',
      searchWeapon: 'Shooters',
      verifiedPassword: '',
      verifyMessage: '',
      ageBox: false,
      locationBox: false,
      rankBox: false,
      modeBox: false,
      mainBox: false,
      isLoggedIn: false,
      isRegistering: false,
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

  //Sets state for verify password field to appear.
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
      localStorage.setItem('token', result.data.token);
      this.setState({
        isLoggedIn: true,
        accountRedirect: false,
      });
    })
    .catch(error => {
      this.setState({ 
        verifyMessage: "Your email or NSID are incorrect.",
      })
      console.log("There was an error: " + error);
    })
  }

  //Log the user in.
  loginForm = (e) => {
    e.preventDefault();
    
    if (this.state.username !== '' && this.state.userPassword !== '') {
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
          this.setState({
            verifyMessage: result.data.message,
            showCreateButton: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          verifyMessage: "Please sign up for an account.",
          //showCreateButton: true
        });
      })
    }
    else {
      this.setState({
        verifyMessage: "Please enter a valid username or password.",
        //showCreateButton: true
      })
    }
    
    //Decide whether to show the Create Button on the Create Account
    //form.
    //this.setState({ showCreateButton: true })
  }

  //Log out the user
  userLogout = () => {
    localStorage.removeItem('token');
    this.setState({
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
      searchAge: '< 20',
      searchLocation: 'Canada',
      searchRank: 'C',
      searchMode: 'Turf War',
      searchWeapon: 'Shooters',
      verifiedPassword: '',
      verifyMessage: '',
      ageBox: false,
      locationBox: false,
      rankBox: false,
      modeBox: false,
      mainBox: false,
      isLoggedIn: false,
      isRegistering: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,

    });
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

  //Get the search criteria
  getCriteria = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getCriteriaCheckBox = (e) => {

    if (this.state[e.target.name] === false) {
      this.setState({
        [e.target.name]: true
      })
    }
    else {
      this.setState({
        [e.target.name]: false
      })
    }
    console.log(e.target.name+ ': ' +e.target.value)
  }

  //Get the current status of the user.
  getStatus = (status) => {
    this.setState({
      userStatus: status
    })
  }

  //Check password length and validation.
  checkPassword = () => {
    if (this.state.verifiedPassword === this.state.userPassword &&
        this.state.userPassword.length >= 8) {

        axios.post('/check-user', {
          username: this.state.username
        })
        .then(result => {
          //If a user is found, tell them to use login.
          if (result.data.result !== null) {
            this.setState({ verifyMessage: "Please sign in using your existing account." });
          }
          else {
            //Otherwise, continue with registration.
            this.setState({
              accountRedirect: true,
              verifyMessage: ''
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
    else {
      this.setState({
        verifyMessage: "Your password doesn't match or is too short."
      })
    }
  }

  searchCriteria = () => {
    axios.post('/search-criteria', {
      status: this.state.userStatus,
      searchAge: this.state.searchAge,
      searchLocation: this.state.searchLocation,
      searchRank: this.state.searchRank,
      searchMode: this.state.searchMode,
      searchWeapon: this.state.searchWeapon,
    })
    .then(result => {
      console.log(result);
    })
  }

  render() {
    return (
      <div className="mainBackground">
      {this.state.isLoggedIn &&
        <SiteHeader username={this.state.username}
                    userStatus={this.state.userStatus}
                    userLogout={this.userLogout}
                    getStatus={this.getStatus}
      />}
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
                        accountRedirect={this.state.accountRedirect}
                        verifyMessage={this.state.verifyMessage}
                        registerInfo={this.registerInfo}
                        getAccountInfo={this.getAccountInfo}/>}/>
                        {/* showCreateButton={this.state.showCreateButton} */}

        <Route path="/home" exact render={() =>
          <Home isLoggedIn={this.state.isLoggedIn}/>}/>
        
        <Route path="/choose-criteria" exact render={() =>
          <ChooseCriteria isLoggedIn={this.state.isLoggedIn}
                          ageBox={this.state.ageBox}
                          locationBox={this.state.locationBox}
                          rankBox={this.state.rankBox}
                          modeBox={this.state.modeBox}
                          mainBox={this.state.mainBox}
                          getCriteria={this.getCriteria}
                          searchCriteria={this.searchCriteria}
                          getCriteriaCheckBox={this.getCriteriaCheckBox}/>}/>
        
        <Route path="/search" exact render={() =>
          <Search isLoggedIn={this.state.isLoggedIn}/>}/>
      </div>
    );
  }
}

export default App;
