import { useState, useEffect } from 'react';

export default function useFetch(url, optionsStr) {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Changing loading state to true whenever there's an effect
    setLoading(true);
    setSuccess(false);
    const controller = new AbortController();

    // asynchronous function to make API call
    async function fetchData() {
      try {
        const options = JSON.parse(optionsStr);

        // Making API call through custom proxy server
        const proxyOptions = {
          method: options.method,
          signal: controller.signal,
        };
        const proxyParams = new URLSearchParams({
          apiURL: url,
          apiOptions: optionsStr,
        });
        const proxyUrl = `http://localhost:3000/?${proxyParams}`;
        const response = await fetch(proxyUrl, proxyOptions);

        // Checking if the request was a success
        setSuccess(response.ok);
        if (!response.ok) {
          if (!response.body) {
            throw new Error(`Status Code: ${response.status}\nError Message: ${response.statusText}`);
          } else {
            const errorResponse = await response.json();
            throw new Error(`Status Code: ${response.status}\nAPI Error Message: ${errorResponse.message}`);
          }
        }

        // Extracting the content body
        const content = (options.headers['content-type'] === 'text/html') ? await response.text() : await response.json();
        setData(content);
      } catch (error) {
        setData({ error: `${error.message}` });
      } finally {
        // Changing loading state to false whenever the API request ends in success or failure
        setLoading(false);
      }
    }

    if (url) {
      fetchData();
    } else {
      setLoading(false);
      setSuccess(true);
    }

    return () => {
      controller.abort();
    };
  }, [url, optionsStr]);
  return { data, success, loading };
}
