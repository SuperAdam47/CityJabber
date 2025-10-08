import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../common/Pagination";
// import ReplyModal from "../";
import { useSelector } from 'react-redux'
import { getUserReviews } from "../../../services/review"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// import Seo from "../../../components/common/Seo";
import Blog2 from "../../../components/blog/Blog2";
import BlogSidebar from "../../../components/blog/blog-sidebar";
import BlogPagination from "../../../components/blog/BlogPagination";

const ReviewTable = () => {

  const user = useSelector((state) => state.User.user);

  const [totalPage, setTotalPage] = useState(1)
  const [reviews, setReviews] = useState([])
 
  const [modalReviewShow, setModalReviewShow] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState(null)
  const [isHovered, setIsHovered] = useState('')
  const [isAction, setIsAction] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);
  const businessInfo = useSelector((state) => state.BusinessInfo);


  const getUserReviewsInPage = async (page) => {
    const res = await getUserReviews(page, user._id)
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
    if (!user._id) <h1>Loading...</h1>;
    else {
      getUserReviewsInPage()
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
      <section className="layout-pt-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Reviews By {user.username}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End title */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-8">
              <div className="row y-gap-30">
                <Blog2 />
              </div>
              {/* End .row */}
              <BlogPagination />
            </div>
            {/* End .col */}

            <div className="col-xl-3">
              <BlogSidebar />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      <ToastContainer />
    </>
  );
};



export default ReviewTable;

