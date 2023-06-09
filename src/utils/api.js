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

function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  processServerResponse,
  baseUrl,
  headers,
};
