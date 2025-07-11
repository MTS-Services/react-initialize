// axios.js
import axios from "axios";
import i18n from "../i18n";

const instance = axios.create({
  baseURL: "http://i00co4wkw84wsookcck4sows.168.231.110.32.sslip.io/api",
});

// Request Interceptor: Attach language and token
instance.interceptors.request.use(
  (config) => {
    // Get current language
    const language = i18n.language || "nl";

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const token = userInfo?.data?.token;

    // Attach headers
    config.headers["Accept-Language"] = language;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
