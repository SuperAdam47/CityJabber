import { useEffect, useRef, useState } from "react";
import ActionsButton2 from "./ActionsButton2";
import { getFAQs, handleFAQ } from "../../../services/admin/faq";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../common/Pagination";
import FAQEditModal from "./FAQEditModal";

const FAQTable = () => {
  const [totalPage, setTotalPage] = useState(1)
  const [FAQs, setFAQs] = useState([])

  const [modalFAQShow, setModalFAQShow] = useState(false)
  const [selectedFAQId, setSelectedFAQId] = useState(null)
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

  const getFAQInPage = async (page) => {
    const res = await getFAQs(page)

    if (res.success) {
      setTotalPage(res.totalPages)
      setFAQs(res.FAQs)
    }
  }

  useEffect(() => {
    getFAQInPage()
  }, [])

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleTagClick = (pageIndex) => {
    getFAQInPage(pageIndex)
    setCurrentPage(pageIndex)
  }

  const showFAQInfo = (id) => {
    
    !isAction && (
      setSelectedFAQId(id),
      setModalFAQShow(true)
    )
  }

  const addFAQ = (id) => {
      setModalFAQShow(true)
  }

  const handleStatus = async (id, status) => {
    const res = await handleFAQ(id, status)

    if (res.success) {
      toast.success(res.message);
      handleTagClick(currentPage)
    }
  }

  const handleFAQClose = () => {
    setModalFAQShow(false)
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
                  onClick={addFAQ}
                >
                  <div className="icon-plus mr-15" /> Add 
                </button>
              </div>
            <table className="table-3 -border-bottom col-12">
              <thead className="bg-light-2">
                <tr>
                  <th></th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>CreatedDate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  FAQs?.map(({ _id, Question, Answer, CreatedDate, Status }, index) =>
                    <tr key={_id} onClick={() => showFAQInfo(index)} onMouseEnter={() => handleMouseEnter(_id)} id={_id}  style={{ backgroundColor: isHovered === _id ? 'lightblue' : 'white' }}>
                      <td></td>
                      <td>{Question}</td>
                      <td>{Answer}</td>
                      <td>{CreatedDate}</td>
                      <td>
                          <span className={`rounded-100 py-4 px-10 text-center text-14 fw-500 ` + (Status === 0 ? 'bg-error-1 text-error-2' : 'bg-success-1 text-success-2')}>
                            {Status === 0 ? "Refused" : "Permitted"}
                          </span>
                        </td>
                      <td onMouseEnter={() => setIsAction(true)} onMouseLeave={() => setIsAction(false)} > 
                        <ActionsButton2 onHandle={handleStatus} index={index} id={_id} />
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
        show={modalFAQShow}
        onHide={handleFAQClose}
        className="d-flex align-items-center justify-content-center"
        size='lg'
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        > <Modal.Title>FAQ Edit</Modal.Title></Modal.Header>
        <Modal.Body>
          <FAQEditModal dataSource={FAQs && FAQs[selectedFAQId]} closeModal={handleFAQClose} update={handleTagClick} current={currentPage} />
        </Modal.Body>

      </Modal>

      <Paginations
        length={FAQs?.length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <ToastContainer />
    </>
  );
};



export default FAQTable;

