// Pure HTML5 Canvas confetti generator - zero external dependencies
export function fireConfetti(originX, originY) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#3B82F6', '#60A5FA', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4'];
  const particleCount = 100;
  const particles = [];

  const startX = originX !== undefined ? originX : window.innerWidth / 2;
  const startY = originY !== undefined ? originY : window.innerHeight / 2;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 6;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      alpha: 1,
      gravity: 0.35,
      friction: 0.96,
      shape: Math.random() > 0.5 ? 'circle' : 'rect'
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeParticles = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
        }

        ctx.restore();
      }
    }

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  animationFrame = requestAnimationFrame(update);
}

