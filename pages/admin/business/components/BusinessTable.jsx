import { useEffect, useRef, useState } from "react";
import ActionsButton from "./ActionsButton";
import { getBusinesses, deleteBusiness } from "../../../../services/admin/business";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Dropdown from "./Dropdown";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../../common/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import BusinessUpdateModal from "./BusinessUpdateModal";

const BusinessTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [totalPage, setTotalPage] = useState(1)
  const [businesses, setBusinesses] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [modalBusinessShow, setModalBusinessShow] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState(1)
  const [isHovered, setIsHovered] = useState('')
  const [isAction, setIsAction] = useState(false)

  const [selectedRole, setSeletedRole] = useState(null)
  const activeRef = useRef(null)
  const banRef = useRef(null)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };
  const onChange = (value) => {
    setCurrentPage(value);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Businesses",
    "Required Businesses",
  ];

  const getBusinessesInPage = async (page) => {
    const res = await getBusinesses(page)
    if (res.success) {
      setTotalPage(res.totalPages)
      setBusinesses(res.businesses)
    }
    console.log('res', res.businesses);
  }

  useEffect(() => {
    getBusinessesInPage()
  }, [])

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getBusinessesInPage(pageIndex)
    setCurrentPage(pageIndex)
  }

  const handleUpdate = (id) => {
    setSelectedBusinessId(id)
    setModalShow(true)

  }

  const showBusinessInfo = (id) => {
    
    !isAction && (
      setSelectedBusinessId(id),
      setModalBusinessShow(true)
    )
  }

  const handleDelete = async (id) => {
    const res = await deleteBusiness(id)

    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleClose = () => {
    setModalShow(false)
  }

  const handleBusinessClose = () => {
    setModalBusinessShow(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isBanned = activeRef.current.checked ? false : true
    const role = selectedRole? selectedRole: users[selectedUserId]?.role
    const body = {id: users[selectedUserId]?._id, isBanned, role}
    const res = await updateUser(body)
    if (res.success) {
      toast.success(res.message);
      // handleTagClick(currentPage)
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
                    <th>Businessname</th>
                    <th>Industry</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    businesses.map(({ _id, BusinessName, Industry, Address, Phone, BImage }, index) =>
                      <tr key={_id} onClick={() => showBusinessInfo(index)} onMouseEnter={() => handleMouseEnter(_id)} id={_id}  style={{ backgroundColor: isHovered === _id ? 'lightblue' : 'white' }}>
                        <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} >
                          <div className="col-md-auto">
                            <div className="cardImage ratio ratio-1:1 w-200 md:w-1/1 rounded-4">
                              <div className="cardImage__content">
                                <div className="cardImage-slider rounded-4  custom_inside-slider">
                                  <Swiper
                                    className="mySwiper"
                                    modules={[Pagination, Navigation]}
                                    pagination={{
                                      clickable: true,
                                    }}
                                    navigation={true}
                                  >
                                    {BImage === null ? (
                                      <SwiperSlide>
                                        <Image
                                          width={250}
                                          height={350}
                                          className="rounded-4 col-12 js-lazy"
                                          src={"/img/hotels/1.png"}
                                          alt="image"
                                        />
                                      </SwiperSlide>
                                    ) : (
                                      BImage && BImage.split(",,").map((slide, i) => (
                                        <SwiperSlide key={i}>
                                          <Image
                                            width={250}
                                            height={350}
                                            className="rounded-4 col-12 js-lazy"
                                            src={slide}
                                            alt="image"
                                          />
                                        </SwiperSlide>
                                      ))
                                    )}
                                  </Swiper>
                                </div>
                              </div>
                              {/* End image */}
                            </div>
                          </div>
                        </td>
                        <td>{BusinessName}</td>
                        <td>{Industry}</td>
                        <td>{Address}</td>
                        <td>{Phone}</td>
                        {/* <td>
                          <span className={`rounded-100 py-4 px-10 text-center text-14 fw-500 ` + (isBanned ? 'bg-error-1 text-error-2' : 'bg-success-1 text-success-2')}>
                            {isBanned ? "Banned" : "Active"}
                          </span>
                        </td> */}
                        <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} > 
                          <ActionsButton onDelete={handleDelete} onUpdate={handleUpdate} id={_id} index={index}  />
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
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

      </Modal> */}

      <Modal
        show={modalBusinessShow}
        onHide={handleBusinessClose}
        className="d-flex align-items-center justify-content-center"
        size='lg'
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>Business Information</Modal.Title></Modal.Header>
        <Modal.Body>
          <BusinessUpdateModal dataSource={businesses[selectedBusinessId]} closeModal={handleBusinessClose} update={handleTagClick} current={currentPage} />
        </Modal.Body>

      </Modal>

      <Paginations
        length={businesses?.length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      {/* <Pagination currentPage={currentPage} handleTagClick={handleTagClick} totalPage={totalPage} /> */}
      <ToastContainer />
    </>
  );
};



export default BusinessTable;

