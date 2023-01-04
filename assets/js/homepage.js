var getUserRepos = function (user) {
  // format url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // pass in url to make a request
  fetch(apiUrl).then(function (response) {
    // json method formats the response as JSON -> returns a promise
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos("nblake707");
