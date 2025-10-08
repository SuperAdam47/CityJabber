import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Category from "./Category";
import Maininfo from "./MainInfo";
import BusinessOwner from './BusinessOwner';
import { require_business } from '../../../../services/business';
import { ToastContainer, toast } from "react-toastify";
import router from "next/router";

const Index = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [formData, setFromData] = useState({})

  const user = useSelector((state) => state.User?.user);

  const handleFromData = (newData) => {
    setFromData(formData => ({
      ...formData,
      ...newData
    }));
  }

  const addBusinessInfo = async (ownerInfo) => {
    const addData = {
      BusinessName: formData.businessname,
      BImage: formData.images,
      Industry: formData.industry,
      City: formData.city,
      StateCode: formData.state,
      Address: formData.address,
      LocationType: formData.locationType,
      ZIPCode: formData.zipcode,
      SIC: formData.sic,
      SIC2: formData.sic2,
      SIC4: formData.sic4,
      SIC8: formData.sic8,
      NAICS: formData.naics,
      UserId: user._id,
      ContactName: ownerInfo.ownername,
      Phone: ownerInfo.phone,
      Web: ownerInfo.web,
      Coordinate: ownerInfo.coordinate,
      MarketVariable: ownerInfo.market,
      AnnualRevenue: ownerInfo.annual,
      YearFounded: ownerInfo.created
    }

    const res = await require_business(addData);

    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error(res.message);
    }
  }

  const tabs = [
    {
      label: "Main Information",
      content: <Maininfo handleData={handleFromData} />,
    },
    {
      label: "Category",
      content: <Category handleData={handleFromData} />,
    },
    {
      label: "Business Owner",
      content: <BusinessOwner addData={addBusinessInfo} />,
    },
  ];



  return (
    <Tabs
      className="tabs -underline-2 js-tabs"
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}

    >
      <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 pl-90 pr-90">
        {tabs.map((tab, index) => (
          <Tab key={index} className="col-auto">
            <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
              {tab.label}
            </button>
          </Tab>
        ))}
      </TabList>

      <div className="tabs__content pt-30 js-tabs-content pr-90 pl-90">
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            className={`-tab-item-${index + 1} ${tabIndex === index ? "is-tab-el-active" : ""
              }`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default Index;
