// Mobile navigation
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const isActive = burger.classList.toggle("active");
      mobileNav.classList.toggle("active", isActive);
      document.body.classList.toggle("no-scroll", isActive);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }
});

// Renders a car card used on the homepage preview and catalog grid
function carCardHTML(car) {
  const specs = car.cardSpecs
    .map(
      (s) => `
        <div class="car-card__spec">
          <span class="car-card__spec-value">${s.value}</span>
          <span class="car-card__spec-label">${s.label}</span>
        </div>`
    )
    .join("");

  return `
    <a href="car.html?car=${car.id}" class="car-card">
      <div class="car-card__image">
        <img src="${car.images[0]}" alt="${car.brand} ${car.model}" loading="lazy" />
      </div>
      <div class="car-card__body">
        <div class="car-card__brand">${car.brand}</div>
        <div class="car-card__title">${car.model}</div>
        <div class="car-card__specs">${specs}</div>
        <div class="car-card__footer">
          <div>
            <div class="car-card__price-value">від ${car.priceFrom}$/день</div>
            <div class="car-card__price-label">застава ${car.pricing.deposit}$</div>
          </div>
          <span class="btn btn-outline">Детальніше</span>
        </div>
      </div>
    </a>`;
}
