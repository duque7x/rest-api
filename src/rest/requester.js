// src/rest/requester.js
const axios = require('axios');

module.exports = async function requester(method, url, token, data) {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data,
  };
  try {
    const res = await axios(config);
    return res.data.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code that falls out of the range of 2xx
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('Bad Request: Invalid syntax or data');
          break;
        case 401:
          console.error('Unauthorized: Authentication required');
          break;
        case 404:
          console.error('Not Found: The requested resource could not be found');
          break;
        case 500:
          console.error('Server Error: There was an issue with the server');
          break;
        default:
          console.error(`Unexpected Error: ${status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the URL');
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
    }
  };
}