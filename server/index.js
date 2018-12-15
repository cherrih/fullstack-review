const express = require('express');
let app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const githubHelpers = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('short'));
app.use(bodyParser());

app.post('/repos', function (req, res) {
  let username = JSON.stringify(req.body.term);
  console.log('USERNAME AT SERVER: ', username);
  githubHelpers.getReposByUsername(username, (err, result) => {
    if (err){
      console.log(err);
    }
    console.log('THIS IS THE RESULT: ', result);
    res.send(JSON.stringify(result))
  });
  
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


//All API access is over HTTPS, and accessed from https://api.github.com. All data is sent and received as JSON.
