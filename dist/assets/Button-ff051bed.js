import{d as y,q as g,r as i,o as r,c as d,a as o,C,x as c,G as w,b as k,B as _,D as f,e as m,ak as v}from"./vendor-55e0ca6f.js";const N=y({__name:"Panle",props:{hideSlider:{type:Boolean,default:!1},showRightSlider:{type:Boolean,default:!1},showLeftSlider:{type:Boolean,default:!1},customClassLeftSlider:{type:[String,Array],default:""}},emits:["resize"],setup(e,{emit:u}){const t=e,l=g(()=>{if(!t.hideSlider)return t.showLeftSlider&&t.showRightSlider?"left":!t.showLeftSlider&&t.showRightSlider?"right":(t.showLeftSlider&&!t.showRightSlider,"left")}),n=()=>{u("resize")};return(s,p)=>{const h=i("n-layout-sider"),S=i("n-layout-content"),R=i("n-layout");return r(),d(R,{style:{height:"100%"},"has-sider":"","sider-placement":l.value},{default:o(()=>[!e.hideSlider&&e.showLeftSlider?(r(),d(h,{key:0,bordered:"","show-trigger":"bar","collapse-mode":"transform","content-style":"padding: 16px;",class:C(e.customClassLeftSlider),width:300,"collapsed-width":0,"on-after-leave":n,"on-after-enter":n},{default:o(()=>[c(s.$slots,"slider-left")]),_:3},8,["class"])):w("",!0),k(S,null,{default:o(()=>[c(s.$slots,"default")]),_:3}),!e.hideSlider&&e.showRightSlider?(r(),d(h,{key:1,bordered:"","show-trigger":"bar","collapse-mode":"transform","content-style":"padding: 16px;",width:400,"collapsed-width":0,"on-after-leave":n,"on-after-enter":n},{default:o(()=>[c(s.$slots,"slider-right")]),_:3})):w("",!0)]),_:3},8,["sider-placement"])}}}),b={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},z=f("path",{d:"M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48V272l-32-152c-5-27-23-40-48-40z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),A=f("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M48 272h144"},null,-1),B=f("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M320 272h144"},null,-1),T=f("path",{d:"M192 272a64 64 0 0 0 128 0",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Y=[z,A,B,T],$=y({name:"FileTrayOutline",render:function(u,t){return r(),_("svg",b,Y)}});var a=(e=>(e.PRIMARY="primary",e.SECONDARY="secondary",e.TERTIARY="tertiary",e.QUATERNARY="quaternary",e))(a||{});const M=y({__name:"Button",props:{type:{type:String,default:"primary"},size:{type:String,default:"medium"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},icon:{type:Object,default:()=>$},level:{type:String,default:a.PRIMARY}},emits:["click"],setup(e){const u=e,t=g(()=>{switch(u.size){case"tiny":return"12";case"small":return"16";case"medium":return"20";case"large":return"24";default:return"20"}});return(l,n)=>{const s=i("n-icon"),p=i("n-button");return r(),d(p,{size:e.size,type:e.type,focusable:!1,loading:e.loading,disabled:e.disabled,secondary:e.level===m(a).SECONDARY,tertiary:e.level===m(a).TERTIARY,quaternary:e.level===m(a).QUATERNARY,onClick:n[0]||(n[0]=h=>l.$emit("click"))},{default:o(()=>[c(l.$slots,"icon",{},()=>[k(s,{size:t.value},{default:o(()=>[(r(),d(v(e.icon)))]),_:1},8,["size"])]),c(l.$slots,"default")]),_:3},8,["size","type","loading","disabled","secondary","tertiary","quaternary"])}}});export{a as E,M as _,N as a};