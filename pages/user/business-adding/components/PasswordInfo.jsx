import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserSlice } from "../../../../features/auth/userslice";
import { change_password } from "../../../../services/auth";
import { ToastContainer, toast } from "react-toastify";

const PasswordInfo = () => {
  const user = useSelector((state) => state.User?.user);
  const currentPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handlesSubmit = async (e) => {
    e.preventDefault();

    const currentPass = currentPassRef.current.value;
    const newPass = newPassRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if(newPass === confirmPass) {
      let formData = {
        id: user._id,
        currentPass,
        newPass
      };
      
      const res = await change_password(formData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Password do not match");
    }
  }

  return (
    <form className="col-xl-9">
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="form-input ">
            <input type="text" ref={currentPassRef} required />
            <label className="lh-1 text-16 text-light-1">
              Current Password
            </label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input type="text" ref={newPassRef} required />
            <label className="lh-1 text-16 text-light-1">New Password</label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input type="text" ref={confirmPassRef} required />
            <label className="lh-1 text-16 text-light-1">
              New Password Again
            </label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="row x-gap-10 y-gap-10">
            <div className="col-auto">
              <button
                type="submit"
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                onClick={handlesSubmit}
              >
                Save Changes <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
            <div className="col-auto">
              <button className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
        {/* End col-12 */}
      </div>
    </form>
  );
};

export default PasswordInfo;
