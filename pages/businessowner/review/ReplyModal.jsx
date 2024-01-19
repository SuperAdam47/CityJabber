import React, { useState, useRef, useEffect } from "react";
import { updateReview } from "../../../services/review";
import { ToastContainer, toast } from "react-toastify";


const ReviewUpdateModal = (props) => {
  const review = props.dataSource

  const questionRef = useRef(null)
  const answerRef = useRef(null)

  useEffect(() => {
    if (review) {
      questionRef.current.value = review.Content || ''
      answerRef.current.value = review.Answer || ''
    }
  }, [])

  
  const updateReviewInfo = async (e) => {
    e.preventDefault()

    const Question = questionRef.current.value
    const Answer = answerRef.current.value

    if (review) {
      const formData = {
        id: review._id,
        Question,
        Answer,
      }
      const res = await updateReview(formData)
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
                <label className="lh-1 text-16 text-light-1">Content</label>
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
            onClick={updateReviewInfo} >
            {review ? 'Update FAQ' : 'Create FAQ' } <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form >
      <ToastContainer />
    </div>
  );
};

export default ReviewUpdateModal;
