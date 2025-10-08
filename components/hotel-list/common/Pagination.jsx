const Pagination = ({
  length,
  handleValue,
  currentPage,
  handleItemClick,
  selectedItem,
}) => {
  const options = [10, 20, 30, 40, 50];
  const ItemClick = (event) => {
    handleItemClick(event.target.textContent);
  };
  const handlePageClick = (pageNumber) => {
    handleValue(pageNumber);
  };
  const handleMove = (value) => {
    let page = currentPage + value;
    const end = Math.ceil(length / selectedItem);
    page = page < 1 ? 1 : page <= end ? page : end;
    handleValue(page);
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = () => {
    const end = Math.ceil(length / selectedItem);
    let totalPages = end; // Change this to the actual total number of pages
    if (totalPages > 9) {
      totalPages = 9;
    }
    const pageNumbers = [];
    if (currentPage < 5 || end < 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage + 4 > end) {
      for (let i = 8; i >= 0; i--) {
        pageNumbers.push(end - i);
      }
    } else {
      for (let i = 4; i > 0; i--) {
        const pageNumber = currentPage - i;
        pageNumbers.push(pageNumber);
      }
      pageNumbers.push(currentPage);
      for (let i = 1; i < 5; i++) {
        const pageNumber = currentPage + i;
        pageNumbers.push(pageNumber);
      }
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage)
    );
    return pages;
  };

  return (
    <>
      <div className="border-top-light mt-30 pt-30">
        <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
          <div className="col-md-2 md:order-1">
            <div className="dropdown js-dropdown js-services-active">
              <div
                className="dropdown__button d-flex items-center justify-between bg-white rounded-4 w-230 text-14 px-20 h-50 text-14"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
                data-bs-offset="0,10"
              >
                <span className="js-dropdown-title">{selectedItem}</span>
                <i className="icon icon-chevron-sm-down text-7 ml-10" />
              </div>
              <div className="toggle-element -dropdown  dropdown-menu">
                <div className="text-14 y-gap-15 js-dropdown-list">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedItem === option ? "text-blue-1" : ""
                      } js-dropdown-link`}
                      onClick={ItemClick}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto md:order-2">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleMove(-1)}
            >
              <i className="icon-chevron-left text-12" />
            </button>
          </div>

          <div className="col-md-auto md:order-3">
            <div className="row x-gap-20 y-gap-20 items-center md:d-none">
              {renderPages()}
            </div>

            <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
              {renderPages()}
            </div>

            <div className="text-center mt-30 md:mt-10">
              <div className="text-14 text-light-1">
                1 – 20 of 300+ properties found
              </div>
            </div>
          </div>

          <div className="col-auto md:order-4">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleMove(1)}
            >
              <i className="icon-chevron-right text-12" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
