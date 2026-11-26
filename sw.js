const V="lapshift-v3",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||/openstreetmap\.org$|firebaseio\.com$|firebasedatabase\.app$/.test(u.hostname))return;
 const save=res=>{if(res.ok||res.type==="opaque")caches.open(V).then(c=>c.put(r,res.clone()));return res};
 if(u.origin===location.origin){e.respondWith(fetch(r).then(save).catch(()=>caches.match(r)));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(save)))});
