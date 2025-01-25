const cacheName = "2and4 Development-The Last Task-1.1.0";
const contentToCache = [
    "Build/09d981ca8521ecd219931d3479487c43.loader.js",
    "Build/fbaba5a7902be02b4afa9445372fd895.framework.js",
    "Build/7003404b77a3b78b725badb696a6d4f7.data",
    "Build/4bad478dc33529bb3c6ec0905dd9eb28.wasm",
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
