import axios from "axios";

axios.defaults.headers.post["Accept"] = "*/*";

const instance = axios.create({
  baseURL: "http://lorem-ipsum.online/",
});

const jsonInstance = axios.create({
  baseURL: "http://lorem-ipsum.online/",
  headers: { "Content-Type": "application/json" },
});

export const setTokenApi = accessToken => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const clearTokenApi = () => {
  instance.defaults.headers.common["Authorization"] = undefined;
};

export const login = ({ email, password }) =>
  jsonInstance
    .post("/user_token", {
      auth: {
        email,
        password,
      },
    })
    .then(response => {
      return response.data.result === "error"
        ? Promise.reject(response)
        : response;
    });

export const registration = ({ email, password }) =>
  instance
    .post("/users", `email=${email}&password=${password}`)
    .then(response => {
      return response.data.result === "error"
        ? Promise.reject(response)
        : response;
    });
