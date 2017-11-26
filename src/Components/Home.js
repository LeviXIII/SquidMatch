import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

import SiteHeader from './SiteHeader';
import ChooseCriteria from './ChooseCriteria';

class Home extends Component {
  render() {

    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    
    let updateAlert = <Alert style={adjustWindow} bsStyle="success" onDismiss={this.props.setUpdateSuccess}>
                        <h3 style={title}>Account Updated!</h3>
                        <Button block={true} 
                                onClick={this.props.setUpdateSuccess}>OK</Button>
                      </Alert>

    return(
      <div>
        {this.props.updateSuccess ? (
          <div className="container">
            {updateAlert}
          </div>
      ) : (
      <div className="divBorder col-xs-10 col-sm-8 col-md-8 col-xs-offset-1 col-sm-offset-2 col-md-offset-2 formAccountSettings">
        <div>
          <h1>Welcome to Squid Match!</h1>
          <h3>Getting Started</h3>
          <p>
            The main purpose of Squid Match is to get you into a
            squad quickly in Splatoon 2. In order to do that, just
            follow these steps.
          </p>
          <ol>
            <li>Set Your Status</li>
            <p>
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

const title = {
  fontFamily: 'paintball',
  textAlign: 'center',
}

export default Home;