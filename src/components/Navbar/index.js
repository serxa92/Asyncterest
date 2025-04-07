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
        <button class="filter-btn" data-category="offices"></button>
        <button class="filter-btn" data-category="plants"></button>
        <button class="filter-btn" data-category="workspace"></button>
        <button class="filter-btn" data-category="minimalist desk"></button>
      </div>
    </header>
    <main>
      <ul id="photo_container" class="photo-grid"></ul>
    </main>
  `;
}

//Declaro la función loadFilters que se encarga de cargar los filtros en el navbar.

export const filters = {
  offices: [
    "Offices",
    "Modern Offices",
    "Creative Workspaces",
    "Home Offices",
    "Corporate Design",
    "Minimalist Offices",
    "Luxury Offices",
    "Tech Offices",
    "Cozy Offices",
    "Small Offices",
  ],
  plants: [
    "Plants",
    "Indoor Plants",
    "Office Plants",
    "Home Plants",
    "Succulents",
    "Tropical Plants",
    "Low Maintenance Plants",
    "Air Purifying Plants",
    "Decorative Plants",
    "Garden Plants",
  ],
  workspace: [
    "Workspaces",
    "Home Workspaces",
    "Creative Workspaces",
    "Open Plan Offices",
    "Cozy Workspaces",
    "Collaborative Spaces",
    "Desk Ideas",
    "Productivity Workspaces",
    "Ergonomic Workspaces",
    "Office Organization",
  ],
  "minimalist desk": [
    "Minimalist Desk",
    "Simple Desk Designs",
    "Decluttered Desks",
    "Functional Desk Layouts",
    "Neat Desk Ideas",
    "Clean Workspace",
    "Compact Desk Designs",
    "Stylish Minimalist Offices",
    "Sleek Desk Styles",
    "Orderly Workspaces",
  ],
};
