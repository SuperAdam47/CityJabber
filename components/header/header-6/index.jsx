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

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const [signinshow, setSigninShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [signupDetailShow, setsignupDetailShow] = useState(false);
  const [byEmail, setByEmail] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User.user);
  console.log(user);

  const token = localStorage.getItem("jwt");
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
    Router.reload();
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      {" "}
      <header
        className={`header  ${navbar ? "bg-dark-1 is-sticky" : "bg-dark-1"}`}
      >
        <div className="header__container container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/logo-light.svg" alt="logo icon" />
                  <img src="/img/general/logo-dark.svg" alt="logo icon" />
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

                {token ? (
                  <AvatarDropdown
                    username={user?.finalData?.user?.username}
                    avatarUrl={"/img/avatars/1.png"}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <div
                    onClick={handleSigninShow}
                    className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                    role="button"
                  >
                    Sign In / Register
                  </div>
                )}
                {/* Login Modal */}
                <Modal
                  show={signinshow}
                  onHide={handleClose}
                  className="d-flex align-items-center justify-content-center "
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h1 className="text-22 fw-500">Welcome back</h1>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoginForm
                      byEmail={byEmail}
                      setByEmail={setByEmail}
                      handleClose={handleClose}
                    />
                    {/* End .Login */}
                    {!byEmail && (
                      <div className="row y-gap-20 pt-30">
                        <div className="col-12">
                          <div className="text-center">or sign in with</div>
                        </div>
                        <LoginWithSocial />
                      </div>
                    )}
                    <div className="col-12 text-center">
                      <p className="mt-10">
                        Don&apos;t have an account yet?{" "}
                        <span
                          className="text-blue-1 "
                          style={{ cursor: "pointer" }}
                          onClick={handleSignupShow}
                        >
                          Sign up for free
                        </span>
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="col-12">
                      <div className="text-center px-10">
                        By creating an account, you agree to our Terms of
                        Service and Privacy Statement.
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
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h1 className="text-22 fw-500">Welcome to Signup</h1>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SignUpForm
                      handleShow={handleSigninShow}
                      handleDetailShow={handleSignupDetailShow}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="col-12">
                      <div className="text-center px-10">
                        By creating an account, you agree to our Terms of
                        Service and Privacy Statement.
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
                    ></SignupDetail>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
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
