export type { };
declare const self: ServiceWorkerGlobalScope;
const
  cacheName = "c1",
  files = [
    "./",
    "offline.html",
    "base.css",
    "style.css",
    "app.js",
    "app.js.map",
    "favicon.ico",
    "icon.svg",
    "icon192.png",
    "icon512.png",
    "font/Source_Sans_3/SourceSans3-VariableFont_wght.ttf",
    "font/Source_Sans_3/SourceSans3-Italic-VariableFont_wght.ttf",
    "font/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf",
    "font/Source_Code_Pro/SourceCodePro-Italic-VariableFont_wght.ttf",
    "installation/",
    "learn/",
    "learn/area/",
    "learn/composition/",
    "learn/direction/",
    "learn/equality/",
    "learn/identity/",
    "learn/interpolation/",
    "learn/inverse/",
    "learn/length/",
    "learn/modules/",
    "learn/motion/",
    "learn/projection/",
    "learn/reduction/",
    "learn/reflection/",
    "lib/js/vec.js",
    "lib/js/vec2.js",
    "lib/js/vec3.js",
    "lib/js/vec4.js",
    "lib/js/vec.js.map",
    "lib/js/vec2.js.map",
    "lib/js/vec3.js.map",
    "lib/js/vec4.js.map",
  ];
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    await self.clients.claim();
    await Promise.all((await caches.keys())
      .map(k => k === cacheName || caches.delete(k))
    );
  })());
});
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const { request } = event;
    const cached = await caches.match(request);
    if (cached) return cached;
    return fetch(request);
  })());
});