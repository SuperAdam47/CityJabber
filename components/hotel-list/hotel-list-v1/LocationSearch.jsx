import React, { useEffect, useState } from "react";
import { getFilteredCities, getCities } from "../../../services/business";
import { useDispatch, useSelector } from "react-redux";
import { AllData } from "../../../features/business/listReducer";
import { SearchSlice } from "../../../features/business/searchSlice";
import Downshift from "downshift";
import axios from "axios";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const searchKey = useSelector((state) => state.Search);
  const { initiateSearchKey } = SearchSlice.actions;

  const selectCity = (value) => {
    dispatch(
      initiateSearchKey({
        ...searchKey,
        city: value.City,
        state: value.StateCode,
      })
    );

    dispatch(
      AllData({
        ...searchKey,
        city: value.City,
        state: value.StateCode,
      })
    );
  };

  const handleCity = async (value) => {
    const res = await getFilteredCities(value);
    if (res.success) {
      setCities(res.cities);
    }
  };

  const currentlocation = async () => {
    const response = await axios.get("https://ipapi.co/json/");

    // dispatch(initiateSearchKey({
    //   ...searchKey, city: response.data.city, state: response.data.region_code,
    // }))
  };

  useEffect(() => {
    currentlocation();
    dispatch(
      initiateSearchKey({
        ...searchKey,
        city: "",
        state: "",
        category: "",
      })
    );
  }, []);

  return (
    <>
      <div className="searchMenu-loc px-20 py-10 bg-white rounded-4 js-form-dd js-liverSearch">
        <Downshift
          onInputValueChange={handleCity}
          onChange={selectCity}
          itemToString={(item) =>
            item ? item.City + ", " + item.StateCode : ""
          }
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <label {...getLabelProps()}>Location</label>
              <input {...getInputProps()} placeholder="Where are you?" />
              {/* <button {...getToggleButtonProps()}>{isOpen ? 'close' : 'open'}</button> */}

              <ul
                {...getMenuProps()}
                className="col-11"
                style={{
                  position: "absolute",
                  overflowY: "scroll",
                  cursor: "pointer",
                  overflowX: "none",
                }}
              >
                {isOpen
                  ? cities
                      .filter(
                        (item) => !inputValue || item.City.includes(inputValue)
                      )
                      .map((item, index) => (
                        <li
                          key={index}
                          className="px-10 flex align-center" ///// keyadded
                          {...getItemProps({
                            key: item.index,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? "lightgray"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal",
                            },
                          })}
                        >
                          {item.City}, {item.StateCode}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
      </div>
    </>
  );
};

export default SearchBar;
