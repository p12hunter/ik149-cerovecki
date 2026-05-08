# Como subir esta web a GitHub Pages 🚀

Guia paso a paso. Tiempo total: **15-20 minutos**. NO hace falta usar terminal.

---

## Paso 1: Crear cuenta GitHub (si no tienes)

1. Ve a https://github.com
2. Click "Sign up"
3. Crea cuenta con tu email. Username sera tu URL final (ej: `ricardoprieto`).
4. Verifica el email.

**Si ya tienes cuenta**, salta este paso.

---

## Paso 2: Crear el repositorio

1. En github.com, arriba a la derecha click el **+** → **New repository**
2. Rellena:
   - **Repository name:** `ik149-cerovecki`
   - **Description:** `IK149 Online-Abend mit Fr Cerovecki - Lernplattform`
   - **Public** ✓ (importante para GitHub Pages gratis)
   - **NO** marques "Add a README file" (ya tenemos uno)
   - **NO** marques gitignore ni license
3. Click **Create repository**.

GitHub te muestra una pagina con instrucciones. **No las uses**. Sigue las mias abajo.

---

## Paso 3: Subir los archivos (sin terminal)

GitHub permite subir archivos arrastrando con el raton.

1. En la pagina del repo recien creado, haz click en **"uploading an existing file"** (link azul a media pagina).
2. Abre el explorador de Windows y ve a `P:\claude\ik149-cerovecki\`.
3. **Selecciona TODOS los archivos y carpetas** (Ctrl+A) y arrastralos a la zona de drop de GitHub.

   Importante: tienen que ir todos los archivos sueltos, no la carpeta. Es decir, dentro del repo deben quedar:
   - `index.html`
   - `lesson.html`
   - `flashcards.html`
   - `README.md`
   - `DEPLOY.md`
   - `.gitignore`
   - carpetas `css/`, `js/`, `data/`, `assets/`

4. Espera a que carguen (tarda 1-2 min porque hay muchos archivos).
5. Abajo en **"Commit changes"** escribe el mensaje: `Initial commit: MVP con 7 lecciones`
6. Click **Commit changes**.

---

## Paso 4: Activar GitHub Pages

1. En tu repo, click la pestana **Settings** (arriba).
2. En el menu lateral izquierdo, click **Pages**.
3. En **"Build and deployment"**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `(root)`
4. Click **Save**.

GitHub empieza a desplegar (tarda 1-3 min). Cuando termine, en esa misma pagina veras un cuadro verde con tu link:

```
Your site is live at https://TU-USUARIO.github.io/ik149-cerovecki/
```

**Ese es el link que compartes con tus companeros de clase.** ✨

---

## Paso 5: Compartir

Pega el link donde quieras:
- WhatsApp del grupo
- Discord/Telegram
- Email a la profesora
- Bookmark personal

Funciona en movil, tablet, PC. No requiere instalar nada. Idioma se elige desde la propia web.

---

## Como anadir contenido nuevo despues

**Opcion A (mas facil) - desde GitHub web:**

1. Ve a tu repo en github.com.
2. Navega a la carpeta `data/lessons/`.
3. Click en `lektion-XX.json` (la que quieras editar).
4. Click el icono del **lapiz** (Edit this file).
5. Edita el JSON como texto. Manten el formato.
6. Abajo: "Commit changes" → mensaje breve → Commit.
7. La web se actualiza automaticamente en 1-2 min.

**Opcion B (subir nuevos archivos):**

1. En el repo, navega a la carpeta donde quieres subir.
2. Click **Add file** → **Upload files**.
3. Arrastra y commit como en el paso 3.

**Opcion C (avanzado, con GitHub Desktop):**

1. Instala GitHub Desktop (https://desktop.github.com/).
2. Clone repository → eliges `ik149-cerovecki`.
3. Editas los archivos en `P:\claude\ik149-cerovecki\` con tu editor preferido.
4. Vuelves a GitHub Desktop, ves los cambios, escribes mensaje y "Commit + Push".

---

## Que hacer si algo no va

**La web carga pero no se ven las lecciones:**
- Verifica que en `data/lessons/_index.json` los Lektionen tengan `"status": "available"`.
- Espera 2 min y refresca (Ctrl+F5).

**Los JSON dan error:**
- Probablemente una coma o comilla mal puesta. Pega el contenido en https://jsonlint.com/ para validar.

**El idioma no cambia:**
- Limpia cache del navegador (Ctrl+Shift+Del → "Cookies y datos del sitio") y recarga.

**Los emojis se ven raros:**
- Verifica que el archivo se guarde como UTF-8.

---

## Que NO hacer

- **No edites archivos `.html` o `.js`** salvo que sepas lo que haces. El contenido de cada Lektion va SOLO en los `data/lessons/lektion-XX.json`.
- **No borres el archivo `_index.json`**: es el que controla que lecciones aparecen.
- **No subas archivos pesados** (imagenes mas de 1MB, videos): GitHub tiene limite de 100MB por archivo y la web sera mas lenta.

---

🌻 Listo! Disfruta y compartelo con tu clase.
