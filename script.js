
// WEBLORIA STUDIO
// Navegación, animaciones y formulario.

// MENÚ MÓVIL
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const opened = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!opened));
    nav.classList.toggle("open", !opened);
    menuToggle.textContent = opened ? "☰" : "✕";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// ANIMACIONES AL DESPLAZARSE
const elements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(element => observer.observe(element));
} else {
  elements.forEach(element => {
    element.classList.add("visible");
  });
}

// AÑO AUTOMÁTICO
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// FORMULARIO DE CONTACTO
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const data = new FormData(contactForm);

    const name = data.get("name");
    const email = data.get("email");
    const business = data.get("business") || "No indicado";
    const project = data.get("project");
    const message = data.get("message");

    const subject = encodeURIComponent(
      `Nuevo proyecto Webloria - ${name}`
    );

    const body = encodeURIComponent(
      `Hola Webloria Studio,

Nombre: ${name}
Correo: ${email}
Negocio: ${business}
Tipo de proyecto: ${project}

Descripción:
${message}

Enviado desde la página web de Webloria Studio.`
    );

    if (formMessage) {
      formMessage.textContent =
        "Abriendo tu aplicación de correo para preparar el mensaje...";
    }

    // IMPORTANTE:
    // Sustituye esta dirección por tu correo real.
    window.location.href =
      `mailto:hola@webloria.com?subject=${subject}&body=${body}`;
  });
}
