// Data layer: loads lessons index and individual lesson JSON files.

const DATA = {
  index: null,
  lessons: {},

  async loadIndex() {
    if (this.index) return this.index;
    const res = await fetch('data/lessons/_index.json');
    this.index = await res.json();
    return this.index;
  },

  async loadLesson(id) {
    if (this.lessons[id]) return this.lessons[id];
    try {
      const res = await fetch(`data/lessons/${id}.json`);
      if (!res.ok) return null;
      const data = await res.json();
      this.lessons[id] = data;
      return data;
    } catch (e) {
      console.error('Failed to load lesson', id, e);
      return null;
    }
  },

  async loadAllLessons() {
    const index = await this.loadIndex();
    const all = [];
    for (const meta of index.lessons) {
      if (meta.status === 'available') {
        const data = await this.loadLesson(meta.id);
        if (data) all.push(data);
      }
    }
    return all;
  },

  // Pick translated string from {de:..., es:..., en:...} object
  pick(field, lang) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['en'] || field['de'] || Object.values(field)[0] || '';
  }
};
