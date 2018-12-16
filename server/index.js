const express = require('express');
let app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const githubHelpers = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/repos', (req, res) => {
  let username = req.body.term;

  githubHelpers.getReposByUsername(username, (err, result) => {
    if (err){
      console.log(err);
    } else {
      console.log('this is result', result)
      let repos = result.map(repo => {
        return {
          _id: repo.id,
          repo_name: repo.name,
          stargazers_count: repo.stargazers_count,
          html_url: repo.html_url,
          username: repo.owner.login,
          user_url: repo.owner.html_url
        }
      });
      db.save(repos, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.send(JSON.stringify(repos))
        }
      })  
    }  
  });
  
});

app.get('/repos', function (req, res) {

  db.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  })
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


