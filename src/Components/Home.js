import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

class Home extends Component {
  render() {

    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
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
              Your status must be set to "Available" for people to
              actively find you. Your status can be found on the
              right-hand side of the header. Once you have your
              squad, set your status to "Unavailable" so you can not
              be searched for by others.
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