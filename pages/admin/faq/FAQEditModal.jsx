import React, { useState, useRef, useEffect } from "react";
import { createFAQ, updateFAQ } from "../../../services/admin/faq";
import { ToastContainer, toast } from "react-toastify";

const FAQUpdateModal = (props) => {
  const FAQ = props.dataSource

  const questionRef = useRef(null)
  const answerRef = useRef(null)

  useEffect(() => {
    if (FAQ) {
      questionRef.current.value = FAQ.Question || ''
      answerRef.current.value = FAQ.Answer || ''
    }
  }, [])

  
  const updateFAQInfo = async (e) => {
    e.preventDefault()

    const Question = questionRef.current.value
    const Answer = answerRef.current.value

    if (FAQ) {
      const formData = {
        id: FAQ._id,
        Question,
        Answer,
      }
      const res = await updateFAQ(formData)
      if (res.success) {
        toast.success(res.message);
        props.update(props.current)
      }
    } else {
      const formData = {
        Question,
        Answer,
      }
      const res = await createFAQ(formData)
      if (res.success) {
        toast.success(res.message);
        props.update(props.current)
      }
    }
    
    props.closeModal()
  }
  
  return (
    <div className="col-12 text-center mt-10">
      <form>
        <div className="row y-gap-30 items-center">
          <div className="border-top-light" />
            <div className="col-md-12">
              <div className="form-input ">
                <input ref={questionRef} type="text" required />
                <label className="lh-1 text-16 text-light-1">Question</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-input ">
                <input ref={answerRef} type="text" required />
                <label className="lh-1 text-16 text-light-1">Answer</label>
              </div>
            </div>
          </div>
        <div className="d-inline-block pt-30">
          <button
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={updateFAQInfo} >
            {FAQ ? 'Update FAQ' : 'Create FAQ' } <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form >
      <ToastContainer />
    </div>
  );
};

export default FAQUpdateModal;
