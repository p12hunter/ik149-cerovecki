// Lesson page logic: load lesson by ?id=xx and render tabs.

let currentLesson = null;
let currentTab = 'vocab';

(async function () {
  await I18N.init();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'lektion-01';
  currentLesson = await DATA.loadLesson(id);

  if (!currentLesson) {
    document.getElementById('tabContent').innerHTML = `<p class="text-center text-slate-500 py-12">Leccion no encontrada.</p>`;
    return;
  }

  renderHeader();
  renderTab(currentTab);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab');
      renderTab(currentTab);
    });
  });

  const flashLink = document.getElementById('flashcardsLink');
  if (flashLink) flashLink.href = `flashcards.html?lesson=${id}`;

  document.addEventListener('langchange', () => {
    renderHeader();
    renderTab(currentTab);
  });
})();

function renderHeader() {
  const lang = I18N.currentLang;
  document.getElementById('lessonNumber').textContent = `Lektion ${currentLesson.number}`;
  document.getElementById('lessonTitleDe').textContent = DATA.pick(currentLesson.title, 'de');
  const tr = DATA.pick(currentLesson.title, lang);
  document.getElementById('lessonTitleTranslated').textContent = (lang !== 'de') ? tr : '';
  document.title = `Lektion ${currentLesson.number}: ${DATA.pick(currentLesson.title, 'de')} - IK149`;
}

function renderTab(tab) {
  const container = document.getElementById('tabContent');
  const lang = I18N.currentLang;

  if (tab === 'vocab') {
    const items = currentLesson.vocabulary || [];
    if (!items.length) {
      container.innerHTML = emptyState('vocab');
      return;
    }
    container.innerHTML = `
      <div class="bg-white border border-amber-100 rounded-xl overflow-hidden">
        <div class="vocab-row bg-amber-50 font-semibold text-xs uppercase text-amber-800">
          <div>Deutsch</div>
          <div>${I18N.langMeta[lang]?.name || lang}</div>
        </div>
        ${items.map(v => {
          const article = v.article ? `<span class="vocab-article">${v.article}</span>` : '';
          const example = v.example ? `<div class="text-xs text-slate-400 italic mt-0.5">${v.example}</div>` : '';
          return `
            <div class="vocab-row">
              <div>
                <div class="vocab-de">${article}${v.de}</div>
                ${example}
              </div>
              <div class="vocab-translated">${DATA.pick(v.translations, lang)}</div>
            </div>`;
        }).join('')}
      </div>
    `;
    return;
  }

  if (tab === 'grammar') {
    const items = currentLesson.grammar || [];
    if (!items.length) {
      container.innerHTML = emptyState('grammar');
      return;
    }
    container.innerHTML = items.map(g => {
      const title = DATA.pick(g.title, 'de');
      const trTitle = DATA.pick(g.title, lang);
      const exp = DATA.pick(g.explanation, lang);
      const examples = (g.examples || []).map(e => `<li class="text-sm py-0.5">${e}</li>`).join('');
      const table = renderGrammarTable(g.table);
      return `
        <div class="grammar-block">
          <h4>${title}</h4>
          ${title !== trTitle ? `<p class="text-sm text-slate-500 -mt-1 mb-2">${trTitle}</p>` : ''}
          <p class="text-sm text-slate-700 mb-3 leading-relaxed">${exp}</p>
          ${table}
          ${examples ? `<ul class="list-disc list-inside text-slate-700 mt-2">${examples}</ul>` : ''}
        </div>
      `;
    }).join('');
    return;
  }

  if (tab === 'phrases') {
    const items = currentLesson.phrases || [];
    if (!items.length) {
      container.innerHTML = emptyState('phrases');
      return;
    }
    container.innerHTML = items.map(p => `
      <div class="phrase-item">
        <div class="phrase-de">${p.de}</div>
        <div class="phrase-translated">${DATA.pick(p.translations, lang)}</div>
        ${p.note ? `<div class="text-xs text-amber-700 mt-1">💡 ${DATA.pick(p.note, lang)}</div>` : ''}
      </div>
    `).join('');
    return;
  }

  if (tab === 'exercises') {
    const items = currentLesson.exercises || [];
    if (!items.length) {
      container.innerHTML = emptyState('exercises');
      return;
    }
    container.innerHTML = items.map(ex => {
      if (ex.type === 'link') {
        return `
          <a href="${ex.url}" target="_blank" rel="noopener" class="exercise-link">
            <span class="ext-icon">🔗</span>
            <div class="flex-1">
              <div class="font-semibold text-sm">${DATA.pick(ex.title, lang)}</div>
              <div class="text-xs text-slate-500">${ex.source || ''}</div>
            </div>
          </a>`;
      }
      if (ex.type === 'file') {
        return `
          <div class="exercise-link">
            <span class="ext-icon">📄</span>
            <div class="flex-1">
              <div class="font-semibold text-sm">${DATA.pick(ex.title, lang)}</div>
              <div class="text-xs text-slate-500">${ex.filename || ''}</div>
            </div>
          </div>`;
      }
      return '';
    }).join('');
    return;
  }

  if (tab === 'classes') {
    const items = currentLesson.classes || [];
    if (!items.length) {
      container.innerHTML = emptyState('classes');
      return;
    }
    container.innerHTML = items.map(c => `
      <div class="grammar-block">
        <h4>Tag ${c.tag} - ${c.date}</h4>
        ${c.summary ? `<p class="text-sm text-slate-700 leading-relaxed">${DATA.pick(c.summary, lang)}</p>` : ''}
        ${c.topics ? `<ul class="list-disc list-inside text-sm text-slate-700 mt-2">${c.topics.map(t => `<li>${DATA.pick(t, lang)}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
    return;
  }
}

function renderGrammarTable(table) {
  if (!table || !table.rows) return '';
  const headers = (table.headers || []).map(h => `<th>${h}</th>`).join('');
  const rows = table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
  return `<table class="grammar-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
}

function emptyState(tab) {
  return `
    <div class="text-center py-12 text-slate-400">
      <div class="text-5xl mb-3">📝</div>
      <p class="text-sm">${I18N.t('lesson.noContent')}</p>
    </div>
  `;
}
