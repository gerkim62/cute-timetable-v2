console.log('from sw')


const CACHE_NAME = "v2";
const assetsToCache = [
  "/index.html",
  "/",
  "/pages/offline.html",
  
  "/css/main.css",
  "/css/loader.css",
  "/css/nav.css",
  "/css/reset.css",
  "/css/timetable.css",
  "/css/toast.css",
  "/css/tooltip.css",
  "/css/variables.css",
  "/css/utility.css",
  "/css/spinner.css",
  
  "/js/main.js",
  "/js/nav.js",
  "/js/functions.js",
  "/js/dom.js"
  
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(response => {
        if (response.status === 404) {
          // Return the 404 error to the browser
          return response;
        }

        if (response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      }).catch(error => {
        return caches.match("/pages/offline.html");
      });
    })
  );
});