import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';

import LoginForm from './Components/LoginForm';
import AccountInfo from './Components/AccountInfo';
import UpdateInfo  from './Components/UpdateInfo';
import Home from './Components/Home';
import SiteHeader from './Components/SiteHeader';
import News from './Components/News';
import ChooseCriteria from './Components/ChooseCriteria';
import Results from './Components/Results';
import Chat from './Components/Chat';

import config from './config';
import './App.css';

const socket = io(config.port);

class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: '',
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
      userNote: false,
      userFrom: '',
      searchAge: 'Any',
      searchLocation: 'Any',
      searchRank: 'Any',
      searchMode: 'Any',
      searchWeapon: 'Any',
      verifiedPassword: '',
      verifyMessage: '',
      ageBox: false,
      locationBox: false,
      rankBox: false,
      modeBox: false,
      weaponBox: false,
      isLoggedIn: false,
      isRegistering: false,
      isChatting: false,
      updateSuccess: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,
      showUpdatePage: false,
      showResultsPage: false,
      showModal: false,
      showDeleteModal: false,
      showChatModal: false,
      userToRemove: {},
      socket: {},
      searchResults: [],
      groupMembers: [],
      messages: [
        { sender: '', message: ''}
      ],
    }
  }

  componentDidMount() {
    socket.connect();
    
    socket.on('connect', () => {
      this.setState({
        socket: socket
      })
    })

    // socket.on('client:joinchat', (username, data) => {
    //   this.setState({
    //     messages: [{ sender: 'Admin:', message: 'Welcome to Squad Chat!'}]
    //   })
    //   console.log(username, data);
    // })

    socket.on('updatechat', (data) => {
      this.setState({
        messages: this.state.messages.concat({ sender: data.sender+': ', message: data.message })
      })
    })

    socket.on('databaseCheck', () => {
      axios.get('/get-invite-note/' + this.state.username)
      .then(result => {
        this.setState({ 
          userNote: result.data.notify,
          userFrom: result.data.from,
        })

        //Show the chat invitation pop-up
        this.setShowChatModal();
      })
      .catch(error => {
        console.log(error);
      })
      
    })

    socket.on('client:user-made-room', (username) => {
      this.setState({
        messages: [{ sender: 'Admin: ', message: 'Welcome to Squid Chat!'}]
      })
    })

    socket.on('user-declined', (data) => {
      this.setState({
        messages: this.state.messages.concat({
          sender: 'Admin: ',
          message: `${data.username} splatted your invite.` })
      })
      console.log();
      //this.state.username;
    })

    // socket.on('client:user-joined-room', (username, from) => {
    //   this.setState({
    //     messages: this.state.messages.concat({ 
    //       sender: 'Admin', 
    //       message: `${username} joined the chat!`
    //     })
    //   })
    // }) 

  } //end componentDidMount

  getMessageText = e => {
    this.setState({ 
      messageText: e.target.value
    })
  }

  submitChat = e => {
    e.preventDefault();
    socket.emit('sendchat', { 
      sender: this.state.username,
      message: this.state.messageText
    })

    //Clear the messageText box.
    this.setState({
      messageText: '',
    })
  }

  // submitUser = () => {
  //   //const user = this.state.username
  //   socket.emit('client:newuser', { sender: this.state.username, message: 'has connected to the chat!' })
  //   this.setState({
  //     //loggedIn: true,
  //     //user: this.state.username
  //   })
  // }

  // addRoom = () => {
  //   //e.preventDefault()
  //   console.log('Trying to add room', this.state.username)
  //   socket.emit('addroom', {roomname: this.state.username})
  //   //this.refs.addRoom.value = ''
  // }

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
        userId: result.data.id,
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
    if (/\d{4}-\d{4}-\d{4}/g.test(this.state.userNsid) === true) {
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
    else {
      this.setState({ verifyMessage: "Check your NSID format" })
    }
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
        console.log(result)
        if (result.data.message === undefined || null) {
          localStorage.setItem('token', result.data.token);
          this.setState({
            isLoggedIn: true,
            userNsid: result.data.nsid,
            userNote: result.data.notify,
            userFrom: result.data.from,
            userStatus: result.data.status,
            verifyMessage: '',
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
    console.log(this.state.userNsid)
    //Decide whether to show the Create Button on the Create Account
    //form.
    //this.setState({ showCreateButton: true })
  }

  //Log out the user
  userLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      userId: '',
      username: '',
      userPassword: '',
      userEmail: '',
      userNsid: '',
      userAge: '< 20',
      userLocation: 'Canada',
      userRank: 'C',
      userMode: 'Turf War',
      userWeapon: 'Shooters',
      userStatus: 'Offline',
      userAvatar: '',
      userNote: false,
      userFrom: '',
      searchAge: 'Any',
      searchLocation: 'Any',
      searchRank: 'Any',
      searchMode: 'Any',
      searchWeapon: 'Any',
      verifiedPassword: '',
      verifyMessage: '',
      ageBox: false,
      locationBox: false,
      rankBox: false,
      modeBox: false,
      weaponBox: false,
      isLoggedIn: false,
      isRegistering: false,
      isChatting: false,
      updateSuccess: false,
      accountRedirect: false,
      showPasswordField: false,
      showCreateButton: false,
      showUpdatePage: false,
      showResultsPage: false,
      showModal: false,
      showDeleteModal: false,
      showChatModal: false,
      userToRemove: {},
      socket: {},
      searchResults: [],
      groupMembers: [],
      messages: [
        { sender: '', message: ''}
      ],
    });

    socket.emit('exit-chat', {
      username: this.state.username,
      from: this.state.userFrom
    })

    axios.put('/logout/'+this.state.username, {
      status: "Offline",
      notify: false,
      from: ''
    })
    .then(result => {
      console.log("Logged out");
    })
    .catch(error => {
      console.log("Couldn't log out");
    })

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

  getGroupMembers = (group) => {
    //Send everyone in the group a notification of being invited
    //Then set their status to Unavailable until they respond to
    //notification.
    
    axios.put('/send-invites', 
              { notify: true, 
                from: this.state.username,
                group: group
              })
    .then(result => {
      socket.emit('check-invites'); //Triggers event to tell others of invite.
    })
    .catch(error => {
      console.log(error);
    })

    //Update Status in database.
    this.setStatus("Unavailable");
    
    //Add a room when chat is started.
    socket.emit('make-room-for-user', this.state.username);
    this.setState({
      groupMembers: group,
      showModal: false,     //Close the window after leaving Results window.
      isChatting: true
    })
    
  }

  //Set the current status of the user.
  setStatus = (status) => {
    //Set the status in the database.
    axios.put('/update-status/'+this.state.username, {
      status: status,
    })
    .then(result => {
      this.setState({ userStatus: status });

    })
    .catch(error => {
      console.log(error);
    })
  }
  
  //Controls whether the successful update alert pops up.
  setUpdateSuccess = () => {
    this.setState({ 
      updateSuccess: false,
      verifyMessage: '',
    });
  }

  setShowModal = () => {
    if (!this.state.showModal) {
      this.setState({ showModal: true })
    }
    else {
      this.setState({ showModal: false })
    }
  }

  setShowDeleteModal = () => {
    if (!this.state.showDeleteModal) {
      this.setState({ showDeleteModal: true })
    }
    else {
      this.setState({ showDeleteModal: false })
    }
  }

  //Delete potential member from result list.
  deleteOption = (user) => {
    this.setState({
      showDeleteModal: true,
      userToRemove: user
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
      status: "Available",
      notify: false,           
      searchArray: searchArray
    })
    .then(result => {
      this.setState({
        searchResults: result.data.result,
        showResultsPage: true,
      });
    })
    .catch(error => {
      console.log("Couldn't perform search.");
    })

  }

  setShowChatModal = () => {
    //Won't display modal if you are inviting people.
    if (this.state.userFrom === this.state.username || 
          this.state.userFrom === '' || this.state.showChatModal) {
      this.setState({ showChatModal: false });
    }
    else {
      this.setState({ showChatModal: true });
    }
  }

  declineInvite = () => {
    //Change status and update notification
    axios.put('/decline-invite/'+this.state.username, {
      status: "Available",
      notify: false,
      from: '',
    })
    .then(result => {
      socket.emit('user-declined-request', 
        { username: result.data.result.username,
          from: result.data.result.notification.from
        });
      
    })
    .catch(error => {
      console.log(error);
    })

    this.setState({
      userStatus: "Available",
      userNote: false,
      userFrom: '',
      showChatModal: false,
    });
  }

  joinChat = () => {
    axios.put('/received-invite/' + this.state.username)
    .then(result => {

    })
    .catch(error => {
      console.log(error);
    })

    this.setStatus("Unavailable");
    
    socket.emit('add-user-to-room', { 
      username: this.state.username,
      from: this.state.userFrom
    });

    this.setState({ 
      userNote: false,
      userFrom: '',
      showChatModal: false,
      isChatting: true,
    })
  }

  exitChat = () => {
    socket.emit('exit-chat', {
      username: this.state.username,
      from: this.state.userFrom
    })
    
    this.setState({
      isChatting: false,
      messages: []
    });
  }

  componentWillUnmount() {
    //this.userLogout();
    socket.disconnect(true);
  }

  render() {
 
    return (
      <div className="mainBackground">
      {this.state.isLoggedIn &&
        <div>
        <SiteHeader username={this.state.username}
                    userStatus={this.state.userStatus}
                    userNote={this.state.userNote}
                    userFrom={this.state.userFrom}
                    joinChat={this.state.joinChat}
                    isChatting={this.state.isChatting}
                    setShowChatModal={this.setShowChatModal}
                    userLogout={this.userLogout}
                    getUserInfo={this.getUserInfo}
                    setStatus={this.setStatus}/>

        <Modal show={this.state.showChatModal} onHide={this.setShowChatModal}>
          <Modal.Body>
          <h3 style={confirm}>Join {this.state.userFrom}'s chat?</h3>
          </Modal.Body>

          <Modal.Footer>
          <Button style={cancelButton}
                  onClick={this.declineInvite}>Decline</Button>
          <Link to="/chat">
            <Button style={proceedButton}
                    onClick={this.joinChat}>Booyah!</Button>
          </Link>
          </Modal.Footer>
        </Modal>
        </div>
      }

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
                        userLogout={this.userLogout}
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
                        updateSuccess={this.state.updateSuccess}
                        userLogout={this.userLogout}
                        updateUser={this.updateUser}
                        registerInfo={this.registerInfo}
                        getAccountInfo={this.getAccountInfo}
                        verifyToken={this.verifyToken}/>}/>

        <Route path="/home" exact render={() =>
          <Home isLoggedIn={this.state.isLoggedIn}
                //updateSuccess={this.state.updateSuccess}
                //setUpdateSuccess={this.setUpdateSuccess}
                userLogout={this.userLogout}
                verifyToken={this.verifyToken}/>}/>
        
        <Route path="/choose-criteria" exact render={() =>
          <ChooseCriteria isLoggedIn={this.state.isLoggedIn}
                          ageBox={this.state.ageBox}
                          locationBox={this.state.locationBox}
                          rankBox={this.state.rankBox}
                          modeBox={this.state.modeBox}
                          weaponBox={this.state.weaponBox}
                          userStatus={this.state.userStatus}
                          searchAge={this.state.searchAge}
                          searchLocation={this.state.searchLocation}
                          searchRank={this.state.searchRank}
                          searchMode={this.state.searchMode}
                          searchWeapon={this.state.searchWeapon}
                          updateSuccess={this.state.updateSuccess}
                          setUpdateSuccess={this.setUpdateSuccess}
                          userLogout={this.userLogout}
                          getCriteria={this.getCriteria}
                          searchCriteria={this.searchCriteria}
                          getCriteriaCheckBox={this.getCriteriaCheckBox}
                          verifyToken={this.verifyToken}/>}/>
        
        <Route path="/results" exact render={() =>
          <Results isLoggedIn={this.state.isLoggedIn}
                  searchResults={this.state.searchResults}
                  username={this.state.username}
                  showResultsPage={this.state.showResultsPage}
                  showModal={this.state.showModal}
                  showDeleteModal={this.state.showDeleteModal}
                  userToRemove={this.state.userToRemove}
                  userLogout={this.userLogout}
                  setShowModal={this.setShowModal}
                  deleteOption={this.deleteOption}
                  setShowDeleteModal={this.setShowDeleteModal}
                  getGroupMembers={this.getGroupMembers}
                  verifyToken={this.verifyToken}/>}/>
        
        <Route path="/chat" exact render={() =>
          <Chat isLoggedIn={this.state.isLoggedIn}
                messages={this.state.messages}
                messageText={this.state.messageText}
                userNsid={this.state.userNsid}
                userLogout={this.userLogout}
                getMessageText={this.getMessageText}
                submitChat={this.submitChat}
                exitChat={this.exitChat}
                verifyToken={this.verifyToken}/>}/>

        <Route path="/news" exact render={() =>
          <News isLoggedIn={this.state.isLoggedIn}
                userLogout={this.userLogout}  
                verifyToken={this.verifyToken}/>}/>
      </div>
    );
  }
}

//////////
//Styles//
//////////

const cancelButton = {
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
}

const proceedButton = {
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
}

const confirm = {
  fontFamily: 'paintball',
  textAlign: 'center',
}

export default App;
