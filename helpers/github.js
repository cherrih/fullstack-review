const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  //GET /users/:username/repos
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      var info = JSON.parse(body);
      console.log( "ID FROM GIT: ", info.id);
      console.log("REPO NAME FROM GIT: ", info.name);
      callback(null, info);
    }
  })  
}

module.exports.getReposByUsername = getReposByUsername;

// Complete the getReposByUsername function in helpers/github.js. 
// In this function, you'll use the request npm module to fetch 
// a user's repositories from the GitHub API.