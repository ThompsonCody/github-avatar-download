const request = require('request'),
      fs      = require('fs'),
      token = require('./secrets.js');


console.log("Hari Om, welcome to the GittyFubs avatar downroader")


var getRepoContributors = (repoOwner, repoName, cb) => {

  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'ThompsonCody',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", (err, res) => {
  console.log("Errors:", err);
  // console.log("Result:", res);
  let contributors = JSON.parse(res);

  for(let value in contributors){
    console.log(contributors[value].avatar_url);
  }
});

/*
function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  request(url, function(err, res, body) {
    cb(err, body);
  });
}*/