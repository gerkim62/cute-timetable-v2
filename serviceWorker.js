console.log('from sw')


const CACHE_NAME = "v2";
const assetsToCache = [
  "/index.html",
  "/",
  

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
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css',

  "/js/main.js",
  "/js/nav.js",
  //"/js/functions.js",
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
        //return caches.match("/pages/offline.html");
      });
    })
  );
});