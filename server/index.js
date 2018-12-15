const express = require('express');
let app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const githubHelpers = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
app.use(bodyParser());

app.post('/repos', (req, res) => {
  let username = req.body.term;
  // console.log('USERNAME AT SERVER: ', username);

  //take username and get the repo information from the github API
  githubHelpers.getReposByUsername(username, (err, result) => {
    if (err){
      console.log(err);
    } 
    // console.log('THIS IS THE RESULT: ', result);
    // save the repo information in the database
    let repos = result.map(repo => {
      return {
        _id: repo.id,
        repo_name: repo.name,
        stargazers_count: repo.stargazers_count,
        html_url: repo.html_url,
        username: repo.owner.login
      }
    });
    // console.log('MAPPED REPOS: ', repos)
    db.save(repos, (err, docs) => {
      console.log('I made it back');
      if (err) {
        console.log(err);
      } else {
        console.log("these are the docs: ", docs)
        res.send(JSON.stringify(repos))
      }
    })    
  });
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  //query string top 25
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


//All API access is over HTTPS, and accessed from https://api.github.com. All data is sent and received as JSON.
