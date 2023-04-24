const baseUrl =
  "https://my-json-server.typicode.com/ozansevkin/se_project_react";

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

function apiGetItems() {
  return request(`${baseUrl}/items`);
}

function apiAddItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
}

function apiDeleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { apiGetItems, apiAddItem, apiDeleteItem, processServerResponse };
