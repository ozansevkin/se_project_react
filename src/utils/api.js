const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.ozansevkin.dev"
    : "http://localhost:3001";

// Fake Online REST API
// "https://my-json-server.typicode.com/ozansevkin/se_project_react"

const headers = new Headers({
  "Content-Type": "application/json",
});

async function request(url, options) {
  const res = await fetch(url, options);
  return processServerResponse(res);
}

async function processServerResponse(res) {
  const data = await res.json();

  if (res.ok) return data;

  return handleUnsuccesfulServerResponse(data, res);
}

function handleUnsuccesfulServerResponse(data, res) {
  const { status, statusText } = res;
  let { message, validation } = data;

  if (validation) {
    message = validation.body.message;
  }

  return Promise.reject({
    status: `Network response was not ok. Status: ${status} - ${statusText}`,
    message,
  });
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function addItemLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function removeItemLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  addItemLike,
  removeItemLike,
  processServerResponse,
  baseUrl,
  headers,
  request,
};
