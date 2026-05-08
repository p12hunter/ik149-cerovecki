# IK149 Online-Abend mit Fr Cerovecki 🌻

Lernplattform / plataforma de aprendizaje para el curso de aleman A1.1 (Schritte plus neu 1) con Fr. Cerovecki.

**Idiomas soportados (UI + traducciones):** Deutsch · Espanol · English · العربية · Українська · Turkce

---

## Estructura del proyecto

```
ik149-cerovecki/
├── index.html              Landing con grid de 7 lecciones
├── lesson.html             Vista de una leccion (vocabulario, gramatica, etc.)
├── flashcards.html         Modo flashcard con selector de lecciones
├── css/style.css           Estilos custom + soporte RTL
├── js/
│   ├── i18n.js             Sistema i18n (carga UI translations)
│   ├── data.js             Loader de lecciones JSON
│   ├── app.js              Logica de index
│   ├── lesson.js           Logica de leccion + tabs
│   └── flashcards.js       Logica de flashcards (flip + shuffle)
├── data/
│   ├── i18n/               UI strings: ui.de.json, ui.es.json, ui.en.json, ui.ar.json, ui.uk.json, ui.tr.json
│   └── lessons/
│       ├── _index.json     Lista de las 7 Lektionen
│       └── lektion-01.json Contenido completo de Lektion 1 (otras pendientes)
└── README.md
```

## Como anadir contenido nuevo

### Anadir una nueva clase a una Lektion existente

Edita `data/lessons/lektion-XX.json` y anade entradas en los arrays correspondientes:

- `vocabulary[]` - palabras nuevas con traducciones a los 6 idiomas
- `grammar[]` - bloques gramaticales (con tabla opcional)
- `phrases[]` - frases utiles
- `exercises[]` - links externos a wordwall, etc.
- `classes[]` - resumen del Tag (dia de clase)

### Anadir una nueva Lektion

1. Cambia el `status` en `_index.json` de `"coming"` a `"available"`.
2. Crea el JSON correspondiente: `data/lessons/lektion-02.json`.
3. Sigue el mismo formato que `lektion-01.json`.

## Como ejecutar localmente

Solo necesitas abrir `index.html` en un navegador moderno. Pero como usa `fetch` para los JSON, recomienda servir con un servidor local:

```bash
cd ik149-cerovecki
python -m http.server 8000
```

Luego abre http://localhost:8000

## Despliegue en GitHub Pages

1. Crear repositorio publico en GitHub: `ik149-cerovecki`.
2. Subir todo el contenido de esta carpeta.
3. Settings → Pages → Source: `main` branch, root folder.
4. URL final: `https://<tu-usuario>.github.io/ik149-cerovecki/`

## Tecnologia

- HTML + JS vanilla + Tailwind CSS (via CDN, sin build step)
- Fonts: Inter (Google Fonts)
- Cero dependencias npm/build pipeline
- Mobile-first responsive

## Material fuente

- **Libro:** Schritte plus neu 1 A1.1 - Kurs- und Arbeitsbuch (Hueber Verlag)
- **Profesora:** Jelena Cerovecki
- **Curso:** IK149 Integrationskurs Online-Abend, IEC Wuppertal

🌻 Hecho con carino para los alumnos de la clase.
