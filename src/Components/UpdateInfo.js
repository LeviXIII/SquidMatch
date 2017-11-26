import React, { Component } from 'react';
import { Form, FormGroup, Col, 
        Checkbox, Button, FormControl,
        ControlLabel, InputGroup } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import '../index.css';
import squidIcon from '../Images/squidIcon.png';
import passwordIcon from '../Images/passwordIcon.png';

class UpdateInfo extends Component {

    render() {

        this.props.verifyToken();

        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        if(this.props.showUpdatePage) {
        return (
            <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formAccountSettings">
            <h1 style={subTitle}>{this.props.showCreateButton ? 'Create Account' : 'Update Account'}</h1>
            <Form onSubmit={this.props.updateUser} horizontal className="container-fluid">
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        NS_ID
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} >
                        <FormControl type="text" placeholder={this.props.userNsid}
                                    name="userNsid" value={this.props.userNsid}
                                    onChange={e => this.props.getAccountInfo(e)} />  
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        Age
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder={this.props.userAge}
                                    name="userAge" value={this.props.userAge}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="< 20">{'< '}20</option>
                            <option value="21-25">21-25</option>
                            <option value="26-30">26-30</option>
                            <option value="> 31">{"> "}31</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Location
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="Canada"
                                    name="userLocation" value={this.props.userLocation}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                            <option value="Europe">Europe</option>
                            <option value="Japan">Japan</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Rank
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <FormControl componentClass="select" placeholder="C"
                                    name="userRank" value={this.props.userRank}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="C">C</option>
                            <option value="B">B</option>
                            <option value="A">A</option>
                            <option value="S">S</option>
                            <option value="S+">S+</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Mode
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <FormControl componentClass="select" placeholder="Turf War"
                                    name="userMode" value={this.props.userMode}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="Turf War">Turf War</option>
                            <option value="League">League</option>
                            <option value="Salmon Run">Salmon Run</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Weapon
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select"
                                    name="userWeapon" value={this.props.userMain}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="Shooters">Shooters</option>
                            <option value="Rollers">Rollers</option>
                            <option value="Chargers">Chargers</option>
                            <option value="Sloshers">Sloshers</option>
                            <option value="Splatlings">Splatlings</option>
                            <option value="Dualies">Dualies</option>
                            <option value="Brellas">Brellas</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Status
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select"
                                    name="userStatus" value={this.props.userStatus}
                                    onChange={e => this.props.getAccountInfo(e)}>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                            <option value="Appear Offline">Appear Offline</option>
                            <option value="Offline">Offline</option>
                        </FormControl>
                    </Col>
                </FormGroup>
            
                <FormGroup className="center-block">
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Link to="/home">
                      <Button style={signupButton} type="button"
                              onClick={this.props.updateUser}>
                          Update
                      </Button>
                    </Link>
                    </Col>
                </FormGroup>
                <h4 style={subTitle}>{this.props.verifyMessage}</h4>
            </Form>
        </div>
        );
      }
      else {
        return <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formAccountSettings">
                <h1 style={title}>LOADING...</h1>
              </div>
      }
    }

}
//////////
//Styles//
//////////

const loginButton = {
  width: '150px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
}

const signupButton = {
  width: '150px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
}

const splatoonFont = {
    fontFamily: 'paintball',
}

const subTitle = {
    fontFamily: 'paintball',
    textAlign: 'center',
    color: '#948f8f',
}

const title = {
  fontFamily: 'paintball',
  textAlign: 'center',
  marginTop: '10px',
  marginBottom: '10px'
}

export default UpdateInfo;