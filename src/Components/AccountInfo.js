import React, { Component } from 'react';
import { Form, FormGroup, Col, 
        Checkbox, Button, FormControl,
        ControlLabel, InputGroup} from 'react-bootstrap';
import '../index.css';
import squidIcon from '../Images/squidIcon.png';
import passwordIcon from '../Images/passwordIcon.png';

class AccountInfo extends Component {

    render() {
        return (
            <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formAccountSettings">
            <h1 style={subTitle}>{this.props.showCreateButton ? 'Create Account' : 'Update Account'}</h1>
            <Form onSubmit={(e) => {this.props.updateAccount(e)}} horizontal className="container-fluid">
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} xs={2}>
                        Email
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} >
                        <FormControl value={this.props.userEmail}
                                    type="email" placeholder="Email"
                                    onChange={e => this.props.getUserEmail(e)} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        NS_ID
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} >
                        <FormControl value={this.props.userNSID}
                                    type="text" placeholder="NSID" 
                                    onChange={e => this.props.getUserPassword(e)} />  
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        Age
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select">
                            <option value='select1'>{'< '}20</option>
                            <option value="select1">21-25</option>
                            <option value="select1">26-30</option>
                            <option value="select1">{"> "}31</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Location
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select2">Canada</option>
                            <option value="select2">USA</option>
                            <option value="select2">Europe</option>
                            <option value="select2">Japan</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Skill
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select3">Beginner</option>
                            <option value="select3">Intermediate</option>
                            <option value="select3">Advanced</option>
                            <option value="select3">Expert</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Playstyle
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select4">Casual</option>
                            <option value="select4">Competitive</option>
                            <option value="select4">Playful</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Main
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select5">Shooters</option>
                            <option value="select5">Rollers</option>
                            <option value="select5">Chargers</option>
                            <option value="select5">Sloshers</option>
                            <option value="select5">Splatlings</option>
                            <option value="select5">Dualies</option>
                            <option value="select5">Brellas</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Status
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select6">Available</option>
                            <option value="select6">Unavailable</option>
                            <option value="select6">Appear Offline</option>
                            <option value="select6">Offline</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} xs={3} sm={2}>
                        Avatar
                    </Col>
                    <Col xs={9} sm={10} md={10} lg={10} >
                        <FormControl value={this.props.userNSID}
                                    type="text" placeholder="Image link" 
                                    onChange={e => this.props.getUserPassword(e)} />  
                    </Col>
                </FormGroup>
            
                {this.props.showCreateButton ?
                <FormGroup>
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Button style={loginButton} type="button"
                            onChange={(e) => this.props.submitForm(e)}>
                        Create
                    </Button>
                    </Col>
                </FormGroup>
                :
                <FormGroup className="center-block">
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Button style={signupButton} type="button"
                            onClick={this.props.verifyPassword}>
                        Update
                    </Button>
                    </Col>
                </FormGroup>
                }
            </Form>
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

const signupButton = {
    width: '150px',
    backgroundColor: '#ff43b7',
    fontFamily: 'paintball',
}

const loginButton = {
    width: '150px',
    backgroundColor: '#7aff42',
    fontFamily: 'paintball',
}

const subTitle = {
    fontFamily: 'paintball',
    textAlign: 'center',
    color: '#1048f8f',
}

export default AccountInfo;