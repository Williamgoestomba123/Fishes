var CACHE='fishlog-v2';
self.addEventListener('install',function(e){ e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','index.html']);}).then(function(){return self.skipWaiting();})); });
self.addEventListener('activate',function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',function(e){
  e.respondWith(fetch(e.request).then(function(r){ var cp=r.clone(); if(e.request.method==='GET') caches.open(CACHE).then(function(c){c.put(e.request,cp);}); return r; })
    .catch(function(){ return caches.match(e.request).then(function(m){ return m||caches.match('index.html'); }); }));
});