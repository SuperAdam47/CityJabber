import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { EffectCards } from "swiper";
import axios from "axios";
import Image from "next/image";
import { getRecentReviews } from "../../../services/review"



const Testimonial = () => {
  const [reviews, setReviews] = useState([])

  
  const getReviewsInPage = async () => {
    const res = await getRecentReviews()
    if (res.success) {
        setReviews(res.reviews)
    }
  }

  useEffect(() => {
    getReviewsInPage()
  }, [])

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
          {reviews.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="testimonials -type-1 bg-white rounded-4 pt-40 pb-30 px-40 shadow-2">
                <div>
                  <h4 className="text-16 fw-500 text-blue-1 mb-10">
                    About CityJabber
                  </h4>
                  <div className="pt-20 mt-28 border-top-light">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <Image
                          width={30}
                          height={30}
                          // src={"/img/avatars/1.png"}
                          src={!item.Avatar
                            ? "/img/avatars/1.png"
                            : item.Avatar}
                          alt={"Avatars"}
                          className="size-50 rounded-22 object-cover"
                        />
                      </div>
                      <div className="col-auto">
                        <div className="text-15 fw-500 lh-14">
                          {item.UserName}
                        </div>
                        <div className="text-14 lh-14 text-light-1 mt-5">
                          This site is truly user-friendly and promotes economic development.
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
