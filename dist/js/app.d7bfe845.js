(function(e){function n(n){for(var t,a,r=n[0],h=n[1],d=n[2],f=0,l=[];f<r.length;f++)a=r[f],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&l.push(u[a][0]),u[a]=0;for(t in h)Object.prototype.hasOwnProperty.call(h,t)&&(e[t]=h[t]);i&&i(n);while(l.length)l.shift()();return o.push.apply(o,d||[]),c()}function c(){for(var e,n=0;n<o.length;n++){for(var c=o[n],t=!0,a=1;a<c.length;a++){var r=c[a];0!==u[r]&&(t=!1)}t&&(o.splice(n--,1),e=h(h.s=c[0]))}return e}var t={},a={app:0},u={app:0},o=[];function r(e){return h.p+"js/"+({}[e]||e)+"."+{"chunk-1276da0e":"00921acf","chunk-130472a4":"b9fd4c2c","chunk-14bdda04":"e6859d69","chunk-1a55077f":"e8179bb6","chunk-1e56d388":"1d04f044","chunk-28f3b0ff":"c9af9630","chunk-45a28676":"e1697214","chunk-596c7872":"a3f7af1d","chunk-6206f936":"3b3ab877","chunk-c44696ac":"545a0dd0","chunk-a4f96c14":"f1224195","chunk-1f59e51f":"f6e2f212","chunk-2370b01f":"c3f5a505","chunk-2b28dc4f":"e76b67cb","chunk-2d0c8d68":"fa53c568","chunk-2d0def16":"6e549130","chunk-2d21eb0a":"1b9a81fa","chunk-39b0e5a3":"7c05bb4d","chunk-55b887fc":"464574f1","chunk-5cc7c143":"18bf1159","chunk-60c37481":"3915487e","chunk-60082852":"9ee4b321","chunk-6d9bb453":"a4861941","chunk-65cefae2":"502ccb17","chunk-6c482d13":"37a09e62","chunk-7580a62d":"a61a3ba6","chunk-fb51d64a":"8d6ab0de"}[e]+".js"}function h(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,h),c.l=!0,c.exports}h.e=function(e){var n=[],c={"chunk-1276da0e":1,"chunk-130472a4":1,"chunk-14bdda04":1,"chunk-1e56d388":1,"chunk-28f3b0ff":1,"chunk-45a28676":1,"chunk-596c7872":1,"chunk-6206f936":1,"chunk-c44696ac":1,"chunk-a4f96c14":1,"chunk-1f59e51f":1,"chunk-2370b01f":1,"chunk-2b28dc4f":1,"chunk-39b0e5a3":1,"chunk-55b887fc":1,"chunk-5cc7c143":1,"chunk-60c37481":1,"chunk-60082852":1,"chunk-6d9bb453":1,"chunk-65cefae2":1,"chunk-6c482d13":1,"chunk-7580a62d":1,"chunk-fb51d64a":1};a[e]?n.push(a[e]):0!==a[e]&&c[e]&&n.push(a[e]=new Promise((function(n,c){for(var t="css/"+({}[e]||e)+"."+{"chunk-1276da0e":"8fe92912","chunk-130472a4":"dfbbd58d","chunk-14bdda04":"8a68aa04","chunk-1a55077f":"31d6cfe0","chunk-1e56d388":"46f7b23e","chunk-28f3b0ff":"11a8dad6","chunk-45a28676":"1922851e","chunk-596c7872":"adde5a9a","chunk-6206f936":"d80668b0","chunk-c44696ac":"788e5654","chunk-a4f96c14":"003dc222","chunk-1f59e51f":"64e38cdd","chunk-2370b01f":"4a833551","chunk-2b28dc4f":"11637109","chunk-2d0c8d68":"31d6cfe0","chunk-2d0def16":"31d6cfe0","chunk-2d21eb0a":"31d6cfe0","chunk-39b0e5a3":"be5e33f5","chunk-55b887fc":"9cd7ae1f","chunk-5cc7c143":"b149e147","chunk-60c37481":"a1143ecd","chunk-60082852":"2fff36ac","chunk-6d9bb453":"9e9fe3e4","chunk-65cefae2":"73c4bacf","chunk-6c482d13":"8496c659","chunk-7580a62d":"538e0561","chunk-fb51d64a":"9ce77f7a"}[e]+".css",u=h.p+t,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var d=o[r],f=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(f===t||f===u))return n()}var l=document.getElementsByTagName("style");for(r=0;r<l.length;r++){d=l[r],f=d.getAttribute("data-href");if(f===t||f===u)return n()}var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.onload=n,i.onerror=function(n){var t=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=t,delete a[e],i.parentNode.removeChild(i),c(o)},i.href=u;var b=document.getElementsByTagName("head")[0];b.appendChild(i)})).then((function(){a[e]=0})));var t=u[e];if(0!==t)if(t)n.push(t[2]);else{var o=new Promise((function(n,c){t=u[e]=[n,c]}));n.push(t[2]=o);var d,f=document.createElement("script");f.charset="utf-8",f.timeout=120,h.nc&&f.setAttribute("nonce",h.nc),f.src=r(e);var l=new Error;d=function(n){f.onerror=f.onload=null,clearTimeout(i);var c=u[e];if(0!==c){if(c){var t=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+t+": "+a+")",l.name="ChunkLoadError",l.type=t,l.request=a,c[1](l)}u[e]=void 0}};var i=setTimeout((function(){d({type:"timeout",target:f})}),12e4);f.onerror=f.onload=d,document.head.appendChild(f)}return Promise.all(n)},h.m=e,h.c=t,h.d=function(e,n,c){h.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:c})},h.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},h.t=function(e,n){if(1&n&&(e=h(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(h.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)h.d(c,t,function(n){return e[n]}.bind(null,t));return c},h.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return h.d(n,"a",n),n},h.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},h.p="/snbl/dist/",h.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],f=d.push.bind(d);d.push=n,d=d.slice();for(var l=0;l<d.length;l++)n(d[l]);var i=f;o.push([0,"chunk-vendors"]),c()})({0:function(e,n,c){e.exports=c("56d7")},"226c":function(e,n,c){},"2eb5":function(e,n,c){"use strict";c("226c")},"56d7":function(e,n,c){"use strict";c.r(n);var t=c("7a23"),a=c("bc3a"),u=c.n(a),o=c("2106"),r=c.n(o),h=(c("7b17"),c("3730")),d=c.n(h),f=(c("15f5"),c("4413"),c("f9d5")),l=c.n(f),i=c("cbdf"),b=c("9457"),p=c("3aa8"),k=c("7bb1"),s=c("9062"),m=c.n(s);c("e40d");function v(e){const n=parseInt(e,10);return""+n.toFixed(0).replace(/./g,(e,n,c)=>n&&"."!==e&&(c.length-n)%3===0?(", "+e).replace(/\s/g,""):e)}function g(e){const n=new Date(1e3*e);return n.toLocaleDateString()}function y(e,n){const c=Object(t["resolveComponent"])("router-view");return Object(t["openBlock"])(),Object(t["createBlock"])(c)}c("2eb5");const O={};O.render=y;var j=O,P=c("6c02");const w=[{path:"/",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-1e56d388")]).then(c.bind(null,"4bac")),children:[{path:"",component:()=>Promise.all([c.e("chunk-6206f936"),c.e("chunk-6d9bb453")]).then(c.bind(null,"ec5a"))},{path:"products",component:()=>c.e("chunk-14bdda04").then(c.bind(null,"ed84"))},{path:"products/:id",component:()=>c.e("chunk-14bdda04").then(c.bind(null,"ed84"))},{path:"product/:id",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-6206f936"),c.e("chunk-c44696ac")]).then(c.bind(null,"658f"))},{path:"cart",component:()=>c.e("chunk-1276da0e").then(c.bind(null,"62b3")),children:[{path:"",component:()=>c.e("chunk-130472a4").then(c.bind(null,"fcdd"))},{path:"add",component:()=>c.e("chunk-6c482d13").then(c.bind(null,"9309"))}]},{name:"cart-completed",path:"order/:id",component:()=>c.e("chunk-65cefae2").then(c.bind(null,"69ff"))},{path:"story",component:()=>c.e("chunk-2d0def16").then(c.bind(null,"8899"))},{path:"try-free",component:()=>c.e("chunk-1f59e51f").then(c.bind(null,"74bc"))},{path:"vip",component:()=>c.e("chunk-60c37481").then(c.bind(null,"93de"))},{path:"qa",component:()=>c.e("chunk-7580a62d").then(c.bind(null,"fb97"))},{path:"shopping-process",component:()=>c.e("chunk-2b28dc4f").then(c.bind(null,"0569"))},{path:"policy",component:()=>c.e("chunk-5cc7c143").then(c.bind(null,"f2b9"))},{path:"payment-delivery",component:()=>c.e("chunk-39b0e5a3").then(c.bind(null,"9b42"))},{path:"terms",component:()=>c.e("chunk-2370b01f").then(c.bind(null,"97fd"))}]},{path:"/login",component:()=>c.e("chunk-55b887fc").then(c.bind(null,"62d5"))},{path:"/admin",component:()=>c.e("chunk-fb51d64a").then(c.bind(null,"a92e")),children:[{path:"products",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-28f3b0ff")]).then(c.bind(null,"372d"))},{path:"product/:id",component:()=>Promise.all([c.e("chunk-6206f936"),c.e("chunk-60082852")]).then(c.bind(null,"9464"))},{path:"orders",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-a4f96c14")]).then(c.bind(null,"0d5f"))},{path:"coupons",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-45a28676")]).then(c.bind(null,"e532"))},{path:"article",component:()=>Promise.all([c.e("chunk-1a55077f"),c.e("chunk-596c7872")]).then(c.bind(null,"f983"))},{path:"articles",component:()=>c.e("chunk-2d21eb0a").then(c.bind(null,"d745"))},{path:"articles",component:()=>c.e("chunk-2d21eb0a").then(c.bind(null,"d745"))},{path:"cart",component:()=>c.e("chunk-2d0c8d68").then(c.bind(null,"571a"))}]}],E=Object(P["a"])({history:Object(P["b"])(),routes:w,scrollBehavior(){return{left:0,top:0,behavior:"instant"}},linkExactActiveClass:"active"});var _=E;Object.keys(p["a"]).forEach(e=>{Object(k["e"])(e,p["a"][e])}),Object(k["d"])({generateMessage:Object(i["a"])({zh_TW:b}),validateOnInput:!0}),Object(i["b"])("zh_TW");const S=Object(t["createApp"])(j);S.config.globalProperties.$filters={date:g,currency:v},S.use(_),S.use(r.a,u.a),S.use(d.a),S.use(l.a),S.component("Loading",m.a),S.component("ErrorMessage",k["a"]),S.component("Field",k["b"]),S.component("Form",k["c"]),S.mount("#app")}});
//# sourceMappingURL=app.d7bfe845.js.map