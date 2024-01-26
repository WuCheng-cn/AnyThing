import{u as C}from"./index-ce014a4f.js";import{b as D,r as z,N as w,c as x,o as A,e as N,f as o,l as i,p as l,O as P,P as B,q as u,h as L,u as R,X as p}from"./vendor-a3ce1f9d.js";import{_ as b}from"./plugin-vue_export-helper-c27b6911.js";const M={key:0,class:"task"},V={class:"task_list"},$=["onClick"],q={class:"name"},E={class:"preview"},I={class:"main"},O={key:0,class:"app_name"},S=D({__name:"APP",props:{data:{type:Object,required:!0},hideName:{type:Boolean,default:!1},size:{type:Number,default:void 0},isTaskApp:{type:Boolean,default:!1}},setup(t){const a=t,r=z(),{appIconSize:_,appList:v,appTaskList:m}=w(C().DesktopConfig),f=x(()=>m.value.filter(e=>e.app.name===a.data.name));function h(){a.data.handler&&!a.isTaskApp&&a.data.handler(a.data)}function k(e){e.modelDom&&e.isMinimize?(e.modelDom.classList.remove("any_model_minimize"),e.isMinimize=!1):e.modelDom&&!e.isMinimize&&(e.modelDom.classList.add("any_model_minimize"),e.isMinimize=!0)}function y(e,n){if(e){n.setTaskViewDom(e);const c=n.modelDom;if(c){const s=c.cloneNode(!0),d=196/1920,T=100/1080,g=`
        position: relative;
        overflow: hidden;
        width: 1920px;
        height: 1080px;
        left: unset;
        top: unset;
        right: unset;
        bottom: unset; 
        pointer-events: none;
        transform: scale(${d}, ${T});
        transform-origin: left top;  
        opacity: 1;
        transition:unset;
      `;s.style.cssText=g,e.appendChild(s)}}}return A(()=>{if(a.isTaskApp)m.value.filter(e=>e.app.name===a.data.name).forEach(e=>{e.setTaskBarDom(r.value)});else{const e=v.value.find(n=>n.name===a.data.name);e&&(e.dom=r.value)}}),(e,n)=>{const c=N("n-image");return o(),i("div",{ref_key:"appRef",ref:r,class:"app_item",onClick:h},[f.value.length&&t.isTaskApp?(o(),i("div",M,[l("div",V,[(o(!0),i(P,null,B(f.value,s=>(o(),i("div",{key:s.id,class:"task_item",onClick:d=>k(s)},[l("div",q,p(s.app.name)+"-"+p(s.id),1),l("div",E,[l("div",{ref_for:!0,ref:d=>y(d,s),class:"preview_main"},null,512)])],8,$))),128))])])):u("",!0),l("div",I,[L(c,{class:"app_icon",lazy:"","preview-disabled":"",width:t.size||R(_),src:t.data.icon},null,8,["width","src"]),t.hideName?u("",!0):(o(),i("div",O,p(t.data.name),1))])],512)}}}),Y=b(S,[["__scopeId","data-v-251729f2"]]);export{Y as default};
