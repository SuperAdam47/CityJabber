import axios from "axios";

export const getFAQs = async (page) => {

  try {
    const params = {
      page
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faq/getFAQs`,
      { params }
    );
    const data = res.data;
    console.log('data==>', data)
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getRecentData = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/recentData`
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};


export const getSearchData = async (sendData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/businessList`,
      sendData
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const require_business = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/requireBusiness`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error in require business (service) => ", error);
  }
};

