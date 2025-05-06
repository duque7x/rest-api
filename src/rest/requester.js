// src/rest/requester.js
const { request } = require('undici');

module.exports = async function requester(method, url, token, data) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    body: data !== undefined ? JSON.stringify(data) : undefined, // If data exists, stringifying it
  };

  try {
    const res = await request(url, options);
    const responseData = await res.body.json();

    return responseData.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error occurred', error);
    }
    return error;
  }
};
