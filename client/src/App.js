import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'; // Import the Login component
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios';
import AgentScreen from './components/AgentScreen';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track if the user is logged in

  const responseFacebook = (response) => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/checkuser', // Use the correct endpoint
      params: { facebookId: response.userId },
    })
      .then((response) => {
        if (response.data.userExists) {
          setLoggedIn(true); // User is registered
        } else {
          console.log('User is not registered.');
          // Handle this case as needed (e.g., show an error message)
        }
      })
      .catch((error) => {
        console.error('Error checking user:', error);
      });
  }

  return (
    <div className="col-md-6 offset-md-3 text-center">
      <h1>Login with Facebook</h1>
      <FacebookLogin
        appId="327089429768358"
        autoLoad={false}
        callback={responseFacebook}
      />
      {loggedIn ? (
        <div className="App">
          <AgentScreen />
        </div>
      ) : null}
    </div>
  );
}

export default App;
