import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './Components/LoginForm';
import AccountInfo from './Components/AccountInfo';
import UpdateInfo  from './Components/UpdateInfo';
import Home from './Components/Home';
import SiteHeader from './Components/SiteHeader';
import ChooseCriteria from './Components/ChooseCriteria';
import Results from './Components/Results';

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
      searchAge: 'Any',
      searchLocation: 'Any',
      searchRank: 'Any',
      searchMode: 'Any',
      searchWeapon: 'Any',
      verifiedPassword: '',
      verifyMessage: '',
      searchResults: [],
      ageBox: false,
      locationBox: false,
      rankBox: false,
      modeBox: false,
      weaponBox: false,
      isLoggedIn: false,
      isRegistering: false,
      updateSuccess: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,
      showUpdatePage: false,
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

  //Get the current user's information.
  getUserInfo = () => {
    axios.get('/get-user-info/'+this.state.username)
    .then(result => {
      this.setState({
        userNsid: result.data.user.nsid,
        userAge: result.data.user.age,
        userLocation: result.data.user.location,
        userRank: result.data.user.rank,
        userMode: result.data.user.mode,
        userWeapon: result.data.user.weapon,
        userStatus: result.data.user.status,
        showUpdatePage: true,
      })

    })
    .catch(error => {
      console.log("Couldn't get your information. Try again later.");
    })
  }

  //Update a user.
  updateUser = () => {
    axios.put('/update-user-info/'+this.state.username, {
      nsid: this.state.userNsid,
      age: this.state.userAge,
      location: this.state.userLocation,
      rank: this.state.userRank,
      mode: this.state.userMode,
      weapon: this.state.userWeapon,
      status: this.state.userStatus,
    })
    .then(result => {
      this.setState({ updateSuccess: true });
    })
    .catch(error => {
      console.log(error);
    })
  }

  //Log the user in.
  loginForm = (e) => {
    e.preventDefault();
    
    if (this.state.username !== '' && this.state.userPassword !== '') {
      //Post the info to the database to check if the user exists.
      axios.post('/login', {
        username: this.state.username,
        password: this.state.userPassword
      })
      .then(result => {
        if (result.data.message === undefined || null) {
          localStorage.setItem('token', result.data.token);
          this.setState({
            isLoggedIn: true,
          });
        }
        else {
          this.setState({
            verifyMessage: result.data.message,
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          verifyMessage: "Please sign up for an account.",
        });
      })
    }
    else {
      this.setState({
        verifyMessage: "Please enter a valid username or password.",
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
      weaponBox: false,
      isLoggedIn: false,
      isRegistering: false,
      updateSuccess: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,

    });
  }

  getUserLoginInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value.replace(/ /g, "") //Takes spaces out.
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
    console.log('CRITERIA: '+e.target.name+ ': ' +e.target.value)
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
    console.log('CHECKBOXES: '+e.target.name+ ': ' +e.target.value)
  }

  //Get the current status of the user.
  getStatus = (status) => {
    this.setState({
      userStatus: status
    })
  }

  //Controls whether the successful update alert pops up.
  setUpdateSuccess = () => {
    this.setState({ updateSuccess: false });
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

  //Search for the criteria specified by the user.
  searchCriteria = () => {
    let searchArray = [];
    let disabledBoxes = {
      searchAge: this.state.ageBox,
      searchLocation: this.state.locationBox,
      searchRank: this.state.rankBox,
      searchMode: this.state.modeBox,
      searchWeapon: this.state.mainBox
    }

    //Go through object to find all the non-checked boxes and push them
    //into an array.
    for (let i in disabledBoxes) {
      if (disabledBoxes[i] === false) { 
        searchArray.push({ [i]: this.state[i] });
      }
    }

    axios.post('/search-criteria', {
      status: this.state.userStatus,
      searchArray: searchArray
    })
    .then(result => {
      this.setState({ 
        searchResults: result.data.result
      });
    })
    .catch(error => {
      console.log("Couldn't perform search.");
    })

  }

  render() {
    return (
      <div className="mainBackground">
      {this.state.isLoggedIn &&
        <SiteHeader username={this.state.username}
                    userStatus={this.state.userStatus}
                    userLogout={this.userLogout}
                    getUserInfo={this.getUserInfo}
                    getStatus={this.getStatus}/>}

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
                        updateUser={this.updateUser}
                        registerInfo={this.registerInfo}
                        getAccountInfo={this.getAccountInfo}/>}/>

        <Route path="/update-info" exact render={() =>
          <UpdateInfo  username={this.state.username}
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
                        showUpdatePage={this.state.showUpdatePage}
                        updateUser={this.updateUser}
                        registerInfo={this.registerInfo}
                        getAccountInfo={this.getAccountInfo}
                        verifyToken={this.verifyToken}/>}/>

        <Route path="/home" exact render={() =>
          <Home isLoggedIn={this.state.isLoggedIn}
                updateSuccess={this.state.updateSuccess}
                setUpdateSuccess={this.setUpdateSuccess}
                verifyToken={this.verifyToken}/>}/>
        
        <Route path="/choose-criteria" exact render={() =>
          <ChooseCriteria isLoggedIn={this.state.isLoggedIn}
                          ageBox={this.state.ageBox}
                          locationBox={this.state.locationBox}
                          rankBox={this.state.rankBox}
                          modeBox={this.state.modeBox}
                          weaponBox={this.state.weaponBox}
                          searchAge={this.state.searchAge}
                          searchLocation={this.state.searchLocation}
                          searchRank={this.state.searchRank}
                          searchMode={this.state.searchMode}
                          searchWeapon={this.state.searchWeapon}
                          getCriteria={this.getCriteria}
                          searchCriteria={this.searchCriteria}
                          getCriteriaCheckBox={this.getCriteriaCheckBox}
                          verifyToken={this.verifyToken}/>}/>
        
        <Route path="/results" exact render={() =>
          <Results isLoggedIn={this.state.isLoggedIn}
                  searchResults={this.state.searchResults}
                  username={this.state.username}
                  verifyToken={this.verifyToken}/>}/>
      </div>
    );
  }
}

export default App;
