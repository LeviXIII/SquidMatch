import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Col, InputGroup, Button,
        FormControl, Glyphicon } from 'react-bootstrap';
import { ChatFeed, Message } from 'react-chat-ui'


class Chat extends Component {

  render() {

    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <div>
      <div style={autoScroll} className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
      <h1>Chat</h1>
      <h3>Members:</h3>
      <ChatFeed
        messages={this.props.messages} // Boolean: list of message objects
        isTyping={this.props.isTyping} // Boolean: is the recipient typing
        //hasInputField={false} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={
          {
            text: {
              fontSize: 20
            },
            chatbubble: {
              borderRadius: 20,
              padding: 10
            }
          }
        }
      />
    </div>
    <div>
      <FormGroup style={inputPosition} controlId="userInput">
        <Col xs={12} sm={10} md={10} lg={10} 
            smOffset={1} mdOffset={1} lgOffset={1}>
        <InputGroup>
            <FormControl value={this.props.typedMessage}
                        type="text" placeholder="Type message" name="typedMessage"
                        onChange={e => this.props.getTypedMessage(e)} />
            <InputGroup.Button>
                <Button onClick={this.props.sendMessage}>
                  <Glyphicon bsSize="large" glyph="envelope"/>
                </Button>
            </InputGroup.Button>
        </InputGroup>
        </Col>
      </FormGroup>
    </div>
    </div>
    );
  }
}

//////////
//Styles//
//////////

const autoScroll = {
  height: '100%',
  overflow: 'auto'
}

const inputPosition = {
  position: 'absolute',
  bottom: '5px'
}
// const adjustWindow = {
//   marginTop: '10%',
// }

// const notice = {
//   fontFamily: 'paintball',
//   textAlign: 'center',
// }

// const splatoonFont = {
//     fontFamily: 'paintball',
// }

// const subTitle = {
//   fontFamily: 'paintball',
//   color: '#948f8f',
// }

// const listTitle = {
//   fontFamily: 'paintball',
//   fontSize: '150%',
//   color: '#948f8f',
// }

// const title = {
//   fontFamily: 'paintball',
//   textAlign: 'center',
// }

// const paraFont ={
//   fontFamily: 'overpass',
//   fontSize: '120%',
// }

export default Chat;