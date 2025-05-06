document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;
      ripple.classList.add("ripple");

      const existing = this.querySelector(".ripple");
      if (existing) existing.remove();

      this.appendChild(ripple);

      // Add more animation for the card
      this.style.transition = "transform 0.4s ease, background-color 0.3s ease";
      this.style.transform = "scale(1.05) rotate(10deg)";
      this.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; // light color change on click

      // Reset the animation after a delay to avoid overriding
      setTimeout(() => {
        this.style.transform = "scale(1) rotate(0deg)";
        this.style.backgroundColor = ""; // Reset background color
      }, 400);
    });
  });
});



const text = "Machine Learning Engineer | Software Developer";
let i = 0;
const speed = 100;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.onload = typeWriter;



const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


