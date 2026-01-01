import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      if (
        originalRequest.url === "/api/user/refresh-token" ||
        originalRequest.url?.includes("refresh-token")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      console.log("Token expired. refreshing...");

      try {
        await axios({
          method: "post",
          url: "http://localhost:8080/api/user/refresh-token",
          withCredentials: true,
        });

        console.log("Refresh successful. Retrying original request...");
        return axiosAdmin(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token invalid/expired. Logging out.");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
