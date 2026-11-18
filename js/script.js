// PORTFOLIO SAMUELLA — interactions communes

// Année automatique dans le pied de page.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Menu mobile.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

// Mode clair / sombre conservé dans le navigateur.
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
if (themeButton) {
  themeButton.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    themeButton.textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Activer le mode clair" : "Activer le mode sombre");
  });
}

// Apparition progressive des éléments au défilement.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Filtrage des projets.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

// Formulaire : validation HTML puis ouverture du logiciel de messagerie.
// Remplacez l'adresse ci-dessous par votre vraie adresse avant publication.
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const recipient = "tonadresse@email.com"; // À personnaliser
    const subject = encodeURIComponent(formData.get("subject"));
    const body = encodeURIComponent(
      `Nom : ${formData.get("name")}\nE-mail : ${formData.get("email")}\n\n${formData.get("message")}`
    );
    const note = document.querySelector("#form-note");
    if (note) note.textContent = "Votre application e-mail va s'ouvrir avec le message prérempli.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

console.log("Portfolio de Samuella chargé avec succès.");


// Barre de progression de lecture et léger état du menu au défilement.
const progressBar = document.querySelector("#reading-progress-bar");
const siteHeader = document.querySelector(".site-header");
function updateScrollEffects() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.min(100, progress)}%`;
  if (siteHeader) siteHeader.classList.toggle("scrolled", window.scrollY > 12);
}
window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

// Repère automatiquement la page active dans la navigation.
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(link => {
  const linkPage = (link.getAttribute("href") || "").split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
