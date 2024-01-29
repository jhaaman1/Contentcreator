import axios from "axios";
const API_HOST = 'http://localhost:8080'

class UserServices {
  userlogin(data) {
    return axios({
      method: "post",
      url: API_HOST + "/api/login",
      data: data,
    });
  }
  createuser(data) {
    return axios({
      method: "post",
      url: API_HOST + "/api/register",
      data: data
    });
  }
}

export default new UserServices();
