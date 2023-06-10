import { baseUrl, headers, request } from "./api";

function register({ name, avatar, email, password }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function login({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
}

//check token for user authentication
function checkToken(token) {
  return request(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function updateProfile({ name, avatar }, token) {
  return request(`${baseUrl}/user/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

export { register, login, checkToken, updateProfile };
