import GoogleLoginComponent from "./GoogleLoginComponent";

import React, { useState } from "react";

const LoginWithSocial = () => {
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    // Handle user data or redirect to dashboard
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    // Handle error
  };

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
  return (
    <>
      <div
        className="col-md-12 col-12"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <button className="button col-12 -outline-blue-1 text-black-1 py-15 rounded-8 ">
          <i className="icon-facebook text-15 mr-10" />
          Continue with Facebook
        </button>
      </div>

      <div
        className="col-md-12 col-12"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <button
          className="button col-12 -outline-red-1 text-black-1 py-15 rounded-8"
          onClick={handleClick}
        >
          <i className="icon-apple text-15 mr-10" />
          Continue with Google
        </button>
        {showComponent && <GoogleLoginComponent />}
      </div>
    </>
  );
};

export default LoginWithSocial;
