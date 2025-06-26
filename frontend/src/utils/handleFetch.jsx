const host = "http://localhost:3000";

export const handleFetch = async (
  endPoint,
  input = undefined,
  method,
  headers
) => {
  const options = {
    mode: "cors",
    method: method,
    body: input,
    headers: headers,
  };

  return fetch(host + endPoint, options);
};
