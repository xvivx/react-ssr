(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{56:
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},57:
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){var r={},o=function(e){var t;return function(){return void 0===t&&(t=function(){return window&&document&&document.all&&!window.atob}.apply(this,arguments)),t}}(),a=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),i=null,s=0,c=[],l=n(/*! ./urls */60);function p(e,t){for(var n=0;n<e.length;n++){var o=e[n],a=r[o.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](o.parts[i]);for(;i<o.parts.length;i++)a.parts.push(b(o.parts[i],t))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(b(o.parts[i],t));r[o.id]={id:o.id,refs:1,parts:s}}}}function u(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],i=t.base?a[0]+t.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function f(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(e.insertAt.before,n);n.insertBefore(t,o)}}function d(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function m(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=n.nc;r&&(e.attrs.nonce=r)}return h(t,e.attrs),f(e,t),t}function h(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var c=s++;n=i||(i=m(t)),r=g.bind(null,n,c,!1),o=g.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",h(t,e.attrs),f(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=l(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){d(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=u(e,t);return p(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var i=n[a];(s=r[i.id]).refs--,o.push(s)}for(e&&p(u(e,t),t),a=0;a<o.length;a++){var s;if(0===(s=o[a]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function g(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},58:
/*!************************************!*\
  !*** ./app/styles/img/bg_pic1.jpg ***!
  \************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){e.exports=n.p+"assets/bg_pic1.jpg"},60:
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},61:
/*!*****************************************!*\
  !*** ./app/componentUI/todo/AddTodo.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */function(e,t,n){"use strict";var r=n(/*! react */0),o=n.n(r),a="/Users/lpc/Desktop/react-ssr/app/componentUI/todo/AddTodo.js";t.a=(e=>{var t=null,n=!1;const{dispatchAddTodo:r,className:i="",btnName:s,placeholder:c,btnClass:l="btn-default"}=e,p=e=>{var n=t.value;return n.trim()?(r(n),t.value="",!1):(console.log("待办事件名不能为空！"),!1)};return o.a.createElement("div",{className:`input-group col-lg-6 ${i}`,__source:{fileName:a,lineNumber:32},__self:void 0},o.a.createElement("input",{type:"text",className:"form-control",placeholder:c,ref:function(e){n||(t=e,e.onkeyup=function(e){13===e.keyCode&&p()},n=!0)},__source:{fileName:a,lineNumber:33},__self:void 0}),o.a.createElement("span",{className:"input-group-btn",__source:{fileName:a,lineNumber:34},__self:void 0},o.a.createElement("button",{className:`btn ${l}`,type:"button",onClick:p,__source:{fileName:a,lineNumber:35},__self:void 0},s)))})},67:
/*!***********************************!*\
  !*** ./app/styles/css/olami.less ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){var r=n(/*! !../../../node_modules/css-loader!../../../node_modules/less-loader/dist/cjs.js!./olami.less */68);"string"==typeof r&&(r=[[e.i,r,""]]);n(/*! ../../../node_modules/style-loader/lib/addStyles.js */57)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},68:
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./app/styles/css/olami.less ***!
  \****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){(e.exports=n(/*! ../../../node_modules/css-loader/lib/css-base.js */56)(!1)).push([e.i,".chat-app {\n  position: relative;\n}\n.chat-app .olami {\n  width: 100%;\n}\n",""])},69:
/*!***************************************!*\
  !*** ./app/componentUI/css/chat.less ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){var r=n(/*! !../../../node_modules/css-loader!../../../node_modules/less-loader/dist/cjs.js!./chat.less */70);"string"==typeof r&&(r=[[e.i,r,""]]);n(/*! ../../../node_modules/style-loader/lib/addStyles.js */57)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},70:
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./app/componentUI/css/chat.less ***!
  \********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){(e.exports=n(/*! ../../../node_modules/css-loader/lib/css-base.js */56)(!1)).push([e.i,'.chat-app .item-row {\n  font-size: 12px;\n  margin-bottom: 20px;\n}\n.chat-app .item-row.right {\n  text-align: right;\n}\n.chat-app .item-row.right .title-container {\n  float: right;\n  margin: 0;\n  margin-left: 10px;\n}\n.chat-app .item-row.right .content-text .text {\n  background-color: #b1e46e;\n}\n.chat-app .item-row.right .content-text .text:after {\n  right: -8px;\n  left: auto;\n  border: none;\n  border-top: 8px solid transparent;\n  border-left: 12px solid #b1e46e;\n  border-bottom: 8px solid transparent;\n}\n.chat-app .title-container {\n  float: left;\n  width: 30px;\n  height: 30px;\n  margin-right: 10px;\n  background-size: cover;\n  border-radius: 50%;\n}\n.chat-app .content-text .text {\n  position: relative;\n  display: inline-block;\n  max-width: 70%;\n  border-radius: 4px;\n  background-color: lightblue;\n  line-height: 20px;\n  padding: 5px;\n  margin: 0;\n  text-align: left;\n}\n.chat-app .content-text .text:after {\n  position: absolute;\n  top: 7px;\n  left: -8px;\n  right: auto;\n  content: "";\n  width: 0;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-right: 12px solid lightblue;\n  border-bottom: 8px solid transparent;\n}\n',""])},71:
/*!***********************************!*\
  !*** ./app/styles/img/title.jpeg ***!
  \***********************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,n){e.exports=n.p+"assets/title.jpeg"},73:
/*!*******************************************!*\
  !*** ./app/page/OlamiPage.js + 3 modules ***!
  \*******************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./app/componentUI/todo/AddTodo.js */
/*! ModuleConcatenation bailout: Cannot concat with ./app/redux/actions/olamiActions.js */
/*! ModuleConcatenation bailout: Cannot concat with ./app/styles/img/bg_pic1.jpg (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./app/styles/img/title.jpeg (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/react-redux/es/index.js (<- Module is referenced from these modules with unsupported syntax: multi react react-dom react-router redux redux-thunk react-redux (referenced with single entry)) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/react/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/redux/es/redux.js (<- Module is referenced from these modules with unsupported syntax: multi react react-dom react-router redux redux-thunk react-redux (referenced with single entry)) */function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(19),i=n(8),s=n(24),c=Object(a.connect)(e=>({data:e.text}),e=>({dispatchAddTodo:Object(i.bindActionCreators)(s.c,e)})),l=(n(69),n(58)),p=n.n(l),u=n(71),f=n.n(u),d="/Users/lpc/Desktop/react-ssr/app/componentUI/olami/ChatItem.js",m=e=>{const{contentText:t,titleImg:n,className:r}=e;return o.a.createElement("div",{className:`item-row clearfix ${r}`,__source:{fileName:d,lineNumber:12},__self:void 0},o.a.createElement("div",{className:"title-container",style:{backgroundImage:`url(${"right"===r?f.a:p.a})`},__source:{fileName:d,lineNumber:13},__self:void 0}),o.a.createElement("div",{className:"content-text",__source:{fileName:d,lineNumber:17},__self:void 0},o.a.createElement("p",{className:"text",__source:{fileName:d,lineNumber:18},__self:void 0},t)))},h="/Users/lpc/Desktop/react-ssr/app/componentUI/olami/ChatList.js",b=e=>{const{data:t}=e;return o.a.createElement("div",{className:"chat-container",__source:{fileName:h,lineNumber:8},__self:void 0},t.map((e,t)=>o.a.createElement(m,Object.assign({key:t},e,{__source:{fileName:h,lineNumber:11},__self:void 0}))))},v=n(61),g=(n(67),"/Users/lpc/Desktop/react-ssr/app/page/OlamiPage.js");t.default=c(class extends o.a.Component{componentDidUpdate(){window.scrollTo(0,1e8)}render(){const{dispatchAddTodo:e,data:t}=this.props;return o.a.createElement("div",{className:"container chat-app",__source:{fileName:g,lineNumber:17},__self:this},o.a.createElement(b,{data:t,__source:{fileName:g,lineNumber:18},__self:this}),o.a.createElement(v.a,{dispatchAddTodo:e,className:"olami",placeholder:"请输入您的消息，不能为空",btnName:"发送",btnClass:"btn-success",__source:{fileName:g,lineNumber:19},__self:this}))}})}}]);
//# sourceMappingURL=chunks6.js.map