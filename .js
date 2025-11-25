(() => {
  const ball = document.getElementById('kin-ball');
  const uInput = document.getElementById('kin-u');
  const aInput = document.getElementById('kin-a');
  const tInput = document.getElementById('kin-t');
  const startBtn = document.getElementById('kin-start');
  const resetBtn = document.getElementById('kin-reset');
  const output = document.getElementById('kin-output');

  let kinAnimId = null;
  const pxPerMeter = 40;
  const maxWidthPx = 260; 

  function resetKinematics() {
    cancelAnimationFrame(kinAnimId);
    ball.style.transform = 'translateX(0px)';
    output.textContent = '–';
  }

  function startKinematics() {
    resetKinematics();

    const u = parseFloat(uInput.value) || 0;
    const a = parseFloat(aInput.value) || 0;
    const T = Math.max(parseFloat(tInput.value) || 1, 0.1);

    const s = u * T + 0.5 * a * T * T;
    output.textContent = s.toFixed(2) + ' m';

    const startTime = performance.now();

    function animate(now) {
      const elapsed = (now - startTime) / 1000; // seconds
      if (elapsed > T) {
        const finalX = Math.min(s * pxPerMeter, maxWidthPx);
        ball.style.transform = `translateX(${finalX}px)`;
        return;
      }

      const currentS = u * elapsed + 0.5 * a * elapsed * elapsed;
      let x = currentS * pxPerMeter;
      x = Math.max(0, Math.min(x, maxWidthPx));
      ball.style.transform = `translateX(${x}px)`;
      kinAnimId = requestAnimationFrame(animate);
    }

    kinAnimId = requestAnimationFrame(animate);
  }

  startBtn.addEventListener('click', startKinematics);
  resetBtn.addEventListener('click', resetKinematics);
})();

(() => {
  const block = document.getElementById('force-block');
  const arrow = document.getElementById('force-arrow');
  const arrowBody = arrow.querySelector('.arrow-body');
  const mInput = document.getElementById('force-m');
  const FInput = document.getElementById('force-F');
  const startBtn = document.getElementById('force-start');
  const resetBtn = document.getElementById('force-reset');
  const output = document.getElementById('force-output');

  let forceAnimId = null;
  const maxWidthPx = 260;
  const pxPerMeter = 35;

  function resetForces() {
    cancelAnimationFrame(forceAnimId);
    block.style.transform = 'translateX(0px)';
    arrow.style.transform = 'translateX(0px)';
    arrowBody.style.width = '20px';
    output.textContent = '–';
  }

  function startForces() {
    resetForces();

    let m = parseFloat(mInput.value);
    const F = parseFloat(FInput.value);
    if (!m || m <= 0) m = 0.1;

    const a = F / m;
    output.textContent = a.toFixed(2) + ' m/s²';

    const arrowLength = Math.min(Math.abs(F) * 10 + 20, 120);
    arrowBody.style.width = arrowLength + 'px';

    let v = 0;
    let x = 0;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = (now - startTime) / 1000; 
      if (elapsed > 3) return; 

      const dt = 0.016;
      v += a * dt;
      const dx = v * dt * pxPerMeter;
      x += dx;

      let clamped = Math.max(0, Math.min(x, maxWidthPx));
      block.style.transform = `translateX(${clamped}px)`;
      arrow.style.transform = `translateX(${clamped}px)`;

      forceAnimId = requestAnimationFrame(animate);
    }

    forceAnimId = requestAnimationFrame(animate);
  }

  startBtn.addEventListener('click', startForces);
  resetBtn.addEventListener('click', resetForces);
})();

(() => {
  const circle = document.getElementById('circ-circle');
  const dot = document.getElementById('circ-dot');
  const arrow = document.getElementById('circ-arrow');
  const arrowBody = arrow.querySelector('.circ-arrow-body');
  const mInput = document.getElementById('circ-m');
  const vInput = document.getElementById('circ-v');
  const rInput = document.getElementById('circ-r');
  const startBtn = document.getElementById('circ-start');
  const resetBtn = document.getElementById('circ-reset');
  const output = document.getElementById('circ-output');

  let circAnimId = null;
  let angle = 0;

  const cx = 65; 
  const cy = 65; 
  const pxPerMeter = 20; 

  function positionDot(radiusMeters, angleRad) {
    const rPx = radiusMeters * pxPerMeter;
    const x = cx + rPx * Math.cos(angleRad);
    const y = cy + rPx * Math.sin(angleRad);

    dot.style.left = (x - dot.offsetWidth / 2) + 'px';
    dot.style.top = (y - dot.offsetHeight / 2) + 'px';
  }

  function resetCircular() {
    cancelAnimationFrame(circAnimId);
    angle = 0;
    const m = parseFloat(mInput.value) || 1;
    const v = parseFloat(vInput.value) || 1;
    const r = parseFloat(rInput.value) || 2;

    const Fc = m * v * v / r;
    output.textContent = '–';

    arrow.style.transform = 'translate(-50%, -50%)';
    arrowBody.style.height = '20px';
    positionDot(r, 0);
  }

  function startCircular() {
    cancelAnimationFrame(circAnimId);

    let m = parseFloat(mInput.value);
    let v = parseFloat(vInput.value);
    let r = parseFloat(rInput.value);

    if (!m || m <= 0) m = 1;
    if (!r || r <= 0) r = 1;
    if (!v) v = 0.1;

    const Fc = m * v * v / r;
    output.textContent = Fc.toFixed(2) + ' N';

    const lengthPx = Math.min(Math.abs(Fc) * 3 + 20, 80);
    arrowBody.style.height = lengthPx + 'px';

    const omega = v / r; 
    const startTime = performance.now();

    function animate(now) {
      const elapsed = (now - startTime) / 1000;
      const dt = 0.016;

      angle += omega * dt;
      positionDot(r, angle);

      arrow.style.transform =
        `translate(-50%, -50%) rotate(${(-angle * 180 / Math.PI).toFixed(1)}deg)`;

      circAnimId = requestAnimationFrame(animate);
    }

    circAnimId = requestAnimationFrame(animate);
  }

  startBtn.addEventListener('click', startCircular);
  resetBtn.addEventListener('click', resetCircular);

  window.addEventListener('load', resetCircular);
})();
