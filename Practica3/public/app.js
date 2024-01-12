// Comienza función para cargar más elementos con AJAX usando botón 
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
//Comienza función para mostrar los elementos en una sola columna 
let isGrid = false;

function toggleLayout() {
  const postsDiv = document.getElementById("posts");

  if (!isGrid) {
    postsDiv.style.gridTemplateColumns = "30%"; //estilo de la cuadrícula como una sola columna del 30%
    postsDiv.style.justifyContent = "center"; // Centrar horizontalmente el contenido
  } else {
    postsDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(350px, 1fr))"; //establecer el estilo de la cuadricula con columnas automáticas y mínimo de 350 px 
    postsDiv.style.justifyContent = "initial"; // Restaurar la alineación horizontal por defecto
  }

  isGrid = !isGrid; //Invertir el estado de isGrid para alternar entre los dos modos 
}


//Función para utilizar el filtrado según el nombre del album 
function search_title() {
    let input = document.getElementById('filterbar').value.toLowerCase(); //Obtiene el valor del campo de búsqueda y lo convierte a minusculas 
    let albums = document.getElementsByClassName('album'); //Obtiene todos los elementos con la clase álbum (nombre del álbum)

    for (let i = 0; i < albums.length; i++) {
        let albumName = albums[i].innerText.toLowerCase(); //convierte a minusculas el nombre del álbum
        let parentDiv = albums[i].parentElement.parentElement; // Obtener el elemento contenedor del álbum

        if (albumName.includes(input)) {
            // Si el álbum coincide, muestra el contenedor 
            parentDiv.style.display = "list-item";
        } else {
            // Si no coincide, oculta el contenedor
            parentDiv.style.display = "none";   
        }
    }
}

//Función para hacer la animacion de Fade in en la pag principal cuando esta se carga o recarga 
window.addEventListener('load', function() { 
    const content = document.getElementById('bodycontent'); //todo el contenido del cuerpo de la página principal 
    const elements = content.querySelectorAll('*');
    
    elements.forEach(element => {
        element.style.opacity = '1'; //Establece la opacidad del elemento en 1 (visible al 100%)
    });
});

//Comienza función para la ventana modal (pag. nuevo elemento)
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

// Comienza función para la barra de búsqueda que busca por nombre del artista utilizando AJAX
function checkArtistAvailability() {
  // Obtener el elemento de entrada del artista y su valor convertido a minúsculas para coincidencias no sensibles a mayúsculas
  let artistInput = document.getElementById('artist');
  let artist = artistInput.value.toLowerCase();

  // Crear una nueva instancia de XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // Configurar la solicitud AJAX
  xhr.open("GET", `/availableArtist?artist=${artist}`, true);

  // Manejar el evento de carga de la solicitud
  xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
          // La solicitud fue exitosa
          const responseObj = JSON.parse(xhr.responseText);

          // Obtener el estado de disponibilidad del artista desde la respuesta
          let available = responseObj.available;

          // Obtener todos los elementos con la clase 'artist' y el valor del campo de búsqueda convertido a minúsculas
          let albums = document.getElementsByClassName('artist');
          let input = document.getElementById('artist').value.toLowerCase();

          // Iterar sobre los elementos con la clase 'artist'
          for (let i = 0; i < albums.length; i++) {
              // Obtener el elemento contenedor del álbum
              let parentDiv = albums[i].parentElement.parentElement;
              // Obtener el nombre del artista del álbum actual y convertirlo a minúsculas
              let albumArtist = albums[i].innerText.toLowerCase();

              // Verificar condiciones para aplicar estilos a los elementos
              if (!available && albumArtist.includes(input)) {
                  // Si el nombre del artista coincide y no está disponible, mostrar el contenedor a color
                  parentDiv.style.filter = "none"; // Eliminar el efecto blanco y negro
                  parentDiv.style.filter = "blur(0px)";
              } else if (available && input === "") {
                  // Si el artista está disponible y el campo de búsqueda está vacío, mostrar el contenedor a color
                  parentDiv.style.filter = "none"; // Eliminar el efecto blanco y negro
                  parentDiv.style.filter = "blur(0px)"; 
              } else {
                  // Si el nombre del artista no coincide, ocultar todo el contenedor y aplicar blanco y negro
                  parentDiv.style.filter = "grayscale(100%) blur(2px)"; // Aplicar el efecto blanco y negro
              }
          }
      } else {
          // La solicitud no fue exitosa; manejar el error según sea necesario
          console.error("Error en la solicitud:", xhr.statusText);
      }
  };

  // Manejar el evento de error de la solicitud
  xhr.onerror = function () {
      console.error("Error de red");
  };

  // Enviar la solicitud
  xhr.send();
}
  
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      //verificar si el formulario es válido   
      if (!form.checkValidity()) {
            event.preventDefault(); //prevenir que se envíe el formulario si este no es válido 
            event.stopPropagation();
        }

        form.classList.add('was-validated'); //marcar el formulario como validado 
    }, false);

    // obtener el elemento de entrada para la portada del formulario actual 
    var coverInput = form.querySelector('#CoverInput');

    coverInput.addEventListener('input', function () {
        // obtener el valor del campo de la portada y eliminar espacios en blanco 
        var coverValue = coverInput.value.trim();

        //Obtener elementos relacionados con la validación de la portada 
        var invalidCoverIn = form.querySelector('#CoverIn');

        //mostrar u ocultar el mensaje de error según si hay o no link para la portada
        if (coverValue.length > 0) {
            invalidCoverIn.style.display = 'none';
        } else {
            invalidCoverIn.style.display = 'block';
        }
    });

    //obtener el elemento de entrada para el artista del formulario actual 
    var artistInput = form.querySelector('#ArtistInput');

    artistInput.addEventListener('input', function () {
      // obtener el valor del campo del artista y eliminar espacios en blanco 
        var artistValue = artistInput.value.trim();

        //obtener elementos relacionados con la validación del artista 
        var invalidArtistIn = form.querySelector('#ArtistIn');

        // Mostrar u ocultar el mensaje de error según si hay o no nombre de artista 
        if (artistValue.length > 0) {
            invalidArtistIn.style.display = 'none';
        } else {
            invalidArtistIn.style.display = 'block';
        }
    });

    // obtener el elemento de entrada para la review del formulario actual 
    var reviewInput = form.querySelector('#ReviewInput');

    reviewInput.addEventListener('input', function () {
      //Obtener el valor del campo de review y eliminar espacios en blanco
        var reviewValue = reviewInput.value.trim();

        //obtener el elemento relacionado con la validacion de la review 
        var charCountInvalid = form.querySelector('#ReviewIn');

        //mostrar u ocultar el mensaje de error según la longitud de la review 
        if (reviewValue.length >= 50 && reviewValue.length <= 500) {
            charCountInvalid.style.display = 'none';
        } else {
            charCountInvalid.style.display = 'block';
        }
    });
});

