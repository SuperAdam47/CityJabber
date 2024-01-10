import Image from "next/image";
import ReviewGallery from "./ReviewGallery";

const DetailsReview = (props) => {
  const {reviews} = props;

  console.log('review=>', reviews)
  return (
    <div className="row y-gap-60">
      {reviews?.map(review => (
        <div className="col-lg-6">
          <div className="row x-gap-20 y-gap-20 items-center">
            <div className="col-auto">
              {/* <Image
                width={60}
                height={60}
                // src="/img/avatars/2.png"
                src={review.avatar ? review.avatar : "/img/avatars/2.png"}
                alt="image"
              /> */}
              <img
                src={review.avatar ? review.avatar : "/img/avatars/2.png"}
                className="border border-5 rounded-circle p-1"
                style={{ width: "100px", height: "120px" }}
              />
            </div>
            <div className="col-auto">
              <div className="fw-500 lh-15">{review.username}</div>
              <div className="text-14 text-light-1 lh-15">{review.rDate.slice(0, 10)}</div>
            </div>
          </div>
          {/* End .row */}

          <h5 className="fw-500 text-blue-1 mt-20">{review.rTitle}</h5>
          <p className="text-15 text-dark-1 mt-10">
            {review.rContent}
          </p>
        
          {/* <ReviewGallery /> */}
        
          <div className="d-flex x-gap-30 items-center pt-20">
            <button className="d-flex items-center text-blue-1">
              <i className="icon-like text-16 mr-10" />
              Helpful
            </button>
            <button className="d-flex items-center text-light-1">
              <i className="icon-dislike text-16 mr-10" />
              Not helpful
            </button>
          </div>
      </div>
      ))}
      
      {/* End .col */}
    </div>
  );
};

export default DetailsReview;
