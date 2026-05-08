// Simple i18n system - loads UI translations and exposes t(key) helper.

const I18N = {
  currentLang: localStorage.getItem('ik149-lang') || 'es',
  translations: {},
  rtlLangs: ['ar'],

  langMeta: {
    de: { name: 'Deutsch', flag: '🇩🇪' },
    es: { name: 'Espanol', flag: '🇪🇸' },
    en: { name: 'English', flag: '🇬🇧' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    uk: { name: 'Українська', flag: '🇺🇦' },
    tr: { name: 'Turkce', flag: '🇹🇷' },
    bs: { name: 'Bosanski', flag: '🇧🇦' }
  },

  async load(lang) {
    if (this.translations[lang]) return this.translations[lang];
    try {
      const res = await fetch(`data/i18n/ui.${lang}.json`);
      const data = await res.json();
      this.translations[lang] = data;
      return data;
    } catch (e) {
      console.error('Failed to load language', lang, e);
      return {};
    }
  },

  async setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('ik149-lang', lang);
    await this.load(lang);
    this.applyToDOM();
    document.documentElement.lang = lang;
    document.documentElement.dir = this.rtlLangs.includes(lang) ? 'rtl' : 'ltr';
    this.updateSwitcher();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  },

  t(key, fallback) {
    const dict = this.translations[this.currentLang] || {};
    const parts = key.split('.');
    let val = dict;
    for (const p of parts) {
      val = val?.[p];
      if (val === undefined) break;
    }
    if (val === undefined) {
      const fb = this.translations['en'] || {};
      let fbVal = fb;
      for (const p of parts) {
        fbVal = fbVal?.[p];
        if (fbVal === undefined) break;
      }
      return fbVal !== undefined ? fbVal : (fallback || key);
    }
    return val;
  },

  applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = this.t(key);
      if (value !== undefined) el.textContent = value;
    });
  },

  updateSwitcher() {
    const meta = this.langMeta[this.currentLang];
    if (!meta) return;
    const flag = document.getElementById('langFlag');
    const name = document.getElementById('langName');
    if (flag) flag.textContent = meta.flag;
    if (name) name.textContent = meta.name;
  },

  initSwitcher() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => menu.classList.add('hidden'));

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = opt.getAttribute('data-lang');
        menu.classList.add('hidden');
        await this.setLang(lang);
      });
    });
  },

  async init() {
    this.initSwitcher();
    await this.load('en');
    await this.setLang(this.currentLang);
  }
};
