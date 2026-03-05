// ── 공통 진행률 계산 ──────────────────────────────────────────
function getProgress(unit) {
  const now = new Date();

  if (unit === 'year') {
    const start = new Date(now.getFullYear(), 0, 1);
    const end   = new Date(now.getFullYear() + 1, 0, 1);
    const pct   = (now - start) / (end - start) * 100;
    const daysLeft = Math.ceil((end - now) / 86400000);
    return { title: String(now.getFullYear()), pct, left: `${daysLeft} days left`, label: 'Yearly' };
  }

  if (unit === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end   = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const pct   = (now - start) / (end - start) * 100;
    const daysLeft = Math.ceil((end - now) / 86400000);
    const names = ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'];
    return { title: names[now.getMonth()], pct, left: `${daysLeft} days left`, label: 'Monthly' };
  }

  if (unit === 'week') {
    const day = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);
    const end = new Date(startOfWeek);
    end.setDate(startOfWeek.getDate() + 7);
    const pct = (now - startOfWeek) / (end - startOfWeek) * 100;
    const daysLeft = Math.ceil((end - now) / 86400000);
    return { title: 'This Week', pct, left: `${daysLeft} days left`, label: 'Weekly' };
  }

  if (unit === 'day') {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const end   = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const pct   = (now - start) / (end - start) * 100;
    const hoursLeft = ((end - now) / 3600000).toFixed(1);
    return { title: 'Today', pct, left: `${hoursLeft} hrs left`, label: 'Daily' };
  }
}

// ── 점 매트릭스 렌더링 ──────────────────────────────────────────
// container: DOM 요소, pct: 0~100, count: 점 총 개수
function renderDots(container, pct, count) {
  container.innerHTML = '';
  const filled = Math.round(Math.min(100, Math.max(0, pct)) / 100 * count);
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i < filled ? ' filled' : '');
    container.appendChild(dot);
  }
}

// ── 현재 시각 문자열 ──────────────────────────────────────────
function getClockString() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
