import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const PersonalInfo = (props) => {

  const sicRef = useRef(null)
  const sic2Ref = useRef(null)
  const sic4Ref = useRef(null)
  const sic8Ref = useRef(null)
  const naicsRef = useRef(null)

  const addCategoryInfo = (e) => {
    e.preventDefault()

    const sic = sicRef.current.value
    const sic2 = sic2Ref.current.value
    const sic4 = sic4Ref.current.value
    const sic8 = sic8Ref.current.value
    const naics = naicsRef.current.value

    const formData = {
      sic,
      sic2,
      sic4,
      sic8,
      naics
    }

    props.handleData(formData)
  }
  
  return (
    <div className="col-12 text-center mt-10">
      <form>
        <div className="row y-gap-30 items-center">
          <div className="border-top-light" />
            {/* End col-12 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={sicRef} type="number" required />
                  <label className="lh-1 text-16 text-light-1">SIC</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={sic2Ref} type="text" required />
                  <label className="lh-1 text-16 text-light-1">SIC2</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={sic4Ref} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    SIC4
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={sic8Ref} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    SIC8
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={naicsRef} type="number" />
                  <label className="lh-1 text-16 text-light-1">
                    NAICS
                  </label>
                </div>
              </div>
              {/* End col-6 */}
            </div>
            {/* End col-xl-9 */}
            <div className="d-flex justify-content-between pt-30">
            <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                // onClick={addMainInfo}
              >
                <div className="icon-arrow-left mr-15" /> Prev 
              </button>
              <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                onClick={addCategoryInfo}
              >
                Next <div className="icon-arrow-right ml-15" />
              </button>
            </div>
          </form >
          <ToastContainer />
          </div>
  );
};

export default PersonalInfo;
