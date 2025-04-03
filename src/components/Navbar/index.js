import "./styles.css";

export function Navbar() {
  return `
    <header class="navbar">
      <div class="input-wrapper">
        <img src="/lupita.png" alt="lupa" class="input-icon" />
        <input id="photo_input" type="text" placeholder="Office decor ideas..." />
        <button id="search_btn">Search</button>
      </div>
      <div class="category-filters">
        <button class="filter-btn" data-category="offices">🏢 Oficinas</button>
        <button class="filter-btn" data-category="plants">🪴 Plantas</button>
        <button class="filter-btn" data-category="workspace">💻 Espacios de trabajo</button>
        <button class="filter-btn" data-category="minimalist desk">✨ Minimalismo</button>
      </div>
    </header>
    <main>
      <ul id="photo_container" class="photo-grid"></ul>
    </main>
  `;
}

/* Cargar las categorías desde el archivo JSON */

fetch("public/data/filters.json")
  .then((response) => response.json())
  .then((filters) => {
    /*Cambiar el texto de los botones de filtro aleatoriamente */

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      const category = btn.dataset.category;
      const randomText =
        filters[category][Math.floor(Math.random() * filters[category].length)];
      btn.textContent = randomText;
    });
  })
  .catch((error) => {
    console.error("Error loading filters:", error);
  });
