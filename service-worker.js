const CACHE_NAME = "pi-cache-v2";
const urlsToCache = [
  "./consulta/index.html",
  "./consulta/styles.css",
  "./consulta/script.js",
  "./login/login.html",
  "./login/login.css",
  "./login/login.js",
  "./cadastro/cadastro.html",
  "./cadastro/cadastro.css",
  "./cadastro/cadastro.js",
  "./medico/medico.html",
  "./medico/medico.css",
  "./medico/medico.js",
  "./paciente/paciente.html",
  "./paciente/paciente.css",
  "./paciente/paciente.js"
];

// Instala o service worker e faz cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache criado com sucesso");
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o service worker e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Cache antigo removido:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercepta as requisições e responde com o cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
