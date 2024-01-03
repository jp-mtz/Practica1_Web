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
    
    // Después de cargar los nuevos elementos, aplica la animación de fade-in
    const newElements = document.querySelectorAll('#posts *');
    newElements.forEach(element => {
        element.style.opacity = '1';
    });
}

let isGrid = false;

function toggleLayout() {
  const postsDiv = document.getElementById("posts");

  if (!isGrid) {
    postsDiv.style.gridTemplateColumns = "30%";
    postsDiv.style.justifyContent = "center"; // Centrar horizontalmente el contenido
  } else {
    postsDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(350px, 1fr))";
    postsDiv.style.justifyContent = "initial"; // Restaurar la alineación horizontal por defecto
  }

  isGrid = !isGrid;
}

function search_title() {
    let input = document.getElementById('filterbar').value.toLowerCase();
    let albums = document.getElementsByClassName('album');

    for (let i = 0; i < albums.length; i++) {
        let albumName = albums[i].innerText.toLowerCase();
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum

        if (albumName.includes(input)) {
            // Si el álbum coincide y está disponible, muestra el contenedor 
            parentDiv.style.display = "list-item";
        } else {
            // Si no coincide o no está disponible, oculta el contenedor
            parentDiv.style.display = "none";   
        }
    }
}

window.addEventListener('load', function() {
    const content = document.getElementById('bodycontent');
    const elements = content.querySelectorAll('*');
    
    elements.forEach(element => {
        element.style.opacity = '1';
    });
});

// Ventana modal
var modal = document.getElementById("ventanaModal");

// Botón que abre el modal
var boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click",function() {
  modal.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

/*
function search_artist() {
    let input = document.getElementById('search').value.toLowerCase();
    let albums = document.getElementsByClassName('artist');

    for (let i = 0; i < albums.length; i++) {
        let albumName = albums[i].innerText.toLowerCase();
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum

        if (albumName.includes(input)) {
            // Si el nombre del álbum coincide, muestra el contenedor 
            parentDiv.style.display= "list-item"; 
        } else {
            parentDiv.style.display= "none"; 
        }
    }
}
*/ /*
async function checkArtistAvailability() {

    let artist = document.getElementById('artist');

    let username = artist.value;

    const response = await fetch(`/availableArtist?artist=${artist}`);

    const responseObj = await response.json();

    let message = responseObj.available? 
        '<p>Disponible</p>':
        '<p>No disponible</p>';

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;

}*/
async function checkArtistAvailability() {
    let artistInput = document.getElementById('artist');
    let artist = artistInput.value.toLowerCase(); // Convertir a minúsculas para coincidencias no sensibles a mayúsculas

    const response = await fetch(`/availableArtist?artist=${artist}`);
    const responseObj = await response.json();

    let available = responseObj.available;

    let albums = document.getElementsByClassName('artist');
    let input = document.getElementById('artist').value.toLowerCase();


    for (let i = 0; i < albums.length; i++) {
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum
        let albumArtist = albums[i].innerText.toLowerCase();


        if (!available && albumArtist.includes(input)) {
            // Si el nombre del artista coincide y está disponible, muestra el contenedor a color
            parentDiv.style.filter = "none"; // Remove black and white effect
            parentDiv.style.filter = "blur(0px)";

        } 
        else if (available && input === ""){
            parentDiv.style.filter = "none"; // Remove black and white effect
            parentDiv.style.filter = "blur(0px)";
        }
        else {
            // Si el nombre del artista no coincide, oculta todo el contenedor y aplica blanco y negro
            parentDiv.style.filter = "grayscale(100%) blur(2px)"; // Apply black and white effect
        }
    };
}
