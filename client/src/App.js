import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'; // Import the Login component
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios';
import AgentScreen from './components/AgentScreen';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  const responseFacebook = (response) =>{
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:3000/api/facebooklogin",
      data: {accessToken:response.accessToken, userId: response.userId}
    }).then(response => {
      console.log("facebook login success,client side", response);
    })
  }

  return (
    <div className="col-md-6 offset-md-3 text-center">
      <h1>Login with Facebook</h1>
      <FacebookLogin
        appId="327089429768358"
        autoLoad={false}
        callback={responseFacebook}
      />
      <div className="App">
        <AgentScreen />
      </div>
    </div>
    
  );
}

export default App;
