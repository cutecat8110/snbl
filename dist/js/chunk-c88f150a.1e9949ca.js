(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c88f150a"],{"1bf6":function(e,t,c){"use strict";c("c6ce")},"1dde":function(e,t,c){var r=c("d039"),a=c("b622"),o=c("2d00"),n=a("species");e.exports=function(e){return o>=51||!r((function(){var t=[],c=t.constructor={};return c[n]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"466d":function(e,t,c){"use strict";var r=c("d784"),a=c("825a"),o=c("50c4"),n=c("577e"),i=c("1d80"),l=c("8aa5"),s=c("14c3");r("match",(function(e,t,c){return[function(t){var c=i(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,c):new RegExp(t)[e](n(c))},function(e){var r=a(this),i=n(e),d=c(t,r,i);if(d.done)return d.value;if(!r.global)return s(r,i);var u=r.unicode;r.lastIndex=0;var b,p=[],O=0;while(null!==(b=s(r,i))){var j=n(b[0]);p[O]=j,""===j&&(r.lastIndex=l(i,o(r.lastIndex),u)),O++}return 0===O?null:p}]}))},"48e8":function(e,t,c){"use strict";c("851b")},"4de4":function(e,t,c){"use strict";var r=c("23e7"),a=c("b727").filter,o=c("1dde"),n=o("filter");r({target:"Array",proto:!0,forced:!n},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},8418:function(e,t,c){"use strict";var r=c("a04b"),a=c("9bf2"),o=c("5c6c");e.exports=function(e,t,c){var n=r(t);n in e?a.f(e,n,o(0,c)):e[n]=c}},"851b":function(e,t,c){},"8deb":function(e,t,c){},"99af":function(e,t,c){"use strict";var r=c("23e7"),a=c("d039"),o=c("e8b5"),n=c("861d"),i=c("7b0b"),l=c("50c4"),s=c("8418"),d=c("65f0"),u=c("1dde"),b=c("b622"),p=c("2d00"),O=b("isConcatSpreadable"),j=9007199254740991,m="Maximum allowed index exceeded",v=p>=51||!a((function(){var e=[];return e[O]=!1,e.concat()[0]!==e})),f=u("concat"),h=function(e){if(!n(e))return!1;var t=e[O];return void 0!==t?!!t:o(e)},g=!v||!f;r({target:"Array",proto:!0,forced:g},{concat:function(e){var t,c,r,a,o,n=i(this),u=d(n,0),b=0;for(t=-1,r=arguments.length;t<r;t++)if(o=-1===t?n:arguments[t],h(o)){if(a=l(o.length),b+a>j)throw TypeError(m);for(c=0;c<a;c++,b++)c in o&&s(u,b,o[c])}else{if(b>=j)throw TypeError(m);s(u,b++,o)}return u.length=b,u}})},b35a:function(e,t,c){"use strict";var r=c("7a23");Object(r["pushScopeId"])("data-v-8eab6646");var a={class:"all-items"},o=Object(r["createTextVNode"])(" ALL ITEMS ");function n(e,t,c,n,i,l){var s=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])("nav",null,[Object(r["createElementVNode"])("div",a,[Object(r["createVNode"])(s,{to:"/products"},{default:Object(r["withCtx"])((function(){return[o]})),_:1})]),(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(i.category,(function(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{key:t,class:"p-2 px-3"},[Object(r["createVNode"])(s,{to:"/products/"+e},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e),1)]})),_:2},1032,["to"])])})),128))])}Object(r["popScopeId"])();var i={data:function(){return{category:["NEW 新品","上衣","裙裝","褲裝","配飾","套裝專區"]}}};c("f5aa");i.render=n,i.__scopeId="data-v-8eab6646";t["a"]=i},c6ce:function(e,t,c){},e42f:function(e,t,c){"use strict";var r=c("7a23");Object(r["pushScopeId"])("data-v-8a442796");var a=Object(r["createTextVNode"])(" HOME "),o=Object(r["createElementVNode"])("i",{class:"material-icons md-18 unselect"},"chevron_right",-1),n=Object(r["createTextVNode"])(" 所有商品 "),i=Object(r["createElementVNode"])("i",{class:"material-icons md-18 unselect"},"chevron_right",-1),l=Object(r["createElementVNode"])("i",{class:"material-icons md-18 product-title unselect"},"chevron_right",-1),s={class:"product-title sub-navbar-link"},d=Object(r["createTextVNode"])(" HOME "),u=Object(r["createElementVNode"])("i",{class:"material-icons md-18 unselect"},"chevron_right",-1),b=Object(r["createTextVNode"])(" 所有商品 "),p=Object(r["createElementVNode"])("i",{class:"material-icons md-18 unselect"},"chevron_right",-1),O={class:"sub-navbar-link"},j=Object(r["createTextVNode"])(" HOME "),m=Object(r["createElementVNode"])("i",{class:"material-icons md-18 unselect"},"chevron_right",-1),v=Object(r["createElementVNode"])("div",{class:"sub-navbar-link"},"所有商品",-1);function f(e,t,c,f,h,g){var N=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])("nav",null,[c.product?(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:0},[Object(r["createVNode"])(N,{to:"/",class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[a]})),_:1}),o,Object(r["createVNode"])(N,{to:"/products",class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[n]})),_:1}),i,Object(r["createVNode"])(N,{to:"/products/"+c.product.category,class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(c.product.category),1)]})),_:1},8,["to"]),l,Object(r["createElementVNode"])("div",s,Object(r["toDisplayString"])(c.product.title),1)],64)):c.selectCategory?(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:1},[Object(r["createVNode"])(N,{to:"/",class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[d]})),_:1}),u,Object(r["createVNode"])(N,{to:"/products",class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[b]})),_:1}),p,Object(r["createElementVNode"])("div",O,Object(r["toDisplayString"])(c.selectCategory),1)],64)):(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:2},[Object(r["createVNode"])(N,{to:"/",class:"sub-navbar-link"},{default:Object(r["withCtx"])((function(){return[j]})),_:1}),m,v],64))])}Object(r["popScopeId"])();var h={props:["product","selectCategory"]};c("48e8");h.render=f,h.__scopeId="data-v-8a442796";t["a"]=h},ed84:function(e,t,c){"use strict";c.r(t);var r=c("7a23");Object(r["pushScopeId"])("data-v-572f5fa4");var a={class:"container py-4"},o={class:"aside-navbar"},n={class:"sub-navbar"},i={class:"product-list"},l={class:"card-container"},s={class:"img-hover-zoom"},d=["src"],u={class:"card-body"},b={class:"unselect card-text"},p={class:"title pointer mb-1"},O={class:"price-container"},j={class:"price me-2"},m={class:"price origin-price"},v=Object(r["createElementVNode"])("div",{class:"pointer"},[Object(r["createElementVNode"])("i",{class:"material-icons"},"bookmark_border")],-1),f=Object(r["createElementVNode"])("div",{class:"card-wrapper rounded"},null,-1),h={class:"card-container"},g={class:"img-hover-zoom"},N=["src"],V={class:"card-body"},E={class:"unselect card-text"},k={class:"title pointer mb-1"},y={class:"price-container"},x={class:"price me-2"},C={class:"price origin-price"},_=Object(r["createElementVNode"])("div",{class:"pointer"},[Object(r["createElementVNode"])("i",{class:"material-icons"},"bookmark_border")],-1),B=Object(r["createElementVNode"])("div",{class:"card-wrapper rounded"},null,-1);function w(e,t,c,w,S,T){var D=Object(r["resolveComponent"])("Loading"),I=Object(r["resolveComponent"])("AsideNavbar"),$=Object(r["resolveComponent"])("SubNavbar"),A=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(D,{active:S.isLoading,"z-index":1060},null,8,["active"]),Object(r["createElementVNode"])("div",a,[Object(r["createElementVNode"])("div",o,[Object(r["createVNode"])(I)]),Object(r["createElementVNode"])("main",null,[Object(r["createElementVNode"])("div",n,[Object(r["createVNode"])($,{selectCategory:S.selectCategory},null,8,["selectCategory"])]),Object(r["createElementVNode"])("div",i,[e.$route.params.id?(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],{key:0},Object(r["renderList"])(T.filterproducts,(function(e){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"card m-3",key:e.id},[Object(r["createElementVNode"])("div",l,[Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("img",{src:e.imageUrl,class:"card-img-top rounded-0 pointer",alt:"..."},null,8,d)]),Object(r["createElementVNode"])("div",u,[Object(r["createElementVNode"])("div",b,[Object(r["createElementVNode"])("h4",p,[Object(r["createVNode"])(A,{to:{path:"/product/".concat(e.id)},class:"text-reset"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]})),_:2},1032,["to"])]),Object(r["createElementVNode"])("div",O,[Object(r["createElementVNode"])("span",j,"NT$ "+Object(r["toDisplayString"])(e.price),1),Object(r["createElementVNode"])("span",m,"NT$ "+Object(r["toDisplayString"])(e.origin_price),1)])]),v])]),f])})),128)):(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],{key:1},Object(r["renderList"])(S.products,(function(e){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"card m-3",key:e.id},[Object(r["createElementVNode"])("div",h,[Object(r["createElementVNode"])("div",g,[Object(r["createElementVNode"])("img",{src:e.imageUrl,class:"card-img-top rounded-0 pointer",alt:"..."},null,8,N)]),Object(r["createElementVNode"])("div",V,[Object(r["createElementVNode"])("div",E,[Object(r["createElementVNode"])("h4",k,[Object(r["createVNode"])(A,{to:{path:"/product/".concat(e.id)},class:"text-reset"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]})),_:2},1032,["to"])]),Object(r["createElementVNode"])("div",y,[Object(r["createElementVNode"])("span",x,"NT$ "+Object(r["toDisplayString"])(e.price),1),Object(r["createElementVNode"])("span",C,"NT$ "+Object(r["toDisplayString"])(e.origin_price),1)])]),_])]),B])})),128))])])])],64)}Object(r["popScopeId"])();c("99af"),c("4de4"),c("ac1f"),c("466d");var S=c("b35a"),T=c("e42f"),D={components:{AsideNavbar:S["a"],SubNavbar:T["a"]},data:function(){return{isLoading:!1,products:[],productsAll:[],pagination:[],currentPage:1,selectCategory:""}},methods:{getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0,this.currentPage=t;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("haohao","/products?page=").concat(t);this.$http.get(c).then((function(t){e.products=t.data.products,e.pagination=t.data.pagination,e.isLoading=!1}))},getAll:function(){var e=this;this.isLoading=!0;var t="".concat("https://vue3-course-api.hexschool.io/","api/").concat("haohao","/products/all");this.$http.get(t).then((function(t){e.productsAll=t.data.products,e.isLoading=!1}))}},computed:{filterproducts:function(){var e=this;return this.productsAll.filter((function(t){return t.category.match(e.selectCategory)}))}},watch:{$route:function(){this.$route.params.id?this.productsAll.length||this.getAll():this.$route.params.id||this.products.length||this.getData();var e=this.$route.params.id;this.selectCategory=e}},created:function(){var e=this.$route.params.id;this.selectCategory=e,this.$route.params.id?this.getAll():this.getData()}};c("1bf6");D.render=w,D.__scopeId="data-v-572f5fa4";t["default"]=D},f5aa:function(e,t,c){"use strict";c("8deb")}}]);
//# sourceMappingURL=chunk-c88f150a.1e9949ca.js.map