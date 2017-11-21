import React, { Component } from 'react';
import { Form, FormGroup, Col, 
        Checkbox, Button, FormControl,
        ControlLabel, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../index.css';
import squidIcon from '../Images/squidIcon.png';
import passwordIcon from '../Images/passwordIcon.png';

class LoginForm extends Component {

    render() {        
        return (
            <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formSettings">
            <h1 className="siteTitle">Squid Match</h1>
            <h3 style={subTitle}>Find active players to play with</h3>
            <Form onSubmit={(e) => {this.props.loginForm(e)}} horizontal className="container-fluid">
                <FormGroup controlId="formHorizontalEmail">
                    <Col xs={12} sm={10} md={10} lg={10} 
                        smOffset={1} mdOffset={1} lgOffset={1}>
                    <InputGroup>
                        <InputGroup.Addon>
                            <img className="iconSettings img-responsive" src={squidIcon} />
                        </InputGroup.Addon>
                        <FormControl value={this.props.username}
                                    type="text" placeholder="Username"
                                    onChange={e => this.props.getUsername(e)} />
                    </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col xs={12} sm={10} md={10} lg={10} 
                        smOffset={1} mdOffset={1} lgOffset={1}>
                    <InputGroup>
                        <InputGroup.Addon>
                            <img className="iconSettings img-responsive" src={passwordIcon} />
                        </InputGroup.Addon>
                        <FormControl value={this.props.userPassword}
                                    type="password" placeholder="Password" 
                                    onChange={e => this.props.getUserPassword(e)} />  
                    </InputGroup>
                    </Col>
                </FormGroup>

                {/* If the person is signing up for the first time */}
                {this.props.showPasswordField &&
                <FormGroup controlId="formHorizontalPassword">
                    <Col xs={12} sm={10} md={10} lg={10} 
                        smOffset={1} mdOffset={1} lgOffset={1}>
                    <InputGroup>
                        <InputGroup.Addon>
                            <img className="iconSettings img-responsive" src={passwordIcon} />
                        </InputGroup.Addon>
                        <FormControl value={this.props.verifiedPassword}
                                    type="password" placeholder="Verify Password" 
                                    onChange={e => this.props.getVerifiedPassword(e)} />  
                    </InputGroup>
                    </Col>
                </FormGroup>
                }

                <FormGroup>
                    <Col xs={8} sm={5} md={4} lg={3} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Checkbox className="headings">Remember me</Checkbox>
                    </Col>
                </FormGroup>
            
                <FormGroup>
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Button style={loginButton} type="submit"
                            onChange={(e) => this.props.loginForm(e)}>
                        Login
                    </Button>
                    </Col>
                </FormGroup>

                {!this.props.showCreateButton &&
                <FormGroup className="center-block">
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Button style={signupButton} type="button"
                            onClick={this.props.verifyPassword}>
                        Sign up
                    </Button>
                    </Col>
                </FormGroup>
                }

                {this.props.showCreateButton &&
                <FormGroup className="center-block">
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                        <Link to="./AccountInfo">
                        <Button style={signupButton} type="button">
                            Create Account
                        </Button>
                        </Link>
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

const subTitle =  {
    fontFamily: 'paintball',
    textAlign: 'center',
    color: '#948f8f',
}

export default LoginForm;

