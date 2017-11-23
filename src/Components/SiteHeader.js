import React, { Component } from 'react';
import { Jumbotron, Nav, Navbar, NavItem } from 'react-bootstrap';

class SiteHeader extends Component {
    render() {
        return(
            <Jumbotron className="container">
                <h1 className="siteTitle">Squid Match</h1>
                <p style={subTitle}>Find active players to play with in Splatoon 2</p>
                <Navbar style={navbarStyle} fluid inverse>
                    <Navbar.Header>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav style={navItemStyle}>
                            <NavItem>Find Squad</NavItem>
                            <NavItem>Chat</NavItem>
                            <NavItem>Friend List</NavItem>
                            <NavItem>Calendar</NavItem>
                        </Nav>
                        <Nav style={navItemStyle} pullRight>
                            <NavItem onClick={this.props.userLogout}>Logout</NavItem>
                            <NavItem>Avatar</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Jumbotron>
        
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

const titleHeading = {
    marginTop: '0%',
    paddingTop: '3%',
    marginBottom: '1%',
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

const style = Object.assign(Object.assign(Object.assign({}, splatoonFont), subTitle), titleHeading);

export default SiteHeader;