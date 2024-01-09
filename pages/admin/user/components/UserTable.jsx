import { useEffect, useRef, useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "./ActionsButton";
import { getUsers, deleteUser, updateUser } from "../../../../services/admin/user";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Dropdown from "./Dropdown";
import { ToastContainer, toast } from "react-toastify";

const UserTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [users, setUsers] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(1)
  
  const [selectedRole, setSeletedRole] = useState(null)
  const activeRef = useRef(null)
  const banRef = useRef(null)


  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Users",
    "Banned",
  ];

  const getUsersInPage = async (page) => {
    const res = await getUsers(page)
    if (res.success) {
      setTotalPage(res.totalPages)
      setUsers(res.users)
    }
  }

  useEffect(() => {
    getUsersInPage()
  }, [])

  const handleTagClick = (pageIndex) => {
    getUsersInPage(pageIndex)
    setCurrentPage(pageIndex)
  }

  const handleUpdate = (id) => {
    setSelectedUserId(id)
    setModalShow(true)

  }

  const handleDelete = async (id) => {
    const res = await deleteUser(id)
    console.log(res)
    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleClose = () => {
    setModalShow(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isBanned = activeRef.current.checked ? false : true
    const role = selectedRole? selectedRole: users[selectedUserId]?.role
    const body = {id: users[selectedUserId]?._id, isBanned, role}
    const res = await updateUser(body)
    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
    setModalShow(false)
  }

  const handleOptionChange = (option) => {
    setSeletedRole(option)
  }


  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${activeTab === index ? "is-tab-el-active" : ""
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
                    <th>Name</th>
                    <th>BirthDay</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Facebook</th>
                    <th>Twitter</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(({ _id, username, email, firstname, lastname, avatar, birthday, gender, role, phonenumber, facebook, twitter, isBanned }, index) =>
                      <tr key={_id}>
                        <td>
                          <Image
                            width={50}
                            height={50}
                            src={avatar}
                            alt={username}
                            className="size-50 rounded-22 object-cover"
                          /></td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{`${firstname} ${lastname}`}</td>
                        <td>{birthday.slice(0, 10)}</td>
                        <td>{gender}</td>
                        <td>{role}</td>
                        <td>{phonenumber}</td>
                        <td>{facebook}</td>
                        <td>{twitter}</td>
                        <td>
                          <span className={`rounded-100 py-4 px-10 text-center text-14 fw-500 ` + (isBanned ? 'bg-error-1 text-error-2' : 'bg-success-1 text-success-2')}>
                            {isBanned ? "Banned" : "Active"}
                          </span>
                        </td>
                        <td>
                          <ActionsButton onDelete={handleDelete} onUpdate={handleUpdate} id={_id} index={index} />
                        </td>
                      </tr>
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
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>Update</Modal.Title></Modal.Header>
        <Modal.Body>
          <div className="col-12 text-center mt-10">
            <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
              <div className="col-12">
                <Image
                  src={users[selectedUserId]?.avatar ? users[selectedUserId]?.avatar : "/img/avatars/user_people_icon.svg"}
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
                    <Dropdown options={["admin", "user", "city owner", "business owner"]} originalOption = {users[selectedUserId]?.role} handleOptionChange={handleOptionChange} />
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
                    <button className="btn col-12 btn-danger">
                      Update
                    </button>
                  </div>
                </div>
                <div className="col-6 pl-30">
                  <div className="col-md-12 col-12">
                    <button className="btn col-12 btn-primary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>
      <Pagination currentPage={currentPage} handleTagClick={handleTagClick} totalPage={totalPage} />
      <ToastContainer />
    </>
  );
};

export default UserTable;
