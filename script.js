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

// Characters gallery
const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryImage = document.getElementById("gallery-image");
const galleryEmpty = document.getElementById("gallery-empty");
const galleryCaption = document.getElementById("gallery-caption");
const dotsRoot = document.getElementById("gallery-dots");
const prevBtn = document.querySelector(".arrow.prev");
const nextBtn = document.querySelector(".arrow.next");

const galleryData = {
  "Warrior": ["./assets/images/warrior.jpg"],
  "Priest": ["./assets/images/priest.jpg"],
  "Mage": [],
  "Paladin": [],
  "Rogue": [],
  "Necromancer": [],
  "Warlock": [],
  "Death Knight": []
};
let currentClass = "Warrior";
let currentIndex = 0;

function renderDots(count) {
  dotsRoot.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === currentIndex ? " active" : "");
    d.addEventListener("click", () => {
      currentIndex = i;
      updateSlide();
    });
    dotsRoot.appendChild(d);
  }
}
function updateSlide() {
  const list = galleryData[currentClass] || [];
  galleryCaption.textContent = currentClass;
  if (list.length === 0) {
    galleryImage.style.display = "none";
    galleryEmpty.style.display = "grid";
    renderDots(0);
    return;
  }
  if (currentIndex >= list.length) currentIndex = 0;
  galleryImage.src = list[currentIndex];
  galleryImage.style.display = "block";
  galleryEmpty.style.display = "none";
  renderDots(list.length);
}
galleryTabs.forEach(t => {
  t.addEventListener("click", () => {
    galleryTabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    currentClass = t.dataset.class;
    currentIndex = 0;
    updateSlide();
  });
});
prevBtn?.addEventListener("click", () => {
  const list = galleryData[currentClass] || [];
  if (!list.length) return;
  currentIndex = (currentIndex - 1 + list.length) % list.length;
  updateSlide();
});
nextBtn?.addEventListener("click", () => {
  const list = galleryData[currentClass] || [];
  if (!list.length) return;
  currentIndex = (currentIndex + 1) % list.length;
  updateSlide();
});
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") prevBtn?.click();
  if (e.key === "ArrowRight") nextBtn?.click();
});
updateSlide();
