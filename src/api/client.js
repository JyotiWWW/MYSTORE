// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import { BASE_URL } from "../env";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    headers: {
      ...headers,
      ...customConfig,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(`${BASE_URL}${endpoint}`, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
    console.log(" getCartProducts 2",customConfig);

  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
