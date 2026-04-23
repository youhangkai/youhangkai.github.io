# youhangkai.github.io

Personal website for Hangkai You — live at **https://youhangkai.github.io**.

## Editing

Plain HTML + one CSS file. No Jekyll build step.

- `index.html` — About / home page (bio, news, selected code, contact)
- `publications.html` — full publication list
- `cv.html` — CV summary (links to the PDF)
- `assets/css/main.css` — all styling
- `assets/files/Hangkai_You_CV.pdf` — CV file served from `/assets/files/...`
- `assets/img/profile.jpg` — add this file to show the profile photo

### Common edits

- **Add a publication** → edit the relevant `<ul class="pubs">` in `publications.html`.
- **Update news** → edit the News timeline in `index.html`.
- **Swap or add a code repo** → edit the `<ul class="bare code-list">` in `index.html`.
- **Replace CV** → drop the new PDF at `assets/files/Hangkai_You_CV.pdf`.
- **Add a profile photo** → save a square JPG at `assets/img/profile.jpg` (240×240 is fine).

### Publishing a change

```bash
git add .
git commit -m "update: <what changed>"
git push
```

GitHub Pages rebuilds within ~30 seconds.
