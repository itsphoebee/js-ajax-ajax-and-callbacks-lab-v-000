$(document).ready(function (){

});

function displayError() {
  $("#errors").html("error")
}

function searchRepositories() {
  let searchTerms = document.getElementById("searchTerms").value;
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url).done(function(response) {
    const results = response.items.map(r => { return (
      `<h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3><br/>
      <em>${r.description}</em><br />
      <small><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></small>
      <p></p>
      <img src="${r.owner.avatar_url}" height="32" width="32"/><br />
      <a href="${r.owner.url}" target="_blank">${r.owner.login}</a>
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
      `${c.sha}<br />
      ${c.commit.message}</p>
      <img src="${c.author.avatar_url}" height="32" width="32"><br/>
      ${c.commit.author.name} (<a href="${c.author.url}">${c.author.login}</a>)`
    )});
    document.getElementById("details").innerHTML = commits
  }).fail(error => {
    displayError()
  });
};
