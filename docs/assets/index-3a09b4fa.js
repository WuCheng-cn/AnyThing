import{d as f,u as h,w as v,r as c,o as g,c as E,a as p,b as m,T as P,e as _,f as y,g as A,h as L,s as O,i as I,n as T}from"./vendor-a32ff1ab.js";import{u,a as R,_ as o,d as C}from"./index-2d14f341.js";import{_ as V}from"./plugin-vue_export-helper-c27b6911.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const D=f({__name:"App",setup(r){const n=h();return v(n,s=>{R().clickPositionStore.setClickedPosition(s)},{immediate:!0,deep:!0}),(s,a)=>{const e=c("router-view"),t=c("n-message-provider"),i=c("n-config-provider");return g(),E(i,{theme:_(u)().AppConfig.theme,"theme-overrides":_(u)().AppConfig.themeOverrides},{default:p(()=>[m(t,null,{default:p(()=>[m(P,{name:"fade",mode:"out-in"},{default:p(()=>[m(e)]),_:1})]),_:1})]),_:1},8,["theme","theme-overrides"])}}}),w=V(D,[["__scopeId","data-v-3410b27c"]]),k=[{path:"/login",name:"登录",component:()=>o(()=>import("./Login-49205eca.js"),["./Login-49205eca.js","./vendor-a32ff1ab.js","./index-2d14f341.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./avator-96f844ed.js","./Login-dda68cdb.css"],import.meta.url)},{path:"/desktop",name:"桌面",component:()=>o(()=>import("./index-8c2ea5dd.js"),["./index-8c2ea5dd.js","./index-2d14f341.js","./vendor-a32ff1ab.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./index-8fee6722.css"],import.meta.url)},{path:"/home",name:"Home",component:()=>o(()=>import("./index-7f9fb743.js"),["./index-7f9fb743.js","./plugin-vue_export-helper-c27b6911.js","./vendor-a32ff1ab.js"],import.meta.url)},{path:"/",name:"layout",component:()=>o(()=>import("./index-27052fc5.js"),["./index-27052fc5.js","./index-2d14f341.js","./vendor-a32ff1ab.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./index-2314a33f.css"],import.meta.url),children:[{path:"/tempPrint",name:"模板打印",component:()=>o(()=>import("./index-a51baa83.js"),["./index-a51baa83.js","./vendor-a32ff1ab.js","./plugin-vue_export-helper-c27b6911.js","./index-b27eb432.css"],import.meta.url)},{path:"/graphics",name:"图形引擎",component:()=>o(()=>import("./index-2bf99ce4.js").then(r=>r.i),["./index-2bf99ce4.js","./vendor-a32ff1ab.js","./index-2d14f341.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./Button-949af70b.js","./index-5702f50a.css"],import.meta.url)},{path:"/codeEditor",name:"代码编辑器",component:()=>o(()=>import("./index-b399511d.js").then(r=>r.i),["./index-b399511d.js","./index-2d14f341.js","./vendor-a32ff1ab.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./Button-949af70b.js","./index-134847a0.css"],import.meta.url)},{path:"/cesium",name:"GIS引擎",component:()=>o(()=>import("./index-ec1d0408.js"),["./index-ec1d0408.js","./vendor-a32ff1ab.js","./plugin-vue_export-helper-c27b6911.js","./index-95af501a.css"],import.meta.url)},{path:"/demo",name:"demo",component:()=>o(()=>import("./index-0d237ce4.js"),["./index-0d237ce4.js","./Button-949af70b.js","./vendor-a32ff1ab.js","./index-2d14f341.js","./plugin-vue_export-helper-c27b6911.js","./index-e3a6a88d.css","./index-b399511d.js","./index-134847a0.css","./Number-8b0d386a.js"],import.meta.url)},{path:"/",redirect:"/login"}]}],d=y({history:A(),routes:k});d.afterEach(()=>{window.scrollTo(0,0)});const l=L();l.use(O);const b=I(w);b.use(d).use(T).use(l).use(C).mount("#app");