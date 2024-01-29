import axios from "axios";
const API_HOST = 'https://pink-happy-newt.cyclic.app'

// console.log("user", user);
class ContentServices {
  createContent(data, user) {
    return axios({
      method: "post",
      url: API_HOST + "/api/submit",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getAllContents(user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/allContent`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
  getContent(id, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  updateContent(data, id, user) {
    return axios({
      method: "put",
      url: `${API_HOST}/api/edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deleteContent(id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/delete/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new ContentServices();
