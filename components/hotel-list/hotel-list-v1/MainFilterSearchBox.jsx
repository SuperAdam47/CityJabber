import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainFilterSearchBox = ({ handleChangeData, data, handleSearch }) => {
  // const [suggestions, setSuggestions] = useState([]);
  const handleChange = async (e) => {
    handleChangeData({ ...data, [e.target.name]: e.target.value });
    // const input = e.target.value;
    // if (input.length >= 1) {
    //   try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/common/autocomplete?query=${input}`
    //     );
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch suggestions");
    //     }
    //     const data = await response.json();
    //     setSuggestions(data.suggestions);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   setSuggestions([]);
    // }
  };

  const currentlocation = async () => {
    const response = await axios.get("https://ipapi.co/json/");
    handleChangeData({
      ...data,
      city: response.data.city,
      state: response.data.region_code,
    });
  };
  useEffect(() => {
    currentlocation();
  }, []);

  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
            <div className="text-15 text-light-1 ls-2 lh-16">
              <input
                type="text"
                placeholder="Where are you going?"
                className="js-search js-dd-focus"
                value={data.city}
                onChange={handleChange}
                name="city"
              />
              {/* <div className="shadow-2  min-width-400">
                <div className="bg-blue px-20 py-20 sm:px-0 sm:py-15 rounded-4">
                  <ul className="y-gap-5 js-results">
                    {suggestions.map((item) => (
                      <li
                        key={item._id}
                        className="text-14 lh-12 text-light-1 mt-5"
                      >
                        {item.City}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Category</h4>
            <div className="text-15 text-light-1 ls-2 lh-16">
              <input
                type="search"
                placeholder="Please choose Category"
                className="js-search js-dd-focus"
                value={data.category}
                onChange={handleChange}
                name="category"
              />
            </div>
          </div>

          <div className="button-item h-full">
            <button
              className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white"
              onClick={handleSearch}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
