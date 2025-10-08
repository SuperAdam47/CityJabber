import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID"
      autoLoad={false}
      fields="name,email,picture"
      callback={onSuccess}
      onFailure={onFailure}
    />
  );
};

export default FacebookLoginButton;
