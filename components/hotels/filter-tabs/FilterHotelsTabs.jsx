import { useState } from "react";

const FilterTabsHotels3 = ({setCategory}) => {
  const [filterOption, setFilterOption] = useState("");

  const filterOptions = [
    { label: "Advertising", value: "Advertising & Marketing" },
    { label: "Building", value: "Building & Construction" },
    { label: "Education", value: "Educational Services" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Shopping", value: "Shopping & Stores" },
    { label: "Computer", value: "Computer Software" },
    // add more options as needed
  ];

  return (
    <div className="tabs__controls row x-gap-10 y-gap-10">
      {filterOptions.map((option) => (
        <div className="col-auto" key={option.value}>
          <button
            className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
              filterOption === option.value ? "is-tab-el-active" : ""
            }`}
            onClick={() => {
              setFilterOption(option.value)
              setCategory(option.value)
            } }
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTabsHotels3;
