import{b as u,_ as t,f as d,l as m,p as o,h as n,u as e,i as r,j as _,X as g}from"./vendor-a3ce1f9d.js";import{A as i}from"./index-ce014a4f.js";import{_ as f}from"./plugin-vue_export-helper-c27b6911.js";const y="anything",h="1.1.0",b={dev:"vite",s:"yarn dev --host",build:"vite build",preview:"vite preview",eslint:"eslint --ext .js,.vue src",release:"standard-version --preset gitmoji-config"},x={commitizen:{path:"node_modules/cz-customizable"}},E={"@antv/x6":"^2.1.3","@antv/x6-plugin-clipboard":"^2.1.3","@antv/x6-plugin-dnd":"^2.0.5","@antv/x6-plugin-history":"^2.2.3","@antv/x6-plugin-keyboard":"^2.1.4","@antv/x6-plugin-selection":"^2.1.5","@antv/x6-plugin-snapline":"^2.1.6","@antv/x6-plugin-transform":"^2.1.5","@antv/x6-vue-shape":"^2.0.9","@element-plus/icons-vue":"^2.1.0","@vue/eslint-config-standard":"^8.0.1",cesium:"1.110","class-transformer":"^0.5.1",commitizen:"^4.3.0","commitlint-config-cz":"^0.13.3",echarts:"^5.4.2","es6-shim":"^0.35.8",exceljs:"^4.3.0",express:"^4.18.2","file-saver":"^2.0.5",luckyexcel:"^1.0.1","monaco-editor":"^0.41.0","naive-ui":"^2.34.2",pinia:"^2.0.28","pinia-plugin-persistedstate":"^3.0.2","reflect-metadata":"^0.1.13",vfonts:"^0.0.3","vite-plugin-eslint":"^1.8.1",vooks:"^0.2.12",vue:"3.3.4","vue-router":"4"},k={"@types/node":"^20.11.0","@typescript-eslint/eslint-plugin":"^5.0.0","@typescript-eslint/parser":"^5.47.0","@vicons/antd":"^0.12.0","@vicons/carbon":"^0.12.0","@vicons/fa":"^0.12.0","@vicons/fluent":"^0.12.0","@vicons/ionicons4":"^0.12.0","@vicons/ionicons5":"^0.12.0","@vicons/material":"^0.12.0","@vicons/tabler":"^0.12.0","@vitejs/plugin-vue":"^2.3.3","@vue/cli-plugin-eslint":"^5.0.6",commitlint:"^18.4.4","commitlint-config-gitmoji":"^2.3.1","conventional-changelog-gitmoji-config":"^1.5.2","cz-conventional-changelog":"^3.3.0","cz-customizable":"^7.0.0",eslint:"^8.0.1","eslint-config-airbnb-base":"^14.2.1","eslint-config-prettier":"^8.5.0","eslint-config-standard-with-typescript":"^24.0.0","eslint-plugin-import":"^2.25.2","eslint-plugin-n":"^15.0.0","eslint-plugin-prettier":"^4.2.1","eslint-plugin-promise":"^6.0.0","eslint-plugin-vue":"^9.8.0",husky:"^8.0.3",less:"^4.1.3","less-loader":"^11.1.0",prettier:"^2.8.1","standard-version":"^9.5.0",typescript:"5.1.6",vite:"^4.0.0","vite-plugin-compression":"^0.5.1","vite-plugin-externals":"^0.6.2","vite-plugin-insert-html":"^1.0.1","vite-plugin-static-copy":"^0.17.0","vue-tsc":"^1.0.11"},a={name:y,private:!0,version:h,scripts:b,config:x,dependencies:E,devDependencies:k};const z={class:"tool_bar"},T={class:"tool_bar-left"},j={class:"tool_bar-center"},B={class:"tool_bar-right"},D=u({__name:"ToolBar",setup(V){const l=i.asyncComponent(()=>t(()=>import("./WallPaperQuick-dac4a2ad.js"),["./WallPaperQuick-dac4a2ad.js","./vendor-a3ce1f9d.js","./vendor-e98c73d8.css","./index-ce014a4f.js","./plugin-vue_export-helper-c27b6911.js","./index-080e9d9f.css","./WallPaperQuick-f3579a16.css"],import.meta.url)),c=i.asyncComponent(()=>t(()=>import("./Battery-e47078db.js"),["./Battery-e47078db.js","./vendor-a3ce1f9d.js","./vendor-e98c73d8.css","./index-ce014a4f.js","./plugin-vue_export-helper-c27b6911.js","./index-080e9d9f.css"],import.meta.url)),p=i.asyncComponent(()=>t(()=>import("./User-68fce938.js"),["./User-68fce938.js","./vendor-a3ce1f9d.js","./vendor-e98c73d8.css"],import.meta.url)),v=i.asyncComponent(()=>t(()=>import("./Internet-2eaf3d6f.js"),["./Internet-2eaf3d6f.js","./vendor-a3ce1f9d.js","./vendor-e98c73d8.css","./index-ce014a4f.js","./plugin-vue_export-helper-c27b6911.js","./index-080e9d9f.css"],import.meta.url));return(s,A)=>(d(),m("div",z,[o("div",T,[n(e(p)),r(s.$slots,"left",{},void 0,!0)]),o("div",j,[r(s.$slots,"center",{},void 0,!0),_(" "+g(`${e(a).name}-${e(a).version}`),1)]),o("div",B,[n(e(l)),n(e(v)),n(e(c)),r(s.$slots,"right",{},void 0,!0)])]))}}),$=f(D,[["__scopeId","data-v-684d1db7"]]);export{$ as default};