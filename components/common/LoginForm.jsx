import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../features/auth/userslice";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let loginData = {
      email: email,
      password: password,
    };
    dispatch(login(loginData))
      .then((res) => {
        toast.success(res.message);
        setTimeout(() => {
          props.handleClose();
          Router.push("/");
        }, 1000);
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    import("local-storage").then((localStorage) => {
      const data = localStorage.getItem("user");
      // const data = { user: "123" };
      if (data) {
        Router.push("/");
      }
    });
  }, []);

  return (
    <div>
      {props.byEmail ? (
        <form
          className="row y-gap-20"
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
          onSubmit={handleSubmit}
        >
          {/* End .col */}

          <div className="col-12">
            <div className="form-input ">
              <input type="text" required ref={emailRef} />
              <label className="lh-1 text-14 text-light-1">Email</label>
            </div>
          </div>
          {/* End .col */}

          <div className="col-12">
            <div className="form-input ">
              <input type="password" required ref={passwordRef} />
              <label className="lh-1 text-14 text-light-1">Password</label>
            </div>
          </div>
          {/* End .col */}

          <div className="col-12 text-right">
            <a href="#" className="text-14 fw-500 text-blue-1 underline">
              Forgot your password?
            </a>
          </div>
          {/* End .col */}

          <div className="col-12">
            <button
              type="submit"
              href="#"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={() => {
                props.setByEmail(true);
              }}
            >
              Sign In <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>

          {/* End .col */}
        </form>
      ) : (
        <div
          className="col-md-12 col-12"
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
          <button
            className="button col-12 -outline-blue-1 text-black-1 py-15 rounded-8 "
            onClick={() => {
              props.setByEmail(true);
            }}
          >
            <i className="icon-email text-15 mr-10" />
            Continue with email and password
          </button>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default LoginForm;
