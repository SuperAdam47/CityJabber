import { useEffect, useRef, useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "./ActionsButton";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../../../../services/admin/user";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Dropdown from "./Dropdown";
import { ToastContainer, toast } from "react-toastify";

const UserTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalInfoShow, setModalInfoShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [isHovered, setIsHovered] = useState("");
  const [isAction, setIsAction] = useState(false);

  const [selectedRole, setSeletedRole] = useState(null);
  const activeRef = useRef(null);
  const banRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = ["All Users", "Banned"];

  const getUsersInPage = async (page) => {
    const res = await getUsers(page);
    if (res.success) {
      setTotalPage(res.totalPages);
      setUsers(res.users);
    }
  };

  useEffect(() => {
    getUsersInPage();
  }, []);

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getUsersInPage(pageIndex);
    setCurrentPage(pageIndex);
  };

  const handleUpdate = (id) => {
    setSelectedUserId(id);
    setModalShow(true);
  };

  const showUserInfo = (id) => {
    !isAction && (setSelectedUserId(id), setModalInfoShow(true));
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage);
    }
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInfoClose = () => {
    setModalInfoShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isBanned = activeRef.current.checked ? false : true;
    const role = selectedRole ? selectedRole : users[selectedUserId]?.role;
    const body = { id: users[selectedUserId]?._id, isBanned, role };
    const res = await updateUser(body);
    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage);
    }
    setModalShow(false);
  };

  const handleOptionChange = (option) => {
    setSeletedRole(option);
  };

  const chnageUserInfo = () => {};

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th> </th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Business Owned</th>
                    {/* <th>Role</th> */}
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(
                    (
                      { _id, username, email, avatar, role, isBanned },
                      index
                    ) => (
                      <tr
                        key={_id}
                        onClick={() => showUserInfo(index)}
                        onMouseEnter={() => handleMouseEnter(_id)}
                        id={_id}
                        style={{
                          backgroundColor:
                            isHovered === _id ? "lightblue" : "white",
                        }}
                      >
                        <td>
                          <Image
                            width={50}
                            height={50}
                            src={avatar}
                            alt={username}
                            className="size-50 rounded-22 object-cover"
                          />
                        </td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{email}</td>

                        {/* <td>{role}</td> */}
                        <td>
                          <span
                            className={
                              `rounded-100 py-4 px-10 text-center text-14 fw-500 ` +
                              (isBanned
                                ? "bg-error-1 text-error-2"
                                : "bg-success-1 text-success-2")
                            }
                          >
                            {isBanned ? "Banned" : "Active"}
                          </span>
                        </td>
                        <td
                          onMouseEnter={() => setIsAction(true)}
                          onMouseLeave={() => setIsAction(false)}
                        >
                          <ActionsButton
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            id={_id}
                            index={index}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={handleClose}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          {" "}
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 text-center mt-10">
            <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
              <div className="col-12">
                <Image
                  src={
                    users[selectedUserId]?.avatar
                      ? users[selectedUserId]?.avatar
                      : "/img/avatars/user_people_icon.svg"
                  }
                  alt="Avatar Preview"
                  width={250}
                  height={250}
                  className="size-250 rounded-full object-cover"
                />
                <p className="text-20 mt-10 fw-600">{`${users[selectedUserId]?.firstname} ${users[selectedUserId]?.lastname}`}</p>
              </div>
              <div className="col-md-12 col-12 d-flex mt-20">
                <div className="col-md-6">
                  <label htmlFor="birthdate" className="form-label">
                    Role
                  </label>
                  <div className="border border-2 border-dark mr-10">
                    <Dropdown
                      options={[
                        "admin",
                        "user",
                        "city owner",
                        "business owner",
                      ]}
                      originalOption={users[selectedUserId]?.role}
                      handleOptionChange={handleOptionChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 pl-20">
                  <div className="col-md-4 col-4 ">
                    <label htmlFor="gender" className="form-label">
                      Status
                    </label>
                  </div>
                  <div className="col-md-8 col-8 pl-10">
                    <div className="form-radio d-flex flex-column align-items-start">
                      <div className="radio d-flex items-center ">
                        <input
                          type="radio"
                          name="rating"
                          value="active"
                          ref={activeRef}
                          defaultChecked={!users[selectedUserId]?.isBanned}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon" />
                        </div>
                        <div className="ml-10">
                          {" "}
                          <p>Active</p>
                        </div>
                      </div>
                      <div className="radio d-flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value="ban"
                          ref={banRef}
                          defaultChecked={users[selectedUserId]?.isBanned}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon" />
                        </div>
                        <div className="ml-10">
                          {" "}
                          <p className="">Banned</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex mt-30">
                <div className="col-6 pr-30">
                  <div className="col-md-12 col-12">
                    <button className="btn col-12 btn-danger">Update</button>
                  </div>
                </div>
                <div className="col-6 pl-30">
                  <div className="col-md-12 col-12">
                    <button className="btn col-12 btn-primary">Close</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalInfoShow}
        onHide={handleInfoClose}
        className="d-flex align-items-center justify-content-center"
        size="lg"
      >
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          {" "}
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 text-center mt-10">
            <form>
              <div className="row y-gap-30 items-center">
                <div className="d-flex">
                  <div className="d-flex ratio ratio-1:1 w-200 mr-20">
                    <Image
                      width={200}
                      height={200}
                      src={
                        users[selectedUserId]?.avatar
                          ? users[selectedUserId]?.avatar
                          : "/img/avatars/user_people_icon.svg"
                      }
                      // src="/uploads/6581896618f6bbf20dd734c0.png"
                      alt="avatar"
                      className="img-ratio rounded-4"
                    />
                  </div>
                  <div className="row x-gap-20 y-gap-20 text-left">
                    <h4>{users[selectedUserId]?.username}</h4>
                    <h5>{users[selectedUserId]?.email}</h5>
                    <h5>{users[selectedUserId]?.role}</h5>
                  </div>
                </div>

                <div className="border-top-light mt-30 mb-30" />

                {/* End col-12 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.firstname}
                      name="firstname"
                      type="text"
                      required
                    />
                    <label className="lh-1 text-16 text-light-1">
                      First Name
                    </label>
                  </div>
                </div>
                {/* End col-6 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.lastname}
                      name="lastname"
                      type="text"
                      required
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Last Name
                    </label>
                  </div>
                </div>
                {/* End col-6 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.phonenumber}
                      name="phone_number"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Phone Number
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.location}
                      name="location"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Location
                    </label>
                  </div>
                </div>
                {/* End col-6 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.birthday}
                      name="birthday"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Birthday
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.gender}
                      name="gender"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">Gender</label>
                  </div>
                </div>
                {/* End col-6 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.facebook}
                      name="facebook"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      facebook
                    </label>
                  </div>
                </div>
                {/* End col-6 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input
                      value={users[selectedUserId]?.twitter}
                      name="twitter"
                      type="text"
                    />
                    <label className="lh-1 text-16 text-light-1">Twitter</label>
                  </div>
                </div>
              </div>
              {/* End col-xl-9 */}
              <div className="d-inline-block pt-30">
                <button
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                  onClick={chnageUserInfo}
                >
                  Chnage UserInfo <div className="icon-arrow-top-right ml-15" />
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Pagination
        currentPage={currentPage}
        handleTagClick={handleTagClick}
        totalPage={totalPage}
      />
      <ToastContainer />
    </>
  );
};

export default UserTable;
