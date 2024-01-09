import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import Paginations from "../common/Pagination";

const HotelProperties = ({ listData }) => {
  const length = listData.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(10);

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };
  const onChange = (value) => {
    setCurrentPage(value);
  };
  return (
    <>
      {listData
        .filter(
          (item, index) =>
            index >= (currentPage - 1) * selectedItem &&
            index < currentPage * selectedItem
        )
        .map((item, i) => (
          <div className="col-12" key={i}>
            <div className="border-top-light pt-30">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-auto">
                  <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                    <div className="cardImage__content">
                      <div className="cardImage-slider rounded-4  custom_inside-slider">
                        <Swiper
                          className="mySwiper"
                          modules={[Pagination, Navigation]}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                        >
                          {item.BImage === null ? (
                            <SwiperSlide>
                              <Image
                                width={250}
                                height={350}
                                className="rounded-4 col-12 js-lazy"
                                src={"/img/hotels/1.png"}
                                alt="image"
                              />
                            </SwiperSlide>
                          ) : (
                            item.BImage.split(",").map((slide, i) => (
                              <SwiperSlide key={i}>
                                <Image
                                  width={250}
                                  height={350}
                                  className="rounded-4 col-12 js-lazy"
                                  src={slide}
                                  alt="image"
                                />
                              </SwiperSlide>
                            ))
                          )}
                        </Swiper>
                      </div>
                    </div>
                    {/* End image */}

                    <div className="cardImage__wishlist">
                      <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                        <i className="icon-heart text-12"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-md">
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-md">
                      <h3 className="text-18 lh-16 fw-500">
                        <Link href={`/hotel/${item._id}`}>
                          {i + (currentPage - 1) * selectedItem + 1}.&nbsp;
                          {item?.BusinessName} &nbsp;
                        </Link>
                        <br className="lg:d-none" />
                      </h3>
                      <div style={{display: "flex"}}>
                        <div style={{width: "25px", height: "25px", borderRadius: "50%", border: "0.1px solid rgb(205, 209, 215)", backgroundColor: "#f77100", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <i className="icon-star text-15 text-white"></i>
                        </div>
                        <div style={{width: "25px", height: "25px", borderRadius: "50%", border: "0.1px solid rgb(205, 209, 215)", backgroundColor: "#f77100", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <i className="icon-star text-15 text-white"></i>
                        </div>
                        <div style={{width: "25px", height: "25px", borderRadius: "50%", border: "0.1px solid rgb(205, 209, 215)", backgroundColor: "#f77100", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <i className="icon-star text-15 text-white"></i>
                        </div>
                        <div style={{width: "25px", height: "25px", borderRadius: "50%", border: "0.1px solid rgb(205, 209, 215)", backgroundColor: "#f77100", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <i className="icon-star text-15 text-white"></i>
                        </div>
                        <div style={{width: "25px", height: "25px", borderRadius: "50%", border: "0.1px solid rgb(205, 209, 215)", backgroundColor: "#f77100", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <i className="icon-star text-15 text-white"></i>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-md-auto text-right md:text-left">
                      <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                        <div className="col-auto">
                          <div className="text-14 lh-14 fw-500">
                            Exceptional
                          </div>
                          <div className="text-14 lh-14 text-light-1">
                            {item?.reviews?.length} reviews
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                            {item?.reviews?.map((item) => item.Rated)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      {/* <p className="text-15">
                        {item?.SIC2Category} / {item?.SIC4Category} /
                        {item?.SIC8Category}{" "}
                      </p> */}
                      <p className="text-15">
                        {item?.SIC2Category}
                      </p>
                    </div>
                  </div>
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-md">
                      <div className="col-auto">
                        <button
                          data-x-click="mapFilter"
                          className="d-block text-16 text-blue-1 underline"
                        >
                          Show on map
                        </button>
                      </div>
                      <div className="text-14 lh-10 mt-20">
                        <div className="fw-500">{item?.MarketVariable}</div>
                      </div>
                      <div className="row x-gap-10 y-gap-10 pt-20">
                        <div className="col-auto">
                          <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                            Breakfast
                          </div>
                        </div>

                        <div className="col-auto">
                          <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                            WiFi
                          </div>
                        </div>

                        <div className="col-auto">
                          <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                            Spa
                          </div>
                        </div>

                        <div className="col-auto">
                          <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                            Bar
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-auto">
                      <div className="">
                        <div className="text-16 lh-12 fw-600 mt-50 md:mt-20">
                          {item?.AnnualRevenue}
                        </div>
                        <Link
                          href={`/hotel/${item._id}`}
                          className="button -md -dark-1 bg-blue-1 text-white mt-24"
                        >
                          See Availability{" "}
                          <div className="icon-arrow-top-right ml-15"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-md */}
              </div>
            </div>
          </div>
        ))}
      <Paginations
        length={length}
        handleValue={onChange}
        currentPage={currentPage}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default HotelProperties;
