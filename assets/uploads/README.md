# Post media

Put post images and animated GIFs in this folder. GitHub Pages serves these files unchanged, so animated GIFs remain animated.

Use lowercase filenames without spaces, for example:

- `desk-photo.jpg`
- `drawing-process.gif`
- `small-tool-demo.webp`

Then place this inside a post's `<article>`:

```html
<figure>
  <img src="../assets/uploads/drawing-process.gif" alt="A useful description" loading="lazy">
  <figcaption>An optional caption.</figcaption>
</figure>
```

PNG, JPEG, WebP, SVG, and GIF files all work. Keep files reasonably small so posts load quickly.
