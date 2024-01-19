import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import blogsData from "../../data/blogs";
import { useSelector } from 'react-redux'
import { getUserReviews } from "../../services/review"

const Blog2 = () => {

  
  const user = useSelector((state) => state.User.user);
  const [reviews, setReviews] = useState([])

  const getUserReviewsInPage = async (page) => {
    const res = await getUserReviews(page, user._id)
    if (res.success) {
        setReviews(res.reviews)
    }
  }
  
  useEffect(() => {
    if (!user._id) <h1>Loading...</h1>;
    else {
      getUserReviewsInPage()
    }
  }, [])

  return (
    <>
      {reviews.map((item) => (
        <Link
          href={`/blog/blog-details/${item._id}`}
          className="blogCard -type-1 col-12"
          key={item.id}
        >
          <div className="row y-gap-15 items-center md:justify-center md:text-center">
            <div className="col-lg-4">
              <div className="blogCard__image rounded-4">
                <Image
                  width={250}
                  height={250}
                  className="cover w-100 img-fluid"
                  src={item.Images.split(',,')[0]}
                  alt="image"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="text-15 text-light-1">{item.CreatedDate}</div>
              <h3 className="text-22 text-dark-1 mt-10 md:mt-5">
                {item.Title}
              </h3>
              <div className="text-15 lh-16 text-light-1 mt-10 md:mt-5">
                {item.Content}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Blog2;
