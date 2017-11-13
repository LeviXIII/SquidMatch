import React, { Component } from 'react';
import { Form, FormGroup, Col, 
        Checkbox, Button, FormControl,
        ControlLabel, 
        InputGroup} from 'react-bootstrap';
import '../index.css';
import squidIcon from '../Images/squidIcon.png';
import passwordIcon from '../Images/passwordIcon.png';

class LoginForm extends Component {

    render() {
        return (
            <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formSettings">
            <h1 className="siteTitle">Squid Match</h1>
            <h3 className="subTitle">Find active players to play with</h3>
            <Form horizontal className="container-fluid">
                <FormGroup controlId="formHorizontalEmail">
                    <Col xs={12} sm={10} md={10} lg={10} 
                        smOffset={1} mdOffset={1} lgOffset={1}>
                    <InputGroup>
                        <InputGroup.Addon>
                            <img className="iconSettings img-responsive" src={squidIcon} />
                        </InputGroup.Addon>
                        <FormControl type="email" placeholder="Email" />
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
                        <FormControl type="password" placeholder="Password" />  
                    </InputGroup>
                    </Col>
                </FormGroup>
      
                <FormGroup>
                    <Col xs={8} sm={5} md={4} lg={4} 
                        xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                    <Checkbox className="headings">Remember me</Checkbox>
                    </Col>
                </FormGroup>
            
                <FormGroup>
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={3} smOffset={4} mdOffset={4} lgOffset={5}>
                    <Button className="loginButton splatoonFont" type="submit">
                        Login
                    </Button>
                    </Col>
                </FormGroup>

                <FormGroup className="center-block">
                    <Col xs={8} sm={4} md={4} lg={4} 
                        xsOffset={3} smOffset={4} mdOffset={4} lgOffset={5}>
                    <Button className="signupButton splatoonFont" type="submit">
                        Sign up
                    </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
        );
    }

}

export default LoginForm;

