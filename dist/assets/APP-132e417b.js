import{d as D,t as C,A as B,q as w,v as x,r as z,o as l,B as d,D as c,I as N,J as L,G as f,b as M,e as P,F as m,ao as R}from"./vendor-55e0ca6f.js";import{u as b,D as _}from"./index-4c8d9877.js";import{_ as V}from"./plugin-vue_export-helper-c27b6911.js";const I={key:0,class:"task"},$={class:"task_list"},q=["onClick"],F={class:"name"},S={class:"preview"},j={class:"main"},E={key:0,class:"app_name"},G=D({__name:"APP",props:{data:{type:Object,required:!0},hideName:{type:Boolean,default:!1},size:{type:Number,default:void 0},isTaskApp:{type:Boolean,default:!1}},setup(o){const a=o,p=C(),{appIconSize:v,appList:k,appTaskList:h}=B(b().DesktopConfig),i=w(()=>h.value.filter(e=>e.app.name===a.data.name));function y(){a.data.handler&&!a.isTaskApp?a.data.handler(a.data):a.isTaskApp&&i.value.length===1?u(i.value[0]):a.isTaskApp&&a.data.handler&&!i.value.length&&a.data.handler(a.data,()=>{_.setTaskBarDomByApp(p.value,a.data)})}function u(e){var s,n;e.isMinimize?(s=e.modelDom)==null||s.classList.remove("any_model_minimize"):(n=e.modelDom)==null||n.classList.add("any_model_minimize"),e.isMinimize=!e.isMinimize}function T(e,s){if(e){s.setTaskViewDom(e);const n=s.modelDom;if(n){const t=n.cloneNode(!0),r=196/1920,g=100/1080,A=`
        position: relative;
        overflow: hidden;
        width: 1920px;
        height: 1080px;
        left: unset;
        top: unset;
        right: unset;
        bottom: unset; 
        pointer-events: none;
        transform: scale(${r}, ${g});
        transform-origin: left top;  
        opacity: 1;
        transition:unset;
      `;t.style.cssText=A,e.appendChild(t)}}}return x(()=>{if(a.isTaskApp)_.setTaskBarDomByApp(p.value,a.data);else{const e=k.value.find(s=>s.name===a.data.name);e&&(e.dom=p.value)}}),(e,s)=>{const n=z("n-image");return l(),d("div",{ref_key:"appRef",ref:p,class:"app_item",onClick:y},[i.value.length&&o.isTaskApp?(l(),d("div",I,[c("div",$,[(l(!0),d(N,null,L(i.value,t=>(l(),d("div",{key:t.id,class:"task_item",onClick:R(r=>u(t),["stop"])},[c("div",F,m(t.app.name)+"-"+m(t.id),1),c("div",S,[c("div",{ref_for:!0,ref:r=>T(r,t),class:"preview_main"},null,512)])],8,q))),128))])])):f("",!0),c("div",j,[M(n,{class:"app_icon","preview-disabled":"",width:o.size||P(v),src:o.data.icon},null,8,["width","src"]),o.hideName?f("",!0):(l(),d("div",E,m(o.data.name),1))])],512)}}}),X=V(G,[["__scopeId","data-v-5d542f40"]]);export{X as default};
