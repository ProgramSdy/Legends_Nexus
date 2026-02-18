const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
  });
}

const reveal = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transform = "translateY(0)";
        e.target.style.opacity = "1";
        reveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .feature-card, .char-card").forEach(el => {
  el.style.transform = "translateY(16px)";
  el.style.opacity = "0";
  el.style.transition = "transform 600ms ease, opacity 600ms ease";
  reveal.observe(el);
});

document.getElementById("demo-download")?.addEventListener("click", e => {
  e.preventDefault();
  alert("Provide your demo build link here.");
});
document.getElementById("demo-web")?.addEventListener("click", e => {
  e.preventDefault();
  alert("Provide your web demo URL here.");
});

// Professions filter
const pills = document.querySelectorAll(".professions-filter .pill");
const specCards = document.querySelectorAll(".spec-card");
function setFilter(filter) {
  specCards.forEach(card => {
    const match = filter === "all" || card.dataset.class === filter;
    card.style.display = match ? "block" : "none";
  });
}
pills.forEach(p => {
  p.addEventListener("click", () => {
    pills.forEach(x => x.classList.remove("active"));
    p.classList.add("active");
    setFilter(p.dataset.filter);
  });
});
setFilter("all");
