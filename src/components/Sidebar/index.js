import "./styles.css";

export function Sidebar() {
  return `
    <aside class="sidebar">
      
      <nav>
        <ul>
          <li><a href="#" data-label="Home"><img class="logo" src="/logo.png" alt="Logo" /></a></li>
          <li><a href="#" data-label="Search"><img class="logos" src="/busqueda (1).png" alt="Logo" /></a></li>
          <li><a href="#" data-label="Create"><img class="logos" src="/mas (1).png" alt="Logo" /></a></li>
          <li><a href="#" data-label="Notifications"><img class="logos" src="/campana.png" alt="Logo" /></a></li>
          <li><a href="#" data-label="Messages"><img class="logos" src="/sobre.png" alt="Logo" /></a></li>
          <li><a href="#" data-label="Settings"><img class="logos" src="/ajustes.png" alt="Logo" /></a></li>
        </ul>
      </nav>
    </aside>
  `;
}
