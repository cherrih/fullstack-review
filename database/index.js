const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  _id: {type: Number,
        index: true,
        unique: true
  },
  repo_name: String,
  stargazers_count: Number,
  html_url: String,
  username: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  Repo.insertMany(repos, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      console.log('I GOT THE DOCS', docs)
      callback(null, docs);
    }
  })
}

module.exports.save = save;