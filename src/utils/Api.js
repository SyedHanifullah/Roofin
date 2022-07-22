import axios from "axios";
let envConfig = "http://127.0.0.1:8000/api";

export const Api = async (method, route, data) => {
  const promise = axios({
    method: method,
    url: `${envConfig}/${route}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "content-type": "application/json",
    },
    data: data,
  });

  const response = await promise
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      if (err.response?.status === 404) {
        return err?.response;
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        return err?.response;
      } else {
        return err?.response;
      }
    });

  return response;
};
