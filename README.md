# Boyd's Vintage Character Menu

A fun, interactive "scrapbook" style website where users can click on characters to listen to their stories via a vintage iPod interface.

## 📂 Project Structure

- **`charactermenu/`** - This is the main website folder.
  - `index.html` - The structure of the page.
  - `style.css` - All the vintage styling (Polaroids, tape, iPod).
  - `script.js` - The logic for clicking, audio, and the "Unlock Gate".
  - `*.mp3` - Audio files for each character live here.
  - `ipod.png` - The interface image.

## 🚀 How to Update

### 1. Adding New Audio
To add audio for a character:
1.  Get your `.mp3` file.
2.  Name it **exactly** the same as the character (e.g., `walton.mp3`, `ghost2.mp3`).
    *   *Note: Ensure the extension is lowercase `.mp3` if possible to avoid issues.*
3.  Drag and drop the file into the `charactermenu/` folder.
4.  Push the changes (see below).

### 2. Adding New Characters
If you update the main image (`newhomepage.jpg`) and need to re-trace characters:
1.  You will need to re-enable the "Tracer Tool" in `script.js` (ask your AI assistant to help!).
2.  Trace the new spots and add them to the `characters` array in `script.js`.

### 3. Pushing Changes to Live Site
Once you've added files or changed code:

1.  Open your terminal in this folder.
2.  Run these three commands:
    ```bash
    git add .
    git commit -m "Updated audio files"
    git push
    ```
3.  Vercel will detect the change and update your live URL automatically within ~1 minute.

## 🛠 Deployment Setup (First Time Only)

1.  Create a new repository on GitHub.
2.  Push this code to it:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```
3.  Go to [Vercel.com](https://vercel.com) -> "Add New Project".
4.  Select your GitHub repo.
5.  **Important:** In "Root Directory" settings, select `charactermenu`.
6.  Hit **Deploy**!

