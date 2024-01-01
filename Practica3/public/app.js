/* const NUM_RESULTS = 4;

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

function search_title() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let albums = document.getElementsByClassName('album');

    for (let i = 0; i < albums.length; i++) {
        let albumName = albums[i].innerText.toLowerCase();
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum

        if (!albumName.includes(input)) {
            // Si el nombre del álbum no coincide, oculta todo el contenedor
            parentDiv.style.display = "none";
        } else {
            // Si el nombre del álbum coincide, muestra el contenedor
            parentDiv.style.display = "list-item";
        }
    }
}

*/ 

const NUM_RESULTS = 4;

let loadMoreRequests = 0;

async function loadMore() {
    const from = (loadMoreRequests + 1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    const response = await fetch(`/posts?from=${from}&to=${to}`);
    const newPosts = await response.text();

    const postsDiv = document.getElementById("posts");
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newPosts;

    // Agregar nuevos elementos al DOM
    const newRows = tempDiv.getElementsByClassName('row')[0];
    postsDiv.getElementsByClassName('row')[0].appendChild(newRows);

    loadMoreRequests++;

    // Disparar un evento personalizado después de cargar más elementos
    const loadMoreEvent = new Event('loadMoreComplete');
    document.dispatchEvent(loadMoreEvent);
}

function filterAlbums() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const albums = document.getElementsByClassName("album");

    for (const album of albums) {
        const albumTitle = album.innerText.toLowerCase();
        const albumDiv = album.parentElement.parentElement; // Obtener el div que contiene el álbum

        if (albumTitle.includes(searchTerm)) {
            albumDiv.style.display = ""; // Mostrar el div si coincide con la búsqueda
        } else {
            albumDiv.style.display = "none"; // Ocultar el div si no coincide con la búsqueda
        }
    }
}

// Escuchar el evento personalizado después de cargar más elementos
document.addEventListener('loadMoreComplete', filterAlbums);

// Agregar el evento input para que la búsqueda se aplique en tiempo real
document.getElementById('search').addEventListener('input', filterAlbums);