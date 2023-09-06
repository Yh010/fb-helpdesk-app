/*import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle login errors

  const handleLogin = async (e) => {
    e.preventDefault();

    // Replace with your actual authentication logic
    try {
      // Simulate an API call for authentication (you can use Axios, fetch, etc.)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful, redirect to the dashboard or another page
        window.location.href = '/dashboard';
      } else {
        // Authentication failed, handle the error
        setError('Invalid credentials. Please try again.'); // Update the error state
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again later.'); // Update the error state
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
*/
/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLoginButton from '../buttons/loginButton';

const LoginPage = () => {
  const history = useNavigate();

  const handleFacebookLogin = (accessToken) => {
    // Send the Facebook access token to your backend for authentication
    // Implement this part in the next steps
    history.push('/dashboard');
  };

  return (
    <div>
      <h2>Login with Facebook</h2>
      <FacebookLoginButton onLogin={handleFacebookLogin} />
    </div>
  );
};

export default LoginPage;
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const handleLoginButtonClick = () => {
    // Navigate to the '/login' route when the button is clicked
    navigate('/login');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLoginButtonClick}>Login</button>
      {/* Add your Facebook login button or other content here */}
    </div>
  );
};

export default LoginPage;
