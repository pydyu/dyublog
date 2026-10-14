# pydyu blog post

A plain, dependency-free personal blog built with HTML and CSS. It works directly on GitHub Pages: no build step, package manager, or framework required.

## Preview locally

You can open `index.html` directly in a browser. For a local web server (recommended for checking links), run:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Add a post

1. Copy `posts/example-post.html` and give it a lowercase filename, such as `my-new-post.html`.
2. Replace the title, summary, and article text. Do not write a date or time—the script reads it automatically from the post file's `Last-Modified` value.
3. Add a matching post summary and link near the top of `index.html`.
4. Keep the `data-auto-datetime` line unchanged.

Example:

```html
<time data-auto-datetime>date and time loading…</time>
```

On the homepage, add `data-source="posts/your-post.html"` so the timestamp is read from that post rather than from `index.html`. GitHub Pages supplies the file modification time; the browser formats it in each visitor's local time zone.

## Add images and animated GIFs

Put `.jpg`, `.png`, `.webp`, `.svg`, or `.gif` files in `assets/uploads/`. You can do this locally or use GitHub's **Add file → Upload files** button. GitHub Pages serves GIFs unchanged, so their animation works normally.

Add the media inside a post:

```html
<figure>
  <img src="../assets/uploads/my-animation.gif" alt="Describe what the image shows" loading="lazy">
  <figcaption>An optional caption.</figcaption>
</figure>
```

GitHub Pages cannot accept uploads from site visitors because it is static hosting. Media is uploaded to the repository when you publish or update a post.

## Publish with GitHub Pages

1. On GitHub, create a new public repository (for example, `dyublog`). Do not add a README or `.gitignore` there because this folder already has its files.
2. In this folder, run the following commands, replacing `YOUR-USERNAME` and the repository name:

```powershell
git init
git add .
git commit -m "Publish pydyu blog"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/dyublog.git
git push -u origin main
```

3. On GitHub, open the repository and go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then click **Save**.
6. After a minute or two, the site will be available at `https://YOUR-USERNAME.github.io/dyublog/`.

If the repository is named exactly `YOUR-USERNAME.github.io`, the address will instead be `https://YOUR-USERNAME.github.io/`.

All links are relative, so this site works both at a root domain and inside a GitHub Pages project path.
