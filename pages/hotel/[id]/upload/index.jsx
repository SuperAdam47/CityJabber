import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Seo from "../../../../components/common/Seo";
import Header11 from "../../../../components/header/header-6";
import CallToActions from "../../../../components/common/CallToActions";
import DefaultFooter from "../../../../components/footer/footer-6";
const FileUpload = () => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();

  const router = useRouter();
  const id = router.query.id;

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const handleUpload = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("id", id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/common/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle successful upload
        console.log("Files uploaded successfully.");
        setFile([]);
      } else {
        // Handle upload failure
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  return (
    <>
      <Seo pageTitle="Hotel Single v1" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}
      <div className="d-flex flex-column justify-content-center  align-items-center p-5">
        <div
          style={{
            borderRadius: "0.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            backgroundColor: "#f9fafb",
            width: "360",
          }}
        >
          <div className="m-1">
            <span
              className="d-flex justify-content-center align-items-center mb-1 "
              style={{ fontSize: "12px", color: "#EF4444" }}
            >
              {message}
            </span>
            <div className="d-flex align-items-center justify-content-center">
              <label
                className="d-flex cursor-pointer flex-column"
                style={{ border: "2px dashed #000" }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="button -md -outline-blue-1 text-blue-1 w-100 mt-3"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default FileUpload;
