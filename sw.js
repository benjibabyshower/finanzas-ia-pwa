const CACHE_NAME = "finanzas-ia-v1";
const ASSETS = [
  "/finanzas-ia-pwa/",
  "/finanzas-ia-pwa/index.html",
  "/finanzas-ia-pwa/manifest.json",
  "/finanzas-ia-pwa/icon-192.png",
  "/finanzas-ia-pwa/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
