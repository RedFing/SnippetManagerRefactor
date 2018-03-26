var express = require('express');
var router = express.Router();
var userDB = require('../userDB');
var axios = require('axios');
var process = require('process');
/* LOGIN USER */
router.post('/login', function (req,res,next) {
    const code = req.body.code;
    if (!code) res.status(400);
    console.log('SERVER GOT ON LOGIN CODE', code);
    const requestBody = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI
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

/* GET gists */
router.get('/gists/:pageNumber/:fetchSize', function(req, res, next) {
   const user = req.user;
   const pageNumber = req.params.pageNumber;
   const fetchSize = req.params.fetchSize;
   if (!user) res.status(401);
   console.log('USER IS ', user);
   axios.get('https://api.github.com/gists?'+user.accessToken+'&page='+pageNumber+'&page_size='+fetchSize)
     .then(response => {
         const pureGists = stripUnnecessaryFromGists(response.data);
         res.json(pureGists);
     }).catch(err => {
       console.log(err);
       res.status(401).send('Unauthorized');
   })
});
router.get('/gist/:gistId', function (req,res,next){
  const user = req.user;
  if (!user) res.status(401).send('Unauthorized');
  const gistId = req.params.gistId;
  axios.get('https://api.github.com/gists/'+gistId+'?'+user.accessToken)
    .then(response => {
        const gist = stripUnnecessaryFromFormGist(response.data);
        res.json(gist);
    }).catch(err => {
      console.log(err);
      res.status(401).send('Unauthorized');
  });
});
router.delete('/gist/:gistId', function (req,res,next) {
  const user = req.user;
  if (!user) res.status(401).send('Unauthorized');
  const gistId = req.params.gistId;
  axios.delete('https://api.github.com/gists/'+gistId+'?'+user.accessToken)
    .then(() => {
      res.status(200).send();

    }).catch(err => res.status(401).send('Unauthorized'));
});
module.exports = router;
router.post('/gist', function (req,res,next) {
  const user = req.user;
  if (!user) res.status(401).send('Unauthorized');
  const requestBody = {
    description: req.body.description,
    public: !req.body.isPrivate,
    files: {
      [req.body.filename] : {
        content: req.body.content
      }
    }
  };
  axios.post('https://api.github.com/gists?'+user.accessToken, requestBody)
    .then(response => {
       const [newGist,...rest] = stripUnnecessaryFromGists([response.data]);
       res.json(newGist);
    }).catch(err => res.status(400).send('Unauthorized'));

});

router.put('/gist/:id', function (req,res,next) {
  const user = req.user;
  if (!user) res.status(401).send('Unauthorized');
  let requestBodyFilesObject = {
    content: req.body.content
  };
  if (req.body.oldFilename != req.body.filename){
    requestBodyFilesObject.filename = req.body.filename
  }

  const requestBody = {
    description: req.body.description,
    files: {
      [req.body.oldFilename]: requestBodyFilesObject
    }
  };
  console.log('REQUEST BODY IS ', requestBody);
  axios.patch('https://api.github.com/gists/'+req.params.id+'?'+user.accessToken, requestBody)
    .then(response => {
      const [editedGist,...rest] = stripUnnecessaryFromGists([response.data]);
      res.json(editedGist);
    }).catch(err => {console.log(err); res.status(401).send('Unauthorized')});
});

// TODO extreact 140 to constants
const truncateDescription  = description => {
    if (description.length > 140) return description.substring(0, 140) + '...';
    return description;
}

const stripUnnecessaryFromGists = gists => gists.map(el =>
  ({
    id: el.id,
    description: el.description,
    createdAt: el.created_at,
    name: el.files[Object.keys(el.files)[0]].filename
  })
);

const stripUnnecessaryFromFormGist = gist => {
  const fileName = Object.keys(gist.files)[0];
  const file = gist.files[fileName];
  const gistObject = {
    filename: fileName,
    content: file.content,
    id: gist.id,
    description: gist.description,
    createdAt: gist.created_at
  };
  return gistObject;
};