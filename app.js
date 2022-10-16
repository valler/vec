if ("serviceWorker" in navigator) {
    const sw = import.meta.url.replace(/app\.js$/, "sw.js");
    navigator.serviceWorker.register(sw, { type: "module" });
}
export {};
//# sourceMappingURL=app.js.map