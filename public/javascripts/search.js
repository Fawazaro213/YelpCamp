const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const query = searchInput.value;

  if (query.length > 0) {
    // Trigger the same route with a search query
    fetch(`/campgrounds?search=${query}`)
      .then((response) => response.text())  // We expect HTML, not JSON
      .then((html) => {
        // Replace the existing campgrounds content with the new one
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newCampgrounds = doc.querySelector(".container");

        // Find the container where campgrounds are rendered and replace it
        document.querySelector(".container").replaceWith(newCampgrounds);
      })
      .catch((err) => console.error(err));
  }
});