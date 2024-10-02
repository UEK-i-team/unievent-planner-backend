import React from 'react';
import firebase from '../config/firebaseConfig';

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const token = await result.user.getIdToken();

      console.log('Token:', token);

      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.text();
      console.log('Protected data:', data);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return <button onClick={handleLogin}>Zaloguj się przez Google</button>;
};

export default LoginButton;
