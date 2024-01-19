import React from "react";
// import Seo from "../../components/common/Seo";
// import BlogPagination from "./BlogPagination";
import SearchBox from "./SearchBox";
import Content from "./content";
import MenuButton from "./menuButton";



const Reply = () => {

  return (
    <>
      {/* <Seo pageTitle="Blog List V2" /> */}

      <div className="col-lg-10 pt-30 pb-30">
        <div className="accordion -simple row y-gap-20 js-accordion d-flex justify-content-center">
          <div className="sidebar__item -no-border col-8 d-flex justify-content-center align-items-center" >
            <div className="col-8">
              <SearchBox />
            </div>
            <div className="col-4 h-100">
              <MenuButton />
            </div>

          </div>
          <Content />
        </div>

      </div>
      {/* <section className=" layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-8">
              <BlogPagination />
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
};

export default Reply;
