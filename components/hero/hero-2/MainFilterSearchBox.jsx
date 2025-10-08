import Router from "next/router";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
// import LocationSearch from "./LocationSearch";
// import CategorySearch from "./CategorySearch";
import LocationSearch from "../../../components/hotel-list/hotel-list-v1/LocationSearch"
import CategorySearch from "../../../components/hotel-list/hotel-list-v1/CategorySearch"

const MainFilterSearchBox = () => {
  return (
    <>
      <div className="mainSearch -w-900 z-2 bg-white pr-10  lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1 mt-40">
        <div className="button-grid items-center">
          <CategorySearch />
          <LocationSearch />
          <div className="button-item">
            <button
              className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
              onClick={() => Router.push("/hotel/hotel-list-v1")}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
