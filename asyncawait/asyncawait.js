const containerButton = document.querySelector(".container_button");
const containerBottom = document.querySelector(".container_bottom");
const clearButton = document.querySelector("#clearButton");

async function updateText() {
  let loadingMessage;
  try {
    clearPost();

    // Display Loading Message
    loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Loading...";
    containerBottom.appendChild(loadingMessage);
    loadingMessage.classList.add("container_loading");

    // Fetch with timeout using Promise.race
    const fetchPromise = fetch("https://dummyjson.com/posts");
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Operation timeout")), 5000)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const data = await response.json();

    // Remove Loading Message
    containerBottom.removeChild(loadingMessage);

    // Display Posts
    const postHeader = document.createElement("h2");
    postHeader.textContent = "Posts: ";
    containerBottom.appendChild(postHeader);
    postHeader.classList.add("container_post");

    data.posts.forEach((post) => {
      const postTitle = document.createElement("p");
      postTitle.textContent = post.title;
      containerBottom.appendChild(postTitle);
      postTitle.classList.add("container_para");
    });

    // Show Clear Button
    clearButton.style.display = "inline-block";
  } catch (error) {
    // Handle Errors
    if (loadingMessage) {
      containerBottom.removeChild(loadingMessage);
    }
    const errorMessage = document.createElement("h2");
    errorMessage.textContent = "An error occurred: " + error.message;
    containerBottom.appendChild(errorMessage);
    errorMessage.classList.add("container_error");
  }
}

function clearPost() {
  containerBottom.innerHTML = "";
  clearButton.style.display = "none";
}

// Event Listeners
containerButton.addEventListener("click", updateText);
clearButton.addEventListener("click", clearPost);
