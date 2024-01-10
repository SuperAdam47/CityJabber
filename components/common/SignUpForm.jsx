import Link from "next/link";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register_me } from "../../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const SignUpForm = (props) => {
  const router = useRouter();

  ///////////  If token Validate, redirec to dashboard
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  }, [router]);

  ////// Hook ref
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;

    if (password == confirmpassword) {
      let registerData = {
        username: username,
        email: email,
        password: password,
        avatar: "",
        bitrthday: "1999-01-01",
        gender: "",
      };

      const res = await register_me(registerData);

      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          props.handleShow();
          router.push("/");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Password do not match");
    }
  };
  return (
    <div>
      <form
        className="row y-gap-20 pr-10 pl-10"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
        onSubmit={handleSubmit}
      >
        {/* End .col */}

        <div className="col-12 ">
          <div className="form-input pr-10">
            <input type="text" ref={usernameRef} required />
            <label className="lh-1 text-14 text-light-1">User Name</label>
          </div>
        </div>
        <div className="col-12 ">
          <div className="form-input">
            <input type="text" ref={emailRef} required />
            <label className="lh-1 text-14 text-light-1">Email</label>
          </div>
        </div>
        {/* End .col */}

        <div className="col-12 d-flex">
          <div className="col-md-6 pr-10">
            <div className="form-input ">
              <input type="password" ref={passwordRef} required />
              <label className="lh-1 text-14 text-light-1">Password</label>
            </div>
          </div>
          <div className="col-md-6 pl-10">
            <div className="form-input ">
              <input type="password" ref={confirmpasswordRef} required />
              <label className="lh-1 text-14 text-light-1">
                Confirm Password
              </label>
            </div>
          </div>
        </div>

        {/* End .col */}

        <div className="col-12">
          <button
            type="submit"
            href="#"
            className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          >
            Next <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        <div className="col-12 text-center">
          <p className="mt-10">
            Already a member?{"  "}
            <span
              className="text-blue-1 "
              style={{ cursor: "pointer" }}
              onClick={props.handleShow}
            >
              Sign In{" "}
            </span>
            using your CityJabber account.
          </p>
        </div>
        {/* End .col */}
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
