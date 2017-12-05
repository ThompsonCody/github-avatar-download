const request = require('request'),
      fs      = require('fs'),
      token   = require('./secrets.js');

const repoOwner = process.argv[2];
const repoName = process.argv[3];


console.log("Hari Om, welcome to the GittyFubs avatar downroader");


var getRepoContributors = (repoOwner, repoName, callback) => {

  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'ThompsonCody',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };

  request(options, (err, res, body) => {

    let parsedContributors = JSON.parse(body);

    if (parsedContributors.message === "Not Found"){
      callback("Not found", []);
    } else {
      callback(null, parsedContributors);
    }


  });

}

var downloadImageByURL = (url, filepath) => {
  request.get(url)
    .on('error', (err) =>{
        console.log(err);
     })
    .on('response', (res) => {
      console.log(`Response status code: ${res.statusCode}`);
    }).pipe(fs.createWriteStream(filepath));
}

// -------------


if (!(repoOwner, repoName)) {
  console.log("Please enter repo owner and name of the repo");
  return false;
}

getRepoContributors(repoOwner, repoName, (err, contributors) => {

  if (err) {
    console.log(err);
  }

  contributors.forEach((person) => {

    let path = `avatars/${person.login}.jpg`;
    let url = person.avatar_url;

    downloadImageByURL(url, path);
  })

});