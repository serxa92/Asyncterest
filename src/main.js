import "./style.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

const ACCESS_KEY = "6bksTNgYqRgXl8lCkO0q8j9JO93uxMXKAkfkHp4UQKM";

/* Se importa el archivo de estilos y los componentes Navbar y Sidebar. 
Se utiliza el método getElementById para obtener el elemento del DOM con el id "app" y se le asigna el contenido del layout principal (sidebar y navbar). */

const app = document.getElementById("app");
app.innerHTML = `
  ${Sidebar()}
  <div class="main-content">
    ${Navbar()}
  </div>
`;


const photo_input = document.querySelector("#photo_input"); // Input para búsqueda de fotos
const search_btn = document.querySelector("#search_btn"); // Botón de búsqueda

/* Se definen las variables currentPage y currentKeyword para controlar la página actual y la palabra clave de búsqueda. También se declara isLoading para evitar múltiples peticiones simultáneas. */

let currentPage = 1;
let currentKeyword = "Offices"; // Palabra clave inicial (puedes cambiarla según el filtro)
let isLoading = false;

/* Función para obtener las fotos de la API */
const getPhotos = async (keyword = currentKeyword, page = currentPage) => {
  isLoading = true;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${keyword}&client_id=${ACCESS_KEY}`
  );
  const data = await res.json();
  mapPhotos(data.results, page === 1);
  isLoading = false;
};

/* Función que transforma los datos de la API en objetos más manejables */
const mapPhotos = (photos, replace = false) => {
  const mappedPhotos = photos.map((photo) => ({
    alt: photo.alt_description,
    photo: photo.urls.regular,
    ogPhoto: photo.urls.raw,
    color: photo.color,
  }));
  printPhotos(mappedPhotos, replace);
};

/* Función que imprime las fotos en el DOM */
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

/* Se agrega un evento al botón de búsqueda para que al hacer click se obtengan las fotos con la palabra clave ingresada en el input. */
search_btn.addEventListener("click", () => {
  const keyword = photo_input.value.trim();
  if (keyword) {
    currentKeyword = keyword;
    currentPage = 1;
    getPhotos(currentKeyword, currentPage);
  }
});

/* Se agrega un evento al input de búsqueda para que al presionar la tecla Enter se obtengan las fotos con la palabra clave ingresada. */
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

/* Se agrega un evento al objeto window para que al hacer scroll se verifique si el usuario ha llegado cerca del final de la página. Si es así, se incrementa la variable currentPage y se llama a la función getPhotos con la palabra clave actual y la nueva página. */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.body.offsetHeight;

  if (scrollY + viewportHeight >= fullHeight - 200 && !isLoading) {
    currentPage++;
    getPhotos(currentKeyword, currentPage);
  }
});

/* Carga las fotos al cargar la página, se llama a la función getPhotos con la palabra clave y la página actual. */
window.addEventListener("DOMContentLoaded", async () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  currentPage = 1;
  await getPhotos(currentKeyword, currentPage);
  // Aplicar el filtro cuando se haga clic en los botones de filtro
  document.addEventListener("click", async (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      const category = filterBtn.dataset.category;

      // Actualizar la palabra clave y restablecer la página al primer resultado
      currentKeyword = category; // Actualizar la palabra clave
      currentPage = 1; // Restablecer la página

      // Obtener las fotos con el filtro seleccionado
      console.log(currentKeyword);
    await getPhotos(currentKeyword, currentPage);

      // Añadir la clase activa al botón seleccionado
      const allBtns = document.querySelectorAll(".filter-btn");
      allBtns.forEach((btn) => btn.classList.remove("active-filter"));
      filterBtn.classList.add("active-filter");
    }
  });

  /* Se pone un timeout para que el scroll se mantenga al principio. */
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
});
