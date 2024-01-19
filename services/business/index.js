import axios from "axios";

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

export const getRestaurantData = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/restaurantData`
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

export const getCities = async () => {

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/getCities`
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getFilteredCities = async (keyword) => {

  try {
    const params = {
      keyword
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/getFilteredCities`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getFilteredCategories = async (keyword) => {

  try {
    const params = {
      keyword
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/getFilteredCategories`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getBusiness = async (userId) => {

  try {
    const params = {
      userId
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/getBusiness`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getBusinessesByCategory = async (category) => {

  try {
    const params = {
      category
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business/getBusinessesByCategory`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
