import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}