const fetchButton = document.querySelector(".container_button");
const containerBottom = document.querySelector(".container_bottom");
const clearButton = document.querySelector("#clearButton");

function updateText() {
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading...";
  containerBottom.appendChild(loadingMessage);
  loadingMessage.classList.add("container_loading");

  // Timeout Promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out")), 5000)
  );

  // Fetch Promse
  const fetchPromse = fetch("https://dummyjson.com/posts").then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  });

  // Race b/w two promise
  // Promise.race -> resolves or rejects as soon as the first promise settles.
  // Promse.any -> resolves as soon as the first promise resolves
  Promise.race([fetchPromse, timeoutPromise])
    .then((data) => {
      if (containerBottom.contains(loadingMessage)) {
        containerBottom.removeChild(loadingMessage);
      }

      // Post element
      const post = document.createElement("h2");
      post.innerHTML = "Posts: ";
      containerBottom.appendChild(post);
      post.classList.add("container_post");

      // Posting fetched data
      data.posts.forEach((post) => {
        const title = document.createElement("p");
        title.innerHTML = post.title;
        containerBottom.appendChild(title);
        title.classList.add("container_para");
      });

      clearButton.style.display = "inline-block";
    })
    .catch((err) => {
      if (containerBottom.contains(loadingMessage)) {
        containerBottom.removeChild(loadingMessage);
      }
      const errorMessage = document.createElement("h2");
      errorMessage.innerHTML = err.message;
      containerBottom.appendChild(errorMessage);
      errorMessage.classList.add("container_error");
    });
}

function clearData() {
  containerBottom.innerHTML = "";
  clearButton.style.display = "none";
}

fetchButton.addEventListener("click", updateText);
clearButton.addEventListener("click", clearData);
