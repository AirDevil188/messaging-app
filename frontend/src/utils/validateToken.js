import { jwtDecode } from "jwt-decode";

export const validateToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentDate = Date.now() / 1000;

    if (decodedToken.exp < currentDate) {
      localStorage.removeItem("token");
      return;
    }
    return token;
  }
};
