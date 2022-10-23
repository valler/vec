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
        return caches.open(cacheName).then((cache) => cache.match(request).then((cached) => cached || fetch(request.url).then((response) => {
            cache.put(request, response.clone());
            return response;
        })));
    })());
});
export {};
//# sourceMappingURL=sw.js.map