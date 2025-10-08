import { useState } from "react";

const Dropdown = ({options,originalOption, handleOptionChange}) => {
  const [selectedItem, setSelectedItem] = useState(originalOption);

  const handleItemClick = (event) => {
    setSelectedItem(event.target.textContent);
    handleOptionChange(event.target.textContent)
  };

  return (
    <div className="dropdown js-dropdown js-services-active">
      <div
        className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-230 text-14 px-10 h-40 text-14"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
        data-bs-offset="0,10"
      >
        <span className="text-16 js-dropdown-title">{selectedItem}</span>
        <i className="icon icon-chevron-sm-down text-7 ml-7" />
      </div>
      <div className="toggle-element -dropdown  dropdown-menu">
        <div className="text-16 y-gap-10 js-dropdown-list">
          {options.length > 0 && options.map((option, index) => (
            <div
              key={index}
              className={`${
                selectedItem === option ? "text-blue-1" : ""
              } js-dropdown-link`}
              onClick={handleItemClick}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
