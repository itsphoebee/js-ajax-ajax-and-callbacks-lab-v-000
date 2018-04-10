$(document).ready(function (){

});

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  let searchTerms = document.getElementById("searchTerms").value;
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url).done(function(response) {
    const results = response.items.map(r => { return (
      `<h2><a href="${r.html_url}">${r.name}</a></h2>
      <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${r.description}</p>
      <hr>`
    )})
    document.getElementById("results").innerHTML = results
  }).fail(error => {
    displayError()
  });
};

function showCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.owner;
  const url = `https://api.github.com/repos/${username}/${repo}/commits`
  $.get(url).done(function(response) {
    let commits = response.map(c => { return (
      `<h3>${c.sha}</h3>
      <p>${c.commit.message}</p>
      <img src="${c.author.avatar_url}" height="32" width="32"><br/>
      ${c.commit.author.name} (<a href="${c.author.url}">${c.author.login}</a>)`
    )});
    document.getElementById("details").innerHTML = commits
  }).fail(error => {
    displayError()
  });
};
