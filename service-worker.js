// Your data needs a place to live when there is no Internet connection. That's what the cache is for. There is the general cache for images and such, and a data cache for data-specific stuff. I would just follow the naming conventions you see here. Note the versioning on each cache name. This is important.
const CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

// We need to provide an array of all urls that our PWA should cache. In other words, we're telling the PWA to be prepared to use the service worker anytime the browser tries to hit any of these routes. In a large web app there could be lots of entries here.
const urlsToCache = [
  "/",
  "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// This code as you might imagine fires of when the user has chosen to install the web app on their machine as a standalone PWA. You won't need to modify this code. Keep it exactly as-is.
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// This is the heart of the PWA functionality. This code tells the service worker to listen for any events where a fetch (api call) is being made. This is when, normally, the browser would send a request to the server. You can use all of this code below as-is
self.addEventListener("fetch", function(event) {
  // By making sure all our fetch routes have the "/api/" prefix, it's easy to identify the ones we want to intercept
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {

        // First we attempt to perform the fetch normally. In other words, if there is still an Internet connection, everything should just work normally.
        return fetch(event.request)
          .then(response => {
            // If the response was good, we will store in the cache the name of the route that was accessed, and the data that was sent back.
            // That way, if the same route is accessed later without an Internet connection, we can substitute the saved data.
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }

            return response;
          })

          // This code runs if the fetch fails; ie: there is no Internet connection. In this case it pulls the correct saved data from the cache and sends it back instead.
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(event.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  // This code block handles all home page calls. Again, it can be used as-is.
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          // return the cached home page for all requests for html pages
          return caches.match("/");
        }
      });
    })
  );
});
