const axios = require("axios");
const UserServices = require("./userInfoService");
const { config } = require("../config");

function callback(req, res) {
  const body = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: req.query.code,
  };
  const options = { headers: { accept: "application/json" } };
  axios
    .post(`${config.oauthUrl}/access_token`, body, options)
    .then((res) => res.data.access_token)
    .then((accessToken) => {
      return UserServices(accessToken);
    })
    .then(user => {
      console.log(user, "<<<<<<");
      res.json({
        data: {
          login: user[0].login,
          githubId: user[0].id,
          avatar: user[0].avatar_url,
          email: user[0].email,
          name: user[0].name,
          location: user[0].location,
        },
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = {
  callback: callback,
};
