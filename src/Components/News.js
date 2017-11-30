import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

let displayNews;

class News extends Component {
  
  componentDidMount() {
    axios.get('/get-tweets')
    .then(result => {
      displayNews = result.data.dataChunk.map((value, i) => {
        return (
          <div>
            <h2 style={dateStyle}>{value.created_at}</h2>
            <h3 style={paraFont}>{value.text}</h3>
            <h1 style={divider}></h1>
          </div>
        );
      })
    })
    .catch(error => {
      displayNews = <h3>There was an error getting your news. Try again later.</h3>
      console.log(error);
    })
  }
  
  render() {

    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
      //this.props.userLogout();
      return <Redirect to="/" />
    }

    return (
      <div className="divBorder col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 formAccountSettings">
        <h1 style={title}>Latest News From @SplatoonSwitch</h1>
        <h1 style={divider}></h1>
        <div>
          {displayNews}
        </div>
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
  marginTop: '1%',
  marginBottom: '1%'
}

const dateStyle = {
  fontFamily: 'paintball',
  marginBottom: '0px',
  color: '#948f8f',
}

const paraFont ={
  fontFamily: 'overpass',
  fontSize: '125%',
}

const divider = {
  display: 'block',
  marginTop: '0.5em',
  marginBottom: '0.5em',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderStyle: 'inset',
  borderWidth: '1px',
}

export default News;