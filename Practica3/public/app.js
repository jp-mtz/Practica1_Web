const NUM_RESULTS = 4;

let loadMoreRequests = 0;

async function loadMore(){

    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/posts?from=${from}&to=${to}`);

    const newPosts = await response.text();
  
    const postsDiv = document.getElementById("posts");

    postsDiv.innerHTML += newPosts;

    loadMoreRequests++;
}