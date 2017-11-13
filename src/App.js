import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';
import LoginForm from './Components/LoginForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <LoginForm />
    );
  }
}

export default App;
