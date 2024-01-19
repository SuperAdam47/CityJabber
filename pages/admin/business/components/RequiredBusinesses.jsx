import { useEffect, useRef, useState } from "react";
import ActionsButton1 from "./ActionsButton1";
import { getRequiredBusinesses, handleRequiredBusiness } from "../../../../services/admin/business";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../../common/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import BusinessUpdateModal from "./BusinessUpdateModal";

const RequiredBusinesses = () => {
  const [totalPage, setTotalPage] = useState(1)
  const [requiredBusinesses, setRequiredBusinesses] = useState([])

  const [modalRequiredBusinessShow, setModalRequiredBusinessShow] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState(1)
  const [isHovered, setIsHovered] = useState('')
  const [isAction, setIsAction] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);

  console.log('requiredBusinesses==>', requiredBusinesses)

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const onChange = (value) => {
    setCurrentPage(value);
  };

  const getRequiredBusinessesInPage = async (page) => {
    const res = await getRequiredBusinesses(page)
    if (res.success) {
      setTotalPage(res.totalPages)
      setRequiredBusinesses(res.businesses)
    }
  }

  useEffect(() => {
    getRequiredBusinessesInPage()
  }, [])

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getRequiredBusinessesInPage(pageIndex)
    setCurrentPage(pageIndex)
  }

  const showRequiredBusinessInfo = (id) => {
    
    !isAction && (
      setSelectedBusinessId(id),
      setModalRequiredBusinessShow(true)
    )
  }

  const handlePermit = async (index, status) => {
    const res = await handleRequiredBusiness(status, requiredBusinesses[index])

    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleRequiredBusinessClose = () => {
    setModalRequiredBusinessShow(false)
  }

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  requiredBusinesses.map(({ _id, BusinessName, Industry, Address, Phone, BImage, Status }, index) =>
                    <tr key={_id} onClick={() => showRequiredBusinessInfo(index)} onMouseEnter={() => handleMouseEnter(_id)} id={_id}  style={{ backgroundColor: isHovered === _id ? 'lightblue' : 'white' }}>
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
                                        src="/img/hotels/1.png"
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
                      <td>
                          <span className={`rounded-100 py-4 px-10 text-center text-14 fw-500 ` + (Status === 0 ? 'bg-error-1 text-error-2' : 'bg-success-1 text-success-2')}>
                            {Status === 1 ? "Required" : "Refused"}
                          </span>
                        </td>
                      <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} > 
                        <ActionsButton1 onPermit={handlePermit} index={index} />
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
        show={modalRequiredBusinessShow}
        onHide={handleRequiredBusinessClose}
        className="d-flex align-items-center justify-content-center"
        size='lg'
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>Required Business Information</Modal.Title></Modal.Header>
        <Modal.Body>
          <BusinessUpdateModal dataSource={requiredBusinesses[selectedBusinessId]} closeModal={handleRequiredBusinessClose} update={handleTagClick} current={currentPage} />
        </Modal.Body>

      </Modal>

      <Paginations
        length={requiredBusinesses?.length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <ToastContainer />
    </>
  );
};



export default RequiredBusinesses;

