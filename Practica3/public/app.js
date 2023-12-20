const NUM_RESULTS = 4;

let loadMoreRequests = 0;

async function loadMore(){

    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/albums?from=${from}&to=${to}`);

    const newAlbums = await response.text();
  
    const albumsDiv = document.getElementById("albums");

    albumsDiv.innerHTML += newAlbums;

    loadMoreRequests++;
}