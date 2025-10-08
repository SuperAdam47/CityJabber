import { useDispatch, useSelector } from "react-redux";
import LocationSearch from "./LocationSearch";
import CategorySerch from "./CategorySearch";
import { AllData } from "../../../features/business/listReducer";

const MainFilterSearchBox = () => {
  
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.Search);

  const search = () => {
    dispatch(AllData(searchKey));
  }
  
  return (
    <>
      <div className="mainSearch -col-3-big bg-white  px-10 py-8 lg:px-15 lg:pt-5 lg:pb-20 rounded-2">
        <div className="button-grid items-center ">
          <div>
            <div className="text-15 text-light-1 ls-2 lh-12">
            <CategorySerch />
            </div>
          </div>
          <div className="">
            <div className="text-15 text-light-1 ls-2 lh-12">
            <LocationSearch />
            </div>
          </div>
          <div className="button-item col-12">
            <button
              className="button -dark-1 py-10 px-20 col-12 rounded-3 bg-red-1 text-white"
              onClick={search} >
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
