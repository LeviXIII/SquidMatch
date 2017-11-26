import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, InputGroup } from 'react-bootstrap';
import Avatar from 'react-avatar';

let displayResults;

class Results extends Component {

  render() {
    
    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    //Run through array of results put them into a list.
    if (this.props.searchResults.length === 0) {
      displayResults = <h3 style={noResults}>
                        Sorry, there were no results
                      </h3>
    }
    else {
      displayResults = this.props.searchResults.map((value, i) => {
        let avatarSymbol = <Avatar name={value.username} size={35} round={true} maxInitial={2}/>
          //Avoid printing the current user in the results.
          if (value.username !== this.props.username) {
            return (
              <div>
              <ListGroup>
                <ListGroupItem style={displayFont}>
                <h3 style={splatoonFont}>{value.username}</h3>
                  <span>{avatarSymbol} &nbsp;</span>
                  Age: {value.age}, &nbsp;Location: {value.location}, &nbsp;
                  Rank: {value.rank}, &nbsp;&nbsp;Mode: {value.mode}, &nbsp;
                  Weapon: {value.weapon}
                </ListGroupItem>
              </ListGroup>
              </div>
            );
          }
      })
    }
    return (
      <div className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
        <h1 style={title}>Results</h1>
          {displayResults}
      </div>
    );
  }

}

//////////
//Styles//
//////////

const displayFont = {
  fontFamily: 'overpass',
  fontSize: '1.1em'
}

const noResults = {
  fontFamily: 'overpass',
  textAlign: 'center'
}

const splatoonFont = {
  fontFamily: 'paintball',
  marginTop: '0',
  color: '#948f8f'
}

const title = {
  fontFamily: 'paintball',
  textAlign: 'center',
  marginTop: '10px',
  marginBottom: '10px'
}

export default Results;