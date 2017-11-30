import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

class Home extends Component {
  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      this.props.userLogout();
      return <Redirect to="/" />
    }

    //Update status after updating your status.
    let updateAlert = <Alert style={adjustWindow} bsStyle="success" onDismiss={this.props.setUpdateSuccess}>
                        <h3 style={notice}>Account Updated!</h3>
                        <Button block={true} 
                                onClick={this.props.setUpdateSuccess}>OK</Button>
                      </Alert>

    return (
      <div>
        {this.props.updateSuccess ? (
          <div className="container">
            {updateAlert}
          </div>
      ) : (
      <div className="divBorder col-xs-10 col-sm-8 col-md-8 col-xs-offset-1 col-sm-offset-2 col-md-offset-2 formAccountSettings">
        <div>
          <h1 style={title}>Welcome to Squid Match!</h1>
          <h3 style={subTitle}>Getting Started</h3>
          <p style={paraFont}>
            The main purpose of Squid Match is to get you into a
            squad quickly in Splatoon 2. In order to do that, just
            follow these steps.
          </p>
          <ol>
            <li style={listTitle}>Set Your Status</li>
            <p style={paraFont}>
              Your status must be set to "Available" to be searchable.
              Your status can be found on the right-hand side of the banner.
              If you receive an invitation to chat you can select it at any
              time. You can only receive one invitation at a time, so make
              sure to stay fresh. You will be unavailable while chatting.
            </p>
            <li style={listTitle}>Find A Squad</li>
            <p style={paraFont}>
              Click the "Find Squad" link in the banner to start the search.
            </p>
            <li style={listTitle}>Choose Your Criteria</li>
            <p style={paraFont}>
              You choose who you want to play with. If you can't find anybody,
              try to be less specific. If you want to find anybody, either
              check all the the checkboxes to "Off", or make all the fields "Any".
            </p>
            <li style={listTitle}>Results</li>
            <p style={paraFont}>
              You can select up to 3 other people to invite to a squad. Once you
              are finished, push the "Chat" button to invite the selected members
              to chat. If no one replies, stay fresh and try searching again.
            </p>
            <li style={listTitle}>Chatting</li>
            <p style={paraFont}>
              An alert will pop up if you receive an invitation to chat. You can
              decline it or accept (Booyah!). If you click away from the window,
              you can always see if you have an invite by checking your avatar shape.
              A square means you have an invite waiting and you can access it via
              the drop-down menu on the avatar. During chat, you cannot access the
              rest of the site until you exit.
            </p>
          </ol>
        </div>
      </div>
    )}
    </div>
    );
  }
}

//////////
//Styles//
//////////

const adjustWindow = {
  marginTop: '10%',
}

const notice = {
  fontFamily: 'paintball',
  textAlign: 'center',
}

const splatoonFont = {
    fontFamily: 'paintball',
}

const subTitle = {
  fontFamily: 'paintball',
  color: '#948f8f',
}

const listTitle = {
  fontFamily: 'paintball',
  fontSize: '150%',
  color: '#948f8f',
}

const title = {
  fontFamily: 'paintball',
  textAlign: 'center',
}

const paraFont ={
  fontFamily: 'overpass',
  fontSize: '120%',
}

export default Home;