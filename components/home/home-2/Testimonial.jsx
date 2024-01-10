import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { EffectCards } from "swiper";
import axios from "axios";
import Image from "next/image";
const Testimonial = () => {
  const [dataSource, setDataSource] = useState([]);

  const handleItem = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/list`
    );
    setDataSource(res.data.getAllData);
  };
  useEffect(() => {
    handleItem();
  }, []);

  return (
    <>
      <div className="testimonials-slider-2 js-testimonials-slider-2">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation, Pagination]}
          navigation={{
            nextEl: ".js-next_active",
            prevEl: ".js-prev_active",
          }}
          pagination={{
            el: ".js-pagination",
            clickable: true,
          }}
        >
          {dataSource.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="testimonials -type-1 bg-white rounded-4 pt-40 pb-30 px-40 shadow-2">
                <div>
                  <h4 className="text-16 fw-500 text-blue-1 mb-10">
                    {item.BusinessName}
                  </h4>
                  <p className="testimonials__text lh-12 fw-500 text-dark-1">
                    {item?.Industry}
                  </p>
                  <div className="pt-20 mt-28 border-top-light">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <Image
                          width={30}
                          height={30}
                          src={"/img/avatars/1.png"}
                          alt={"Avatars"}
                          className="size-50 rounded-22 object-cover"
                        />
                      </div>
                      <div className="col-auto">
                        <div className="text-15 fw-500 lh-14">
                          {!item.reviews
                            ? "Dennis Cheeseman"
                            : item?.reviews?.map((item1) => {
                                return item1?.user?.username;
                              })}
                        </div>
                        <div className="text-14 lh-14 text-light-1 mt-5">
                          {item.designation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* End swiper-wrapper */}

        <div className="d-flex x-gap-15 items-center justify-center pt-30">
          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-left-hover text-white js-prev_active">
              <i className="icon icon-arrow-left" />
            </button>
          </div>
          {/* End .arrow left */}

          <div className="col-auto">
            <div className="pagination -dots text-white-50 js-pagination" />
          </div>
          {/* End col-auto */}

          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-right-hover text-white js-next_active">
              <i className="icon icon-arrow-right" />
            </button>
          </div>
          {/* End .arrow right */}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
