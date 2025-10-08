import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Category from "./Category";
import Maininfo from "./MainInfo";
import BusinessOwner from './BusinessOwner';
import { updateBusiness } from '../../../services/admin/business';
import { ToastContainer, toast } from "react-toastify";
import router from "next/router";
import { useSelector, useDispatch } from "react-redux"
import { BusinessInfoSlice } from "../../../features/business/businessInfoSlice";


const BusinessTabs = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [formData, setFromData] = useState({})
  const user = useSelector((state) => state.User?.user);
  const businessInfo = useSelector((state) => state.BusinessInfo);
  const dispatch = useDispatch();
  const { initiateBusinessInfo } = BusinessInfoSlice.actions


  const handleFromData = (newData) => {
    const newForm = { ...formData, ...newData }
    dispatch(initiateBusinessInfo(newForm))

    setFromData(formData => ({
      ...formData,
      ...newData
    }));


  }

  const updateBusinessInfo = async (ownerInfo) => {

    const addData = {
      id: businessInfo.BusinessId,
      businessname: businessInfo.BusinessName,
      images: businessInfo.BImage,
      industry: businessInfo.Industry,
      city: businessInfo.City,
      state: businessInfo.StateCode,
      address: businessInfo.Address,
      locationType: businessInfo.LocationType,
      zipcode: businessInfo.ZIPCode,
      sic: businessInfo.SIC,
      sic2: businessInfo.SIC2Category,
      sic4: businessInfo.SIC4Category,
      sic8: businessInfo.SIC8Category,
      naics: businessInfo.NAICS,
      userId: user._id,
      ownername: ownerInfo.ContactName,
      phone: ownerInfo.Phone,
      web: ownerInfo.Web,
      coordinates: ownerInfo.Coordinates,
      market: ownerInfo.MarketVariable,
      annual: ownerInfo.AnnualRevenue,
      created: ownerInfo.YearFounded
    }


    const res = await updateBusiness(addData);

    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push("/businessowner/business");
      }, 2000);
    } else {
      toast.error(res.message);
    }
  }

  const tabs = [
    {
      label: "Main Information",
      content: <Maininfo handleData={handleFromData} businessInfo={businessInfo} />,
    },
    {
      label: "Category",
      content: <Category handleData={handleFromData} businessInfo={businessInfo} />,
    },
    {
      label: "Business Owner",
      content: <BusinessOwner addData={updateBusinessInfo} handleData={handleFromData} businessInfo={businessInfo} />,
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
      <ToastContainer />
    </Tabs>
  );
};

export default BusinessTabs;
