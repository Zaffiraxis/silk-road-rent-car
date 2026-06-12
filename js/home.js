document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("previewGrid");
  if (!grid) return;
  grid.innerHTML = CARS.slice(0, 3).map(carCardHTML).join("");
});
