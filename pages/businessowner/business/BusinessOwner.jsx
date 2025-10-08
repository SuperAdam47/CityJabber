import React, { useState, useRef, useEffect } from "react";

const PersonalInfo = ({businessInfo, handleData, addData}) => {

  const ownernameRef = useRef(null)
  const phoneRef = useRef(null)
  const webRef = useRef(null)
  const marketRef = useRef(null)
  const annualRef = useRef(null)
  const coordinateRef = useRef(null)
  const createdRef = useRef(null)

  useEffect(() => {
    ownernameRef.current.value = businessInfo.ContactName || ''
    phoneRef.current.value = businessInfo.Phone || null
    webRef.current.value = businessInfo.Web || ''
    marketRef.current.value = businessInfo.MarketVariable || ''
    annualRef.current.value = businessInfo.AnnualRevenue || ''
    coordinateRef.current.value = businessInfo.Coordinates || ''
    createdRef.current.value = businessInfo.YearFounded || null
  }, [])

  const addOwnerInfo = (e) => {
    e.preventDefault()

    const ownername = ownernameRef.current.value
    const phone = phoneRef.current.value
    const web = webRef.current.value
    const market = marketRef.current.value
    const annual =annualRef.current.value
    const coordinate = coordinateRef.current.value
    const created = createdRef.current.value

    const formData = {
      ContactName: ownername,
      Phone: phone,
      Web: web,
      MarketVariable: market,
      AnnualRevenue: annual,
      Coordinates: coordinate,
      YearFounded: created
    }
    handleData(formData)
  }
  
  const handleBusinessInfo = (e) => {
    e.preventDefault()

    const ownername = ownernameRef.current.value
    const phone = phoneRef.current.value
    const web = webRef.current.value
    const market = marketRef.current.value
    const annual =annualRef.current.value
    const coordinate = coordinateRef.current.value
    const created = createdRef.current.value

    const formData = {
      ContactName: ownername,
      Phone: phone,
      Web: web,
      MarketVariable: market,
      AnnualRevenue: annual,
      Coordinates: coordinate,
      YearFounded: created
    }
    handleData(formData)

    addData(formData)
  }
  
  return (
    <div className="col-12 text-center mt-10">
      <form>
        <div className="row y-gap-30 items-center">
          <div className="border-top-light" />
            {/* End col-12 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={ownernameRef} type="text" required />
                  <label className="lh-1 text-16 text-light-1">Owner Name</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={phoneRef} type="number" required />
                  <label className="lh-1 text-16 text-light-1">Owner Phone</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={webRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Web Site
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={marketRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Market Variable
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={annualRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Annual Revenue
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={coordinateRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Coordinate
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={createdRef} type="number" />
                  <label className="lh-1 text-16 text-light-1">
                    Created Year
                  </label>
                </div>
              </div>
              {/* End col-6 */}
            </div>
            {/* End col-xl-9 */}
            <div className="d-flex justify-content-between pt-30">
            <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                onClick={addOwnerInfo}
              >
                <div className="icon-arrow-left mr-15" /> Prev 
              </button>
              <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                onClick={handleBusinessInfo}
              >
                Add Business <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
          </form >
          </div>
  );
};

export default PersonalInfo;
