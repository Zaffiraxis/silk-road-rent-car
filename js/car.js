document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const car = CARS.find((c) => c.id === params.get("car")) || CARS[0];

  // Title & hero
  document.title = `${car.brand} ${car.model} — Silk Road Rent Car`;
  document.getElementById("pageTitle").textContent = document.title;
  document.getElementById("carType").textContent = car.type;
  document.getElementById("carName").textContent = `${car.brand} ${car.model}`;
  document.getElementById("carPrice").textContent = car.priceFrom;
  document.getElementById("carDeposit").textContent = car.pricing.deposit;
  document.getElementById("stickyPrice").textContent = car.priceFrom;
  document.getElementById("modalCarName").textContent = `${car.brand} ${car.model}`;

  // Gallery
  const galleryMain = document.getElementById("galleryMain");
  const galleryThumbs = document.getElementById("galleryThumbs");

  galleryMain.src = car.images[0];
  galleryMain.alt = `${car.brand} ${car.model}`;

  galleryThumbs.innerHTML = car.images
    .map(
      (src, i) => `
        <div class="gallery__thumb${i === 0 ? " active" : ""}" data-src="${src}">
          <img src="${src}" alt="${car.brand} ${car.model} — фото ${i + 1}" loading="lazy" />
        </div>`
    )
    .join("");

  galleryThumbs.querySelectorAll(".gallery__thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      galleryThumbs.querySelectorAll(".gallery__thumb").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      galleryMain.src = thumb.dataset.src;
    });
  });

  // Specs
  document.getElementById("specsGrid").innerHTML = car.specs
    .map(
      (s) => `
        <div class="spec-item">
          <div class="spec-item__label">${s.label}</div>
          <div class="spec-item__value">${s.value}</div>
        </div>`
    )
    .join("");

  // Features
  document.getElementById("featuresList").innerHTML = car.features
    .map((f) => `<li>${f}</li>`)
    .join("");

  // Pricing
  document.getElementById("pricingTiers").innerHTML = car.pricing.tiers
    .map(
      (t) => `
        <div class="pricing-tier">
          <div class="pricing-tier__price">$${t.value}<span>/доба</span></div>
          <div class="pricing-tier__label">${t.label}</div>
        </div>`
    )
    .join("");

  document.getElementById("pricingExtra").innerHTML = `
    <div class="pricing-extra__row"><span>Застава (повертається)</span><strong>$${car.pricing.deposit}</strong></div>
    <div class="pricing-extra__row"><span>Послуги водія</span><strong>$${car.pricing.driver}/доба</strong></div>
    <div class="pricing-extra__row"><span>За межами Києва</span><strong>$${car.pricing.km}/км</strong></div>
  `;

  // Modals
  const requestModal = document.getElementById("requestModal");
  const successModal = document.getElementById("successModal");
  const requestForm = document.getElementById("requestForm");

  function openModal(modal) {
    modal.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  document.getElementById("ctaBtn").addEventListener("click", () => openModal(requestModal));
  document.getElementById("stickyCtaBtn").addEventListener("click", () => openModal(requestModal));
  document.getElementById("closeRequestModal").addEventListener("click", () => closeModal(requestModal));
  document.getElementById("closeSuccessModal").addEventListener("click", () => closeModal(successModal));

  [requestModal, successModal].forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Contact method toggle
  document.querySelectorAll(".contact-method__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".contact-method__btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Form submit -> success
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal(requestModal);
    openModal(successModal);
    requestForm.reset();
    document.querySelectorAll(".contact-method__btn").forEach((b, i) => b.classList.toggle("active", i === 0));
  });
});
