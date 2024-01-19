import { useState } from "react";
import AllBusinesses from './AllBusinesses';
import RequiredBusinesses from './RequiredBusinesses';
import SponsorBusinesses from './SponsorBusinesses';

const BusinessTable = () => {

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "All Businesses",
    "Required Businesses",
    "Sponsor Businesses",
  ];

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${activeTab === index ? "is-tab-el-active" : ""
                  }`}
                onClick={() => handleTabClick(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        {activeTab === 0 &&
          <AllBusinesses />
        }
        {activeTab === 1 &&
          <RequiredBusinesses />
        }
        {activeTab === 2 &&
          <SponsorBusinesses />
        }
      </div>
    </>
  );
};



export default BusinessTable;

