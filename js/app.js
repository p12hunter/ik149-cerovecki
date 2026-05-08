// Index page logic: render grid of lessons.

(async function () {
  await I18N.init();
  await DATA.loadIndex();
  renderLessons();
  document.addEventListener('langchange', renderLessons);
})();

function renderLessons() {
  const grid = document.getElementById('lessonsGrid');
  if (!grid || !DATA.index) return;
  const lang = I18N.currentLang;

  grid.innerHTML = DATA.index.lessons.map(L => {
    const titleDe = DATA.pick(L.title, 'de');
    const titleTr = DATA.pick(L.title, lang);
    const desc = DATA.pick(L.description, lang);
    const isLocked = L.status !== 'available';
    const lockClass = isLocked ? 'locked' : '';
    const onClick = isLocked ? '' : `onclick="window.location.href='lesson.html?id=${L.id}'"`;
    const status = isLocked
      ? `<span class="text-xs text-amber-700">${I18N.t('lessons.comingSoon')}</span>`
      : `<span class="text-xs font-semibold text-emerald-700">${I18N.t('lessons.available')} →</span>`;

    return `
      <div class="lesson-card ${lockClass}" ${onClick}>
        <div class="lesson-number">${L.number}</div>
        <div class="text-amber-700 text-xs font-semibold uppercase mb-2 mt-1">Lektion ${L.number}</div>
        <h4 class="text-lg font-extrabold mb-1 leading-tight">${titleDe}</h4>
        ${titleDe !== titleTr ? `<p class="text-sm text-slate-600 mb-3">${titleTr}</p>` : '<div class="mb-3"></div>'}
        <p class="text-xs text-slate-500 leading-relaxed mb-4 min-h-[3rem]">${desc}</p>
        <div class="flex items-center justify-between">
          ${status}
          <span class="text-xs text-slate-400">${L.classes || 0} ${I18N.t('lessons.classesShort')}</span>
        </div>
      </div>
    `;
  }).join('');
}
