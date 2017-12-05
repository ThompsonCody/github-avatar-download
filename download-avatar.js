const request = require('request'),
      fs      = require('fs'),
      token   = require('./secrets.js');

const repoOwner = process.argv[2];
const repoName = process.argv[3];


console.log("Hari Om, welcome to the GittyFubs avatar downroader");



var getRepoContributors = (repoOwner, repoName, cb) => {

  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'ThompsonCody',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    let parsedContributors = JSON.parse(body);
    cb(err, parsedContributors);
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

getRepoContributors(repoOwner, repoName, (err, contributors) => {
  console.log("Errors:", err);

  contributors.forEach((contributor) => {
    let path = `avatars/${contributor.login}.jpg`;
    let url = contributor.avatar_url;
    downloadImageByURL(url, path);
  })

});