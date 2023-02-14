console.log('from sw')


const CACHE_NAME = "v5";
const assetsToCache = [
  "index.html",
  "/",

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
        //return caches.match("/pages/offline.html");
      });
    })
  );
});