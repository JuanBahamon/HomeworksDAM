const CACHE_NAME = 'medicare-cache-v1'

// Cache First: primero busca en el cache, si no esta va a la red.
// Conviene para archivos que no cambian seguido como iconos y css.
// No conviene para datos de pacientes porque siempre queremos la info actualizada.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/','index.html'])
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(respuesta => {
      return respuesta || fetch(e.request)
    })
  )
})