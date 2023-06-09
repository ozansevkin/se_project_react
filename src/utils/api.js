const baseUrl =
  // "https://my-json-server.typicode.com/ozansevkin/se_project_react";
  "http://localhost:3001";

const headers = new Headers({
  "Content-Type": "application/json",
});

function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Network response was not ok. Status: ${res.status} - ${res.statusText}`
  );
}

async function request(url, options) {
  const res = await fetch(url, options);
  return processServerResponse(res);
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

export {
  getItems,
  addItem,
  deleteItem,
  processServerResponse,
  baseUrl,
  headers,
  request,
};
