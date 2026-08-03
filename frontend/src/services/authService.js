import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

export const register = async (user) => {

  const response = await api.post(
    "/auth/register",
    user
  );

  return response.data;

};

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to connect to server.",
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

