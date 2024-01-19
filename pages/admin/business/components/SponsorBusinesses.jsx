import { useEffect, useRef, useState } from "react";
import ActionsButton2 from "./ActionsButton2";
import { getSponsorBusinesses, deleteSponsorBusiness } from "../../../../services/admin/business";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../../common/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import SponsorBusinessEditModal from "./SponsorBusinessEditModal";

const SponsorBusinesses = () => {
  const [totalPage, setTotalPage] = useState(1)
  const [sponsorBusinesses, setSponsorBusinesses] = useState([])

  const [modalSponsorBusinessShow, setModalSponsorBusinessShow] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState(null)
  const [isHovered, setIsHovered] = useState('')
  const [isAction, setIsAction] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const onChange = (value) => {
    setCurrentPage(value);
  };

  const getSponsorBusinessesInPage = async (page) => {
    const res = await getSponsorBusinesses(page)
    if (res.success) {
      setTotalPage(res.totalPages)
      setSponsorBusinesses(res.businesses)
    }
  }

  useEffect(() => {
    getSponsorBusinessesInPage()
  }, [])

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getSponsorBusinessesInPage(pageIndex)
    setCurrentPage(pageIndex)
  }

  const showSponsorBusinessInfo = (id) => {
    
    !isAction && (
      setSelectedBusinessId(id),
      setModalSponsorBusinessShow(true)
    )
  }

  const addSponsorBusiness = (id) => {
      setModalSponsorBusinessShow(true)
  }

  const handleDelete = async (id) => {
    const res = await deleteSponsorBusiness(id)

    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleSponsorBusinessClose = () => {
    setModalSponsorBusinessShow(false)
  }

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-10 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <div className="d-flex justify-content-between">
                <div></div>
                <button
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white mb-10"
                  onClick={addSponsorBusiness}
                >
                  <div className="icon-plus mr-15" /> Add 
                </button>
              </div>
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
                  sponsorBusinesses.map(({ _id, BusinessName, Industry, Address, Phone, BImage }, index) =>
                    <tr key={_id} onClick={() => showSponsorBusinessInfo(index)} onMouseEnter={() => handleMouseEnter(_id)} id={_id}  style={{ backgroundColor: isHovered === _id ? 'lightblue' : 'white' }}>
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
                      <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} > 
                        <ActionsButton2 onDelete={handleDelete} index={index} id={_id} />
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
        show={modalSponsorBusinessShow}
        onHide={handleSponsorBusinessClose}
        className="d-flex align-items-center justify-content-center"
        size='lg'
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>Sponsor Business Edit</Modal.Title></Modal.Header>
        <Modal.Body>
          <SponsorBusinessEditModal dataSource={sponsorBusinesses[selectedBusinessId]} closeModal={handleSponsorBusinessClose} update={handleTagClick} current={currentPage} />
        </Modal.Body>

      </Modal>

      <Paginations
        length={SponsorBusinesses?.length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <ToastContainer />
    </>
  );
};



export default SponsorBusinesses;

