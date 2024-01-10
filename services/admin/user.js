import axios from "axios";

export const getUsers = async (page) => {
  try {
    console.log("page",page)
    const params = {
      page
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/getUsers`,
      {params}
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const deleteUser = async (_id) => {
  console.log("delete", _id)
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/deleteUser/${_id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("error in update (service) => ", error);
  }
};

export const updateUser = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/updateUser`,
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
    console.log("error in register (service) => ", error);
  }
};