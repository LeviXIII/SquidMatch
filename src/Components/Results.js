import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, InputGroup,
        Modal, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import axios from 'axios';

let displaySquad;
let squad;
let counter;

class Results extends Component {
  
  componentWillMount() {
    displaySquad = [];
    squad = [];
    counter = 0;
  }

  //Add user to current list of members.
  addToSquad = (user) => { 

    let duplicate = false;

    //Stops undefined entry from being pushed into array.
    counter++;
    //Only allows for three people on the list at a time.
    if (user !== undefined && squad.length <= 2) {
      //Check for duplicates.
      for (let i=0; i < squad.length; i++) {
        if (user.username === squad[i].username) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        squad.push(user);
        displaySquad = squad.map((value, i) => {
          return (
            <ListGroup>
            <ListGroupItem key={i} style={displayFont}
                            onClick={(user) => this.props.deleteOption(value)}>
              <h3 style={splatoonFont}>{value.username}</h3>
              Age: {value.age}, &nbsp;Location: {value.location}, &nbsp;
              Rank: {value.rank}, &nbsp;&nbsp;Mode: {value.mode}, &nbsp;
              Weapon: {value.weapon}
            </ListGroupItem>
            </ListGroup>
          )
        })
      }
      else {
        displaySquad = <div>{squad.map((value, i) => {
          return (
            <ListGroup>
            <ListGroupItem style={displayFont}
                            onClick={(user) => this.props.deleteOption(value)}>
              <h3 key={i} style={splatoonFont}>{value.username}</h3>
              Age: {value.age}, &nbsp;Location: {value.location}, &nbsp;
              Rank: {value.rank}, &nbsp;&nbsp;Mode: {value.mode}, &nbsp;
              Weapon: {value.weapon}
            </ListGroupItem>
            </ListGroup>
          )
        })} <h3 style={warning}>Pick someone fresh (no duplicates)</h3></div>
        
      }
    }
    
    this.props.setShowModal();
  } //end addToSquad

  removeMember = () => {
    for (let i=0; i < squad.length; i++) {
      if (this.props.userToRemove.username === squad[i].username) {
        squad.splice(i, 1);
      }
    }

    this.props.setShowDeleteModal();
    this.props.setShowModal();
  }

  render() {

    let displayResults;
    let userCount = 0;
    let otherCount = 0;
    
    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
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
          if (value.username === this.props.username) {
            userCount++;
          }
          else {
            otherCount++;
            return (
              <div>
              <ListGroup>
                <ListGroupItem key={i} onClick={(user) => this.addToSquad(value)}
                                style={displayFont}>
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
  
      if (userCount > otherCount) {
        displayResults = <h3 style={noResults}>
                          Sorry, there were no results
                        </h3>
      }

      }
      return (
        <div className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
          <h1 style={title}>Results</h1>
            {this.props.showResultsPage ? (
              <div>
                <Modal show={this.props.showModal} onHide={this.props.setShowModal}>
                  <Modal.Header>
                    <Modal.Title style={warning}>Current Squad Members</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  {displaySquad}
                  {displaySquad.length === 3 &&
                    <h3 style={warning}>You can't have more than 3 members.</h3>
                  }
                  </Modal.Body>

                  <Modal.Footer>
                    <Button style={cancelButton}
                            onClick={this.props.setShowModal}>Close</Button>
                    <Link to="/chat">
                      <Button style={proceedButton}
                              onClick={(group) => this.props.getGroupMembers(squad)}>
                              Chat
                      </Button>
                    </Link>
                  </Modal.Footer>
                </Modal>
                
                <Modal show={this.props.showDeleteModal} onHide={this.props.setShowDeleteModal}>
                  <Modal.Body>
                    <h3 style={remove}>Remove this member?</h3>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button style={cancelButton}
                            onClick={this.props.setShowDeleteModal}>Cancel</Button>
                    <Button style={proceedButton}
                            onClick={this.removeMember}>Remove</Button>
                  </Modal.Footer>
                </Modal>

              {displayResults}
              </div>
            ) : (
              <div>
              <h3 style={noResults}>
                        LOADING...
                      </h3>
              </div>
            )
          }
            
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

const warning = {
  fontFamily: 'paintball',
  textAlign: 'center',
  color: '#948f8f',
}

const remove = {
  fontFamily: 'paintball',
  textAlign: 'center',
  color: '#D80000',
}

export default Results;