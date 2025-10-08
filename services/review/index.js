import axios from "axios";

export const getReviews = async (page, businessId) => {

  try {
    const params = {
      page,
      businessId
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/getReviews`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getRecentReviews = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/getRecentReviews`,
      {}
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getUserReviews = async (page, userId) => {

  try {
    const params = {
      page,
      userId
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/getUserReviews`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export const updateReview = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review/updateReview`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error in updating review (service) => ", error);
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

