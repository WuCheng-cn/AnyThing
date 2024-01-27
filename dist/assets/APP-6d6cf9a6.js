import{d as C,t as A,A as D,q as w,v as z,r as x,o as i,B as l,D as c,J as b,K as B,F as _,b as N,e as P,P as m,an as L}from"./vendor-1633e3f1.js";import{u as R}from"./index-9014978f.js";import{_ as M}from"./plugin-vue_export-helper-c27b6911.js";const V={key:0,class:"task"},$={class:"task_list"},q=["onClick"],E={class:"name"},F={class:"preview"},I={class:"main"},S={key:0,class:"app_name"},j=C({__name:"APP",props:{data:{type:Object,required:!0},hideName:{type:Boolean,default:!1},size:{type:Number,default:void 0},isTaskApp:{type:Boolean,default:!1}},setup(o){const a=o,p=A(),{appIconSize:v,appList:h,appTaskList:u}=D(R().DesktopConfig),d=w(()=>u.value.filter(e=>e.app.name===a.data.name));function k(){a.data.handler&&!a.isTaskApp?a.data.handler(a.data):a.isTaskApp&&d.value.length===1&&f(d.value[0])}function f(e){var s,n;e.isMinimize?(s=e.modelDom)==null||s.classList.remove("any_model_minimize"):(n=e.modelDom)==null||n.classList.add("any_model_minimize"),e.isMinimize=!e.isMinimize}function y(e,s){if(e){s.setTaskViewDom(e);const n=s.modelDom;if(n){const t=n.cloneNode(!0),r=196/1920,T=100/1080,g=`
        position: relative;
        overflow: hidden;
        width: 1920px;
        height: 1080px;
        left: unset;
        top: unset;
        right: unset;
        bottom: unset; 
        pointer-events: none;
        transform: scale(${r}, ${T});
        transform-origin: left top;  
        opacity: 1;
        transition:unset;
      `;t.style.cssText=g,e.appendChild(t)}}}return z(()=>{if(a.isTaskApp)u.value.filter(e=>e.app.name===a.data.name).forEach(e=>{e.setTaskBarDom(p.value)});else{const e=h.value.find(s=>s.name===a.data.name);e&&(e.dom=p.value)}}),(e,s)=>{const n=x("n-image");return i(),l("div",{ref_key:"appRef",ref:p,class:"app_item",onClick:k},[d.value.length&&o.isTaskApp?(i(),l("div",V,[c("div",$,[(i(!0),l(b,null,B(d.value,t=>(i(),l("div",{key:t.id,class:"task_item",onClick:L(r=>f(t),["stop"])},[c("div",E,m(t.app.name)+"-"+m(t.id),1),c("div",F,[c("div",{ref_for:!0,ref:r=>y(r,t),class:"preview_main"},null,512)])],8,q))),128))])])):_("",!0),c("div",I,[N(n,{class:"app_icon",lazy:"","preview-disabled":"",width:o.size||P(v),src:o.data.icon},null,8,["width","src"]),o.hideName?_("",!0):(i(),l("div",S,m(o.data.name),1))])],512)}}}),X=M(j,[["__scopeId","data-v-1b0b768e"]]);export{X as default};
