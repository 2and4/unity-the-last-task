const cacheName = "2and4 Development-The Last Task-1.0.1";
const contentToCache = [
    "Build/webgl_2.0.loader.js",
    "Build/9af9bb89bbb3c9462edfdd7c4e8f33ad.js",
    "Build/1306b2608f7691d12d2abe979bbd7d80.data",
    "Build/011228b1c4db7e4007f6906699632ec1.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
