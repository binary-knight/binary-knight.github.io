// The board spells "b-knight" in binary, one letter per row, and a knight crosses it in five legal moves.
// It draws once on load. With reduced motion it is simply there.
(() => {
  const word = 'b-knight';
  const size = 10, gap = 0.6;
  const cells = document.getElementById('cells'), stops = document.getElementById('stops');
  const path = document.getElementById('path'), knight = document.getElementById('knight');
  if (!cells) return;
  const ns = 'http://www.w3.org/2000/svg';
  [...word].forEach((ch, row) => {
    const bits = ch.charCodeAt(0).toString(2).padStart(8, '0');
    [...bits].forEach((bit, col) => {
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', col * size + gap / 2); r.setAttribute('y', row * size + gap / 2);
      r.setAttribute('width', size - gap); r.setAttribute('height', size - gap); r.setAttribute('rx', 1.2);
      r.setAttribute('class', `b${bit}`);
      cells.appendChild(r);
    });
  });
  // Squares as (column, row from the bottom). Every step is an L: two one way, one the other.
  const tour = [[1, 0], [2, 2], [4, 3], [6, 4], [5, 6], [7, 7]];
  const at = ([c, r]) => [c * size + size / 2, (7 - r) * size + size / 2];
  const points = tour.map(at);
  path.setAttribute('points', points.map(p => p.join(',')).join(' '));
  points.forEach(([x, y], i) => {
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', i === 0 ? 1.4 : 1);
    stops.appendChild(dot);
  });
  // The knight stands on the last square, which is outlined so the move reads as arriving somewhere.
  const [lastC, lastR] = tour.at(-1), landing = document.createElementNS(ns, 'rect');
  landing.setAttribute('id', 'landing'); landing.setAttribute('x', lastC * size + gap / 2); landing.setAttribute('y', (7 - lastR) * size + gap / 2);
  landing.setAttribute('width', size - gap); landing.setAttribute('height', size - gap); landing.setAttribute('rx', 1.2);
  cells.appendChild(landing);
  knight.setAttribute('transform', `translate(${lastC * size} ${(7 - lastR) * size})`);
  stops.lastChild?.remove();

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) return;
  const length = path.getTotalLength();
  path.style.strokeDasharray = length; path.style.strokeDashoffset = length;
  stops.style.opacity = 0; knight.style.opacity = 0;
  requestAnimationFrame(() => {
    path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], { duration: 1600, delay: 250, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'forwards' });
    stops.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 450, fill: 'forwards' });
    knight.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 1750, easing: 'ease-out', fill: 'forwards' });
  });
})();
