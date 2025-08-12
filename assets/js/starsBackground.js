const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

let w, h;
function resize() {
  w = starsCanvas.width = window.innerWidth;
  h = starsCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
const STAR_COUNT = 500;
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 3 + 0.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02 + 0.005
  });
}

function drawStars() {
  starsCtx.clearRect(0, 0, w, h);
  starsCtx.fillStyle = "white";
  stars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
    starsCtx.globalAlpha = star.alpha;
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fill();
  });
  starsCtx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();