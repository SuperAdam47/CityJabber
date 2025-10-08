import { useState, useEffect } from "react";
import { getFAQs } from "../../services/faq";

const Faq = () => {

    const [FAQs, setFAQs] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(10);
    const handleItemClick = (value) => {
        setSelectedItem(value);
    };

    const onChange = (value) => {
        setCurrentPage(value);
    };

    const getFAQsInPage = async (page) => {
        const res = await getFAQs(page)
        if (res.success) {
            setFAQs(res.FAQs)
        }
    }

    useEffect(() => {
        getFAQsInPage()
    }, [])

    return (
        <>
            <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                    {FAQs && FAQs.map((item) => (
                        <div className="col-12" key={item.id}>
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
                                    <div className="button text-dark-1 text-start">{item.Question}</div>
                                </div>
                                {/* End accordion button */}

                                <div
                                    className="accordion-collapse collapse"
                                    id={item.CollapseTarget}
                                    data-bs-parent="#Faq1"
                                >
                                    <div className="pt-15 pl-60">
                                        <p className="text-15">{item.Answer}</p>
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

export default Faq;
