import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Search extends Component {
  
  render() {
    
    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    return (
        <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formAccountSettings">
          <h1 style={splatoonFont}>Searching...</h1>
        </div>
    );
  }

}

//////////
//Styles//
//////////

const splatoonFont = {
  fontFamily: 'paintball',
  textAlign: 'center',
  marginTop: '10px',
}

export default Search;