import DealsFilter from "../sidebar/DealsFilter";
import Map from "../sidebar/Map";
import SearchBox from "../sidebar/SearchBox";
import PopularFilters from "../sidebar/PopularFilters";
import AminitesFilter from "../sidebar/AminitesFilter";
import RatingsFilter from "../sidebar/RatingsFilter";
import CategoryFilter from "../sidebar/CategoryFilter";
import GuestRatingFilters from "../sidebar/GuestRatingFilters";
import StyleFilter from "../sidebar/StyleFilter";
import NeighborhoddFilter from "../sidebar/NeighborhoddFilter";
import PirceSlider from "../sidebar/PirceSlider";
import MainFilterSearchBox from "./MainFilterSearchBox";

const Sidebar = ({handleCategoryLevel}) => {
  const handleCategoryL = level => {
    let newLevelSet = level.filter(v => v.active).map(v => v.category)
    handleCategoryLevel(newLevelSet)
  }

  return (
    <>
      <div className="sidebar__item -no-border position-relative">
        <Map />
      </div>
      {/* End find map */}

      {/* <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Search Location & Category</h5>

          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox />
          </div>
        </div>
      </div> */}
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Search by property name</h5>
        <SearchBox />
      </div>
      {/* End search box */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Category</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <CategoryFilter handleCategoryLevel={handleCategoryL} />
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Deals</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <DealsFilter />
          </div>
        </div>
      </div> */}
      {/* End deals filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Popular Filters</h5>
        <div className="sidebar-checkbox">
          <PopularFilters />
        </div>
      </div> */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Nightly Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Aminities</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
      </div> */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Star Rating</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingsFilter />
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Guest Rating</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters />
        </div>
      </div> */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Style</h5>
        <div className="sidebar-checkbox">
          <StyleFilter />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Neighborhood</h5>
        <div className="sidebar-checkbox">
          <NeighborhoddFilter />
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
