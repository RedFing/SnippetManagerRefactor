var express = require('express');
var router = express.Router();

var axios = require('axios');


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