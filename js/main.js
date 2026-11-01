document.querySelectorAll('.carousel').forEach(car => {
  const track = car.querySelector('.track');
  const dots = car.querySelector('.dots');
  const prev = car.querySelector('#prev, .prev');
  const next = car.querySelector('#next, .next');
  const n = track.children.length;
  const DELAY = 3000; // ms between automatic slides
  let i = 0, timer;

  for (let k = 0; k < n; k++) {
    const d = document.createElement('button');
    d.setAttribute('aria-label', 'Show slide ' + (k + 1));
    d.onclick = () => { go(k); play(); };
    dots.appendChild(d);
  }

  function go(k) {
    i = (k + n) % n;
    track.style.transform = 'translateX(-' + i * 100 + '%)';
    [...dots.children].forEach((d, j) => d.classList.toggle('on', j === i));
  }

  // Always auto-scrolls (restarts after any manual interaction)
  function play() {
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), DELAY);
  }

  prev.onclick = () => { go(i - 1); play(); };
  next.onclick = () => { go(i + 1); play(); };

  // Pause on hover only for real mouse pointers (touch taps must not stop it)
  car.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') clearInterval(timer); });
  car.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') play(); });

  // Simple swipe support on touch screens
  let startX = null;
  car.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  car.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) { go(dx < 0 ? i + 1 : i - 1); }
    play();
  });

  go(0); play();
});
