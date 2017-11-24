import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SiteHeader from './SiteHeader';
import ChooseCriteria from './ChooseCriteria';

class Home extends Component {
  render() {

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    return(
      <div className="divBorder col-xs-10 col-sm-8 col-md-8 col-xs-offset-1 col-sm-offset-2 col-md-offset-2 formAccountSettings">
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
          {/* <SiteHeader userLogout={this.props.userLogout} /> */}
          {/* <ChooseCriteria /> */}
      </div>
    );
  }
}

export default Home;