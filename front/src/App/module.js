import axios from "axios";
const serverUrl = "http://localhost:2000";

export const getUser = () => {
  return axios.get(`${serverUrl}/get-users`).then((res) => res.data);
};

export const addUser = (name) => {
  return axios
    .post(`${serverUrl}/user-create`, { name })
    .then((res) => res.data);
};

export const removeUser = (id) => {
  return axios
    .delete(`${serverUrl}/delete-users/${id}`)
    .then((res) => res.data);
};
