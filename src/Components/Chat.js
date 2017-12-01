import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, Col, FormControl,
          Button, InputGroup } from 'react-bootstrap';


class Chat extends Component {

  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      this.props.userLogout();
      return <Redirect to="/" />
    }

    const messages = this.props.messages.map((value, i)=>{
      return(
          <div key={i}>
              <span style={splatoonFont}>
                {value.sender}
              </span>
              <span style={overpass}>{value.message}</span>
          </div>
      )
    })

    return (
      <div>
        <div className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
          <h1 style={title}>Squid Chat</h1>
          {messages}
          <Form onSubmit={e => this.props.submitChat(e)} horizontal className="container-fluid">
            <FormGroup controlId="inputAndSend">
              <Col xs={12} sm={12} md={12} lg={12} >
                <InputGroup>
                  <FormControl value={this.props.messageText} autoComplete="off"
                              type="text" placeholder="Type your message"
                              onChange={e => this.props.getMessageText(e)} />
                  <InputGroup.Button>
                      <Button type="button" style={sendButton}
                              onClick={e => this.props.submitChat(e)}>Send</Button>
                  </InputGroup.Button>
                </InputGroup>
              </Col>
            </FormGroup>
          </Form>
          <div style={spacing}>
          <Col xs={3} sm={3} md={3} lg={3}
                  xsOffset={3} smOffset={5} mdOffset={5} lgOffset={5}>
              <Link to="/home">
                <Button type="button" style={quitButton}
                        onClick={this.props.exitChat}>See Ya!</Button>
              </Link>
          </Col>
          <Col xs={4} sm={3} md={3} lg={3}
                  xsOffset={2} smOffset={1} mdOffset={1} lgOffset={1}>
            <p style={nsid}>NSID: {this.props.userNsid}</p>
          </Col>
          </div>
        </div>
      </div>
    );
  }
}

//////////
//Styles//
//////////

const splatoonFont = {
  fontFamily: 'paintball',
  fontSize: '125%'
}

const spacing = {
  marginBottom: '6%',
}

const nsid = {
  fontFamily: 'overpass',
  fontSize: '95%',
  color: '#948f8f',
}

const title = {
  fontFamily: 'paintball',
  color: '#948f8f',
  textAlign: 'center',
}

const overpass = {
  fontFamily: 'overpass',
  fontSize: '120%'
}

const sendButton = { 
  fontFamily: 'paintball',
  backgroundColor: '#7aff42',
}

const quitButton = { 
  fontFamily: 'paintball',
  backgroundColor: '#ff43b7',
  justifyContent: 'center'
}

// const paraFont ={
//   fontFamily: 'overpass',
//   fontSize: '120%',
// }

export default Chat;