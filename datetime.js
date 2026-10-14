(() => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  });

  async function updateTimestamp(element) {
    let lastModified = document.lastModified;
    const source = element.dataset.source;

    if (source) {
      try {
        const response = await fetch(source, { method: "HEAD", cache: "no-store" });
        lastModified = response.headers.get("Last-Modified") || lastModified;
      } catch {
        // The timestamp already contains a readable fallback.
      }
    }

    const date = new Date(lastModified);
    if (Number.isNaN(date.getTime())) return;

    element.dateTime = date.toISOString();
    element.textContent = formatter.format(date).toLowerCase();
  }

  document.querySelectorAll("time[data-auto-datetime]").forEach(updateTimestamp);
})();
