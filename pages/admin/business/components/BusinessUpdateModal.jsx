import React, { useState, useRef, useEffect } from "react";
import { getBusinesses, deleteBusiness, updateBusiness } from "../../../../services/admin/business";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

const BusinessUpdateModal = (props) => {
  const business = props.dataSource

  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState([]);
  const [base64Image, setBase64Image] = useState([]);

  const businessnameRef = useRef(null)
  const industryRef = useRef(null)
  const cityRef = useRef(null)
  const addressRef = useRef(null)
  const phoneRef = useRef(null)

  useEffect(() => {
    businessnameRef.current.value = business.BusinessName
    industryRef.current.value = business.Industry
    cityRef.current.value = business.City
    addressRef.current.value = business.Address
    phoneRef.current.value = business.Phone
  }, [])

  const handleFile = (e) => {
    const file = e.target.files

    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newBase64Images = [...base64Image, e.target.result];
        setBase64Image(newBase64Images);
      };

      reader.readAsDataURL(file[i]);

      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFiles([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }

  };

  const removeImage = (i) => {
    setFiles(files.filter((x) => x.name !== i));
  };


  const updateBusinessInfo = async (e) => {
    e.preventDefault()

    const businessname = businessnameRef.current.value
    const industry = industryRef.current.value
    const city = cityRef.current.value
    const address = addressRef.current.value
    const phone = phoneRef.current.value
    const images = base64Image.join(',,')

    const formData = {
      id: business._id,
      businessname,
      industry,
      city,
      address,
      phone,
      images
    }

    const res = await updateBusiness(formData)
    if (res.success) {
      toast.success(res.message);
      props.update(props.current)
    }
    props.closeModal()
  }
  
  return (
    <div className="col-12 text-center mt-10">
      <form>
        <div className="row y-gap-30 items-center">
          <div className="border-top-light" />
            {/* End col-12 */}
            <div className="d-flex flex-column justify-content-center  align-items-center">
              <div
                style={{
                  borderRadius: "0.5rem",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div className="m-1">
                  <div className="d-flex align-items-center justify-content-center">
                    <label
                      className="d-flex cursor-pointer flex-column"
                      style={{ border: "2px dashed #000" }}
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          width="50px"
                          height="50px"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400">
                          Select a photo
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFile}
                        className="opacity-0"
                        multiple
                        name="files[]"
                      />
                    </label>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {files.map((file, key) => {
                      return (
                        <div key={key} className="overflow-hidden relative">
                          <button
                            className="absolute cursor-pointer "
                            style={{ right: 0 }}
                          >
                            <svg
                              width="24"
                              height="24"
                              className="icon_svg"
                              onClick={() => {
                                removeImage(file.name);
                              }}
                            >
                              <path d="M21 3h-5.5V2a.998.998 0 00-1-1h-5a1 1 0 00-1 1v1H3a1 1 0 000 2h.5v13.75A4.255 4.255 0 007.75 23h8.5a4.254 4.254 0 004.25-4.25V5h.5a1 1 0 100-2zm-2.5 15.75A2.253 2.253 0 0116.25 21h-8.5a2.253 2.253 0 01-2.25-2.25V5h13v13.75z"></path>
                              <path d="M9.25 17.813a.998.998 0 01-1-1v-8a1 1 0 012 0v8a.998.998 0 01-1 1zm5.5 0a.998.998 0 01-1-1v-8a1 1 0 012 0v8a.998.998 0 01-1 1z"></path>
                            </svg>
                          </button>
                          <img
                            className="w-20 rounded-md"
                            style={{ height: "100px" }}
                            src={URL?.createObjectURL(file)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={businessnameRef} type="text" required />
                  <label className="lh-1 text-16 text-light-1">Business Name</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={industryRef} type="text" required />
                  <label className="lh-1 text-16 text-light-1">Industry Name</label>
                </div>
              </div>
              {/* End col-6 */}
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={cityRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    City
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={addressRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Adress
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input ">
                  <input ref={phoneRef} type="text" />
                  <label className="lh-1 text-16 text-light-1">
                    Phone
                  </label>
                </div>
              </div>
              {/* End col-6 */}
            </div>
            {/* End col-xl-9 */}
            <div className="d-inline-block pt-30">
              <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                onClick={updateBusinessInfo}
              >
                Update BusinessInfo <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
          </form >
          <ToastContainer />
          </div>
  );
};

export default BusinessUpdateModal;
