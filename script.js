const currentPage = document.body.dataset.page || "home";

document.querySelectorAll(".nav__link").forEach((link) => {
  const isCurrent = link.dataset.nav === currentPage;
  link.classList.toggle("is-active", isCurrent);

  if (isCurrent) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

document.querySelectorAll(".nav__details").forEach((details) => {
  details.open = false;
});

const normalizePath = (url) => {
  const path = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
  return path.replace(/\/+$/, "");
};

const requestedOpenGroup = sessionStorage.getItem("openNavDetails");
sessionStorage.removeItem("openNavDetails");

document.querySelectorAll(".nav__link").forEach((link) => {
  const details = link.nextElementSibling;
  const hasSubtitles = details?.classList.contains("nav__details");

  if (!hasSubtitles) return;

  if (details.dataset.navDetails === requestedOpenGroup) {
    details.open = true;
  }

  link.setAttribute("aria-expanded", String(details.open));

  link.addEventListener("click", (event) => {
    const targetUrl = new URL(link.href, window.location.href);
    const currentUrl = new URL(window.location.href);
    const isSamePage = normalizePath(targetUrl) === normalizePath(currentUrl);

    if (!isSamePage) {
      sessionStorage.setItem("openNavDetails", details.dataset.navDetails);
      return;
    }

    event.preventDefault();
    details.open = !details.open;
    link.setAttribute("aria-expanded", String(details.open));
  });
});
