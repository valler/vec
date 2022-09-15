const cacheName = "cache", files = [
    "index.html",
    "style.css",
    "app.ts",
    "app.js",
    "app.js.map",
    "favicon.ico",
    "icon.svg",
    "icon192.png",
    "icon512.png",
    "font/Source_Sans_3/SourceSans3-VariableFont_wght.ttf",
    "font/Source_Sans_3/SourceSans3-Italic-VariableFont_wght.ttf",
];
self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(files);
    })());
    self.skipWaiting();
});
self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        if ("navigationPreload" in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());
    self.clients.claim();
});
self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        const { request } = event;
        const cached = await caches.match(request);
        if (cached)
            return cached;
        const cache = await caches.open(cacheName);
        const preloaded = await event.preloadResponse;
        if (preloaded) {
            await cache.put(request, preloaded.clone());
            return preloaded;
        }
        const fetched = await fetch(request);
        await cache.put(request, fetched.clone());
        return fetched;
    })());
});
export {};
//# sourceMappingURL=sw.js.map