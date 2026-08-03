import api from "./api";

export const login = async (email, password) => {

  try {

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message: "Unable to connect to server.",
      }
    );

  }

};

export const register = async (user) => {

  try {

    const response = await api.post(
      "/auth/register",
      user
    );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message: "Unable to register user.",
      }
    );

  }

};

export const getProfile = async () => {

  try {

    const response = await api.get("/auth/profile");

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message: "Unable to fetch profile.",
      }
    );

  }

};