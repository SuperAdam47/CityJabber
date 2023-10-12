import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Seo from "../../../components/common/Seo";
import Header11 from "../../../components/header/header-6";
import DetailsReview from "../../../components/hotel-single/guest-reviews/DetailsReview";
import Faq from "../../../components/faq/Faq";
import CallToActions from "../../../components/common/CallToActions";
import DefaultFooter from "../../../components/footer/footer-6";
import Link from "next/link";
import RatingTag from "../../../components/hotel-single/RatingTag";
import Overview from "../../../components/hotel-single/Overview";
import PopularFacilities from "../../../components/hotel-single/PopularFacilities";
import axios from "axios";
const HotelSingleV1Dynamic = () => {
  const [dataSource, setDataSource] = useState({});
  const [review, setReview] = useState({
    rContent: "",
    rating: 0,
  });
  const router = useRouter();
  const id = router.query.id;

  const { userData } = useSelector((state) => state.User);
  const handleItem = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/${id}`
    );
    setDataSource(res.data.getAllData[0]);
  };
  useEffect(() => {
    if (!id) <h1>Loading...</h1>;
    else {
      handleItem();
    }
  }, [id]);
  const [star, setStar] = useState(0);
  const handleStarHover = (hoveredRating) => {
    setStar(hoveredRating);
  };

  const handleStarClick = (hover, click) => {
    handleStarHover(click);
    setReview({ ...review, rating: click });
  };

  const starStyle = {
    fontSize: "35px", // Adjust the font size as needed
    cursor: "pointer",
    transition: "color 0.2s", // Add a smooth color transition
  };

  const rating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= star;
      const starColor = isFilled ? "#f39c12" : "#ccc";
      stars.push(
        <span
          key={i + "star"}
          style={{ ...starStyle, color: starColor }}
          onMouseEnter={() => handleStarHover(i)}
          // onMouseLeave={() => handleStarHover(0)}
          onClick={() => handleStarClick(i, star)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleChange = (e) => {
    setReview({ ...review, rContent: e.target.value });
  };
  const addReview = () => {
    if (userData !== null) {
      const data = {
        id: id,
        user: userData._id,
        rDate: new Date(),
        rContent: review.rContent,
        rating: review.rating,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review`, data)
        .then((res) => {
          setReview({
            rContent: "",
            rating: 0,
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("plz, login");
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

      <section className="py-10 d-flex items-center bg-light-2">
        <div className="container">
          <div className="row y-gap-10 items-center justify-between">
            <div className="col-auto">
              <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
                <div className="col-auto">Home</div>
                {/* End .col-auto */}
                <div className="col-auto">&gt;</div>
                {/* End .col-auto */}
                <div className="col-auto">London Hotels</div>
                {/* End .col-auto */}
                <div className="col-auto">&gt;</div>
                {/* End .col-auto */}
                <div className="col-auto">
                  <div className="text-dark-1">
                    Great Northern Hotel, a Tribute Portfolio Hotel, London
                  </div>
                </div>
                {/* End .col-auto */}
              </div>
              {/* End .row */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* <StickyHeader hotel={hotel} /> */}

      <Gallery>
        <div>
          {
            <div className="galleryGrid -type-1">
              {dataSource.BImage === null ? (
                <Item
                  original={"/img/hotels/1.png"}
                  thumbnail={"/img/hotels/1.png"}
                >
                  {({ ref, open }) => (
                    <>
                      <img
                        ref={ref}
                        onClick={open}
                        src={"/img/hotels/1.png"}
                        alt="image"
                        className="rounded-4 relative"
                        role="button"
                      />
                      {
                        <div
                          className="px-20 py-20 absolute "
                          style={{ top: "50%", left: "10%" }}
                        >
                          <div className="row y-gap-10 d-flex flex-column ">
                            <div className="col-auto text-30 text-white lh-14 fw-600">
                              {dataSource.BusinessName}
                            </div>
                            <div className="col-auto text-white text-20 lh-14 fw-400">
                              {dataSource?.reviews?.map((item1) => {
                                return item1?.Rated;
                              })}
                            </div>
                            <div className="col-auto text-white text-20 lh-14 fw-400">
                              {dataSource.Address},{dataSource.City}
                            </div>
                            <div className="col-auto text-white text-15 lh-14 fw-400">
                              {dataSource.Industry}
                            </div>
                          </div>
                        </div>
                      }
                    </>
                  )}
                </Item>
              ) : (
                dataSource?.BImage?.split(",")
                  .slice(0, 5)
                  .map((item1, index) => (
                    <div
                      className={
                        index % 2 === 0
                          ? "galleryGrid__item relative d-flex"
                          : "galleryGrid__item"
                      }
                      key={index + "image"}
                    >
                      <Item
                        original={item1}
                        thumbnail={item1}
                        width={650}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <>
                            <img
                              ref={ref}
                              onClick={open}
                              src={item1}
                              alt="image"
                              className="rounded-4"
                              role="button"
                            />
                            {index == 0 && (
                              <div
                                className="px-20 py-20 absolute "
                                style={{ top: "40%", left: "20%" }}
                              >
                                <div className="row y-gap-10 d-flex flex-column ">
                                  <div className="col-auto text-30 text-white lh-14 fw-600">
                                    {dataSource.BusinessName}
                                  </div>
                                  <div className="col-auto text-white text-20 lh-14 fw-400">
                                    {dataSource?.reviews?.map((item1) => {
                                      return item1?.Rated;
                                    })}
                                  </div>
                                  <div className="col-auto text-white text-20 lh-14 fw-400">
                                    {dataSource.Address},{dataSource.City}
                                  </div>
                                  <div className="col-auto text-white text-15 lh-14 fw-400">
                                    {dataSource.Industry}
                                  </div>
                                </div>
                              </div>
                            )}
                            {index == 4 && (
                              <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                                <div
                                  className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                                  ref={ref}
                                  onClick={open}
                                  role="button"
                                >
                                  See All Photos
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </Item>
                    </div>
                  ))
              )}
            </div>
          }
        </div>
      </Gallery>
      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-10">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  <div className="row pt-10">
                    <div className="col-auto">
                      <Link
                        href={`${id}/upload`}
                        className="button -md -outline-blue-1 text-blue-1"
                      >
                        Add photo
                      </Link>
                    </div>
                    <div className="col-auto">
                      <button className="button -md -outline-blue-1 text-blue-1">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* End .col-12 Property highlights */}

                <div id="overview" className="col-12">
                  <Overview />
                </div>
                {/* End .col-12  Overview */}

                <div className="col-12">
                  <h3 className="text-22 fw-500 pt-40 border-top-light">
                    Most Popular Facilities
                  </h3>
                  <div className="row y-gap-10 pt-20">
                    <PopularFacilities />
                  </div>
                </div>
                {/* End .col-12 Most Popular Facilities */}

                <div className="col-12">
                  <RatingTag />
                </div>
                {/* End .col-12 This property is in high demand! */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <div className="px-30 py-30 border-light rounded-4 shadow-4">
                <div className="row y-gap-10 d-flex flex-column">
                  <div className="col-auto">{dataSource.Web}</div>
                  <div className="col-auto">{dataSource.Phone}</div>
                  <div className="col-auto">{dataSource.Industry}</div>
                </div>
              </div>
            </div>
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>

      <section className="pt-40" id="reviews">
        <div className="container">
          <div className="pt-40">
            <DetailsReview />
            {/* End review with details */}
          </div>

          <div className="row pt-30">
            <div className="col-auto">
              <a href="#" className="button -md -outline-blue-1 text-blue-1">
                Show all 116 reviews{" "}
                <div className="icon-arrow-top-right ml-15"></div>
              </a>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
        {/* End container */}
      </section>
      {/* End Review section */}

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                </div>

                <div>{rating()}</div>
                <div className="form-input">
                  <textarea
                    required
                    rows={6}
                    value={review.rContent}
                    onChange={handleChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Write Your Comment
                  </label>
                </div>
                <div className="col-auto pt-20">
                  <button
                    className="button -md -dark-1 bg-blue-1 text-white"
                    onClick={addReview}
                  >
                    Post Review <div className="icon-arrow-top-right ml-15" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="pt-20 layout-pb-md">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-500">
                  FAQs about
                  <br /> The Crown Hotel
                </h2>
              </div>
              {/* End .row */}

              <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                  <Faq />
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End .pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Faq about sections */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV1Dynamic), {
  ssr: false,
});
