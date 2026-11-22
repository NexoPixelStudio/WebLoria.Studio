
document.addEventListener("DOMContentLoaded", () => {

  // MENÚ PARA MÓVILES
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
      );
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // COMPARADOR ANTES Y DESPUÉS
  const slider = document.getElementById("comparison-slider");
  const after = document.getElementById("comparison-after");
  const handle = document.getElementById("comparison-handle");

  function updateComparison() {
    if (!slider || !after || !handle) return;

    const value = slider.value + "%";

    after.style.width = value;
    handle.style.left = value;
  }

  if (slider) {
    slider.addEventListener("input", updateComparison);
    updateComparison();
  }

  // ANIMACIONES AL BAJAR POR LA PÁGINA
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach(item => observer.observe(item));

  } else {
    revealItems.forEach(item => {
      item.classList.add("visible");
    });
  }

  // BARRA DE PROGRESO SUPERIOR
  const progress = document.getElementById("scroll-progress");

  const updateProgress = () => {
    if (!progress) return;

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    progress.style.width =
      (scrollable > 0
        ? window.scrollY / scrollable * 100
        : 0) + "%";
  };

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  updateProgress();

  // AÑO AUTOMÁTICO DEL FOOTER
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
