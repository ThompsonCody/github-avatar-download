const request = require('request'),
      fs      = require('fs');

var getRepoContributors = (repoOwner, repoName, cb) => {

}

getRepoContributors("jquery", "jquery", (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
});