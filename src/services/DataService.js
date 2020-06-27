import Axios from "axios";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { Authorization: user.Authorization };
    } else {
      return {};
    }
  }