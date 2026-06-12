document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = CARS.map(carCardHTML).join("");
});
