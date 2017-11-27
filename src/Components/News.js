import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class News extends Component {
  
  componentDidMount() {
    // axios.get('/get-tweets')
    // .then(result => {
    //   console.log(result);
    // })
  }
  
  render() {

    this.props.verifyToken();

    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <div className="divBorder col-xs-10 col-sm-4 col-md-4 col-xs-offset-1 col-sm-offset-4 col-md-offset-4 formAccountSettings">
        <h1 style={title}>News</h1>
      </div>
    );
  }
}

//////////
//Styles//
//////////

const title = {
  fontFamily: 'paintball',
  textAlign: 'center',
  marginTop: '0px',
  marginBottom: '0px'
}

export default News;