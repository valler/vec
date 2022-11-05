if ("serviceWorker" in navigator) {
  const sw = import.meta.url.replace(/app\.js$/, "sw.js");
  navigator.serviceWorker.register(sw, { type: "module" });
}

const ico = document.head.querySelector("[rel='icon']");
if (ico instanceof HTMLLinkElement) {
  const col = matchMedia("(prefers-color-scheme: dark)");
  const url = new URL(ico.href);
  url.search = "?d";
  const a = url.href;
  url.search = "?l";
  const b = url.href;
  ico.href = col.matches ? a : b;
  col.addEventListener("change", (x) => {
    ico.href = x.matches ? a : b;
  });
}