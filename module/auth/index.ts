import axios from "axios";
import { toast } from "react-hot-toast";

export const register = async (data: any) => {
  toast.loading("Loading...");
  try {
    const response = await axios.post(`${process.env.URL}/auth/register`, {
      data,
    });
    toast.dismiss();
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data.message;
    }
  } catch (error: any) {
    toast.dismiss();
    toast.error(error.response.data.message);
  }
};

export const signIn = async (data: any) => {
  toast.loading("Loading...");
  try {
    const response = await axios.post(`${process.env.URL}/auth/login`, {
      data: { email: data.email, password: data.password },
    });
    toast.dismiss();
    if (response.status === 200) {
      toast.success(response.data.message);
      localStorage.setItem("user", response.data.token);
      return response.data.data;
    }
  } catch (error: any) {
    toast.dismiss();
    toast.error(error.response.data.message);
  }
};

export const logout = async () => {
  toast.loading("Loading...");
  try {
    const response = await axios.post(`${process.env.URL}/auth/logout`);

    toast.dismiss();
    if (response.data.success) {
      localStorage.removeItem("user");
      return response.data.success;
    } else {
      console.error(response.data.message);
    }
  } catch (error: any) {
    toast.dismiss();
    toast.error(error.response.data.message);
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
