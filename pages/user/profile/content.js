import { useState, useEffect } from "react";
import { getUserReviews } from "../../../services/review"
import { useSelector } from 'react-redux'


const Content = () => {
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
            <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                    {reviews && reviews.map((item) => (
                        <div className="col-12" key={item._id}>
                            <div className="accordion__item px-20 py-20 border-light rounded-4">
                                <div
                                    className="accordion__button d-flex items-center"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${item.CollapseTarget}`}
                                >
                                    <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                                        <i className="icon-plus" />
                                        <i className="icon-minus" />
                                    </div>
                                    <div className="button text-dark-1 text-start">{item.Content}</div>
                                </div>
                                {/* End accordion button */}

                                <div
                                    className="accordion-collapse collapse"
                                    id={item.CollapseTarget}
                                    data-bs-parent="#Faq1"
                                >
                                    <div className="pt-15 pl-60">
                                        <p className="text-15">{item.Reply}</p>
                                    </div>
                                </div>
                                {/* End accordion conent */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Content;
