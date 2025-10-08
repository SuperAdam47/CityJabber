import React, { useEffect, useState } from "react";
import { getFilteredCategories } from "../../../services/business";
import { useDispatch, useSelector } from "react-redux";
import { AllData } from "../../../features/business/listReducer";
import { SearchSlice } from "../../../features/business/searchSlice";
import Downshift from "downshift";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const searchKey = useSelector((state) => state.Search);
  const { initiateSearchKey } = SearchSlice.actions;

  const selectSIC2Category = (value) => {
    dispatch(
      initiateSearchKey({
        ...searchKey,
        category: value.SIC2Category,
      })
    );

    dispatch(
      AllData({
        ...searchKey,
        category: value.SIC2Category,
      })
    );
  };

  const handleSIC2Category = async (value) => {
    const res = await getFilteredCategories(value);
    if (res?.success) {
      console.log("res", res);
      setCategories(res.categories);
    }
  };

  return (
    <>
      <div className="searchMenu-loc px-20 py-10 bg-white rounded-4 js-form-dd js-liverSearch">
        <Downshift
          onInputValueChange={handleSIC2Category}
          onChange={selectSIC2Category}
          itemToString={(item) => (item ? item.SIC2Category : "")}
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
              <label {...getLabelProps()}>Category</label>
              <input {...getInputProps()} placeholder="Choose category" />
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
                  ? categories
                      .filter(
                        (item) =>
                          !inputValue || item.SIC2Category.includes(inputValue)
                      )
                      .map((item, index) => (
                        <li
                          key={index} /////////// keyadded
                          className="px-30 flex align-center"
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
                          {item.SIC2Category}
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
