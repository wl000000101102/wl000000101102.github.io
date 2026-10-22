// 自動產生：版本 59c6364b2e
const VERSION = 'poker-59c6364b2e';
const ASSETS = ["basics.html", "glossary.html", "index.html", "10.html", "tracker.html", "01.html", "02.html", "03.html", "04.html", "05.html", "06.html", "07.html", "08.html", "09.html", "install.html", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(a => new Request(a, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(cached => {
    const fresh = fetch(e.request).then(res => {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        const clone = res.clone(); caches.open(VERSION).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
