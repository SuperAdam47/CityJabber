import React, { useEffect, useState } from "react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { claimcity } from "../../../../services/payment";
import { UserSlice } from "../../../../features/auth/userslice";

const CityClaim = () => {
  const user = useSelector((state) => state.User.user);
  const { initiateUser } = UserSlice.actions;
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const amountRef = useRef(null);
  const cityRef = useRef(null);

  let roleRef = "";

  const handlesSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const amount = amountRef.current.value;
    const city = cityRef.current.value;

    const role = roleRef;

    let formData = {
      id: user._id,
      username,
      email,
      amount,
      city,
    };

    const res = await claimcity(formData);

    // if (res.success) {
    //   console.log(res);
    //   dispatch(initiateUser({ user: res.user }));
    //   toast.success(res.message);
    // } else {
    //   toast.error(res.message);
    // }
  };

  useEffect(() => {
    const { username, email, role } = user;
    usernameRef.current.value = username || "";
    emailRef.current.value = email || "";
    roleRef = role || "";
  }, []);

  return (
    <>
      <form>
        <div className="row y-gap-30 items-center">
          <div className="col-auto">
            <h4 className="text-16 fw-500">Please select city to claim.</h4>
            <div className="text-14 mt-5">
              You can select the city within 50 miles from your city
            </div>
          </div>
        </div>

        <div className="border-top-light mt-30 mb-30" />

        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-md-6">
              <div className="form-input ">
                <input
                  ref={usernameRef}
                  name="username"
                  type="text"
                  required
                  readOnly
                />
                <label className="lh-1 text-16 text-light-1">User Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input
                  ref={emailRef}
                  name="email"
                  type="text"
                  required
                  readOnly
                />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={cityRef} name="city" type="text" />
                <label className="lh-1 text-16 text-light-1">City</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={amountRef} name="amount" type="text" />
                <label className="lh-1 text-16 text-light-1">Amount($)</label>
              </div>
            </div>
          </div>
        </div>
        {/* End col-xl-9 */}
        <ToastContainer />
        <div className="d-inline-block pt-30">
          <button
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={handlesSubmit}
          >
            Claim City <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form>
    </>
  );
};

export default CityClaim;
