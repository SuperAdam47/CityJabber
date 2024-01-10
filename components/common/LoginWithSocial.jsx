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
        <button className="flex-row  align-items-center  button col-12 -outline-blue-1 text-black-1 py-15 rounded-8 ">
          <div className="col-md-1">
            <i className="icon-facebook text-15 ml-10 float-left" />
          </div>
          <div className="col-md-11">Continue with Facebook</div>
        </button>
      </div>

      <div
        className="col-md-12 col-12"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <button
          className="flex-row  align-items-center button col-12 -outline-blue-1 text-black-1 py-15 rounded-8"
          onClick={handleClick}
        >
          <div className="col-md-1">
            <i className="icon-apple text-15 ml-10 float-left" />
          </div>
          <div className="col-md-11">Continue with Google</div>
        </button>
        {showComponent && <GoogleLoginComponent />}
      </div>
    </>
  );
};

export default LoginWithSocial;
