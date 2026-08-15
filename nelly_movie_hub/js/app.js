const MOVIES_PER_PAGE = 6;

// Replace this with your WhatsApp number in international format.
// Uganda example: 2567XXXXXXXX
const WHATSAPP_NUMBER = "256775781560";
const WHATSAPP_MESSAGE = "Hello, I would like to contact you about your movie website.";

let currentPage = 1;

const movieGrid = document.getElementById("movieGrid");
const pagination = document.getElementById("pagination");

function whatsappLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function setupWhatsApp() {
  ["navWhatsApp", "aboutWhatsApp", "footerWhatsApp"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.href = whatsappLink();
  });
}

function renderMovies() {
  movieGrid.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(movies.length / MOVIES_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * MOVIES_PER_PAGE;
  const visibleMovies = movies.slice(start, start + MOVIES_PER_PAGE);

  if (!visibleMovies.length) {
    movieGrid.innerHTML = `<div class="empty">No movies have been added yet.</div>`;
    renderPagination();
    return;
  }

  visibleMovies.forEach((movie, index) => {
    const card = document.createElement("article");
    card.className = "movie-card";

    const safeTitle = movie.title.replace(/"/g, "&quot;");

    card.innerHTML = `
      <img class="poster"
           src="${movie.poster}"
           alt="${safeTitle} poster"
           onerror="this.src='images/default-poster.svg'">

      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-meta">${movie.year} • ${movie.genre} • ${movie.duration}</p>

        <div class="movie-actions">
          <a class="action-btn watch"
             href="${movie.link}"
             target="_blank"
             rel="noopener noreferrer">
             ▶ Watch Movie
          </a>
        </div>
      </div>
    `;

    movieGrid.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  if (totalPages <= 1) return;

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement("button");
    button.className = `page-btn ${page === currentPage ? "active" : ""}`;
    button.textContent = page;
    button.setAttribute("aria-label", `Go to page ${page}`);

    button.addEventListener("click", () => {
      currentPage = page;
      renderMovies();
      document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
    });

    pagination.appendChild(button);
  }
}

document.querySelector(".menu-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});

document.getElementById("year").textContent = new Date().getFullYear();

setupWhatsApp();
renderMovies();
