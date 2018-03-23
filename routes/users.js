var express = require('express');
var router = express.Router();
var axios = require('axios');
var secrets = require('../secrets');

var userDB = require('../userDB');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req,res,next) {
  const code = req.body.code;
  if (!code) res.status(400);
  console.log('SERVER GOT ON LOGIN CODE', code);
  const requestBody = {
    client_id: secrets.GITHUB_CLIENT_ID,
    client_secret: secrets.GITHUB_CLIENT_SECRET,
    code: code,
    redirect_uri: 'http://localhost:3000/login'
  };
  let accessToken = '';
  axios.post('https://github.com/login/oauth/access_token', requestBody)
    .then(response => {
      accessToken = response.data;
      console.log(response.data);
      return axios.get('https://api.github.com/user?'+accessToken)
    }).then(githubUser => {
      const { login, id, avatar_url } = githubUser.data;
      // TODO: add real auth
      const token = require('crypto').randomBytes(64).toString('hex');
      userDB.push({username: login, id, avatar_url, accessToken, token});

      res.json({ username: login, id, avatar_url, token});
  })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
  })

});

module.exports = router;
