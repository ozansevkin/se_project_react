import { baseUrl, headers, request } from "./api";

//signup for user registration
function register({ name, avatar, email, password }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

//signin for user authorization
function login({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
}

export { register, login };
