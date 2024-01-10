import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import MainMenu from "../MainMenu";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import LoginForm from "../../../components/common/LoginForm";
import LoginWithSocial from "../../../components/common/LoginWithSocial";
import SignUpForm from "../../common/SignUpForm";
import SignupDetail from "../../../components/common/SignupDetail";
import Router from "next/router";
import Image from "next/image";
import AvatarDropdown from "./UserAvatar";
import { UserSlice } from "../../../features/auth/userslice";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const [signinshow, setSigninShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [signupDetailShow, setsignupDetailShow] = useState(false);
  const [byEmail, setByEmail] = useState(false);
  const { initiateUser } = UserSlice.actions
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User.user);
  let token = "";

  // import("local-storage").then((localStorage) => {
  //   token = localStorage.getItem("jwt");
  // });

  token = localStorage.getItem("jwt");

  const handleClose = () => {
    setSignupShow(false);
    setSigninShow(false);
    setsignupDetailShow(false);
    setByEmail(false);
  };
  const handleSigninShow = () => {
    setSigninShow(true);
    setSignupShow(false);
    setsignupDetailShow(false);
  };

  const handleSignupShow = () => {
    setSignupShow(true);
    setSigninShow(false);
  };

  const handleSignupDetailShow = () => {
    setSignupShow(false);
    setsignupDetailShow(true);
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("jwt");
    dispatch(initiateUser({user: {}}))
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  const headerStyle = {
    backgroundColor: "#013186",
  };

  return (
    <>
      {" "}
      <header
        className={`header  ${navbar ? " is-sticky" : ""}`}
        style={headerStyle}
      >
        <div className="header__container container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img
                    src="/img/general/CityJabber.png"
                    style={{ width: "200px", height: "auto" }}
                    alt="logo icon"
                  />
                </Link>
                {/* End logo */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" />
                  </div>
                </div>
                {/* End header-menu */}

                {user._id ? (
                  <AvatarDropdown
                    username={user?.finalData?.user?.username}
                    avatarUrl={user.avatar? user.avatar: "/img/avatars/user_people_icon.svg"}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <div
                    onClick={handleSigninShow}
                    className="button px-30 fw-400 text-14 font-weight-bold  h-50 text-white ml-20"
                    style={{ backgroundColor: "#F77100" }}
                    role="button"
                  >
                    Sign in
                  </div>
                )}

                {/* Login Modal */}
                <Modal
                  show={signinshow}
                  onHide={handleClose}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Modal.Header
                    closeButton
                    style={{ borderBottom: "none" }}
                  ></Modal.Header>
                  <Modal.Body>
                    <div>
                      {/* <img
                        src="/img/general/CityJabber.png"
                        style={{ width: "200px", height: "auto" }}
                        alt="logo icon"
                      /> */}
                    </div>

                    {!byEmail && (
                      <div className="row y-gap-20 mb-18 pt-16 pb-16">
                        <h1 className="text-24 fw-800  pl-30 pr-60 mb-30">
                          Sign in to access the finest of CityJabber
                        </h1>
                        <LoginWithSocial />
                        <div className="col-12">
                          <div className="text-center">or sign in with</div>
                        </div>
                      </div>
                    )}
                    <div className="mt-10">
                      <LoginForm
                        byEmail={byEmail}
                        setByEmail={setByEmail}
                        handleClose={handleClose}
                      />
                    </div>

                    <div className="col-12 text-center mt-10">
                      <p className="mt-6">
                        <span
                          className="text-blue-1 "
                          style={{ cursor: "pointer" }}
                          onClick={handleSignupShow}
                        >
                          Join{" "}
                        </span>
                        {/* Don&apos;t have an account yet?{" "} */}
                        to unlock the best of the CityJabber
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer style={{ borderTop: "none" }}>
                    <div className="col-12">
                      <div className="text-center px-10">
                        <p className="text-14">
                          By creating an account, you agree to our Terms of
                          Service and Privacy Statement.
                        </p>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* Signup Modal */}
                <Modal
                  show={signupShow}
                  onHide={handleClose}
                  className="d-flex align-items-center justify-content-center "
                >
                  <Modal.Header closeButton style={{ borderBottom: "none" }}>
                    <Modal.Title></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h1 className="text-24 fw-800  pl-30 pr-60 mb-30">
                      Join to unlock the best of the CityJabber
                    </h1>
                    <SignUpForm
                      handleShow={handleSigninShow}
                      handleDetailShow={handleSignupDetailShow}
                    />
                  </Modal.Body>
                  <Modal.Footer style={{ borderTop: "none" }}>
                    <div className="col-12">
                      <div className="text-center px-10">
                        <p className="text-14">
                          By creating an account, you agree to our Terms of
                          Service and Privacy Statement.
                        </p>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* Signup Detail Modal */}
                <Modal
                  show={signupDetailShow}
                  onHide={handleClose}
                  className="d-flex align-items-center justify-content-center pr-5 pl-5"
                >
                  <Modal.Body>
                    <SignupDetail
                      handleSignin={handleSigninShow}
                      handleClose={handleClose}
                    ></SignupDetail>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      {/* End Header */}
    </>
  );
};

export default Header1;
