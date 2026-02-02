import axios from "axios";

export const api = axios.create({
  // URL base da API de dragões (substitua pela sua URL real)
  baseURL: "https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
