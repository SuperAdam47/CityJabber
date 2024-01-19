import axios from "axios";

export const getFAQs = async (page, businessId) => {


  try {
    const params = {
      page,
      businessId
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/faq/getFAQs`,
      {
        params: params
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const handleFAQ = async (id, status) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/faq/handleFAQ`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error in updating faq (service) => ", error);
  }
};

export const createFAQ = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/faq/createFAQ`,
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
    console.log("error in creating faq (service) => ", error);
  }
};

export const updateFAQ = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/faq/updateFAQ`,
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
    console.log("error in updating faq (service) => ", error);
  }
};

export const deleteFAQ = async (_id) => {

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/faq/deleteFAQ/${_id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("error in deleting faq (service) => ", error);
  }
};
