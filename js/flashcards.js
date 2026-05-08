// Flashcards page logic.

let allLessons = [];
let cards = [];
let cardIndex = 0;
let selectedLessons = new Set();

(async function () {
  await I18N.init();
  await DATA.loadIndex();
  allLessons = await DATA.loadAllLessons();

  const params = new URLSearchParams(window.location.search);
  const preselect = params.get('lesson');
  if (preselect) selectedLessons.add(preselect);

  renderLessonChecks();
  bindEvents();
  document.addEventListener('langchange', renderLessonChecks);
})();

function renderLessonChecks() {
  const container = document.getElementById('lessonChecks');
  if (!container) return;
  const lang = I18N.currentLang;

  container.innerHTML = allLessons.map(L => {
    const checked = selectedLessons.has(L.id) ? 'checked' : '';
    const checkedCls = selectedLessons.has(L.id) ? 'checked' : '';
    const title = DATA.pick(L.title, 'de');
    const trans = DATA.pick(L.title, lang);
    return `
      <label class="lesson-check ${checkedCls}">
        <input type="checkbox" data-id="${L.id}" ${checked} />
        <div class="text-xs leading-tight">
          <div class="font-semibold">L${L.number}: ${title}</div>
          ${trans !== title ? `<div class="text-slate-500">${trans}</div>` : ''}
        </div>
      </label>
    `;
  }).join('');

  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      if (cb.checked) selectedLessons.add(id);
      else selectedLessons.delete(id);
      renderLessonChecks();
    });
  });

  document.getElementById('startBtn').disabled = selectedLessons.size === 0;
}

function bindEvents() {
  document.getElementById('selectAll').addEventListener('click', () => {
    selectedLessons = new Set(allLessons.map(L => L.id));
    renderLessonChecks();
  });
  document.getElementById('selectNone').addEventListener('click', () => {
    selectedLessons.clear();
    renderLessonChecks();
  });

  document.getElementById('startBtn').addEventListener('click', startPractice);

  document.getElementById('exitFlash').addEventListener('click', exitPractice);
  document.getElementById('flashcard').addEventListener('click', () => {
    document.getElementById('flashcard').classList.toggle('flipped');
  });
  document.getElementById('nextCard').addEventListener('click', () => goCard(1));
  document.getElementById('prevCard').addEventListener('click', () => goCard(-1));
  document.getElementById('shuffle').addEventListener('click', shuffleCards);

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('flashcardView').classList.contains('hidden')) return;
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      document.getElementById('flashcard').classList.toggle('flipped');
    }
    if (e.code === 'ArrowRight') goCard(1);
    if (e.code === 'ArrowLeft') goCard(-1);
  });
}

function startPractice() {
  cards = [];
  for (const L of allLessons) {
    if (!selectedLessons.has(L.id)) continue;
    for (const v of (L.vocabulary || [])) {
      cards.push({
        front: (v.article ? v.article + ' ' : '') + v.de,
        back: DATA.pick(v.translations, I18N.currentLang),
        example: v.example || ''
      });
    }
  }
  if (!cards.length) return;
  shuffleCards(false);
  cardIndex = 0;
  renderCard();
  document.getElementById('selectorView').classList.add('hidden');
  document.getElementById('flashcardView').classList.remove('hidden');
}

function exitPractice() {
  document.getElementById('selectorView').classList.remove('hidden');
  document.getElementById('flashcardView').classList.add('hidden');
}

function shuffleCards(rerender = true) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  if (rerender) {
    cardIndex = 0;
    renderCard();
  }
}

function goCard(delta) {
  cardIndex = (cardIndex + delta + cards.length) % cards.length;
  document.getElementById('flashcard').classList.remove('flipped');
  renderCard();
}

function renderCard() {
  if (!cards.length) return;
  const c = cards[cardIndex];
  document.getElementById('cardFront').textContent = c.front;
  document.getElementById('cardBack').textContent = c.back;
  document.getElementById('cardExample').textContent = c.example;
  document.getElementById('cardLangLabel').textContent = I18N.langMeta[I18N.currentLang]?.name || I18N.currentLang;
  document.getElementById('progressText').textContent = `${cardIndex + 1} / ${cards.length}`;
}
