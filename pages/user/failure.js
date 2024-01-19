import { useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

const Failure = () => {
  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 2000);
  });

  return (
    <>
      {/* <div className="col-lg-4 d-flex justify-content-center" style={{ backgroundImage: "url(/img/app/fail.png)" }}> */}
      <div>
        <Image
          width={200}
          height={200}
          src="/img/app/fail.png"
          alt="SUCCESS!"
          className="rounded-4 w-100"
        />
      </div>

      {/* </div> */}
    </>
  );
};

export default Failure;
