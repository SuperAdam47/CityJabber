import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Icon from "react-multi-date-picker/components/icon";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { update_me } from "../../../../services/auth";
import { UserSlice } from "../../../../features/auth/userslice";

const BusinessClaim = () => {
  const user = useSelector((state) => state.User.user);
  const { initiateUser } = UserSlice.actions;
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const amountRef = useRef(null);

  const handlesSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    const amount = amountRef.current.value;

    console.log(username, email, role);

    // Example: You can send this data to your backend for user registration
    const body = new FormData();
    body.append("id", user._id);
    body.append("username", username);
    body.append("username", amount);

    console.log("form", body);

    // // const res = await update_me(body);

    // if (res.success) {
    //   console.log(res);
    //   dispatch(initiateUser({ user: res.user }));
    //   toast.success(res.message);
    //   console.log("llllllog", res.user);
    // } else {
    //   toast.error(res.message);
    // }
  };

  useEffect(() => {
    const { username, email, role } = user;
    usernameRef.current.value = username;
    emailRef.current.value = email;
    roleRef.current.value = role;
  }, []);

  return (
    <>
      <form>
        <div className="border-top-light mt-30 mb-30" />

        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-md-6">
              <div className="form-input ">
                <input ref={usernameRef} name="username" type="text" required />
                <label className="lh-1 text-16 text-light-1">User Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={emailRef} name="email" type="text" required />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <input
                  ref={roleRef}
                  value={"User"}
                  name="role"
                  type="text"
                  readOnly
                />
                <label className="lh-1 text-16 text-light-1">Role</label>
              </div>
            </div>
          </div>
        </div>
        {/* End col-12 */}

        {/* End col-xl-9 */}
        <ToastContainer />
        <div className="d-inline-block pt-30">
          <button
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={handlesSubmit}
          >
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form>
    </>
  );
};

export default BusinessClaim;
