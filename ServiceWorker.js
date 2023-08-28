const cacheName = "2and4 Development-The Last Task-1.0.0";
const contentToCache = [
    "Build/webgl.loader.js",
    "Build/cac11487858415bdd5b29478b403f3ca.js",
    "Build/a4d222d95d3057f81c02ec63ce20f6a3.data",
    "Build/2625780e322d680ae52ba3640bd91c67.wasm",
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
