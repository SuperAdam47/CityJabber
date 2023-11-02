import React, { useState } from "react";
import Icon from "react-multi-date-picker/components/icon";
import { useRef } from "react";
import DatePicker from "react-datepicker";
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
    const selectedBirthdate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    // Example: You can send this data to your backend for user registration
    const formData = {
      avatar: avatarInputRef.current.files[0],
      gender: selectedGender,
      birthday: selectedBirthdate,
    };

    const res = await update_me(formData);

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
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ padding: "15px" }}>
      <div className="col-12">
        <h1 className="text-19 fw-500 pt-24 text-center">
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
              src={avatar}
              alt="Avatar Preview"
              className="border border-2 rounded-2 p-2"
              style={{ maxWidth: "150px" }}
            />
          ) : (
            <img
              src="/img/avatars/user_people_icon.svg"
              alt="Default Icon"
              className="border border-3  rounded-2 p-2"
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          )}
        </div>

        {/*Upload From Facebook */}
        <div className="col-8">
          <div className="col-md-12 col-12">
            <button className="button col-12 -outline-blue-1 text-white-1 py-15 rounded-8 ">
              <i className="icon-facebook text-18 mr-10" />
              Upload Facebook Photo
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
        <div className="col-md-12 col-12">
          <label htmlFor="birthdate" className="form-label">
            Date of Birth:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            locale="en-US"
            className="form-control"
            id="birthdate"
          />
        </div>
        <div className="col-md-12 col-12 ">
          <div className="col-md-4 col-4 ">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
          </div>
          <div className="col-md-8 col-8">
            <select className="form-select " id="gender" ref={genderInputRef}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-8">
          <div className="col-md-12 col-12">
            <button className="btn col-12 btn-danger">Save & Continue </button>
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
      </form>
    </div>
  );
};

export default SignupDetail;
