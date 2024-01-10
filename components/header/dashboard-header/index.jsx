import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import AvatarDropdown from "./UserAvatar";
import { useSelector, useDispatch } from "react-redux";
import { UserSlice } from "../../../features/auth/userslice";
import Router from "next/router";

const HeaderDashBoard = () => {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.User.user);
  const { initiateUser } = UserSlice.actions
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("-is-sidebar-open");
    } else {
      body.classList.remove("-is-sidebar-open");
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (user._id) {
  //     localStorage.removeItem("jwt")
  //     Router.push('/');
  //   }
  // }, [])

  const handleLogout = async () => {
    localStorage.removeItem("jwt");
    dispatch(initiateUser({ user: {} }))
    Router.push('/');
  };

  const headerStyle = {
    backgroundColor: "#013186",
  };

  return (
    <>
      <header
        className={`header -dashboard ${navbar ? "is-sticky" : ""}`}
        style={headerStyle}
      >
        <div className="header__container px-30 sm:px-20">
          <div className="-left-side">
            <Link href="/" className="header-logo">
              <img
                src="/img/general/CityJabber.png"
                style={{ width: "200px", height: "auto" }}
                alt="logo icon"
              />
            </Link>
            {/* End logo */}
          </div>
          {/* End _left-side */}

          <div className="row justify-between items-center pl-60 lg:pl-20 text-white">
            <div className="col-auto">
              <div className="d-flex items-center">
                <button className="d-flex" onClick={handleToggle}>
                  <i className="icon-menu-2 text-white"></i>
                </button>

                <div className="single-field relative d-flex items-center md:d-none ml-30">
                  <input
                    className="pl-50 border-light text-white h-50 rounded-8"
                    type="email"
                    placeholder="Search"
                  />
                  <button className="absolute d-flex items-center h-full">
                    <i className="icon-search text-20 px-15 text-white"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* End .col-auto */}

            <div className="col-auto text-white">
              <div className="d-flex items-center">
                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu />
                  </div>
                </div>
                {/* End header-menu */}

                <AvatarDropdown
                  username={user?.finalData?.user?.username}
                  avatarUrl={user.avatar? user.avatar: "/img/avatars/user_people_icon.svg"}
                  handleLogout={handleLogout}
                />

                <div className="d-none xl:d-flex x-gap-20 items-center pl-20">
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    ></button>
                  </div>

                  {/* <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet "
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                  </div> */}
                </div>
              </div>
              {/* End -flex items-center */}
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      {/* End header */}
    </>
  );
};

export default HeaderDashBoard;
