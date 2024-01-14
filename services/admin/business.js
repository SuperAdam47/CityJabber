import axios from "axios";

export const getBusinesses = async (page) => {
  try {
    console.log("page", page)
    const params = {
      page
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/business/getBusinesses`,
      { params }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const deleteBusiness = async (_id) => {
  console.log("delete", _id)
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/business/deleteBusiness/${_id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("error in deleting business (service) => ", error);
  }
};

export const updateBusiness = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/business/updateBusiness`,
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
    console.log("error in updating business (service) => ", error);
  }
};