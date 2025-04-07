import "./style.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { filters } from "./components/Navbar";
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

// Declaro el contenedor principal, donde se va a renderizar el sidebar y el navbar
const app = document.getElementById("app");
app.innerHTML = `
  ${Sidebar()}
  <div class="main-content">
    ${Navbar()}
  </div>
`;
const photo_input = document.querySelector("#photo_input");
const search_btn = document.querySelector("#search_btn");
/* 
 Declaro currentPage y currentKeyword para poder hacer la paginación y la búsqueda, y isLoading para evitar que se hagan múltiples peticiones a la API al mismo tiempo 
 */
let currentPage = 1;
let currentKeyword = "Office decor";
let isLoading = false;
/* 
Declaro la función getPhotos que se encarga de hacer la petición a la API de Unsplash y obtener las fotos
La función recibe como parámetros el keyword y la página, y si no se pasan, se usan los valores por defecto */
const getPhotos = async (keyword = currentKeyword, page = currentPage) => {
  isLoading = true;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${keyword}&client_id=${ACCESS_KEY}`
  );
  const data = await res.json();
  mapPhotos(data.results, page === 1);
  isLoading = false;
};

/*  Declaro la función mapPhotos que se encarga de mapear las fotos obtenidas de la API y pasarlas a la función printPhotos
 */
const mapPhotos = (photos, replace = false) => {
  const mappedPhotos = photos.map((photo) => ({
    alt: photo.alt_description,
    photo: photo.urls.regular,
    ogPhoto: photo.urls.raw,
    color: photo.color,
  }));
  printPhotos(mappedPhotos, replace);
};

/* Declaro la función printPhotos,que se encarga de renderizar las fotos en el contenedor principal.
 La función recibe como parámetros las fotos y si se deben reemplazar o no.
 Si se deben reemplazar, se limpia el contenedor antes de agregar las nuevas fotos,
 si no se deben reemplazar, se agregan las nuevas fotos al final del contenedor.
 Se usa un forOf para recorrer las fotos y se crea un elemento li por cada foto.
 Se le agrega la clase fade-in para que se vea el efecto de carga
 */
const printPhotos = (photos, replace = false) => {
  const container = document.querySelector("#photo_container");
  if (replace) container.innerHTML = "";
  for (const photo of photos) {
    const li = document.createElement("li");
    li.classList.add("fade-in");
    li.innerHTML = `
      <a href="${photo.ogPhoto}" target="_blank">
        <img src="${photo.photo}" loading="lazy" alt="${photo.alt}"/>
      </a>
    `;
    container.appendChild(li);
  }
};
/*
Declaro la función loadFilters que se encarga de cargar los filtros en el navbar.
Se usa Math.random para obtener un índice aleatorio de la lista de filtros y se le asigna el texto al botón.
Se usa el dataset para guardar el texto en el botón y poder usarlo después al hacer click en el botón.
*/
async function loadFilters() {
  try {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((btn) => {
      const category = btn.dataset.category;
      const randomText =
        filters[category][Math.floor(Math.random() * filters[category].length)];
      btn.textContent = randomText;
      btn.dataset.search = randomText;
    });
  } catch (error) {
    console.error("Error loading filters:", error);
  }
}

loadFilters();

// Evento de click en los botones de filtro
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const searchTerm = btn.dataset.search;
    currentKeyword = searchTerm;
    currentPage = 1;
    getPhotos(currentKeyword, currentPage);
  });
});

// Evento de búsqueda al hacer click en el botón de búsqueda
search_btn.addEventListener("click", () => {
  const keyword = photo_input.value.trim();
  if (keyword) {
    currentKeyword = keyword;
    currentPage = 1;
    getPhotos(currentKeyword, currentPage);
  }
});

// Evento de búsqueda con la tecla Enter
photo_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const keyword = photo_input.value.trim();
    if (keyword) {
      currentKeyword = keyword;
      currentPage = 1;
      getPhotos(currentKeyword, currentPage);
    }
  }
});

// Evento de scroll para cargar más fotos
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.body.offsetHeight;

  if (scrollY + viewportHeight >= fullHeight - 200 && !isLoading) {
    currentPage++;
    getPhotos(currentKeyword, currentPage);
  }
});

/* Este evento se encarga de evitar que el scroll se mantenga en la parte superior al cargar la página.
Se usa el evento DOMContentLoaded para asegurarse de que el DOM esté completamente cargado antes de ejecutar la función.
Se usa history.scrollRestoration = "manual" para evitar que el scroll se mantenga en la parte superior al cargar la página.
Se usa un setTimeout para que el scroll se mantenga al principio. */

window.addEventListener("DOMContentLoaded", async () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  currentPage = 1;
  await getPhotos(currentKeyword, currentPage);
  document.addEventListener("click", async (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      currentKeyword = filterBtn.dataset.search;
      currentPage = 1;

      console.log(currentKeyword);
      await getPhotos(currentKeyword, currentPage);

      const allBtns = document.querySelectorAll(".filter-btn");
      allBtns.forEach((btn) => btn.classList.remove("active-filter"));
      filterBtn.classList.add("active-filter");
    }
  });

  // Se pone un timeout para que el scroll se mantenga al principio. 
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
});
