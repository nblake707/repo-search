var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  // stops the browser from performing the default action the event wants it to do.
  // prevents the browser from sending the form's input data to a URL -> we'll handle what happens with the form input data ourselves
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a Github username");
  }
};

var displayRepos = function (repos, searchTerm) {
  // check if user has no repos
  if (repos.length === 0) {
    repoContainerEl.testContent = "No repositories found.";
    return;
  }

  // clear out old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }

  console.log(repos);
  console.log(searchTerm);
};

var getUserRepos = function (user) {
  // format url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // pass in url to make a request
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        // json method formats the response as JSON -> returns a promise
        response.json().then(function (data) {
          displayRepos(data, user);
        });
        return;
      }
      alert("Error: Github user not found.");
    })
    .catch(function (error) {
      alert("Unable to connnect to Github");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
