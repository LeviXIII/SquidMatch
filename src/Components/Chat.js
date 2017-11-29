import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Col, FormControl } from 'react-bootstrap';

class Chat extends Component {

  render() {

    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    const messages = this.props.messages.map((value, i)=>{
      return(
          <div key={i}>
              <span style={splatoonFont}>
                {value.sender}
              </span>
              <span style={overpass}> : {value.message}</span>
          </div>
      )
    })

    return (
      <div>
        <div className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
          <h1 style={title}>Squad Chat</h1>
          {messages}
          <Form onSubmit={e => this.props.submitChat(e)} horizontal className="container-fluid">
                <FormGroup controlId="formHorizontalUsername">
                    <Col xs={12} sm={12} md={12} lg={12} >
                        <FormControl value={this.props.messageText} autoComplete="off"
                                    type="text" placeholder="Type your message"
                                    onChange={e => this.props.getMessageText(e)} />
                    </Col>
                </FormGroup>
          </Form>
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

// const subTitle = {
//   fontFamily: 'paintball',
//   color: '#948f8f',
// }

const title = {
  fontFamily: 'paintball',
  color: '#948f8f',
  textAlign: 'center',
}

const overpass = {
  fontFamily: 'overpass',
  fontSize: '120%'
}

// const paraFont ={
//   fontFamily: 'overpass',
//   fontSize: '120%',
// }

export default Chat;