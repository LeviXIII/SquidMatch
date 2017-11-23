import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SiteHeader from './SiteHeader';

class Home extends Component {
    render() {

        if (this.props.isLoggedIn === false) {
            console.log('got here!')
            return <Redirect to="/" />
        }

        return(
            <SiteHeader userLogout={this.props.userLogout} />
    
        );
    }
}

export default Home;