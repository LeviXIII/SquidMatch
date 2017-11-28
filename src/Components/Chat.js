import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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