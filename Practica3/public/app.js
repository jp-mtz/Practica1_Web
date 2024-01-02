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

let isGrid = false;

function toggleLayout() {
  const postsDiv = document.getElementById("posts");

  if (!isGrid) {
    postsDiv.style.gridTemplateColumns = "30%";
    postsDiv.style.justifyContent = "center"; // Centrar horizontalmente el contenido
  } else {
    postsDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    postsDiv.style.justifyContent = "initial"; // Restaurar la alineación horizontal por defecto
  }

  isGrid = !isGrid;
}

function search_title() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let albums = document.getElementsByClassName('album');

    for (let i = 0; i < albums.length; i++) {
        let albumName = albums[i].innerText.toLowerCase();
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum

        if (albumName.includes(input)) {
            // Si el nombre del álbum coincide, muestra el contenedor a color
            parentDiv.style.filter = "none"; // Remove black and white effect
            parentDiv.style.filter = "blur(0px)";
        } else {
            // Si el nombre del álbum no coincide, oculta todo el contenedor y aplica blanco y negro
            parentDiv.style.filter = "grayscale(100%) blur(2px)"; // Apply black and white effect
        }
    }
}