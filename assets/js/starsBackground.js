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
  // --- Thay thế nền cũ bằng gradient mới ---
  // 1. Tạo gradient xuyên tâm, tập trung ở góc phải dưới màn hình
  const gradient = starsCtx.createRadialGradient(
    w, h, 0, // Tâm gradient: ở góc phải dưới, bán kính trong là 0
    w, h, w // Tâm gradient: ở góc phải dưới, bán kính ngoài bằng chiều rộng canvas
  );
  
  // 2. Thêm các điểm dừng màu
  // Màu đen ở gần tâm
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); 
  // Chuyển sang một chút sáng trắng mờ
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)'); 
  // Chuyển về màu đen ở xa tâm
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); 
  
  // 3. Sử dụng gradient làm màu tô nền và vẽ
  starsCtx.fillStyle = gradient;
  starsCtx.fillRect(0, 0, w, h);
  // ----------------------------------------------------

  // Vẽ các ngôi sao màu trắng lên trên nền gradient đó
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