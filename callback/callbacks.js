document.getElementById("fetchButton").addEventListener("click", () => {
  const statusDiv = document.getElementById("status");
  statusDiv.innerHTML = "<h2 class='loading'>Loading...</h2>";

  function fetchData(callback) {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          callback(data.posts);
        });
    }, 5000);
  }

  fetchData((posts) => {
    let result = "<h2 class='post'>Posts:</h2>";
    result += posts.map((post) => `<p>${post.title}</p>`).join("");
    statusDiv.innerHTML = result;
  });
});
