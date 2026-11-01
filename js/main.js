document.querySelectorAll('.carousel').forEach(car => {
  const track = car.querySelector('.track');
  const dots = car.querySelector('.dots');
  const prev = car.querySelector('#prev, .prev');
  const next = car.querySelector('#next, .next');
  const n = track.children.length;
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

  function play() {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches)
      timer = setInterval(() => go(i + 1), 3500);
  }

  prev.onclick = () => { go(i - 1); play(); };
  next.onclick = () => { go(i + 1); play(); };
  car.addEventListener('mouseenter', () => clearInterval(timer));
  car.addEventListener('mouseleave', play);
  go(0); play();
});
