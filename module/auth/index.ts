import axios from "axios";

export const getInfo = async () => {
  try {
    const token = localStorage.getItem("user");
    const response = await axios.post(`${process.env.URL}/auth/userinfo`, {
      headers: { Authorization: token },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      localStorage.removeItem("user");
    }
  } catch (error) {
    localStorage.removeItem("user");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${process.env.URL}/auth/logout`);

    if (response.data.success) {
      localStorage.removeItem("user");
      return response.data.success;
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
