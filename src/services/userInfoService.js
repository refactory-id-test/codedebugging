const axios = require("axios").default;
const {config} = require("../config");

function getUserInfo(token) {

    return axios({
        method: "get",
        url: `${config.apiUrl}/users`,
        headers: {
          Authorization: "token " + token,
        },
      }).then((response) => {
        return response.data;
      });
    
  }

module.exports = getUserInfo //typo
