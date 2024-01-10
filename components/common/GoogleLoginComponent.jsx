import React from "react";
import { GoogleLogin } from "react-google-login";

function GoogleLoginComponent() {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the login response
  };

  return (
    <div>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleLoginComponent;
