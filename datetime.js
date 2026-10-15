(() => {
  const repository = "pydyu/dyublog";
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  });

  function currentPostPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const repositoryName = repository.split("/")[1];
    const repositoryPosition = parts.indexOf(repositoryName);
    return parts.slice(repositoryPosition + 1).join("/") || "index.html";
  }

  function nextPage(linkHeader) {
    if (!linkHeader) return null;
    const nextLink = linkHeader
      .split(",")
      .map((part) => part.trim())
      .find((part) => part.endsWith('rel="next"'));
    return nextLink ? nextLink.match(/<([^>]+)>/)?.[1] || null : null;
  }

  async function firstCommitDate(path) {
    const cacheKey = `pydyu:first-commit:${path}`;
    const cachedDate = localStorage.getItem(cacheKey);
    if (cachedDate) return cachedDate;

    let url = `https://api.github.com/repos/${repository}/commits?path=${encodeURIComponent(path)}&per_page=100`;
    let oldestDate = null;

    while (url) {
      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });
      if (!response.ok) throw new Error("Could not read GitHub commit history");

      const commits = await response.json();
      const oldestCommitOnPage = commits.at(-1);
      if (oldestCommitOnPage) {
        oldestDate = oldestCommitOnPage.commit.author.date;
      }
      url = nextPage(response.headers.get("Link"));
    }

    if (!oldestDate) throw new Error("No commit date found");
    localStorage.setItem(cacheKey, oldestDate);
    return oldestDate;
  }

  async function updateTimestamp(element) {
    const postPath = element.dataset.source || currentPostPath();
    let publishedDate;

    try {
      publishedDate = await firstCommitDate(postPath);
    } catch {
      publishedDate = document.lastModified;
    }

    const date = new Date(publishedDate);
    if (Number.isNaN(date.getTime())) return;

    element.dateTime = date.toISOString();
    element.textContent = formatter.format(date).toLowerCase();
  }

  document.querySelectorAll("time[data-auto-datetime]").forEach(updateTimestamp);
})();
