import React, { useState } from "react";
import Icon from "react-multi-date-picker/components/icon";
import { useRef } from "react";
// import DatePicker from "react-datepicker";

import DatePicker, { DateObject } from "react-multi-date-picker";

import "react-datepicker/dist/react-datepicker.css";
import { update_me } from "../../services/auth";
import { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
registerLocale("en-US", enUS);

const SignupDetail = (props) => {
  const avatarInputRef = useRef(null);
  const genderInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handlesSubmit = async (e) => {
    e.preventDefault();

    const selectedGender = genderInputRef.current.value;
    const selectedBirthdate = selectedDate.toLocaleString("default", { year: "numeric" });

    // Example: You can send this data to your backend for user registration
    const body = new FormData();
    body.append("file", avatar);
    body.append("gender", selectedGender);
    body.append("birthday", selectedBirthdate);

    console.log("form", body)

    const res = await update_me(body);

    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error(res.message);
    }
    props.handleSignin();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="py-40 px-30">
      <div className="col-12">
        <h1 className="text-30 fw-500 pt-16 text-center">
          Welcome to CityJabber!
        </h1>
        <div className=" text-16 pt-15 ">
          Let others see who you are by completing the following:
        </div>
      </div>
      <form className="row y-gap-20 pt-20" onSubmit={handlesSubmit}>
        {/* Avatar display */}
        <div className="col-4 ">
          {avatar ? (
            <img
              src={avatar && URL.createObjectURL(avatar)}
              alt="Avatar Preview"
              className="border border-5 rounded-circle p-1"
              style={{ maxWidth: "140px" }}
            />
          ) : (
            <img
              src="/img/avatars/user_people_icon.svg"
              alt="Default Icon"
              className="border border-5   rounded-circle p-1"
              style={{ maxWidth: "140px" }}
            />
          )}
        </div>

        {/*Upload From Facebook */}
        <div className="col-8 pl-30">
          <div className="col-md-12 col-12">
            <button className="button col-12 -outline-blue-1 text-white-1 py-15 rounded-8 ">
              <i className="icon-facebook text-18 mr-10" />
              Use Facebook Photo
            </button>
          </div>
          <div className="col-md-12 col-12">
            <div className="row align-items-center">
              <div className="col">
                <hr />
              </div>
              <div className="col-auto">OR</div>
              <div className="col">
                <hr />
              </div>
            </div>
          </div>

          {/* Upload by local */}
          <div className="col-md-12 col-12 pt-5">
            <label className="button -outline-red-1 py-15 rounded-8 ">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                ref={avatarInputRef}
              />
            </label>
          </div>
        </div>
        <div className="col-md-12 col-12 d-flex mt-20">
          <div className="col-md-6">
            <label htmlFor="birthdate" className="form-label">
              BirthDay
            </label>
            <div className="border border-2 border-dark mr-10">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                // value={dates}
                dateFormat="MM/dd/yyyy"
                locale="en-US"
                className="form-control"
                id="birthdate"
                style={{ width: "max", height: "max" }}
              />
            </div>
          </div>
          <div className="col-md-6 pl-20">
            <div className="col-md-4 col-4 ">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
            </div>
            <div className="col-md-8 col-8 pl-10">
              <div className="form-radio d-flex flex-column align-items-start">
                <div className="radio d-flex items-center ">
                  <input
                    type="radio"
                    name="rating"
                    value="male"
                    ref={genderInputRef}
                  />
                  <div className="radio__mark">
                    <div className="radio__icon" />
                  </div>
                  <div className="ml-10">
                    {" "}
                    <p>male</p>
                  </div>
                </div>
                <div className="radio d-flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="female"
                    ref={genderInputRef}
                  />
                  <div className="radio__mark">
                    <div className="radio__icon" />
                  </div>
                  <div className="ml-10">
                    {" "}
                    <p className="">female</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex mt-30">
          <div className="col-8 pr-30">
            <div className="col-md-12 col-12">
              <button className="btn col-12 btn-danger">
                Save & Continue{" "}
              </button>
            </div>
          </div>
          <div className="col-4">
            <button
              className="btn col-12 btn-primary"
              onClick={props.handleSignin}
            >
              {" "}
              Skip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupDetail;
