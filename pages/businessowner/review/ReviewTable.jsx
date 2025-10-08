import { useEffect, useRef, useState } from "react";
import ActionsButton2 from "./ActionsButton2";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../common/Pagination";
import ReplyModal from "./ReplyModal";
import { useSelector } from 'react-redux'
import { getReviews } from "../../../services/review"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const ReviewTable = () => {
  const [totalPage, setTotalPage] = useState(1)
  const [reviews, setReviews] = useState([])

 
  const [modalReviewShow, setModalReviewShow] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState(null)
  const [isHovered, setIsHovered] = useState('')
  const [isAction, setIsAction] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);
  const businessInfo = useSelector((state) => state.BusinessInfo);


  const getReviewsInPage = async (page) => {
    const res = await getReviews(page, businessInfo.BusinessId)
    if (res.success) {
        setReviews(res.reviews)
    }
  }

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const onChange = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (!businessInfo.BusinessId) <h1>Loading...</h1>;
    else {
      getReviewsInPage()
    }
  }, [])

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getReviewsInPage()
    // setCurrentPage(pageIndex)
  }

  const showReviewInfo = (id) => {
    
    !isAction && (
      setSelectedReviewId(id),
      setModalReviewShow(true)
    )
  }

  const addReview = (id) => {
      setModalReviewShow(true)
  }

  const handleStatus = async (id, status) => {
    const res = await handleReview(id, status)

    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleReviewClose = () => {
    setModalReviewShow(false)
  }

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-10 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              {/* <div className="d-flex justify-content-between">
                <div></div>
                <button
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white mb-10"
                  onClick={addReview}
                >
                  <div className="icon-plus mr-15" /> Add 
                </button>
              </div> */}
            <table className="table-3 -border-bottom col-12">
              <thead className="bg-light-2">
                <tr>
                  <th>Sender</th>
                  <th>Content</th>
                  <th>Rate</th>
                  <th>Photos</th>
                  <th>Reply</th>
                  <th>CreatedDate</th>
                </tr>
              </thead>
              <tbody>
                {
                  reviews?.map(({ _id, UserName, Avatar, UserEmail, Title, Content, Images, Rate, Reply, CreatedDate }, index) =>
                  <tr key={_id} onClick={() => showReviewInfo(index)} onMouseEnter={() => handleMouseEnter(_id)} id={_id}  style={{ backgroundColor: isHovered === _id ? 'lightblue' : 'white' }}>
                    <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} className="d-flex " >
                      <div className="">
                        <img
                          src={Avatar ? Avatar : "/img/avatars/2.png"}
                          className="border border-5 rounded-circle p-1"
                          style={{ width: "100px", height: "120px" }}
                        />
                      </div>
                      <div className="d-block m-3">
                        <div className="m-3">
                          {UserName}
                        </div>
                        <div>
                          {UserEmail}
                        </div>

                      </div>
                    </td>
                    <td>
                      <div>
                        <span className= 'rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success-1 text-success-2'>
                          {Title}
                        </span>
                      </div>  
                      <div className="mt-3">
                        {Content}
                      </div>
                    </td>
                    <td>{Rate}</td>
                    <td>
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
                                {Images === null ? (
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
                                  Images && Images.split(",,").map((slide, i) => (
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
                    <td>
                      {/* <span className= 'rounded-100 py-4 px-10 text-center text-14 fw-500 bg-success-1 text-success-2'> */}
                          {Reply}
                        {/* </span> */}
                        </td>
                    <td>{CreatedDate.slice(0, 10)}</td>
                </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>

      <Modal
        show={modalReviewShow}
        onHide={handleReviewClose}
        className="d-flex align-items-center justify-content-center"
        size='lg'
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>Reply</Modal.Title></Modal.Header>
        <Modal.Body>
          <ReplyModal dataSource={reviews && reviews[selectedReviewId]} closeModal={handleReviewClose} update={handleTagClick} current={currentPage} businessId={businessInfo.BusinessInfo && businessInfo.BusinessInfo} />
        </Modal.Body>

      </Modal>

      <Paginations
        length={reviews?.length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <ToastContainer />
    </>
  );
};



export default ReviewTable;

