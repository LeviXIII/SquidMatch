import React, { Component } from 'react';
import { Jumbotron, Nav, Navbar, NavItem,
        MenuItem, NavDropdown, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

class SiteHeader extends Component {
    
    render() {

        //Vars to note if a user has a notification.
        let changeShape = true;
        
        if (this.props.userNote === true) {
            changeShape = false;
        }

        let avatarSymbol = <Avatar name={this.props.username} size={35}
                            round={changeShape} style={splatoonFont}
                            maxInitial={2}/>

        

        return(
            <div>
            <Jumbotron className="container">
                <h1 className="siteTitle">Squid Match</h1>
                <p style={subTitle}>Find active players to play with in Splatoon 2</p>
                <Navbar style={navbarStyle} fluid inverse collapseOnSelect={true}>
                    <Navbar.Header>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav style={navItemStyle}>
                            <NavItem><Link to="/home">Home</Link></NavItem>
                            <NavItem><Link to="/news">News</Link></NavItem>
                            <NavItem><Link to="/choose-criteria">Find Squad</Link></NavItem>
                            <NavItem><Link to="/chat">Chat</Link></NavItem>
                            <NavItem>Friend List</NavItem>
                        </Nav>
                        <Nav style={navItemStyle} pullRight>
                        <Navbar.Text style={statusLabel}>Status: {this.props.userStatus}</Navbar.Text>
                            <NavDropdown eventKey={1} title={avatarSymbol} id="nav-dropdown">
                                <MenuItem eventKey={1.1} 
                                        onSelect={(status) => this.props.setStatus("Available")}>
                                    Available
                                </MenuItem>
                                <MenuItem eventKey={1.2}
                                        onSelect={(status) => this.props.setStatus("Unavailable")}>
                                    Unavailable
                                </MenuItem>
                                <MenuItem eventKey={1.3}
                                        onSelect={(status) => this.props.setStatus("Appear Offline")}>
                                    Appear Offline
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={1.4}
                                    onSelect={this.props.getUserInfo}>
                                    <Link to="/update-info">
                                        Update Account
                                    </Link>
                                </MenuItem>
                                {this.props.userNote &&
                                <MenuItem eventKey={1.5}
                                        onSelect={this.props.setShowChatModal}>
                                    Join {this.props.userFrom}'s Chat
                                </MenuItem>
                                }
                                <MenuItem divider />
                                <MenuItem eventkey={1.6}
                                            onSelect={this.props.userLogout}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Jumbotron>
          </div>
        );
    }
}

//////////
//Styles//
//////////

const splatoonFont = {
    fontFamily: 'paintball',
}

const subTitle = {
    fontFamily: 'paintball',
    textAlign: 'center',
    color: 'gainsboro',
    paddingLeft: '2%',
    paddingRight: '2%',
}

const statusLabel = {
    fontSize: '1em',
}

const navbarStyle = {
    background: 'none',
    border: 'none',
    marginBottom: '0%'
}

const navItemStyle = {
    fontFamily: 'overpass',
    color: 'gainsboro',
}

//const style = Object.assign(Object.assign(Object.assign({}, splatoonFont), subTitle), titleHeading);

export default SiteHeader;