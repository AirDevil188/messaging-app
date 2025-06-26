const host = "http://localhost:3000";

export const handleFetch = async (
  endPoint,
  input = undefined,
  method,
  headers
) => {
  const token = localStorage.getItem("token");
  const options = {
    mode: "cors",
    method: method,
    body: input,
    headers: headers,
  };

  return fetch(host + endPoint, options);
};

// body: JSON.stringify(input),
// headers: {
//   "Content-Type": "application/json",
//   Authorization: "Bearer " + token,
// },
