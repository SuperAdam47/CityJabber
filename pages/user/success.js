import { useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

const Success = () => {
  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 2000);
  });

  return (
    <>
      <div className="col-lg-9" style={{ backgroundImage: "url(/img/app/success5.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Image
          width={200}
          height={200}
          src="/img/app/success1.jpg"
          alt="SUCCESS!"
          className="rounded-4 w-100"
        />
      </div>
    </>
  );
};

export default Success;
