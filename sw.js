const cacheName = "c4", files = [
    "offline.html",
    "base.css",
    "style.css",
    "app.js",
    "favicon.ico",
    "icon.svg",
    "icon192.png",
    "icon512.png",
    "font/Source_Sans_3/SourceSans3-VariableFont_wght.ttf",
];
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(files);
    })());
});
self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        await self.clients.claim();
        await Promise.all((await caches.keys())
            .map(k => k === cacheName || caches.delete(k)));
    })());
});
self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
        const { request } = event;
        const cached = await caches.match(request);
        if (cached) {
            fetch(request).then((async (response) => {
                (await caches.open(cacheName))
                    .put(request, response.clone());
            }));
            return cached;
        }
        else {
            const fetched = await fetch(request);
            (await caches.open(cacheName))
                .put(request, fetched.clone());
            return fetched;
        }
    })());
});
export {};
//# sourceMappingURL=sw.js.map