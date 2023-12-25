import axios from "axios";

export const register = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.URL}/auth/register`, {
      data,
    });
    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const signIn = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.URL}/auth/login`, {
      data: { email: data.email, password: data.password },
    });
    if (response.status === 200) {
      localStorage.setItem("user", response.data.token);
      return response.data.data;
    }
  } catch (error: any) {
    console.error(error);
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
