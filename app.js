const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsGrid = document.getElementById("results-grid");
const loadingIndicator = document.getElementById("loading-indicator");
const errorBanner = document.getElementById("error-banner");

searchForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showError("Please enter an artist or song.");
    return;
  }

  await searchGenius(query);

});

document.querySelectorAll(".challenge-btn").forEach((button) => {

  button.addEventListener("click", async () => {

    const query = button.dataset.query;

    if (!query) return;

    searchInput.value = query;

    await searchGenius(query);

  });

});

async function searchGenius(query) {

  showLoading();
  hideError();

  resultsGrid.innerHTML = "";

  try {

    const response = await fetch(
      `/.netlify/functions/search?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.error || "Search failed."
      );
    }


    if (!data.results || data.results.length === 0) {

      showError(
        `No results found for "${query}".`
      );

      return;

    }


    displayResults(data.results);

  } catch (error) {

    console.error(error);

    showError(
      error.message ||
      "Something went wrong."
    );

  } finally {

    hideLoading();

  }

}

function displayResults(results) {

  resultsGrid.innerHTML = "";


  results.forEach((song) => {

    const card = document.createElement("article");

    card.className = "song-card";


    card.innerHTML = `

      <img
        class="song-cover"
        src="${escapeHTML(song.thumbnail)}"
        alt="${escapeHTML(song.title)} cover"
        loading="lazy"
      >

      <div class="song-info">

        <h2>
          ${escapeHTML(song.title)}
        </h2>

        <h3>
          ${escapeHTML(song.artist)}
        </h3>

        ${
          song.album
            ? `<p class="album">
                 ${escapeHTML(song.album)}
               </p>`
            : ""
        }

        <a
          class="genius-link"
          href="${escapeHTML(song.url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Genius
        </a>

      </div>

    `;


    resultsGrid.appendChild(card);

  });

}

function showLoading() {
  loadingIndicator.classList.remove("hidden");
}


function hideLoading() {
  loadingIndicator.classList.add("hidden");
}

function showError(message) {

  errorBanner.textContent = message;

  errorBanner.classList.remove("hidden");

}


function hideError() {

  errorBanner.classList.add("hidden");

}

function escapeHTML(value) {

  if (!value) return "";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}
