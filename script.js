
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // AÑO AUTOMÁTICO
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MENÚ MÓVIL
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }

  // ANIMACIONES AL DESPLAZARSE
  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // BARRA DE PROGRESO
  const progressBar = document.getElementById("scroll-progress");

  const updateProgress = () => {
    if (!progressBar) return;

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = totalHeight > 0
      ? (window.scrollY / totalHeight) * 100
      : 0;

    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // COMPARADOR ANTES / DESPUÉS
  const slider = document.getElementById("comparison-slider");
  const afterLayer = document.getElementById("comparison-after");
  const handle = document.getElementById("comparison-handle");

  const updateComparison = () => {
    if (!slider || !afterLayer || !handle) return;

    const value = Math.min(100, Math.max(0, Number(slider.value)));

    afterLayer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    handle.style.left = `${value}%`;
  };

  if (slider && afterLayer && handle) {
    slider.addEventListener("input", updateComparison);
    slider.addEventListener("change", updateComparison);
    updateComparison();
  }

  // CERRAR EL MENÚ SI SE CAMBIA A ORDENADOR
  // Y ACTUALIZAR LA BARRA AL VOLVER A LA PÁGINA
  window.addEventListener("pageshow", () => {
    updateProgress();
    updateComparison();
  });
});
