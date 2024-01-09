import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import Icon from "react-multi-date-picker/components/icon";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import enUS from "date-fns/locale/en-US";
registerLocale("en-US", enUS);
import { update_me } from "../../../../services/auth";
import { UserSlice } from "../../../../features/auth/userslice";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfo = () => {

  const user = useSelector((state) => state.User.user);
  const { initiateUser } = UserSlice.actions
  const dispatch = useDispatch()

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const aboutmeRef = useRef(null);
  const maleInputRef = useRef(null);
  const femaleInputRef = useRef(null);
  const facebookRef = useRef(null);
  const twitterRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlesSubmit = async (e) => {
    e.preventDefault()
    const username = usernameRef.current.value
    const email = emailRef.current.value
    const role = roleRef.current.value
    const firstname = firstnameRef.current.value
    const lastname = lastnameRef.current.value
    const phonenumber = phoneRef.current.value
    const location = locationRef.current.value
    const aboutMe = aboutmeRef.current.value
    const facebook = facebookRef.current.value
    const twitter = twitterRef.current.value

    const selectedGender = maleInputRef.current.checked ? maleInputRef.current.value : femaleInputRef.current.value
    const selectedBirthdate = selectedDate.toLocaleString("default", { year: "numeric" });

    console.log(username, email, role, firstname, lastname, phonenumber, location, aboutMe, facebook, twitter, selectedGender, selectedBirthdate)

    // Example: You can send this data to your backend for user registration
    const body = new FormData();
    body.append("file", newAvatar);
    body.append("id", user._id);
    body.append("username", username);
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("phonenumber", phonenumber);
    body.append("location", location);
    body.append("aboutMe", aboutMe);
    body.append("facebook", facebook);
    body.append("twitter", twitter);
    body.append("gender", selectedGender);
    body.append("birthday", selectedBirthdate);

    console.log("form", body)

    const res = await update_me(body);

    if (res.success) {
      console.log(res)
      dispatch(initiateUser({user: res.user}))
      toast.success(res.message);
      console.log("llllllog", res.user)
    } else {
      toast.error(res.message);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAvatar(file);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const { username, email, role, firstname, lastname, phonenumber, location, aboutMe, facebook, twitter, gender, birthday } = user
    usernameRef.current.value = username
    emailRef.current.value = email
    roleRef.current.value = role
    firstnameRef.current.value = firstname
    lastnameRef.current.value = lastname
    phoneRef.current.value = phonenumber
    locationRef.current.value = location
    aboutmeRef.current.value = aboutMe
    facebookRef.current.value = facebook
    twitterRef.current.value = twitter

    gender === "male" ? maleInputRef.current.checked = true : femaleInputRef.current.checked = true
    setSelectedDate(new Date(birthday))
    setAvatar(user.avatar)
  }, [])

  return (
    <>
      <form>
        <div className="row y-gap-30 items-center">
          <div className="col-auto">
            {avatar || newAvatar ? (
              <div className="d-flex ratio ratio-1:1 w-200">
                <Image
                  width={200}
                  height={200}
                  src={newAvatar? URL.createObjectURL(newAvatar): avatar}
                  // src="/uploads/6581896618f6bbf20dd734c0.png"
                  alt="avatar"
                  className="img-ratio rounded-4"
                />
                <div className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute">
                  <div
                    className="size-40 bg-white rounded-4 flex-center cursor-pointer"
                    onClick={() => setAvatar(null)}
                  >
                    <i className="icon-trash text-16" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex ratio ratio-1:1 w-200">
                <Image
                  width={200}
                  height={200}
                  src="/img/avatars/user_people_icon.svg"
                  alt="image"
                  className="img-ratio rounded-4"
                />
                <div className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute">
                  <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                    <i className="icon-trash text-16" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-auto">
            <h4 className="text-16 fw-500">Your avatar</h4>
            <div className="text-14 mt-5">
              PNG or JPG no bigger than 800px wide and tall.
            </div>
            <div className="d-inline-block mt-15">
              <label
                htmlFor="avatar-upload"
                role="button"
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
              >
                <i className="icon-upload-file text-20 mr-10" />
                Browse
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/png, image/jpeg"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
            {/* {error && !success && <div className="text-red-1 mt-1">{error}</div>} */}
          </div>
        </div>

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
                <input ref={roleRef} value={"User"} name="role" type="text" readOnly />
                <label className="lh-1 text-16 text-light-1">Role</label>
              </div>
            </div>
            {/* End col-12 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={firstnameRef} name="firstname" type="text" required />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={lastnameRef} name="lastname" type="text" required />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={phoneRef} name="phone_number" type="text" />
                <label className="lh-1 text-16 text-light-1">
                  Phone Number
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={locationRef} name="location" type="text" />
                <label className="lh-1 text-16 text-light-1">
                  Location
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6 pl-20">
              <label htmlFor="birthdate" className="form-label">
                BirthDay
              </label>
              <div className="border border-2 border-dark mr-10">
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  value={selectedDate}
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
                      ref={maleInputRef}
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
                      ref={femaleInputRef}
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
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={facebookRef} name="facebook" type="text" />
                <label className="lh-1 text-16 text-light-1">facebook</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input ref={twitterRef} name="twitter" type="text" />
                <label className="lh-1 text-16 text-light-1">
                  Twitter
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <textarea ref={aboutmeRef} name="about_me" required rows={5} defaultValue={""} />
                <label className="lh-1 text-16 text-light-1">
                  About Yourself
                </label>
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
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form >
    </>
  );
};

export default PersonalInfo;
