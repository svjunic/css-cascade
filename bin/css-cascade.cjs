#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.1.0
// Source: https://github.com/svjunic/css-cascade
var Ts=Object.create;var mr=Object.defineProperty;var Ds=Object.getOwnPropertyDescriptor;var Bs=Object.getOwnPropertyNames;var Us=Object.getPrototypeOf,zs=Object.prototype.hasOwnProperty;var _=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var Fs=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Bs(e))!zs.call(s,n)&&n!==t&&mr(s,n,{get:()=>e[n],enumerable:!(r=Ds(e,n))||r.enumerable});return s};var js=(s,e,t)=>(t=s!=null?Ts(Us(s)):{},Fs(e||!s||!s.__esModule?mr(t,"default",{value:s,enumerable:!0}):t,s));var wt=_((wl,yt)=>{var ze=process||{},gr=ze.argv||[],Ue=ze.env||{},Vs=!(Ue.NO_COLOR||gr.includes("--no-color"))&&(!!Ue.FORCE_COLOR||gr.includes("--color")||ze.platform==="win32"||(ze.stdout||{}).isTTY&&Ue.TERM!=="dumb"||!!Ue.CI),Ws=(s,e,t=s)=>r=>{let n=""+r,o=n.indexOf(e,s.length);return~o?s+Gs(n,e,t,o)+e:s+n+e},Gs=(s,e,t,r)=>{let n="",o=0;do n+=s.substring(o,r)+t,o=r+e.length,r=s.indexOf(e,o);while(~r);return n+s.substring(o)},yr=(s=Vs)=>{let e=s?Ws:()=>String;return{isColorSupported:s,reset:e("\x1B[0m","\x1B[0m"),bold:e("\x1B[1m","\x1B[22m","\x1B[22m\x1B[1m"),dim:e("\x1B[2m","\x1B[22m","\x1B[22m\x1B[2m"),italic:e("\x1B[3m","\x1B[23m"),underline:e("\x1B[4m","\x1B[24m"),inverse:e("\x1B[7m","\x1B[27m"),hidden:e("\x1B[8m","\x1B[28m"),strikethrough:e("\x1B[9m","\x1B[29m"),black:e("\x1B[30m","\x1B[39m"),red:e("\x1B[31m","\x1B[39m"),green:e("\x1B[32m","\x1B[39m"),yellow:e("\x1B[33m","\x1B[39m"),blue:e("\x1B[34m","\x1B[39m"),magenta:e("\x1B[35m","\x1B[39m"),cyan:e("\x1B[36m","\x1B[39m"),white:e("\x1B[37m","\x1B[39m"),gray:e("\x1B[90m","\x1B[39m"),bgBlack:e("\x1B[40m","\x1B[49m"),bgRed:e("\x1B[41m","\x1B[49m"),bgGreen:e("\x1B[42m","\x1B[49m"),bgYellow:e("\x1B[43m","\x1B[49m"),bgBlue:e("\x1B[44m","\x1B[49m"),bgMagenta:e("\x1B[45m","\x1B[49m"),bgCyan:e("\x1B[46m","\x1B[49m"),bgWhite:e("\x1B[47m","\x1B[49m"),blackBright:e("\x1B[90m","\x1B[39m"),redBright:e("\x1B[91m","\x1B[39m"),greenBright:e("\x1B[92m","\x1B[39m"),yellowBright:e("\x1B[93m","\x1B[39m"),blueBright:e("\x1B[94m","\x1B[39m"),magentaBright:e("\x1B[95m","\x1B[39m"),cyanBright:e("\x1B[96m","\x1B[39m"),whiteBright:e("\x1B[97m","\x1B[39m"),bgBlackBright:e("\x1B[100m","\x1B[49m"),bgRedBright:e("\x1B[101m","\x1B[49m"),bgGreenBright:e("\x1B[102m","\x1B[49m"),bgYellowBright:e("\x1B[103m","\x1B[49m"),bgBlueBright:e("\x1B[104m","\x1B[49m"),bgMagentaBright:e("\x1B[105m","\x1B[49m"),bgCyanBright:e("\x1B[106m","\x1B[49m"),bgWhiteBright:e("\x1B[107m","\x1B[49m")}};yt.exports=yr();yt.exports.createColors=yr});var vt=_((vl,vr)=>{"use strict";var Fe=/[\t\n\f\r "#'()/;[\\\]{}]/g,je=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,Ks=/.[\r\n"'(/\\]/,wr=/[\da-f]/i;vr.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,o,l,a,i,u,c,h,f,p,d,w=r.length,y=0,g=[],m=[],S=-1;function C(){return y}function x(T){throw e.error("Unclosed "+T,y)}function b(){return m.length===0&&y>=w}function O(T){if(m.length)return m.pop();if(y>=w)return;let P=T?T.ignoreUnclosed:!1;switch(o=r.charCodeAt(y),o){case 10:case 32:case 9:case 13:case 12:{i=y;do i+=1,o=r.charCodeAt(i);while(o===32||o===10||o===9||o===13||o===12);c=["space",r.slice(y,i)],y=i-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let W=String.fromCharCode(o);c=[W,W,y];break}case 40:{if(d=g.length?g.pop()[1]:"",p=r.charCodeAt(y+1),d==="url"&&p!==39&&p!==34&&p!==32&&p!==10&&p!==9&&p!==12&&p!==13){i=y;do{if(h=!1,i=r.indexOf(")",i+1),i===-1)if(n||P){i=y;break}else x("bracket");for(f=i;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["brackets",r.slice(y,i+1),y,i],y=i}else y<=S?c=["(","(",y]:(i=r.indexOf(")",y+1),l=r.slice(y,i+1),i===-1||Ks.test(l)?(S=i===-1?w:i,c=["(","(",y]):(c=["brackets",l,y,i],y=i));break}case 39:case 34:{u=o===39?"'":'"',i=y;do{if(h=!1,i=r.indexOf(u,i+1),i===-1)if(n||P){i=y+1;break}else x("string");for(f=i;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["string",r.slice(y,i+1),y,i],y=i;break}case 64:{Fe.lastIndex=y+1,Fe.test(r),Fe.lastIndex===0?i=r.length-1:i=Fe.lastIndex-2,c=["at-word",r.slice(y,i+1),y,i],y=i;break}case 92:{for(i=y,a=!0;r.charCodeAt(i+1)===92;)i+=1,a=!a;if(o=r.charCodeAt(i+1),a&&o!==47&&o!==32&&o!==10&&o!==9&&o!==13&&o!==12&&(i+=1,wr.test(r.charAt(i)))){for(;wr.test(r.charAt(i+1));)i+=1;r.charCodeAt(i+1)===32&&(i+=1)}c=["word",r.slice(y,i+1),y,i],y=i;break}default:{o===47&&r.charCodeAt(y+1)===42?(i=r.indexOf("*/",y+2)+1,i===0&&(n||P?i=r.length:x("comment")),c=["comment",r.slice(y,i+1),y,i],y=i):(je.lastIndex=y+1,je.test(r),je.lastIndex===0?i=r.length-1:i=je.lastIndex-2,c=["word",r.slice(y,i+1),y,i],g.push(c),y=i);break}}return y++,c}function A(T){m.push(T)}return{back:A,endOfFile:b,nextToken:O,position:C}}});var bt=_((bl,Sr)=>{"use strict";var q=wt(),Hs=vt(),br;function Qs(s){br=s}var Js={";":q.yellow,":":q.yellow,"(":q.cyan,")":q.cyan,"[":q.yellow,"]":q.yellow,"{":q.yellow,"}":q.yellow,"at-word":q.cyan,brackets:q.cyan,call:q.cyan,class:q.yellow,comment:q.gray,hash:q.magenta,string:q.green};function Ys([s,e],t){if(s==="word"){if(e[0]===".")return"class";if(e[0]==="#")return"hash"}if(!t.endOfFile()){let r=t.nextToken();if(t.back(r),r[0]==="brackets"||r[0]==="(")return"call"}return s}function xr(s){let e=Hs(new br(s),{ignoreErrors:!0}),t="";for(;!e.endOfFile();){let r=e.nextToken(),n=Js[Ys(r,e)];n?t+=r[1].split(/\r?\n/).map(o=>n(o)).join(`
`):t+=r[1]}return t}xr.registerInput=Qs;Sr.exports=xr});var Ve=_((xl,Er)=>{"use strict";var Cr=wt(),_r=bt(),ye=class s extends Error{constructor(e,t,r,n,o,l){super(e),this.name="CssSyntaxError",this.reason=e,o&&(this.file=o),n&&(this.source=n),l&&(this.plugin=l),typeof t<"u"&&typeof r<"u"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,s)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=Cr.isColorSupported);let r=c=>c,n=c=>c,o=c=>c;if(e){let{bold:c,gray:h,red:f}=Cr.createColors(!0);n=p=>c(f(p)),r=p=>h(p),_r&&(o=p=>_r(p))}let l=t.split(/\r?\n/),a=Math.max(this.line-3,0),i=Math.min(this.line+2,l.length),u=String(i).length;return l.slice(a,i).map((c,h)=>{let f=a+1+h,p=" "+(" "+f).slice(-u)+" | ";if(f===this.line){if(c.length>160){let w=20,y=Math.max(0,this.column-w),g=Math.max(this.column+w,this.endColumn+w),m=c.slice(y,g),S=r(p.replace(/\d/g," "))+c.slice(0,Math.min(this.column-1,w-1)).replace(/[^\t]/g," ");return n(">")+r(p)+o(m)+`
 `+S+n("^")}let d=r(p.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return n(">")+r(p)+o(c)+`
 `+d+n("^")}return" "+r(p)+o(c)}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};Er.exports=ye;ye.default=ye});var xt=_((Sl,Ar)=>{"use strict";var Xs=/(<)(\/?style\b)/gi,Zs=/(<)(!--)/g;function Q(s){return typeof s!="string"||!s.includes("<")?s:s.replace(Xs,"\\3c $2").replace(Zs,"\\3c $2")}var Or={after:`
`,beforeClose:`
`,beforeComment:`
`,beforeDecl:`
`,beforeOpen:" ",beforeRule:`
`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function eo(s){return s[0].toUpperCase()+s.slice(1)}var we=class{constructor(e){this.builder=e}atrule(e,t){let r=e.raws,n="@"+e.name,o=e.params?this.rawValue(e,"params"):"";if(typeof r.afterName<"u"?n+=r.afterName:o&&(n+=" "),e.nodes)this.block(e,n+o);else{let l=(r.between||"")+(t?";":"");this.builder(Q(n+o+l),e)}}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,o=0;for(;n&&n.type!=="root";)o+=1,n=n.parent;if(r.includes(`
`)){let l=this.raw(e,null,"indent");if(l.length)for(let a=0;a<o;a++)r+=l}return r}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(Q(t+r)+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(Q(n)),this.builder("}",e,"end")}body(e){let t=e.nodes,r=t.length-1;for(;r>0&&t[r].type==="comment";)r-=1;let n=this.raw(e,"semicolon"),o=e.type==="document";for(let l=0;l<t.length;l++){let a=t[l],i=this.raw(a,"before");i&&this.builder(o?i:Q(i)),this.stringify(a,r!==l||n)}}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder(Q("/*"+t+e.text+r+"*/"),e)}decl(e,t){let r=e.raws,n=this.raw(e,"between","colon"),o=e.prop+n+this.rawValue(e,"value");e.important&&(o+=r.important||" !important"),t&&(o+=";"),this.builder(Q(o),e)}document(e){this.body(e)}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n<"u"))return n;let o=e.parent;if(r==="before"&&(!o||o.type==="root"&&o.first===e||o&&o.type==="document"))return"";if(!o)return Or[r];let l=e.root(),a=l.rawCache||(l.rawCache={});if(typeof a[r]<"u")return a[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let i="raw"+eo(r);this[i]?n=this[i](l,e):l.walk(u=>{if(n=u.raws[t],typeof n<"u")return!1})}return typeof n>"u"&&(n=Or[r]),a[r]=n,n}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t<"u"))return!1}),t}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before<"u")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between<"u")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t<"u"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before<"u"){let o=r.raws.before.split(`
`);return t=o[o.length-1],t=t.replace(/\S/g,""),!1}}),t}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t<"u"))return!1}),t}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}root(e){if(this.body(e),e.raws.after){let t=e.raws.after,r=e.parent&&e.parent.type==="document";this.builder(r?t:Q(t))}}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(Q(e.raws.ownSemicolon),e,"end")}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}};Ar.exports=we;we.default=we});var ve=_((Cl,Lr)=>{"use strict";var to=xt();function St(s,e){new to(e).stringify(s)}Lr.exports=St;St.default=St});var We=_((_l,Ct)=>{"use strict";Ct.exports.isClean=Symbol("isClean");Ct.exports.my=Symbol("my")});var Se=_((El,Mr)=>{"use strict";var ro=Ve(),no=xt(),so=ve(),{isClean:be,my:oo}=We();function _t(s,e){let t=new s.constructor;for(let r in s){if(!Object.prototype.hasOwnProperty.call(s,r)||r==="proxyCache")continue;let n=s[r],o=typeof n;r==="parent"&&o==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(l=>_t(l,t)):(o==="object"&&n!==null&&(n=_t(n)),t[r]=n)}return t}function G(s,e){if(e&&typeof e.offset<"u")return e.offset;let t=1,r=1,n=0;for(let o=0;o<s.length;o++){if(r===e.line&&t===e.column){n=o;break}s[o]===`
`?(t=1,r+=1):t+=1}return n}var xe=class{get proxyOf(){return this}constructor(e={}){this.raws={},this[be]=!1,this[oo]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){for(let t in e)this[t]=e[t];return this}before(e){return this.parent.insertBefore(this,e),this}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}clone(e={}){let t=_t(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(e,t={}){if(this.source){let{end:r,start:n}=this.rangeBy(t);return this.source.input.error(e,{column:n.column,line:n.line},{column:r.column,line:r.line},t)}return new ro(e)}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0}}}markClean(){this[be]=!0}markDirty(){if(this[be]){this[be]=!1;let e=this;for(;e=e.parent;)e[be]=!1}}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e={}){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r="document"in this.source.input?this.source.input.document:this.source.input.css,o=r.slice(G(r,this.source.start),G(r,this.source.end)).indexOf(e.word);o!==-1&&(t=this.positionInside(o))}return t}positionInside(e){let t=this.source.start.column,r=this.source.start.line,n="document"in this.source.input?this.source.input.document:this.source.input.css,o=G(n,this.source.start),l=o+e;for(let a=o;a<l;a++)n[a]===`
`?(t=1,r+=1):t+=1;return{column:t,line:r,offset:l}}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}rangeBy(e={}){let t="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:G(t,this.source.start)},n=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:G(t,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(e.word){let l=t.slice(G(t,this.source.start),G(t,this.source.end)).indexOf(e.word);l!==-1&&(r=this.positionInside(l),n=this.positionInside(l+e.word.length))}else e.start?r={column:e.start.column,line:e.start.line,offset:G(t,e.start)}:e.index&&(r=this.positionInside(e.index)),e.end?n={column:e.end.column,line:e.end.line,offset:G(t,e.end)}:typeof e.endIndex=="number"?n=this.positionInside(e.endIndex):e.index&&(n=this.positionInside(e.index+1));return(n.line<r.line||n.line===r.line&&n.column<=r.column)&&(n={column:r.column+1,line:r.line,offset:r.offset+1}),{end:n,start:r}}raw(e,t){return new no().raw(this,e,t)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}toJSON(e,t){let r={},n=t==null;t=t||new Map;let o=0;for(let l in this){if(!Object.prototype.hasOwnProperty.call(this,l)||l==="parent"||l==="proxyCache")continue;let a=this[l];if(Array.isArray(a))r[l]=a.map(i=>typeof i=="object"&&i.toJSON?i.toJSON(null,t):i);else if(typeof a=="object"&&a.toJSON)r[l]=a.toJSON(null,t);else if(l==="source"){if(a==null)continue;let i=t.get(a.input);i==null&&(i=o,t.set(a.input,o),o++),r[l]={end:a.end,inputId:i,start:a.start}}else r[l]=a}return n&&(r.inputs=[...t.keys()].map(l=>l.toJSON())),r}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(e=so){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}warn(e,t,r={}){let n={node:this};for(let o in r)n[o]=r[o];return e.warn(t,n)}};Mr.exports=xe;xe.default=xe});var _e=_((Ol,$r)=>{"use strict";var io=Se(),Ce=class extends io{constructor(e){super(e),this.type="comment"}};$r.exports=Ce;Ce.default=Ce});var Oe=_((Al,kr)=>{"use strict";var lo=Se(),Ee=class extends lo{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(e){e&&typeof e.value<"u"&&typeof e.value!="string"&&(e={...e,value:String(e.value)}),super(e),this.type="decl"}};kr.exports=Ee;Ee.default=Ee});var J=_((Ll,Ur)=>{"use strict";var Rr=_e(),Pr=Oe(),ao=Se(),{isClean:Ir,my:Nr}=We(),Et,qr,Tr,Ot;function Dr(s){return s.map(e=>(e.nodes&&(e.nodes=Dr(e.nodes)),delete e.source,e))}function Br(s){if(s[Ir]=!1,s.proxyOf.nodes)for(let e of s.proxyOf.nodes)Br(e)}var z=class s extends ao{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}every(e){return this.nodes.every(e)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(o,l)=>n(o.toProxy(),l):n)):t==="every"||t==="some"?r=>e[t]((n,...o)=>r(n.toProxy(),...o)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0}}}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let l of n)this.proxyOf.nodes.splice(r+1,0,l);let o;for(let l in this.indexes)o=this.indexes[l],r<o&&(this.indexes[l]=o+n.length);return this.markDirty(),this}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,o=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let a of o)this.proxyOf.nodes.splice(r,0,a);let l;for(let a in this.indexes)l=this.indexes[a],r<=l&&(this.indexes[a]=l+o.length);return this.markDirty(),this}normalize(e,t){if(typeof e=="string")e=Dr(qr(e).nodes);else if(typeof e>"u")e=[];else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value>"u")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new Pr(e)]}else if(e.selector||e.selectors)e=[new Ot(e)];else if(e.name)e=[new Et(e)];else if(e.text)e=[new Rr(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[Nr]||s.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[Ir]&&Br(n),n.raws||(n.raws={}),typeof n.raws.before>"u"&&t&&typeof t.raws.before<"u"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(o){throw t.addToError(o)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}};z.registerParse=s=>{qr=s};z.registerRule=s=>{Ot=s};z.registerAtRule=s=>{Et=s};z.registerRoot=s=>{Tr=s};Ur.exports=z;z.default=z;z.rebuild=s=>{s.type==="atrule"?Object.setPrototypeOf(s,Et.prototype):s.type==="rule"?Object.setPrototypeOf(s,Ot.prototype):s.type==="decl"?Object.setPrototypeOf(s,Pr.prototype):s.type==="comment"?Object.setPrototypeOf(s,Rr.prototype):s.type==="root"&&Object.setPrototypeOf(s,Tr.prototype),s[Nr]=!0,s.nodes&&s.nodes.forEach(e=>{z.rebuild(e)})}});var Ge=_((Ml,Fr)=>{"use strict";var zr=J(),ie=class extends zr{constructor(e){super(e),this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Fr.exports=ie;ie.default=ie;zr.registerAtRule(ie)});var Ke=_(($l,Wr)=>{"use strict";var co=J(),jr,Vr,Z=class extends co{constructor(e){super({type:"document",...e}),this.nodes||(this.nodes=[])}toResult(e={}){return new jr(new Vr,this,e).stringify()}};Z.registerLazyResult=s=>{jr=s};Z.registerProcessor=s=>{Vr=s};Wr.exports=Z;Z.default=Z});var Kr=_((kl,Gr)=>{var uo="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",fo=(s,e=21)=>(t=e)=>{let r="",n=t|0;for(;n--;)r+=s[Math.random()*s.length|0];return r},ho=(s=21)=>{let e="",t=s|0;for(;t--;)e+=uo[Math.random()*64|0];return e};Gr.exports={nanoid:ho,customAlphabet:fo}});var Qr=_(At=>{var Hr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");At.encode=function(s){if(0<=s&&s<Hr.length)return Hr[s];throw new TypeError("Must be between 0 and 63: "+s)};At.decode=function(s){var e=65,t=90,r=97,n=122,o=48,l=57,a=43,i=47,u=26,c=52;return e<=s&&s<=t?s-e:r<=s&&s<=n?s-r+u:o<=s&&s<=l?s-o+c:s==a?62:s==i?63:-1}});var $t=_(Mt=>{var Jr=Qr(),Lt=5,Yr=1<<Lt,Xr=Yr-1,Zr=Yr;function po(s){return s<0?(-s<<1)+1:(s<<1)+0}function mo(s){var e=(s&1)===1,t=s>>1;return e?-t:t}Mt.encode=function(e){var t="",r,n=po(e);do r=n&Xr,n>>>=Lt,n>0&&(r|=Zr),t+=Jr.encode(r);while(n>0);return t};Mt.decode=function(e,t,r){var n=e.length,o=0,l=0,a,i;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(i=Jr.decode(e.charCodeAt(t++)),i===-1)throw new Error("Invalid base64 digit: "+e.charAt(t-1));a=!!(i&Zr),i&=Xr,o=o+(i<<l),l+=Lt}while(a);r.value=mo(o),r.rest=t}});var ae=_(I=>{function go(s,e,t){if(e in s)return s[e];if(arguments.length===3)return t;throw new Error('"'+e+'" is a required argument.')}I.getArg=go;var en=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,yo=/^data:.+\,.+$/;function Ae(s){var e=s.match(en);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}I.urlParse=Ae;function le(s){var e="";return s.scheme&&(e+=s.scheme+":"),e+="//",s.auth&&(e+=s.auth+"@"),s.host&&(e+=s.host),s.port&&(e+=":"+s.port),s.path&&(e+=s.path),e}I.urlGenerate=le;var wo=32;function vo(s){var e=[];return function(t){for(var r=0;r<e.length;r++)if(e[r].input===t){var n=e[0];return e[0]=e[r],e[r]=n,e[0].result}var o=s(t);return e.unshift({input:t,result:o}),e.length>wo&&e.pop(),o}}var kt=vo(function(e){var t=e,r=Ae(e);if(r){if(!r.path)return e;t=r.path}for(var n=I.isAbsolute(t),o=[],l=0,a=0;;)if(l=a,a=t.indexOf("/",l),a===-1){o.push(t.slice(l));break}else for(o.push(t.slice(l,a));a<t.length&&t[a]==="/";)a++;for(var i,u=0,a=o.length-1;a>=0;a--)i=o[a],i==="."?o.splice(a,1):i===".."?u++:u>0&&(i===""?(o.splice(a+1,u),u=0):(o.splice(a,2),u--));return t=o.join("/"),t===""&&(t=n?"/":"."),r?(r.path=t,le(r)):t});I.normalize=kt;function tn(s,e){s===""&&(s="."),e===""&&(e=".");var t=Ae(e),r=Ae(s);if(r&&(s=r.path||"/"),t&&!t.scheme)return r&&(t.scheme=r.scheme),le(t);if(t||e.match(yo))return e;if(r&&!r.host&&!r.path)return r.host=e,le(r);var n=e.charAt(0)==="/"?e:kt(s.replace(/\/+$/,"")+"/"+e);return r?(r.path=n,le(r)):n}I.join=tn;I.isAbsolute=function(s){return s.charAt(0)==="/"||en.test(s)};function bo(s,e){s===""&&(s="."),s=s.replace(/\/$/,"");for(var t=0;e.indexOf(s+"/")!==0;){var r=s.lastIndexOf("/");if(r<0||(s=s.slice(0,r),s.match(/^([^\/]+:\/)?\/*$/)))return e;++t}return Array(t+1).join("../")+e.substr(s.length+1)}I.relative=bo;var rn=(function(){var s=Object.create(null);return!("__proto__"in s)})();function nn(s){return s}function xo(s){return sn(s)?"$"+s:s}I.toSetString=rn?nn:xo;function So(s){return sn(s)?s.slice(1):s}I.fromSetString=rn?nn:So;function sn(s){if(!s)return!1;var e=s.length;if(e<9||s.charCodeAt(e-1)!==95||s.charCodeAt(e-2)!==95||s.charCodeAt(e-3)!==111||s.charCodeAt(e-4)!==116||s.charCodeAt(e-5)!==111||s.charCodeAt(e-6)!==114||s.charCodeAt(e-7)!==112||s.charCodeAt(e-8)!==95||s.charCodeAt(e-9)!==95)return!1;for(var t=e-10;t>=0;t--)if(s.charCodeAt(t)!==36)return!1;return!0}function Co(s,e,t){var r=K(s.source,e.source);return r!==0||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}I.compareByOriginalPositions=Co;function _o(s,e,t){var r;return r=s.originalLine-e.originalLine,r!==0||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}I.compareByOriginalPositionsNoSource=_o;function Eo(s,e,t){var r=s.generatedLine-e.generatedLine;return r!==0||(r=s.generatedColumn-e.generatedColumn,r!==0||t)||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}I.compareByGeneratedPositionsDeflated=Eo;function Oo(s,e,t){var r=s.generatedColumn-e.generatedColumn;return r!==0||t||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}I.compareByGeneratedPositionsDeflatedNoLine=Oo;function K(s,e){return s===e?0:s===null?1:e===null?-1:s>e?1:-1}function Ao(s,e){var t=s.generatedLine-e.generatedLine;return t!==0||(t=s.generatedColumn-e.generatedColumn,t!==0)||(t=K(s.source,e.source),t!==0)||(t=s.originalLine-e.originalLine,t!==0)||(t=s.originalColumn-e.originalColumn,t!==0)?t:K(s.name,e.name)}I.compareByGeneratedPositionsInflated=Ao;function Lo(s){return JSON.parse(s.replace(/^\)]}'[^\n]*\n/,""))}I.parseSourceMapInput=Lo;function Mo(s,e,t){if(e=e||"",s&&(s[s.length-1]!=="/"&&e[0]!=="/"&&(s+="/"),e=s+e),t){var r=Ae(t);if(!r)throw new Error("sourceMapURL could not be parsed");if(r.path){var n=r.path.lastIndexOf("/");n>=0&&(r.path=r.path.substring(0,n+1))}e=tn(le(r),e)}return kt(e)}I.computeSourceURL=Mo});var It=_(on=>{var Rt=ae(),Pt=Object.prototype.hasOwnProperty,ee=typeof Map<"u";function H(){this._array=[],this._set=ee?new Map:Object.create(null)}H.fromArray=function(e,t){for(var r=new H,n=0,o=e.length;n<o;n++)r.add(e[n],t);return r};H.prototype.size=function(){return ee?this._set.size:Object.getOwnPropertyNames(this._set).length};H.prototype.add=function(e,t){var r=ee?e:Rt.toSetString(e),n=ee?this.has(e):Pt.call(this._set,r),o=this._array.length;(!n||t)&&this._array.push(e),n||(ee?this._set.set(e,o):this._set[r]=o)};H.prototype.has=function(e){if(ee)return this._set.has(e);var t=Rt.toSetString(e);return Pt.call(this._set,t)};H.prototype.indexOf=function(e){if(ee){var t=this._set.get(e);if(t>=0)return t}else{var r=Rt.toSetString(e);if(Pt.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')};H.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};H.prototype.toArray=function(){return this._array.slice()};on.ArraySet=H});var cn=_(an=>{var ln=ae();function $o(s,e){var t=s.generatedLine,r=e.generatedLine,n=s.generatedColumn,o=e.generatedColumn;return r>t||r==t&&o>=n||ln.compareByGeneratedPositionsInflated(s,e)<=0}function He(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}He.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)};He.prototype.add=function(e){$o(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};He.prototype.toArray=function(){return this._sorted||(this._array.sort(ln.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};an.MappingList=He});var Nt=_(un=>{var Le=$t(),R=ae(),Qe=It().ArraySet,ko=cn().MappingList;function B(s){s||(s={}),this._file=R.getArg(s,"file",null),this._sourceRoot=R.getArg(s,"sourceRoot",null),this._skipValidation=R.getArg(s,"skipValidation",!1),this._ignoreInvalidMapping=R.getArg(s,"ignoreInvalidMapping",!1),this._sources=new Qe,this._names=new Qe,this._mappings=new ko,this._sourcesContents=null}B.prototype._version=3;B.fromSourceMap=function(e,t){var r=e.sourceRoot,n=new B(Object.assign(t||{},{file:e.file,sourceRoot:r}));return e.eachMapping(function(o){var l={generated:{line:o.generatedLine,column:o.generatedColumn}};o.source!=null&&(l.source=o.source,r!=null&&(l.source=R.relative(r,l.source)),l.original={line:o.originalLine,column:o.originalColumn},o.name!=null&&(l.name=o.name)),n.addMapping(l)}),e.sources.forEach(function(o){var l=o;r!==null&&(l=R.relative(r,o)),n._sources.has(l)||n._sources.add(l);var a=e.sourceContentFor(o);a!=null&&n.setSourceContent(o,a)}),n};B.prototype.addMapping=function(e){var t=R.getArg(e,"generated"),r=R.getArg(e,"original",null),n=R.getArg(e,"source",null),o=R.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(t,r,n,o)===!1||(n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:n,name:o}))};B.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=R.relative(this._sourceRoot,r)),t!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[R.toSetString(r)]=t):this._sourcesContents&&(delete this._sourcesContents[R.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};B.prototype.applySourceMap=function(e,t,r){var n=t;if(t==null){if(e.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=e.file}var o=this._sourceRoot;o!=null&&(n=R.relative(o,n));var l=new Qe,a=new Qe;this._mappings.unsortedForEach(function(i){if(i.source===n&&i.originalLine!=null){var u=e.originalPositionFor({line:i.originalLine,column:i.originalColumn});u.source!=null&&(i.source=u.source,r!=null&&(i.source=R.join(r,i.source)),o!=null&&(i.source=R.relative(o,i.source)),i.originalLine=u.line,i.originalColumn=u.column,u.name!=null&&(i.name=u.name))}var c=i.source;c!=null&&!l.has(c)&&l.add(c);var h=i.name;h!=null&&!a.has(h)&&a.add(h)},this),this._sources=l,this._names=a,e.sources.forEach(function(i){var u=e.sourceContentFor(i);u!=null&&(r!=null&&(i=R.join(r,i)),o!=null&&(i=R.relative(o,i)),this.setSourceContent(i,u))},this)};B.prototype._validateMapping=function(e,t,r,n){if(t&&typeof t.line!="number"&&typeof t.column!="number"){var o="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!t&&!r&&!n)){if(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&r)return;var o="Invalid mapping: "+JSON.stringify({generated:e,source:r,original:t,name:n});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}};B.prototype._serializeMappings=function(){for(var e=0,t=1,r=0,n=0,o=0,l=0,a="",i,u,c,h,f=this._mappings.toArray(),p=0,d=f.length;p<d;p++){if(u=f[p],i="",u.generatedLine!==t)for(e=0;u.generatedLine!==t;)i+=";",t++;else if(p>0){if(!R.compareByGeneratedPositionsInflated(u,f[p-1]))continue;i+=","}i+=Le.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(h=this._sources.indexOf(u.source),i+=Le.encode(h-l),l=h,i+=Le.encode(u.originalLine-1-n),n=u.originalLine-1,i+=Le.encode(u.originalColumn-r),r=u.originalColumn,u.name!=null&&(c=this._names.indexOf(u.name),i+=Le.encode(c-o),o=c)),a+=i}return a};B.prototype._generateSourcesContent=function(e,t){return e.map(function(r){if(!this._sourcesContents)return null;t!=null&&(r=R.relative(t,r));var n=R.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)};B.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};B.prototype.toString=function(){return JSON.stringify(this.toJSON())};un.SourceMapGenerator=B});var fn=_(te=>{te.GREATEST_LOWER_BOUND=1;te.LEAST_UPPER_BOUND=2;function qt(s,e,t,r,n,o){var l=Math.floor((e-s)/2)+s,a=n(t,r[l],!0);return a===0?l:a>0?e-l>1?qt(l,e,t,r,n,o):o==te.LEAST_UPPER_BOUND?e<r.length?e:-1:l:l-s>1?qt(s,l,t,r,n,o):o==te.LEAST_UPPER_BOUND?l:s<0?-1:s}te.search=function(e,t,r,n){if(t.length===0)return-1;var o=qt(-1,t.length,e,t,r,n||te.GREATEST_LOWER_BOUND);if(o<0)return-1;for(;o-1>=0&&r(t[o],t[o-1],!0)===0;)--o;return o}});var dn=_(pn=>{function Ro(s){function e(n,o,l){var a=n[o];n[o]=n[l],n[l]=a}function t(n,o){return Math.round(n+Math.random()*(o-n))}function r(n,o,l,a){if(l<a){var i=t(l,a),u=l-1;e(n,i,a);for(var c=n[a],h=l;h<a;h++)o(n[h],c,!1)<=0&&(u+=1,e(n,u,h));e(n,u+1,h);var f=u+1;r(n,o,l,f-1),r(n,o,f+1,a)}}return r}function Po(s){let e=Ro.toString();return new Function(`return ${e}`)()(s)}var hn=new WeakMap;pn.quickSort=function(s,e,t=0){let r=hn.get(e);r===void 0&&(r=Po(e),hn.set(e,r)),r(s,e,t,s.length-1)}});var yn=_(Je=>{var v=ae(),Dt=fn(),ce=It().ArraySet,Io=$t(),Me=dn().quickSort;function $(s,e){var t=s;return typeof s=="string"&&(t=v.parseSourceMapInput(s)),t.sections!=null?new F(t,e):new N(t,e)}$.fromSourceMap=function(s,e){return N.fromSourceMap(s,e)};$.prototype._version=3;$.prototype.__generatedMappings=null;Object.defineProperty($.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});$.prototype.__originalMappings=null;Object.defineProperty($.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});$.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return r===";"||r===","};$.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")};$.GENERATED_ORDER=1;$.ORIGINAL_ORDER=2;$.GREATEST_LOWER_BOUND=1;$.LEAST_UPPER_BOUND=2;$.prototype.eachMapping=function(e,t,r){var n=t||null,o=r||$.GENERATED_ORDER,l;switch(o){case $.GENERATED_ORDER:l=this._generatedMappings;break;case $.ORIGINAL_ORDER:l=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var a=this.sourceRoot,i=e.bind(n),u=this._names,c=this._sources,h=this._sourceMapURL,f=0,p=l.length;f<p;f++){var d=l[f],w=d.source===null?null:c.at(d.source);w!==null&&(w=v.computeSourceURL(a,w,h)),i({source:w,generatedLine:d.generatedLine,generatedColumn:d.generatedColumn,originalLine:d.originalLine,originalColumn:d.originalColumn,name:d.name===null?null:u.at(d.name)})}};$.prototype.allGeneratedPositionsFor=function(e){var t=v.getArg(e,"line"),r={source:v.getArg(e,"source"),originalLine:t,originalColumn:v.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var n=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",v.compareByOriginalPositions,Dt.LEAST_UPPER_BOUND);if(o>=0){var l=this._originalMappings[o];if(e.column===void 0)for(var a=l.originalLine;l&&l.originalLine===a;)n.push({line:v.getArg(l,"generatedLine",null),column:v.getArg(l,"generatedColumn",null),lastColumn:v.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++o];else for(var i=l.originalColumn;l&&l.originalLine===t&&l.originalColumn==i;)n.push({line:v.getArg(l,"generatedLine",null),column:v.getArg(l,"generatedColumn",null),lastColumn:v.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++o]}return n};Je.SourceMapConsumer=$;function N(s,e){var t=s;typeof s=="string"&&(t=v.parseSourceMapInput(s));var r=v.getArg(t,"version"),n=v.getArg(t,"sources"),o=v.getArg(t,"names",[]),l=v.getArg(t,"sourceRoot",null),a=v.getArg(t,"sourcesContent",null),i=v.getArg(t,"mappings"),u=v.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);l&&(l=v.normalize(l)),n=n.map(String).map(v.normalize).map(function(c){return l&&v.isAbsolute(l)&&v.isAbsolute(c)?v.relative(l,c):c}),this._names=ce.fromArray(o.map(String),!0),this._sources=ce.fromArray(n,!0),this._absoluteSources=this._sources.toArray().map(function(c){return v.computeSourceURL(l,c,e)}),this.sourceRoot=l,this.sourcesContent=a,this._mappings=i,this._sourceMapURL=e,this.file=u}N.prototype=Object.create($.prototype);N.prototype.consumer=$;N.prototype._findSourceIndex=function(s){var e=s;if(this.sourceRoot!=null&&(e=v.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var t;for(t=0;t<this._absoluteSources.length;++t)if(this._absoluteSources[t]==s)return t;return-1};N.fromSourceMap=function(e,t){var r=Object.create(N.prototype),n=r._names=ce.fromArray(e._names.toArray(),!0),o=r._sources=ce.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=t,r._absoluteSources=r._sources.toArray().map(function(p){return v.computeSourceURL(r.sourceRoot,p,t)});for(var l=e._mappings.toArray().slice(),a=r.__generatedMappings=[],i=r.__originalMappings=[],u=0,c=l.length;u<c;u++){var h=l[u],f=new gn;f.generatedLine=h.generatedLine,f.generatedColumn=h.generatedColumn,h.source&&(f.source=o.indexOf(h.source),f.originalLine=h.originalLine,f.originalColumn=h.originalColumn,h.name&&(f.name=n.indexOf(h.name)),i.push(f)),a.push(f)}return Me(r.__originalMappings,v.compareByOriginalPositions),r};N.prototype._version=3;Object.defineProperty(N.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function gn(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var Tt=v.compareByGeneratedPositionsDeflatedNoLine;function mn(s,e){let t=s.length,r=s.length-e;if(!(r<=1))if(r==2){let n=s[e],o=s[e+1];Tt(n,o)>0&&(s[e]=o,s[e+1]=n)}else if(r<20)for(let n=e;n<t;n++)for(let o=n;o>e;o--){let l=s[o-1],a=s[o];if(Tt(l,a)<=0)break;s[o-1]=a,s[o]=l}else Me(s,Tt,e)}N.prototype._parseMappings=function(e,t){var r=1,n=0,o=0,l=0,a=0,i=0,u=e.length,c=0,h={},f={},p=[],d=[],w,y,g,m,S;let C=0;for(;c<u;)if(e.charAt(c)===";")r++,c++,n=0,mn(d,C),C=d.length;else if(e.charAt(c)===",")c++;else{for(w=new gn,w.generatedLine=r,m=c;m<u&&!this._charIsMappingSeparator(e,m);m++);for(y=e.slice(c,m),g=[];c<m;)Io.decode(e,c,f),S=f.value,c=f.rest,g.push(S);if(g.length===2)throw new Error("Found a source, but no line and column");if(g.length===3)throw new Error("Found a source and line, but no column");if(w.generatedColumn=n+g[0],n=w.generatedColumn,g.length>1&&(w.source=a+g[1],a+=g[1],w.originalLine=o+g[2],o=w.originalLine,w.originalLine+=1,w.originalColumn=l+g[3],l=w.originalColumn,g.length>4&&(w.name=i+g[4],i+=g[4])),d.push(w),typeof w.originalLine=="number"){let b=w.source;for(;p.length<=b;)p.push(null);p[b]===null&&(p[b]=[]),p[b].push(w)}}mn(d,C),this.__generatedMappings=d;for(var x=0;x<p.length;x++)p[x]!=null&&Me(p[x],v.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...p)};N.prototype._findMapping=function(e,t,r,n,o,l){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return Dt.search(e,t,o,l)};N.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}};N.prototype.originalPositionFor=function(e){var t={generatedLine:v.getArg(e,"line"),generatedColumn:v.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",v.compareByGeneratedPositionsDeflated,v.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(r>=0){var n=this._generatedMappings[r];if(n.generatedLine===t.generatedLine){var o=v.getArg(n,"source",null);o!==null&&(o=this._sources.at(o),o=v.computeSourceURL(this.sourceRoot,o,this._sourceMapURL));var l=v.getArg(n,"name",null);return l!==null&&(l=this._names.at(l)),{source:o,line:v.getArg(n,"originalLine",null),column:v.getArg(n,"originalColumn",null),name:l}}}return{source:null,line:null,column:null,name:null}};N.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};N.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var n=e;this.sourceRoot!=null&&(n=v.relative(this.sourceRoot,n));var o;if(this.sourceRoot!=null&&(o=v.urlParse(this.sourceRoot))){var l=n.replace(/^file:\/\//,"");if(o.scheme=="file"&&this._sources.has(l))return this.sourcesContent[this._sources.indexOf(l)];if((!o.path||o.path=="/")&&this._sources.has("/"+n))return this.sourcesContent[this._sources.indexOf("/"+n)]}if(t)return null;throw new Error('"'+n+'" is not in the SourceMap.')};N.prototype.generatedPositionFor=function(e){var t=v.getArg(e,"source");if(t=this._findSourceIndex(t),t<0)return{line:null,column:null,lastColumn:null};var r={source:t,originalLine:v.getArg(e,"line"),originalColumn:v.getArg(e,"column")},n=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",v.compareByOriginalPositions,v.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(n>=0){var o=this._originalMappings[n];if(o.source===r.source)return{line:v.getArg(o,"generatedLine",null),column:v.getArg(o,"generatedColumn",null),lastColumn:v.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};Je.BasicSourceMapConsumer=N;function F(s,e){var t=s;typeof s=="string"&&(t=v.parseSourceMapInput(s));var r=v.getArg(t,"version"),n=v.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new ce,this._names=new ce;var o={line:-1,column:0};this._sections=n.map(function(l){if(l.url)throw new Error("Support for url field in sections not implemented.");var a=v.getArg(l,"offset"),i=v.getArg(a,"line"),u=v.getArg(a,"column");if(i<o.line||i===o.line&&u<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=a,{generatedOffset:{generatedLine:i+1,generatedColumn:u+1},consumer:new $(v.getArg(l,"map"),e)}})}F.prototype=Object.create($.prototype);F.prototype.constructor=$;F.prototype._version=3;Object.defineProperty(F.prototype,"sources",{get:function(){for(var s=[],e=0;e<this._sections.length;e++)for(var t=0;t<this._sections[e].consumer.sources.length;t++)s.push(this._sections[e].consumer.sources[t]);return s}});F.prototype.originalPositionFor=function(e){var t={generatedLine:v.getArg(e,"line"),generatedColumn:v.getArg(e,"column")},r=Dt.search(t,this._sections,function(o,l){var a=o.generatedLine-l.generatedOffset.generatedLine;return a||o.generatedColumn-l.generatedOffset.generatedColumn}),n=this._sections[r];return n?n.consumer.originalPositionFor({line:t.generatedLine-(n.generatedOffset.generatedLine-1),column:t.generatedColumn-(n.generatedOffset.generatedLine===t.generatedLine?n.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};F.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};F.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r],o=n.consumer.sourceContentFor(e,!0);if(o||o==="")return o}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')};F.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(r.consumer._findSourceIndex(v.getArg(e,"source"))!==-1){var n=r.consumer.generatedPositionFor(e);if(n){var o={line:n.line+(r.generatedOffset.generatedLine-1),column:n.column+(r.generatedOffset.generatedLine===n.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}};F.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var n=this._sections[r],o=n.consumer._generatedMappings,l=0;l<o.length;l++){var a=o[l],i=n.consumer._sources.at(a.source);i!==null&&(i=v.computeSourceURL(n.consumer.sourceRoot,i,this._sourceMapURL)),this._sources.add(i),i=this._sources.indexOf(i);var u=null;a.name&&(u=n.consumer._names.at(a.name),this._names.add(u),u=this._names.indexOf(u));var c={source:i,generatedLine:a.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(n.generatedOffset.generatedLine===a.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:u};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}Me(this.__generatedMappings,v.compareByGeneratedPositionsDeflated),Me(this.__originalMappings,v.compareByOriginalPositions)};Je.IndexedSourceMapConsumer=F});var vn=_(wn=>{var No=Nt().SourceMapGenerator,Ye=ae(),qo=/(\r?\n)/,To=10,ue="$$$isSourceNode$$$";function D(s,e,t,r,n){this.children=[],this.sourceContents={},this.line=s??null,this.column=e??null,this.source=t??null,this.name=n??null,this[ue]=!0,r!=null&&this.add(r)}D.fromStringWithSourceMap=function(e,t,r){var n=new D,o=e.split(qo),l=0,a=function(){var f=d(),p=d()||"";return f+p;function d(){return l<o.length?o[l++]:void 0}},i=1,u=0,c=null;return t.eachMapping(function(f){if(c!==null)if(i<f.generatedLine)h(c,a()),i++,u=0;else{var p=o[l]||"",d=p.substr(0,f.generatedColumn-u);o[l]=p.substr(f.generatedColumn-u),u=f.generatedColumn,h(c,d),c=f;return}for(;i<f.generatedLine;)n.add(a()),i++;if(u<f.generatedColumn){var p=o[l]||"";n.add(p.substr(0,f.generatedColumn)),o[l]=p.substr(f.generatedColumn),u=f.generatedColumn}c=f},this),l<o.length&&(c&&h(c,a()),n.add(o.splice(l).join(""))),t.sources.forEach(function(f){var p=t.sourceContentFor(f);p!=null&&(r!=null&&(f=Ye.join(r,f)),n.setSourceContent(f,p))}),n;function h(f,p){if(f===null||f.source===void 0)n.add(p);else{var d=r?Ye.join(r,f.source):f.source;n.add(new D(f.originalLine,f.originalColumn,d,p,f.name))}}};D.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(t){this.add(t)},this);else if(e[ue]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};D.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[ue]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};D.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)t=this.children[r],t[ue]?t.walk(e):t!==""&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})};D.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this};D.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[ue]?r.replaceRight(e,t):typeof r=="string"?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this};D.prototype.setSourceContent=function(e,t){this.sourceContents[Ye.toSetString(e)]=t};D.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][ue]&&this.children[t].walkSourceContents(e);for(var n=Object.keys(this.sourceContents),t=0,r=n.length;t<r;t++)e(Ye.fromSetString(n[t]),this.sourceContents[n[t]])};D.prototype.toString=function(){var e="";return this.walk(function(t){e+=t}),e};D.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new No(e),n=!1,o=null,l=null,a=null,i=null;return this.walk(function(u,c){t.code+=u,c.source!==null&&c.line!==null&&c.column!==null?((o!==c.source||l!==c.line||a!==c.column||i!==c.name)&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name}),o=c.source,l=c.line,a=c.column,i=c.name,n=!0):n&&(r.addMapping({generated:{line:t.line,column:t.column}}),o=null,n=!1);for(var h=0,f=u.length;h<f;h++)u.charCodeAt(h)===To?(t.line++,t.column=0,h+1===f?(o=null,n=!1):n&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name})):t.column++}),this.walkSourceContents(function(u,c){r.setSourceContent(u,c)}),{code:t.code,map:r}};wn.SourceNode=D});var Ze=_(Xe=>{Xe.SourceMapGenerator=Nt().SourceMapGenerator;Xe.SourceMapConsumer=yn().SourceMapConsumer;Xe.SourceNode=vn().SourceNode});var Ut=_((jl,Sn)=>{"use strict";var{existsSync:Do,readFileSync:Bo}=require("fs"),{dirname:Bt,join:Uo}=require("path"),{SourceMapConsumer:bn,SourceMapGenerator:xn}=Ze();function zo(s){return Buffer?Buffer.from(s,"base64").toString():window.atob(s)}var $e=class{constructor(e,t){if(t.map===!1)return;t.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:");let r=t.map?t.map.prev:void 0,n=this.loadMap(t.from,r);!this.mapFile&&t.from&&(this.mapFile=t.from),this.mapFile&&(this.root=Bt(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new bn(this.json||this.text)),this.consumerCache}decodeInline(e){let t=/^data:application\/json;charset=utf-?8;base64,/,r=/^data:application\/json;base64,/,n=/^data:application\/json;charset=utf-?8,/,o=/^data:application\/json,/,l=e.match(n)||e.match(o);if(l)return decodeURIComponent(e.substr(l[0].length));let a=e.match(t)||e.match(r);if(a)return zo(e.substr(a[0].length));let i=e.slice(22);throw i=i.slice(0,i.indexOf(",")),new Error("Unsupported source map encoding "+i)}getAnnotationURL(e){return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){return typeof e!="object"?!1:typeof e.mappings=="string"||typeof e._mappings=="string"||Array.isArray(e.sections)}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return;let r=e.lastIndexOf(t.pop()),n=e.indexOf("*/",r);r>-1&&n>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,n)))}loadFile(e,t,r){if(!(!r&&!this.unsafeMap&&!/\.map$/i.test(e))&&(this.root=Bt(e),Do(e)))return this.mapFile=e,Bo(e,"utf-8").toString().trim()}loadMap(e,t){if(t===!1)return!1;if(t){if(typeof t=="string")return t;if(typeof t=="function"){let r=t(e);if(r){let n=this.loadFile(r,e,!0);if(!n)throw new Error("Unable to load previous source map: "+r.toString());return n}}else{if(t instanceof bn)return xn.fromSourceMap(t).toString();if(t instanceof xn)return t.toString();if(this.isMap(t))return JSON.stringify(t);throw new Error("Unsupported previous source map format: "+t.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;e&&(r=Uo(Bt(e),r));let n=this.loadFile(r,e,!1);if(n)try{this.json=JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}catch{return}return n}}}startWith(e,t){return e?e.substr(0,t.length)===t:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};Sn.exports=$e;$e.default=$e});var ke=_((Vl,An)=>{"use strict";var{nanoid:Fo}=Kr(),{isAbsolute:jt,resolve:Vt}=require("path"),{SourceMapConsumer:jo,SourceMapGenerator:Vo}=Ze(),{fileURLToPath:Cn,pathToFileURL:et}=require("url"),_n=Ve(),Wo=Ut(),zt=bt(),Ft=Symbol("lineToIndexCache"),Go=!!(jo&&Vo),En=!!(Vt&&jt);function On(s){if(s[Ft])return s[Ft];let e=s.css.split(`
`),t=new Array(e.length),r=0;for(let n=0,o=e.length;n<o;n++)t[n]=r,r+=e[n].length+1;return s[Ft]=t,t}var fe=class{get from(){return this.file||this.id}constructor(e,t={}){if(e===null||typeof e>"u"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,t.document&&(this.document=t.document.toString()),t.from&&(!En||/^\w+:\/\//.test(t.from)||jt(t.from)?this.file=t.from:this.file=Vt(t.from)),En&&Go){let r=new Wo(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+Fo(6)+">"),this.map&&(this.map.file=this.from)}error(e,t,r,n={}){let o,l,a,i,u;if(t&&typeof t=="object"){let h=t,f=r;if(typeof h.offset=="number"){i=h.offset;let p=this.fromOffset(i);t=p.line,r=p.col}else t=h.line,r=h.column,i=this.fromLineAndColumn(t,r);if(typeof f.offset=="number"){a=f.offset;let p=this.fromOffset(a);l=p.line,o=p.col}else l=f.line,o=f.column,a=this.fromLineAndColumn(f.line,f.column)}else if(r)i=this.fromLineAndColumn(t,r);else{i=t;let h=this.fromOffset(i);t=h.line,r=h.col}let c=this.origin(t,r,l,o);return c?u=new _n(e,c.endLine===void 0?c.line:{column:c.column,line:c.line},c.endLine===void 0?c.column:{column:c.endColumn,line:c.endLine},c.source,c.file,n.plugin):u=new _n(e,l===void 0?t:{column:r,line:t},l===void 0?r:{column:o,line:l},this.css,this.file,n.plugin),u.input={column:r,endColumn:o,endLine:l,endOffset:a,line:t,offset:i,source:this.css},this.file&&(et&&(u.input.url=et(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(e,t){return On(this)[e-1]+t-1}fromOffset(e){let t=On(this),r=t[t.length-1],n=0;if(e>=r)n=t.length-1;else{let o=t.length-2,l;for(;n<o;)if(l=n+(o-n>>1),e<t[l])o=l-1;else if(e>=t[l+1])n=l+1;else{n=l;break}}return{col:e-t[n]+1,line:n+1}}mapResolve(e){return/^\w+:\/\//.test(e)?e:Vt(this.map.consumer().sourceRoot||this.map.root||".",e)}origin(e,t,r,n){if(!this.map)return!1;let o=this.map.consumer(),l=o.originalPositionFor({column:t,line:e});if(!l.source)return!1;let a;typeof r=="number"&&(a=o.originalPositionFor({column:n,line:r}));let i;jt(l.source)?i=et(l.source):i=new URL(l.source,this.map.consumer().sourceRoot||et(this.map.mapFile));let u={column:l.column,endColumn:a&&a.column,endLine:a&&a.line,line:l.line,url:i.toString()};if(i.protocol==="file:")if(Cn)u.file=Cn(i);else throw new Error("file: protocol is not available in this PostCSS build");let c=o.sourceContentFor(l.source);return c&&(u.source=c),u}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};An.exports=fe;fe.default=fe;zt&&zt.registerInput&&zt.registerInput(fe)});var he=_((Wl,kn)=>{"use strict";var Ln=J(),Mn,$n,Y=class extends Ln{constructor(e){super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let o of n)o.raws.before=t.raws.before}return n}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}toResult(e={}){return new Mn(new $n,this,e).stringify()}};Y.registerLazyResult=s=>{Mn=s};Y.registerProcessor=s=>{$n=s};kn.exports=Y;Y.default=Y;Ln.registerRoot(Y)});var Wt=_((Gl,Rn)=>{"use strict";var Re={comma(s){return Re.split(s,[","],!0)},space(s){let e=[" ",`
`,"	"];return Re.split(s,e)},split(s,e,t){let r=[],n="",o=!1,l=0,a=!1,i="",u=!1;for(let c of s)u?u=!1:c==="\\"?u=!0:a?c===i&&(a=!1):c==='"'||c==="'"?(a=!0,i=c):c==="("?l+=1:c===")"?l>0&&(l-=1):l===0&&e.includes(c)&&(o=!0),o?(n!==""&&r.push(n.trim()),n="",o=!1):n+=c;return(t||n!=="")&&r.push(n.trim()),r}};Rn.exports=Re;Re.default=Re});var tt=_((Kl,In)=>{"use strict";var Pn=J(),Ko=Wt(),pe=class extends Pn{get selectors(){return Ko.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}constructor(e){super(e),this.type="rule",this.nodes||(this.nodes=[])}};In.exports=pe;pe.default=pe;Pn.registerRule(pe)});var qn=_((Hl,Nn)=>{"use strict";var Ho=Ge(),Qo=_e(),Jo=Oe(),Yo=ke(),Xo=Ut(),Zo=he(),ei=tt();function Pe(s,e){if(Array.isArray(s))return s.map(n=>Pe(n));let{inputs:t,...r}=s;if(t){e=[];for(let n of t){let o={...n,__proto__:Yo.prototype};o.map&&(o.map={...o.map,__proto__:Xo.prototype}),e.push(o)}}if(r.nodes&&(r.nodes=s.nodes.map(n=>Pe(n,e))),r.source){let{inputId:n,...o}=r.source;r.source=o,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new Zo(r);if(r.type==="decl")return new Jo(r);if(r.type==="rule")return new ei(r);if(r.type==="comment")return new Qo(r);if(r.type==="atrule")return new Ho(r);throw new Error("Unknown node type: "+s.type)}Nn.exports=Pe;Pe.default=Pe});var Kt=_((Ql,Fn)=>{"use strict";var{dirname:rt,relative:Dn,resolve:Bn,sep:Un}=require("path"),{SourceMapConsumer:zn,SourceMapGenerator:nt}=Ze(),{pathToFileURL:Tn}=require("url"),ti=ke(),ri=!!(zn&&nt),ni=!!(rt&&Bn&&Dn&&Un),Gt=class{constructor(e,t,r,n){this.stringify=e,this.mapOpts=r.map||{},this.root=t,this.opts=r,this.css=n,this.originalCSS=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e;this.isInline()?e="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?e=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?e=this.mapOpts.annotation(this.opts.to,this.root):e=this.outputFile()+".map";let t=`
`;this.css.includes(`\r
`)&&(t=`\r
`),this.css+=t+"/*# sourceMappingURL="+e+" */"}applyPrevMaps(){for(let e of this.previous()){let t=this.toUrl(this.path(e.file)),r=e.root||rt(e.file),n;this.mapOpts.sourcesContent===!1?(n=new zn(e.text),n.sourcesContent&&(n.sourcesContent=null)):n=e.consumer(),this.map.applySourceMap(n,t,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let e;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],e.type==="comment"&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)}else if(this.css){let e;for(;(e=this.css.lastIndexOf("/*#"))!==-1;){let t=this.css.indexOf("*/",e+3);if(t===-1)break;for(;e>0&&this.css[e-1]===`
`;)e--;this.css=this.css.slice(0,e)+this.css.slice(t+2)}}}}generate(){if(this.clearAnnotation(),ni&&ri&&this.isMap())return this.generateMap();{let e="";return this.stringify(this.root,t=>{e+=t}),[e]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let e=this.previous()[0].consumer();e.file=this.outputFile(),this.map=nt.fromSourceMap(e,{ignoreInvalidMapping:!0})}else this.map=new nt({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new nt({file:this.outputFile(),ignoreInvalidMapping:!0});let e=1,t=1,r="<no source>",n={generated:{column:0,line:0},original:{column:0,line:0},source:""},o,l;this.stringify(this.root,(a,i,u)=>{if(this.css+=a,i&&u!=="end"&&(n.generated.line=e,n.generated.column=t-1,i.source&&i.source.start?(n.source=this.sourcePath(i),n.original.line=i.source.start.line,n.original.column=i.source.start.column-1,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,this.map.addMapping(n))),l=a.match(/\n/g),l?(e+=l.length,o=a.lastIndexOf(`
`),t=a.length-o):t+=a.length,i&&u!=="start"){let c=i.parent||{raws:{}};(!(i.type==="decl"||i.type==="atrule"&&!i.nodes)||i!==c.last||c.raws.semicolon)&&(i.source&&i.source.end?(n.source=this.sourcePath(i),n.original.line=i.source.end.line,n.original.column=i.source.end.column-1,n.generated.line=e,n.generated.column=t-2,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,n.generated.line=e,n.generated.column=t-1,this.map.addMapping(n)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(e=>e.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let e=this.mapOpts.annotation;return typeof e<"u"&&e!==!0?!1:this.previous().length?this.previous().some(t=>t.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(e=>e.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(e){if(this.mapOpts.absolute||e.charCodeAt(0)===60||/^\w+:\/\//.test(e))return e;let t=this.memoizedPaths.get(e);if(t)return t;let r=this.opts.to?rt(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=rt(Bn(r,this.mapOpts.annotation)));let n=Dn(r,e);return this.memoizedPaths.set(e,n),n}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(e=>{if(e.source&&e.source.input.map){let t=e.source.input.map;this.previousMaps.includes(t)||this.previousMaps.push(t)}});else{let e=new ti(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}return this.previousMaps}setSourcesContent(){let e={};if(this.root)this.root.walk(t=>{if(t.source){let r=t.source.input.from;if(r&&!e[r]){e[r]=!0;let n=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(n,t.source.input.css)}}});else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}sourcePath(e){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))}toBase64(e){return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(Tn){let r=Tn(e).toString();return this.memoizedFileURLs.set(e,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t;Un==="\\"&&(e=e.replace(/\\/g,"/"));let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(e,r),r}};Fn.exports=Gt});var Gn=_((Jl,Wn)=>{"use strict";var si=Ge(),oi=_e(),ii=Oe(),li=he(),jn=tt(),ai=vt(),Vn={empty:!0,space:!0};function ci(s){for(let e=s.length-1;e>=0;e--){let t=s[e],r=t[3]||t[2];if(r)return r}}function Ht(s,e,t){let r="";for(let n=e;n<t;n++)r+=s[n][1];return r}var Qt=class{constructor(e){this.input=e,this.root=new li,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0}}}atrule(e){let t=new si;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,o,l=!1,a=!1,i=[],u=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),t.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){a=!0;break}else if(r==="}"){if(i.length>0){for(o=i.length-1,n=i[o];n&&n[0]==="space";)n=i[--o];n&&(t.source.end=this.getPosition(n[3]||n[2]),t.source.end.offset++)}this.end(e);break}else i.push(e);else i.push(e);if(this.tokenizer.endOfFile()){l=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(i),i.length?(t.raws.afterName=this.spacesAndCommentsFromStart(i),this.raw(t,"params",i),l&&(e=i[i.length-1],t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++,this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),a&&(t.nodes=[],this.current=t)}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let o=t-1;o>=0&&(n=e[o],!(n[0]!=="space"&&(r+=1,r===2)));o--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}colon(e){let t=0,r,n,o;for(let[l,a]of e.entries()){if(n=a,o=n[0],o==="("&&(t+=1),o===")"&&(t-=1),t===0&&o===":")if(!r)this.doubleColon(n);else{if(r[0]==="word"&&r[1]==="progid")continue;return l}r=n}return!1}comment(e){let t=new oi;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++;let r=e[1].slice(2,-2);if(!r.trim())t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}createTokenizer(){this.tokenizer=ai(this.input)}decl(e,t){let r=new ii;this.init(r,e[0][2]);let n=e[e.length-1];n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||ci(e)),r.source.end.offset++;let o=0;for(;e[o][0]!=="word";)o===e.length-1&&this.unknownWord([e[o]]),o++;r.raws.before+=Ht(e,0,o),r.source.start=this.getPosition(e[o][2]);let l=o;for(;o<e.length;){let f=e[o][0];if(f===":"||f==="space"||f==="comment")break;o++}r.prop=Ht(e,l,o);let a=o,i;for(;o<e.length&&(i=e[o],o++,i[0]!==":");)i[0]==="word"&&/\w/.test(i[1])&&this.unknownWord([i]);r.raws.between=Ht(e,a,o),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=o;for(;o<e.length;){let f=e[o][0];if(f!=="space"&&f!=="comment")break;o++}let c=e.slice(u,o);e=e.slice(o),this.precheckMissedSemicolon(e);for(let f=e.length-1;f>=0;f--){if(i=e[f],i[1].toLowerCase()==="!important"){r.important=!0;let p=this.stringFrom(e,f);p=this.spacesFromEnd(e)+p,p!==" !important"&&(r.raws.important=p);break}else if(i[1].toLowerCase()==="important"){let p=e.slice(0),d="";for(let w=f;w>0;w--){let y=p[w][0];if(d.trim().startsWith("!")&&y!=="space")break;d=p.pop()[1]+d}d.trim().startsWith("!")&&(r.important=!0,r.raws.important=d,e=p)}if(i[0]!=="space"&&i[0]!=="comment")break}e.some(f=>f[0]!=="space"&&f[0]!=="comment")&&(r.raws.between+=c.map(f=>f[1]).join(""),c=[]),this.raw(r,"value",c.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}emptyRule(e){let t=new jn;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="",t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,start:this.getPosition(t)},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}other(e){let t=!1,r=null,n=!1,o=null,l=[],a=e[1].startsWith("--"),i=[],u=e;for(;u;){if(r=u[0],i.push(u),r==="("||r==="[")o||(o=u),l.push(r==="("?")":"]");else if(a&&n&&r==="{")o||(o=u),l.push("}");else if(l.length===0)if(r===";")if(n){this.decl(i,a);return}else break;else if(r==="{"){this.rule(i);return}else if(r==="}"){this.tokenizer.back(i.pop()),t=!0;break}else r===":"&&(n=!0);else r===l[l.length-1]&&(l.pop(),l.length===0&&(o=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),l.length>0&&this.unclosedBracket(o),t&&n){if(!a)for(;i.length&&(u=i[i.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(i.pop());this.decl(i,a)}else this.unknownWord(i)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,n){let o,l,a=r.length,i="",u=!0,c,h;for(let f=0;f<a;f+=1)o=r[f],l=o[0],l==="space"&&f===a-1&&!n?u=!1:l==="comment"?(h=r[f-1]?r[f-1][0]:"empty",c=r[f+1]?r[f+1][0]:"empty",!Vn[h]&&!Vn[c]?i.slice(-1)===","?u=!1:i+=o[1]:u=!1):i+=o[1];if(!u){let f=r.reduce((p,d)=>p+d[1],"");e.raws[t]={raw:f,value:i}}e[t]=i}rule(e){e.pop();let t=new jn;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}};Wn.exports=Qt});var ot=_((Yl,Kn)=>{"use strict";var ui=J(),fi=ke(),hi=Gn();function st(s,e){let t=new fi(s,e),r=new hi(t);try{r.parse()}catch(n){throw process.env.NODE_ENV!=="production"&&n.name==="CssSyntaxError"&&e&&e.from&&(/\.scss$/i.test(e.from)?n.message+=`
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser`:/\.sass/i.test(e.from)?n.message+=`
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser`:/\.less$/i.test(e.from)&&(n.message+=`
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)),n}return r.root}Kn.exports=st;st.default=st;ui.registerParse(st)});var Jt=_((Xl,Hn)=>{"use strict";var Ie=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Hn.exports=Ie;Ie.default=Ie});var it=_((Zl,Qn)=>{"use strict";var pi=Jt(),Ne=class{get content(){return this.css}constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new pi(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}};Qn.exports=Ne;Ne.default=Ne});var Yt=_((ea,Yn)=>{"use strict";var Jn={};Yn.exports=function(e){Jn[e]||(Jn[e]=!0,typeof console<"u"&&console.warn&&console.warn(e))}});var er=_((ta,ts)=>{"use strict";var di=J(),mi=Ke(),gi=Kt(),yi=ot(),Xn=it(),wi=he(),vi=ve(),{isClean:j,my:bi}=We(),xi=Yt(),Si={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},Ci={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},_i={Once:!0,postcssPlugin:!0,prepare:!0},de=0;function qe(s){return typeof s=="object"&&typeof s.then=="function"}function es(s){let e=!1,t=Si[s.type];return s.type==="decl"?e=s.prop.toLowerCase():s.type==="atrule"&&(e=s.name.toLowerCase()),e&&s.append?[t,t+"-"+e,de,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:s.append?[t,de,t+"Exit"]:[t,t+"Exit"]}function Zn(s){let e;return s.type==="document"?e=["Document",de,"DocumentExit"]:s.type==="root"?e=["Root",de,"RootExit"]:e=es(s),{eventIndex:0,events:e,iterator:0,node:s,visitorIndex:0,visitors:[]}}function Xt(s){return s[j]=!1,s.nodes&&s.nodes.forEach(e=>Xt(e)),s}var Zt={},X=class s{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Xt(t);else if(t instanceof s||t instanceof Xn)n=Xt(t.root),t.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let o=yi;r.syntax&&(o=r.syntax.parse),r.parser&&(o=r.parser),o.parse&&(o=o.parse);try{n=o(t,r)}catch(l){this.processed=!0,this.error=l}n&&!n[bi]&&di.rebuild(n)}this.result=new Xn(e,n,r),this.helpers={...Zt,postcss:Zt,result:this.result},this.plugins=this.processor.plugins.map(o=>typeof o=="object"&&o.prepare?{...o,...o.prepare(this.result)}:o)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{if(t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin)e.plugin=r.postcssPlugin,e.setMessage();else if(r.postcssVersion&&process.env.NODE_ENV!=="production"){let n=r.postcssPlugin,o=r.postcssVersion,l=this.result.processor.version,a=o.split("."),i=l.split(".");(a[0]!==i[0]||parseInt(a[1])>parseInt(i[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+l+", but "+n+" uses "+o+". Perhaps this is the source of the error below.")}}catch(n){console&&console.error&&console.error(n)}return e}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!Ci[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!_i[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(qe(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[j];){e[j]=!0;let t=[Zn(e)];for(;t.length>0;){let r=this.visitTick(t);if(qe(r))try{await r}catch(n){let o=t[t.length-1].node;throw this.handleError(n,o)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(o=>r(o,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return qe(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=vi;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let r=this.result.root.source;if(e.map===void 0&&!(r&&r.input&&r.input.map)){let l="";return t(this.result.root,a=>{l+=a}),this.result.css=l,this.result}let o=new gi(t,this.result.root,this.result.opts).generate();return this.result.css=o[0],this.result.map=o[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(qe(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[j];)e[j]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this.opts||xi("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this.css}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let o;try{o=n(t,this.helpers)}catch(l){throw this.handleError(l,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(qe(o))throw this.getAsyncError()}}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[l,a]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=l;try{return a(r.toProxy(),this.helpers)}catch(i){throw this.handleError(i,r)}}if(t.iterator!==0){let l=t.iterator,a;for(;a=r.nodes[r.indexes[l]];)if(r.indexes[l]+=1,!a[j]){a[j]=!0,e.push(Zn(a));return}t.iterator=0,delete r.indexes[l]}let o=t.events;for(;t.eventIndex<o.length;){let l=o[t.eventIndex];if(t.eventIndex+=1,l===de){r.nodes&&r.nodes.length&&(r[j]=!0,t.iterator=r.getIterator());return}else if(this.listeners[l]){t.visitors=this.listeners[l];return}}e.pop()}walkSync(e){e[j]=!0;let t=es(e);for(let r of t)if(r===de)e.nodes&&e.each(n=>{n[j]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}warnings(){return this.sync().warnings()}};X.registerPostcss=s=>{Zt=s};ts.exports=X;X.default=X;wi.registerLazyResult(X);mi.registerLazyResult(X)});var ns=_((ra,rs)=>{"use strict";var Ei=Kt(),Oi=ot(),Ai=it(),Li=ve(),Mi=Yt(),Te=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let e,t=Oi;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n=Li;this.result=new Ai(this._processor,void 0,this._opts),this.result.css=t;let o=this;Object.defineProperty(this.result,"root",{get(){return o.root}});let l=new Ei(n,void 0,this._opts,t);if(l.isMap()){let[a,i]=l.generate();a&&(this.result.css=a),i&&(this.result.map=i)}else l.clearAnnotation(),this.result.css=l.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}sync(){if(this.error)throw this.error;return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this._opts||Mi("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this._css}warnings(){return[]}};rs.exports=Te;Te.default=Te});var os=_((na,ss)=>{"use strict";var $i=Ke(),ki=er(),Ri=ns(),Pi=he(),re=class{constructor(e=[]){this.version="8.5.15",this.plugins=this.normalize(e)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(typeof r=="object"&&(r.parse||r.stringify)){if(process.env.NODE_ENV!=="production")throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}else throw new Error(r+" is not a PostCSS plugin");return t}process(e,t={}){return!this.plugins.length&&!t.parser&&!t.stringifier&&!t.syntax?new Ri(this,e,t):new ki(this,e,t)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}};ss.exports=re;re.default=re;Pi.registerProcessor(re);$i.registerProcessor(re)});var ps=_((sa,hs)=>{"use strict";var is=Ge(),ls=_e(),Ii=J(),Ni=Ve(),as=Oe(),cs=Ke(),qi=qn(),Ti=ke(),Di=er(),Bi=Wt(),Ui=Se(),zi=ot(),tr=os(),Fi=it(),us=he(),fs=tt(),ji=ve(),Vi=Jt();function L(...s){return s.length===1&&Array.isArray(s[0])&&(s=s[0]),new tr(s)}L.plugin=function(e,t){let r=!1;function n(...l){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let a=t(...l);return a.postcssPlugin=e,a.postcssVersion=new tr().version,a}let o;return Object.defineProperty(n,"postcss",{get(){return o||(o=n()),o}}),n.process=function(l,a,i){return L([n(i)]).process(l,a)},n};L.stringify=ji;L.parse=zi;L.fromJSON=qi;L.list=Bi;L.comment=s=>new ls(s);L.atRule=s=>new is(s);L.decl=s=>new as(s);L.rule=s=>new fs(s);L.root=s=>new us(s);L.document=s=>new cs(s);L.CssSyntaxError=Ni;L.Declaration=as;L.Container=Ii;L.Processor=tr;L.Document=cs;L.Comment=ls;L.Warning=Vi;L.AtRule=is;L.Result=Fi;L.Input=Ti;L.Rule=fs;L.Root=us;L.Node=Ui;Di.registerPostcss(L);hs.exports=L;L.default=L});var As=require("node:fs"),Ls=require("node:util");var M=js(ps(),1),rr=M.default,oa=M.default.stringify,ia=M.default.fromJSON,la=M.default.plugin,aa=M.default.parse,ca=M.default.list,ua=M.default.document,fa=M.default.comment,ha=M.default.atRule,pa=M.default.rule,da=M.default.decl,ma=M.default.root,ga=M.default.CssSyntaxError,ya=M.default.Declaration,wa=M.default.Container,va=M.default.Processor,ba=M.default.Document,xa=M.default.Comment,Sa=M.default.Warning,Ca=M.default.AtRule,_a=M.default.Result,Ea=M.default.Input,Oa=M.default.Rule,Aa=M.default.Root,La=M.default.Node;function De(s){return s.trim().replace(/\s+/g," ").replace(/\s*([>+~])\s*/g," $1 ").trim()}function lt(s){let e=[],t=s.replace(/url\((?:[^)"'\\]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)/gi,a=>(e.push(a),"\0"+(e.length-1)+"\0")),r="",n=0;for(;n<t.length;){if(t[n]!=="s"&&t[n]!=="S"){r+=t[n++];continue}let a=t.slice(n).match(/^selector\s*\(/i);if(a){let i=1,u=n+a[0].length,c=null,h=0;for(;u<t.length&&i>0;){let f=t[u];c?f===c&&(c=null):f==='"'||f==="'"?c=f:f==="["?h++:f==="]"?h>0&&h--:h===0&&f==="("?i++:h===0&&f===")"&&i--,u++}e.push(t.slice(n,u)),r+="\0"+(e.length-1)+"\0",n=u}else r+=t[n++]}t=r;{let a="",i=0;for(;i<t.length;)if(t[i]==="("){let u=t.slice(i+1).match(/^\s*[\w-]+\s*:/);if(u){let c=i+1+u[0].length,h=1,f=c,p=null;for(;f<t.length&&h>0;){let w=t[f];p?w===p&&(p=null):w==='"'||w==="'"?p=w:w==="("?h++:w===")"&&h--,f++}let d=t.slice(c,f-1).trimStart();/\b(?:not|only)\s*\(/i.test(d)?(e.push(d),a+=t.slice(i,c)+"\0"+(e.length-1)+"\0",i=f-1):a+=t[i++]}else a+=t[i++]}else a+=t[i++];t=a}let l=t.trim().replace(/\s*:\s*/g,": ").replace(/\s+/g," ").replace(/\b(not|only)\s*\(/gi,"$1 (").replace(/\)\s*(and|or|not|only)\s*\(/gi,") $1 (").trim().replace(/\s+/g," ");for(;/\x00\d+\x00/.test(l);)l=l.replace(/\x00(\d+)\x00/g,(a,i)=>e[+i]);return l}function at(s){return s.trim()}function Wi(s){let e=s.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function ct(s){let e=s.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(t,r,n,o)=>r==="-"?` - 0.${o}`:`${r}${n}0.${o}`),e=e.replace(/([%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,t=>Wi(t)),e}function ut(s){let e=De(s);return e=e.replace(/\[([^\]]*)\]/g,(t,r)=>{let n=r.replace(/\s*([~|^$*]?)\s*=\s*/g,"$1=");return n=n.replace(/(['"])(.*?)\1/g,"$2"),"["+n.trim()+"]"}),e}function Gi(s){let e={};for(let o of s){let l=o.prop.toLowerCase();(l==="font-family"||l==="font-weight"||l==="font-style")&&(e[l]=at(o.value).replace(/['"]/g,""))}let t=(e["font-family"]||"unknown").toLowerCase(),r=(e["font-weight"]||"normal").toLowerCase(),n=(e["font-style"]||"normal").toLowerCase();return`${t}/${r}/${n}`}function Ki(s,e){return`@keyframes ${e.trim()}`}var nr=new Set(["media","supports","container"]);function ds(s,e,t){if(!t)return s;let r=new Map;for(let[o,l]of s)r.set(o,l.slice());let n=r.get(e);return n?n.push(t):r.set(e,[t]),r}function Be(s){let e=[];for(let t of nr){let r=s.get(t);r&&r.length&&e.push(`@${t} ${r.join(" and ")}`)}return e.length?e.join(" and "):"base"}function Hi(s,e,t,r){let n=s==null?null:t.get(s)??null,o=n!=null;return e?r+1+(o?r-n:0):o?n:r}function ft(s,e={}){let t=new Map,r=0;function n(f){return t.has(f)||t.set(f,new Map),t.get(f)}function o(f,p){n(f).set(p,r++)}let l=e.semanticSelectors?ut:De;function a(f,p){for(let d of f.selectors.map(w=>l(w)))o(p,d)}function i(f,p){let d=f.name.toLowerCase();if(nr.has(d)){let w=ds(p,d,lt(f.params)),y=Be(w);f.each(g=>{g.type==="rule"?a(g,y):g.type==="atrule"&&i(g,w)})}else if(!(d==="font-face"||d==="keyframes"||d==="-webkit-keyframes"||d==="charset"||d==="import"||d==="namespace")){if(f.nodes){let w=Be(p);f.each(y=>{y.type==="rule"?a(y,w):y.type==="atrule"&&i(y,p)})}}}let u=rr.parse(s,{from:void 0}),c=new Map;u.each(f=>{f.type==="rule"?a(f,"base"):f.type==="atrule"&&i(f,c)});let h=new Map;for(let[f,p]of t)h.set(f,[...p.entries()].sort((d,w)=>d[1]-w[1]).map(d=>d[0]));return h}function V(s,e={}){let t=new Map;function r(g){return t.has(g)||t.set(g,[]),t.get(g)}let n=[],o=new Set,l=0;function a(g){o.has(g)||(o.add(g),n.push(g))}function i(g,m){return g?`${g}.${m}`:m}function u(g,m,S,C){r(g).push({selector:m,prop:S.prop.toLowerCase(),value:at(S.value),important:S.important||!1,layer:C})}let c=e.semanticSelectors?ut:De;function h(g,m,S){let C=g.selectors.map(x=>c(x));for(let x of C)g.each(b=>{b.type==="decl"&&u(m,x,b,S)})}function f(g,m,S){let C=g.name.toLowerCase();if(nr.has(C)){let x=ds(m,C,lt(g.params)),b=Be(x);g.each(O=>{O.type==="rule"?h(O,b,S):O.type==="atrule"&&f(O,x,S)})}else if(C==="layer"){let x=g.params.trim();if(g.nodes){let b=x?i(S,x):i(S,`__anon${l++}`);a(b);let O=Be(m);g.each(A=>{A.type==="rule"?h(A,O,b):A.type==="atrule"&&f(A,m,b)})}else for(let b of x.split(",")){let O=b.trim();O&&a(i(S,O))}}else if(C==="font-face"){let x="@font-face",b=[];g.each(A=>{A.type==="decl"&&b.push(A)});let O=Gi(b);for(let A of b)u(x,O,A,S)}else if(C==="keyframes"||C==="-webkit-keyframes"){let x=Ki(C,g.params);g.each(b=>{if(b.type==="rule"){let O=b.selectors.map(A=>A.trim()).join(", ");b.each(A=>{A.type==="decl"&&u(x,O,A,S)})}})}else if(!(C==="charset"||C==="import"||C==="namespace")){if(g.nodes){let x=Be(m);g.each(b=>{b.type==="rule"?h(b,x,S):b.type==="atrule"&&f(b,m,S)})}}}let p=rr.parse(s,{from:void 0}),d=new Map;p.each(g=>{g.type==="rule"?h(g,"base",null):g.type==="atrule"&&f(g,d,null)});let w=new Map;n.forEach((g,m)=>w.set(g,m));let y=n.length;for(let g of t.values())for(let m of g)m.layerRank=Hi(m.layer,m.important,w,y),delete m.layer;return t}function ne(s){let e=new Map;for(let[t,r]of s){e.has(t)||e.set(t,new Map);let n=e.get(t),o=new Map;for(let{selector:l,prop:a,value:i,important:u,layerRank:c}of r){let h=c??(u?1:0);n.has(l)||(n.set(l,new Map),o.set(l,new Map));let f=n.get(l),p=o.get(l),d=p.get(a);(d===void 0||h>=d)&&(f.set(a,{value:i,important:u}),p.set(a,h))}}return e}function sr(s,e,t={}){let r=new Map,n=new Set([...s.keys(),...e.keys()]),o=["base",...[...n].filter(l=>l!=="base").sort()];for(let l of o){if(!n.has(l))continue;let a=s.get(l)||new Map,i=e.get(l)||new Map,u=new Set([...a.keys(),...i.keys()]),c=new Map,h=0;for(let p of[...u].sort()){let d=a.get(p)||new Map,w=i.get(p)||new Map,y=new Set([...d.keys(),...w.keys()]),g=new Map,m=0;for(let C of[...y].sort()){let x=d.get(C),b=w.get(C),O;!x&&b?(O={status:"added",newValue:b.value,newImportant:b.important},m++):x&&!b?(O={status:"removed",oldValue:x.value,oldImportant:x.important},m++):(t.ignoreCosmetic?ct(x.value)!==ct(b.value):x.value!==b.value)||x.important!==b.important?(O={status:"changed",oldValue:x.value,oldImportant:x.important,newValue:b.value,newImportant:b.important},m++):O={status:"unchanged",value:b.value,important:b.important},g.set(C,O)}let S;a.has(p)?i.has(p)?m>0?S="changed":S="unchanged":S="removed":S="added",c.set(p,{status:S,changeCount:m,props:g}),h+=m}let f;s.has(l)?e.has(l)?h>0?f="changed":f="unchanged":f="removed":f="added",r.set(l,{status:f,changeCount:h,selectors:c})}return r}function or([s,e,t],[r,n,o]){return s>r||s===r&&e>n||s===r&&e===n&&t>o}function ir(s,e){return or(s,e)?1:or(e,s)?-1:0}function Qi(s){let e=[],t=0,r=0,n=0,o=null;for(let a=0;a<s.length;a++){let i=s[a];o?i===o&&(o=null):i==='"'||i==="'"?o=i:i==="("?t++:i===")"?t>0&&t--:i==="["?r++:i==="]"?r>0&&r--:i===","&&t===0&&r===0&&(e.push(s.slice(n,a).trim()),n=a+1)}let l=s.slice(n).trim();return l&&e.push(l),e}function Ji(s,e){let t=1,r=0,n=e,o=null;for(;n<s.length&&t>0;){let l=s[n];o?l===o&&(o=null):l==='"'||l==="'"?o=l:l==="["?r++:l==="]"?r>0&&r--:r===0&&l==="("?t++:r===0&&l===")"&&t--,n++}return t===0?n:null}function ms(s,e,t){let r=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");r.lastIndex=0;let n="",o=0,l;for(;(l=r.exec(s))!==null;){let a=l.index+l[0].length,i=Ji(s,a);if(n+=s.slice(o,l.index),i===null){n+=s.slice(a),o=s.length;break}t(s,a,i,l),o=i,r.lastIndex=o}return n+s.slice(o)}function se(s,e=0){if(e>100)return[0,0,0];let t=0,r=0,n=0,o=s.replace(/\\./g,"x"),l=i=>{let u=[0,0,0];for(let c of Qi(i)){let h=se(c,e+1);or(h,u)&&(u=h)}t+=u[0],r+=u[1],n+=u[2]};o=ms(o,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(i,u,c,h)=>{let f=h.groups.name.toLowerCase(),p=i.slice(u,c-1).trim();if(f==="nth-child"||f==="nth-last-child"){let d=p.match(/\sof\b/i);d&&l(p.slice(d.index+d[0].length).trim()),r++}else f==="where"||(l(p),(f==="host"||f==="host-context")&&r++)}),o=ms(o,/::(?:slotted|cue)\s*\(/gi,(i,u,c)=>{l(i.slice(u,c-1).trim()),n++}),o=o.replace(/::[\w-]+(\([^)]*\))?/g,()=>(n++,"")),o=o.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(n++,"")),o=o.replace(/\[[^\]]*\]/g,()=>(r++,"")),o=o.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(r++,"")),o=o.replace(/#[\w-]+/g,()=>(t++,"")),o=o.replace(/\.[\w-]+/g,()=>(r++,"")),o=o.replace(/\|\|/g," ").replace(/[>+~]/g," "),o=o.replace(/(?:[\w-]+|\*)?\|/g,"");let a=o.split(/\s+/).filter(i=>i&&i!=="*"&&/^[a-zA-Z][\w-]*/.test(i));return n+=a.length,[t,r,n]}function lr(s,e){let[t,r,n]=se(s),[o,l,a]=se(e);return t===o&&r===l&&n===a}function Yi(s,e){let t=new Set(s),r=new Set(e),n=s.filter(c=>r.has(c)),o=e.filter(c=>t.has(c)),l=new Map;for(let c=0;c<n.length;c++)l.set(n[c],o[c]);let a=[],i=0,u=new Set;for(let c of s){if(!r.has(c)){a.push({type:"deleted",oldSelector:c,newSelector:null});continue}let h=l.get(c);for(;i<e.length&&!t.has(e[i]);)a.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;if(c===h)a.push({type:"equal",oldSelector:c,newSelector:h});else{let f=[c,h].sort().join("\0");u.has(f)||(u.add(f),a.push({type:"moved",oldSelector:c,newSelector:h}))}i++}for(;i<e.length;)t.has(e[i])||a.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;return a}function ar(s,e,t,r,n,o,l){return!t&&!r?null:t?r?t.important!==r.important?t.important?s:e:n!==0?n>0?s:e:o>l?s:e:s:e}function Xi(s,e,t,r,n){let o=s.oldSelector,l=s.newSelector;s.sameSpecificity=lr(o,l),s.conflictingProps=[],s.hasOverlappingProps=!1;let a=e.indexOf(o),i=e.indexOf(l),u=t.indexOf(o),c=t.indexOf(l);if(a<0||i<0||u<0||c<0)return;let h=a<i,f=u<c;if(h===f)return;let p=ir(se(o),se(l)),d=r.get(o)||new Map,w=r.get(l)||new Map,y=n.get(o)||new Map,g=n.get(l)||new Map;for(let[m,S]of y){let C=g.get(m);if(!C||(s.hasOverlappingProps=!0,S.value===C.value&&S.important===C.important))continue;let x=ar(o,l,d.get(m),w.get(m),p,a,i),b=ar(o,l,S,C,p,u,c);if(!b)continue;if(!x){let T=ar(o,l,S,C,p,a,i);if(!T||T===b)continue;let P=n.get(T)?.get(m),W=n.get(b)?.get(m);if(!P||!W||P.value===W.value&&P.important===W.important)continue;s.conflictingProps.push({prop:m,oldEffective:null,newEffective:{value:W.value,important:W.important}});continue}let O=r.get(x)?.get(m),A=n.get(b)?.get(m);!O||!A||O.value===A.value&&O.important===A.important||s.conflictingProps.push({prop:m,oldEffective:{value:O.value,important:O.important},newEffective:{value:A.value,important:A.important}})}}function cr(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=ft(s,r),o=ft(e,r),l=ne(V(s,r)),a=ne(V(e,r)),i=new Set([...n.keys(),...o.keys()]),u=["base",...[...i].filter(h=>h!=="base").sort()],c=[];for(let h of u){if(!i.has(h))continue;let f=n.get(h)||[],p=o.get(h)||[],d=Yi(f,p),w=l.get(h)||new Map,y=a.get(h)||new Map;for(let m of d)m.type==="moved"&&Xi(m,f,p,w,y);let g=d.some(m=>m.type==="moved"&&m.hasOverlappingProps);d.some(m=>m.type!=="equal")&&c.push({contextKey:h,rows:d,hasWarning:g})}return c}var Zi=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-inline","padding-block"]],["margin",["margin-top","margin-right","margin-bottom","margin-left","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-inline","margin-block"]],["border",["border-top","border-right","border-bottom","border-left","border-width","border-style","border-color","border-top-width","border-top-style","border-top-color","border-right-width","border-right-style","border-right-color","border-bottom-width","border-bottom-style","border-bottom-color","border-left-width","border-left-style","border-left-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["border-inline",["border-inline-start","border-inline-end","border-inline-width","border-inline-style","border-inline-color"]],["border-block",["border-block-start","border-block-end","border-block-width","border-block-style","border-block-color"]],["background",["background-color","background-image","background-position","background-size","background-repeat","background-attachment","background-origin","background-clip"]],["font",["font-style","font-variant","font-weight","font-stretch","font-size","font-family","line-height"]],["flex",["flex-grow","flex-shrink","flex-basis"]],["flex-flow",["flex-direction","flex-wrap"]],["grid-column",["grid-column-start","grid-column-end"]],["grid-row",["grid-row-start","grid-row-end"]],["grid-template",["grid-template-rows","grid-template-columns","grid-template-areas"]],["transition",["transition-property","transition-duration","transition-timing-function","transition-delay"]],["animation",["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode","animation-play-state"]],["inset",["top","right","bottom","left","inset-inline-start","inset-inline-end","inset-block-start","inset-block-end","inset-inline","inset-block"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["overflow",["overflow-x","overflow-y"]],["text-decoration",["text-decoration-line","text-decoration-style","text-decoration-color","text-decoration-thickness"]],["outline",["outline-width","outline-style","outline-color"]],["list-style",["list-style-type","list-style-position","list-style-image"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["mask",["mask-image","mask-position","mask-size","mask-repeat","mask-origin","mask-clip","mask-mode","mask-composite"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]);function gs(s){let e=new Map;for(let t=0;t<s.length;t++){let r=s[t];e.has(r.selector)||e.set(r.selector,[]),e.get(r.selector).push({...r,idx:t})}return e}function ys(s,e,t){let r=null,n=null;for(let o of s)o.prop===e?(!r||o.layerRank>r.layerRank||o.layerRank===r.layerRank&&o.idx>r.idx)&&(r=o):o.prop===t&&(!n||o.layerRank>n.layerRank||o.layerRank===n.layerRank&&o.idx>n.idx)&&(n=o);return!r&&!n?null:r?n?r.layerRank!==n.layerRank?r.layerRank>n.layerRank?"shorthand":"longhand":r.idx>n.idx?"shorthand":"longhand":"shorthand":"longhand"}function ht(s,e){return s.reduce((t,r)=>r.prop!==e?t:!t||r.layerRank>t.layerRank||r.layerRank===t.layerRank&&r.idx>t.idx?r:t,null)}function ur(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=V(s,r),o=V(e,r),l=new Set([...n.keys(),...o.keys()]),a=["base",...[...l].filter(h=>h!=="base").sort()],i=[],u=!1;for(let h of a){if(!l.has(h))continue;let f=n.get(h)??[],p=o.get(h)??[],d=gs(f),w=gs(p);for(let[y,g]of w){let m=d.get(y)??[],S=[],C=new Set;for(let[x,b]of Zi){if(!g.some(P=>P.prop===x))continue;let A=ht(g,x),T=ht(m,x);for(let P of b){if(!g.some(qs=>qs.prop===P)||C.has(P))continue;let dt=ys(m,x,P),mt=ys(g,x,P);if(dt===mt)continue;let gt;mt==="shorthand"?(gt="A",dt!==null&&(u=!0)):gt="B";let pr=ht(g,P),dr=ht(m,P);C.add(P),S.push({shorthand:x,longhand:P,oldWinner:dt,newWinner:mt,direction:gt,oldShorthandValue:T?.value??null,oldLonghandValue:dr?.value??null,longhandValue:pr?.value??null,shorthandValue:A?.value??null,oldShorthandImportant:T?.important??!1,oldLonghandImportant:dr?.important??!1,shorthandImportant:A?.important??!1,longhandImportant:pr?.important??!1})}}S.length>0&&i.push({contextKey:h,selector:y,conflicts:S})}}let c=new Map;for(let h of i)c.has(h.contextKey)||c.set(h.contextKey,{contextKey:h.contextKey,selectors:[]}),c.get(h.contextKey).selectors.push({selector:h.selector,conflicts:h.conflicts});return{hasWarning:u,risks:[...c.values()]}}function ws(s,e){if(e?.risks?.length)for(let{contextKey:t,selectors:r}of e.risks){let n=s.get(t);if(n)for(let{selector:o,conflicts:l}of r){let a=n.selectors.get(o);if(!a)continue;let i=0;for(let{longhand:u,oldWinner:c,newWinner:h,longhandValue:f,shorthandValue:p,oldShorthandValue:d,oldLonghandValue:w,oldShorthandImportant:y,oldLonghandImportant:g,shorthandImportant:m,longhandImportant:S}of l){let C=c==="longhand"?w:d,x=h==="longhand"?f:p,b=a.props.get(u);if(!b||b.status!=="unchanged")continue;let O=c==="longhand"?g:y,A=h==="longhand"?S:m;a.props.set(u,{status:"changed",oldValue:C,oldImportant:O,newValue:x,newImportant:A}),i++}i>0&&(a.changeCount+=i,a.status="changed",n.changeCount+=i,n.status="changed")}}}var Cs=require("node:fs"),_s=require("node:url");function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vs(s,e){let{status:t}=e;function r(n){return n?' <span class="important">!important</span>':""}return t==="added"?`
      <div class="prop prop--added">
        <span class="prop-name">${E(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${E(e.newValue)}${r(e.newImportant)}</span>
        <span class="prop-badge badge--added">\u8FFD\u52A0</span>
      </div>`:t==="removed"?`
      <div class="prop prop--removed">
        <span class="prop-name">${E(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${E(e.oldValue)}${r(e.oldImportant)}</span>
        <span class="prop-badge badge--removed">\u524A\u9664</span>
      </div>`:t==="changed"?`
      <div class="prop prop--changed">
        <span class="prop-name">${E(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value prop-value--old">${E(e.oldValue)}${r(e.oldImportant)}</span>
        <span class="prop-arrow">\u2192</span>
        <span class="prop-value prop-value--new">${E(e.newValue)}${r(e.newImportant)}</span>
        <span class="prop-badge badge--changed">\u5909\u66F4</span>
      </div>`:`
    <div class="prop prop--unchanged">
      <span class="prop-name">${E(s)}</span>
      <span class="prop-colon">:</span>
      <span class="prop-value">${E(e.value)}${r(e.important)}</span>
    </div>`}function el(s,e){let{props:t}=e,r=[],n=[];for(let[l,a]of t){let i=E(l);if(a.status==="unchanged"){let u=E(a.value)+(a.important?" !important":"");r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="added"){r.push('<div class="detail-line detail-line--empty"></div>');let u=E(a.newValue)+(a.newImportant?" !important":"");n.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="removed"){let u=E(a.oldValue)+(a.oldImportant?" !important":"");r.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push('<div class="detail-line detail-line--empty"></div>')}else{let u=E(a.oldValue)+(a.oldImportant?" !important":""),c=E(a.newValue)+(a.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${c}</span>;</div>`)}}let o=E(s);return`
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">\u65E7</div>
        <pre class="detail-block"><code>${o} {
${r.join(`
`)}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">\u65B0</div>
        <pre class="detail-block"><code>${o} {
${n.join(`
`)}}</code></pre>
      </div>
    </div>`}function tl(s,e,{highlightHtml:t,showUnchanged:r=!1,contextKey:n="",expanded:o=!1}={}){let{status:l,changeCount:a,props:i}=e,u=t||E(s),c={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[l],h={added:`+${[...i.values()].filter(m=>m.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...i.values()].filter(m=>m.status==="removed").length} \u524A\u9664`,changed:(()=>{let m=[...i.values()].filter(b=>b.status==="added").length,S=[...i.values()].filter(b=>b.status==="removed").length,C=[...i.values()].filter(b=>b.status==="changed").length,x=[];return m&&x.push(`+${m}`),S&&x.push(`\u2212${S}`),C&&x.push(`~${C}`),x.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[l],f=[...i.entries()].filter(([,m])=>m.status!=="unchanged"),p=[...i.entries()].filter(([,m])=>m.status==="unchanged"),d=[...f.map(([m,S])=>vs(m,S)),...r?p.map(([m,S])=>vs(m,S)):[]].join(""),w=p.length>0&&!r?`<button class="unchanged-toggle" data-selector="${E(s)}">
           \u5909\u66F4\u306A\u3057 ${p.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",y=o?el(s,e):"",g=o?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${l}" data-selector="${E(s)}" data-context="${E(n)}"${g}>
      <div class="selector-header" role="button" tabindex="0" title="\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u65E7\u306E\u5168\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A">
        <code class="selector-name">${u}</code>
        <span class="selector-badge ${c}">${h}</span>
        <span class="selector-expand-icon">${o?"\u25B2":"\u25BC"}</span>
      </div>
      <div class="props-list">
        ${d||'<div class="no-props">\u30D7\u30ED\u30D1\u30C6\u30A3\u306A\u3057</div>'}
        ${w}
      </div>
      ${y}
    </div>`}function rl(s,e,t,{showUnchanged:r=!1,expandedSelectors:n=new Set}={}){let{status:o,changeCount:l}=e,i=s==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(s),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[o],c=l>0?`<span class="context-badge ${u}">${l} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',h=t?t.map(({selector:p,positions:d})=>({selector:p,positions:d,selDiff:e.selectors.get(p)})).filter(p=>p.selDiff):[...e.selectors.entries()].map(([p,d])=>({selector:p,positions:new Set,selDiff:d}));if(h.length===0)return"";let f=h.map(({selector:p,positions:d,selDiff:w})=>tl(p,w,{highlightHtml:d.size>0?nl(p,d):null,showUnchanged:r,contextKey:s,expanded:n.has(`${s}||${p}`)})).join("");return`
    <section class="context-section context-section--${o}">
      <div class="context-header">
        <span class="context-label">${i}</span>
        ${c}
      </div>
      <div class="context-selectors">
        ${f}
      </div>
    </section>`}function nl(s,e){return[...s].map((t,r)=>{let n=E(t);return e.has(r)?`<mark class="fzf-match">${n}</mark>`:n}).join("")}function sl(s){let e=E(s.prop),t=s.oldEffective?E(s.oldEffective.value)+(s.oldEffective.important?" !important":""):'<span class="or-prop-absent">\u65E7 CSS \u672A\u5BA3\u8A00</span>',r=s.newEffective?E(s.newEffective.value)+(s.newEffective.important?" !important":""):'<span class="or-prop-absent">\u65B0 CSS \u672A\u5BA3\u8A00</span>';return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${t}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${r}</span></span>`}function ol(s){let e=E(s.oldSelector),t=E(s.newSelector),r=s.conflictingProps&&s.conflictingProps.length>0,n=s.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',o=r?`<div class="or-conflicts">${s.conflictingProps.map(sl).join("")}</div>`:"";return`<tr class="${r?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${t}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${n}
      ${o}
    </td>
  </tr>`}function il(s){return s.type==="equal"?`<tr class="or-row or-row--equal">
      <td class="or-cell or-cell--old"><code>${E(s.oldSelector)}</code></td>
      <td class="or-cell or-cell--new"><code>${E(s.newSelector)}</code></td>
      <td class="or-cell or-cell--status"></td>
    </tr>`:s.type==="deleted"?`<tr class="or-row or-row--deleted">
      <td class="or-cell or-cell--old"><code>${E(s.oldSelector)}</code></td>
      <td class="or-cell or-cell--new or-cell--empty"></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--deleted">\u524A\u9664</span></td>
    </tr>`:s.type==="added"?`<tr class="or-row or-row--added">
      <td class="or-cell or-cell--old or-cell--empty"></td>
      <td class="or-cell or-cell--new"><code>${E(s.newSelector)}</code></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--added">\u8FFD\u52A0</span></td>
    </tr>`:""}function ll(s,e=!1){let{contextKey:t,rows:r,hasWarning:n}=s,o=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(t),l=r.filter(c=>c.type==="moved").length,a=l===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':n?`<span class="or-ctx-badge or-ctx-badge--warning">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,i=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,u=r.map(c=>c.type==="moved"?ol(c):il(c)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${E(t)}" aria-expanded="${e}" role="button" tabindex="0">
      ${i}
      <span class="or-context-label">${o}</span>
      ${a}
    </div>
    <div class="or-table-wrap${e?"":" or-table-wrap--collapsed"}">
      <table class="or-table">
        <thead>
          <tr>
            <th class="or-th">\u65E7 CSS</th>
            <th class="or-th">\u65B0 CSS</th>
            <th class="or-th">\u72B6\u614B</th>
          </tr>
        </thead>
        <tbody>${u}</tbody>
      </table>
    </div>
  </div>`}function bs(s,{activeContext:e="all",filterOrderRisk:t=!1,expandedContexts:r=new Set}={}){if(!s||s.length===0)return"";let n=t?s.filter(u=>u.hasWarning):s,o=e==="all"?n:n.filter(u=>u.contextKey===e);if(o.length===0)return"";let l=o.reduce((u,c)=>u+c.rows.filter(h=>h.type==="moved").length,0);if(l===0)return"";let a=o.some(u=>u.hasWarning),i=o.map(u=>ll(u,r.has(u.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${a?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${i}
  </section>`}function xs(s){if(!s||!s.risks||s.risks.length===0)return"";let{risks:e,hasWarning:t}=s,r=e.reduce((o,l)=>o+l.selectors.reduce((a,i)=>a+i.conflicts.length,0),0);if(r===0)return"";let n=e.map(({contextKey:o,selectors:l})=>{let a=o==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(o),i=l.some(h=>h.conflicts.some(f=>f.direction==="A")),u=l.map(({selector:h,conflicts:f})=>{let p=f.map(({shorthand:d,longhand:w,direction:y,longhandValue:g,shorthandValue:m,oldShorthandValue:S})=>{let C=E(d),x=E(w),b=E(m??""),O=E(S??""),A=E(g??"");return y==="A"?`<div class="sr-conflict sr-conflict--risk">
            <span class="sr-badge sr-badge--risk">\u26A0 \u30EA\u30B9\u30AF</span>
            <code class="sr-longhand">${x}</code>
            <span class="sr-desc">\u304C <code>${C}: ${b}</code> \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: longhand \u304C\u6709\u52B9 \u2192 \u65B0: shorthand \u304C\u4E0A\u66F8\u304D\uFF09</span>
          </div>`:`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u89E3\u6D88</span>
            <code class="sr-longhand">${x}</code>
            <span class="sr-desc">\u306E shorthand \u4E0A\u66F8\u304D\u304C\u89E3\u6D88\uFF08\u65E7: <code>${C}: ${O}</code> \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: <code>${x}: ${A}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`}).join("");return`<div class="sr-selector">
        <code class="sr-selector-name">${E(h)}</code>
        <div class="sr-conflicts">${p}</div>
      </div>`}).join("");return`<div class="sr-context">
      <div class="sr-context-header">
        <span class="sr-context-label">${a}</span>
        ${i?'<span class="sr-ctx-badge sr-ctx-badge--warning">\u26A0 \u30EA\u30B9\u30AF\u3042\u308A</span>':'<span class="sr-ctx-badge sr-ctx-badge--ok">\u5909\u66F4\u306E\u307F</span>'}
      </div>
      <div class="sr-selectors">${u}</div>
    </div>`}).join("");return`<section class="shorthand-risks-section">
    <div class="shorthand-risks-header">
      <span class="shorthand-risks-title">Shorthand/Longhand \u7AF6\u5408</span>
      ${t?`<span class="shorthand-risks-count shorthand-risks-count--warning">\u26A0 ${r} \u4EF6\u306E\u7AF6\u5408\uFF08\u30EA\u30B9\u30AF\u3042\u308A\uFF09</span>`:`<span class="shorthand-risks-count shorthand-risks-count--ok">${r} \u4EF6\u306E\u7AF6\u5408\uFF08\u5909\u66F4\u306E\u307F\uFF09</span>`}
    </div>
    ${n}
  </section>`}function Ss(s,e,{activeContext:t="all",showUnchanged:r=!1,expandedSelectors:n=new Set}={}){if(!s||s.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let o=null;if(e!==null){o=new Map;for(let a of e)o.has(a.contextKey)||o.set(a.contextKey,[]),o.get(a.contextKey).push({selector:a.selector,positions:a.positions||new Set})}let l="";for(let[a,i]of s){if(t!=="all"&&a!==t)continue;let u=o?o.get(a)||[]:null;o&&u.length===0||(l+=rl(a,i,u,{showUnchanged:r,expandedSelectors:n}))}return l||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var fl={};function al(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   CSS Diff App \u2014 \u30B9\u30BF\u30A4\u30EB
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* \u2500\u2500 \u30C7\u30B6\u30A4\u30F3\u30C8\u30FC\u30AF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-bg:          #f8fafc;
  --color-surface:     #ffffff;
  --color-border:      #e2e8f0;
  --color-text:        #1e293b;
  --color-text-muted:  #64748b;
  --color-text-code:   #334155;

  --color-added-bg:    #f0fdf4;
  --color-added-text:  #15803d;
  --color-added-border:#86efac;
  --color-added-badge: #22c55e;

  --color-removed-bg:   #fff1f2;
  --color-removed-text: #be123c;
  --color-removed-border:#fda4af;
  --color-removed-badge: #f43f5e;

  --color-changed-bg:   #fffbeb;
  --color-changed-text: #92400e;
  --color-changed-border:#fcd34d;
  --color-changed-badge: #f59e0b;

  --color-unchanged-bg:   #f8fafc;
  --color-unchanged-text: #94a3b8;
  --color-unchanged-border:#e2e8f0;

  --color-primary:     #6366f1;
  --color-primary-light: #e0e7ff;

  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg: 12px;

  --shadow-sm:  0 1px 2px rgba(0,0,0,.06);
  --shadow-md:  0 4px 12px rgba(0,0,0,.08);

  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SFMono-Regular', 'Cascadia Code', 'Consolas', 'Menlo', monospace;
}

/* \u2500\u2500 \u30D9\u30FC\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  font-size: 14px;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  line-height: 1.6;
}

/* \u2500\u2500 \u30D8\u30C3\u30C0\u30FC & \u30C9\u30ED\u30C3\u30D7\u30BE\u30FC\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 24px;
  position: relative;
}

.github-link {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.github-link:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
  background: var(--color-border);
}

.github-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.app-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.dropzones {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dropzones-arrow {
  font-size: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.dropzone {
  flex: 1;
  min-height: 80px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  padding: 16px;
  user-select: none;
}

.dropzone:hover,
.dropzone:focus-visible {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  outline: none;
}

.dropzone.dragover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone.loaded {
  border-style: solid;
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone-icon { font-size: 20px; }

.dropzone-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  word-break: break-all;
}

.dropzone-sub {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
}

/* \u2500\u2500 \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.controls-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 200px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0 10px;
}

.search-icon { font-size: 13px; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 7px 0;
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--color-text);
  outline: none;
}

.search-input::placeholder { color: var(--color-text-muted); }

.filter-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
}

.filter-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

/* \u2500\u2500 \u30B5\u30DE\u30EA\u30FC\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.summary-bar {
  padding: 8px 24px;
  font-size: 12px;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.sum-added   { color: var(--color-added-text); font-weight: 600; }
.sum-removed { color: var(--color-removed-text); font-weight: 600; }
.sum-changed { color: var(--color-changed-text); font-weight: 600; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BF\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-tabs {
  padding: 10px 24px 0;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.ctx-tab {
  padding: 5px 12px;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
  position: relative;
  bottom: -1px;
}

.ctx-tab:hover { color: var(--color-text); background: var(--color-surface); }

.ctx-tab.active {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
  border-bottom-color: var(--color-surface);
}

.ctx-tab--changed .ctx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-changed-badge);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--added .ctx-badge {
  background: var(--color-added-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--removed .ctx-badge {
  background: var(--color-removed-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

/* \u2500\u2500 \u7D50\u679C\u30A8\u30EA\u30A2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.results {
  padding: 16px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1400px;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: var(--color-text-muted);
}

.empty-state p { margin-bottom: 8px; }
.empty-sub { font-size: 12px; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.context-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.context-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.context-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}

.badge--added     { background: var(--color-added-bg); color: var(--color-added-text); border: 1px solid var(--color-added-border); }
.badge--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); border: 1px solid var(--color-removed-border); }
.badge--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); border: 1px solid var(--color-changed-border); }
.badge--unchanged { background: var(--color-unchanged-bg); color: var(--color-unchanged-text); border: 1px solid var(--color-unchanged-border); }

.context-selectors {
  display: flex;
  flex-direction: column;
}

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-card {
  border-bottom: 1px solid var(--color-border);
  padding: 10px 16px;
}

.selector-card:last-child { border-bottom: none; }

.selector-card--added .selector-header   { background: var(--color-added-bg); }
.selector-card--removed .selector-header { background: var(--color-removed-bg); }
.selector-card--changed .selector-header { background: var(--color-changed-bg); }
.selector-card--unchanged { opacity: .7; }

.selector-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: 6px;
  cursor: pointer;
  user-select: none;
}

.selector-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-code);
  flex: 1;
  word-break: break-all;
}

.selector-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* \u2500\u2500 fzf \u30CF\u30A4\u30E9\u30A4\u30C8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fzf-match {
  background: #fef08a;
  color: #78350f;
  border-radius: 2px;
  padding: 0 1px;
}

/* \u2500\u2500 \u30D7\u30ED\u30D1\u30C6\u30A3\u884C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.props-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 8px;
}

.prop {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 12px;
  flex-wrap: wrap;
}

.prop--added   { background: var(--color-added-bg); }
.prop--removed { background: var(--color-removed-bg); }
.prop--changed { background: var(--color-changed-bg); }
.prop--unchanged { color: var(--color-text-muted); }

.prop-name  { font-weight: 600; color: inherit; }
.prop-colon { color: var(--color-text-muted); }

.prop-value--old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.prop-value--new {
  color: var(--color-added-text);
  font-weight: 600;
}

.prop-arrow {
  font-size: 11px;
  color: var(--color-text-muted);
}

.prop-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 9999px;
  flex-shrink: 0;
  margin-left: auto;
}

.important {
  font-size: 10px;
  color: var(--color-removed-text);
  font-weight: 700;
}

.no-props {
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 2px 0;
}

/* \u2500\u2500 \u5909\u66F4\u306A\u3057\u5C55\u958B\u30DC\u30BF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.unchanged-toggle {
  margin-top: 4px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px dashed var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  transition: all .12s;
  align-self: flex-start;
}

.unchanged-toggle:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
}

/* \u2500\u2500 \u30AA\u30D7\u30B7\u30E7\u30F3 \u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.option-checks {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 6px;
  width: 100%;
}

.option-check-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  user-select: none;
}

.option-check-label input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.option-check-label:hover { color: var(--color-text); }

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u5C55\u958B\u30A2\u30A4\u30B3\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-expand-icon {
  font-size: 10px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: opacity .12s;
}

.selector-header:hover .selector-expand-icon {
  opacity: 0.8;
}

/* \u2500\u2500 \u65B0\u65E72\u30AB\u30E9\u30E0\u8A73\u7D30\u30D1\u30CD\u30EB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
}

.selector-detail-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.selector-detail-col-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.selector-detail-col--old .selector-detail-col-label { color: var(--color-removed-text); }
.selector-detail-col--new .selector-detail-col-label { color: var(--color-added-text); }

.detail-block {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.6;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
}

.detail-line {
  display: block;
  padding: 1px 4px;
  border-radius: 2px;
}

.detail-line--unchanged { color: var(--color-text-code); }
.detail-line--added     { background: var(--color-added-bg); color: var(--color-added-text); }
.detail-line--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); text-decoration: line-through; }
.detail-line--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); }
.detail-line--empty     { min-height: 1.6em; }

.detail-prop { font-weight: 600; }
.detail-colon { color: var(--color-text-muted); }
.detail-val { color: inherit; }

/* \u2500\u2500 \u30D5\u30A3\u30EB\u30BF\u30DC\u30BF\u30F3\uFF08\u8B66\u544A\u7528\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.filter-btn--warning { border-color: var(--color-changed-border); }
.filter-btn--warning:hover { border-color: var(--color-changed-badge); color: var(--color-changed-text); }
.filter-btn--warning.active {
  background: var(--color-changed-badge);
  border-color: var(--color-changed-badge);
  color: #fff;
}

/* \u2500\u2500 \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-warning-bg:     #fffbeb;
  --color-warning-border: #fcd34d;
  --color-warning-text:   #92400e;
  --color-warning-badge:  #f59e0b;
}

.order-risks-section {
  background: var(--color-surface);
  border: 2px solid var(--color-warning-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.order-risks-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--color-warning-bg);
  border-bottom: 1px solid var(--color-warning-border);
}

.order-risks-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-warning-text);
  flex: 1;
}

.order-risks-count {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}

.order-risks-count--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.order-risks-count--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

/* \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8 */
.or-context {
  border-bottom: 1px solid var(--color-border);
}

.or-context:last-child { border-bottom: none; }

.or-context-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;
}

.or-context-header:hover {
  background: var(--color-surface);
}

.or-toggle-icon {
  font-size: 9px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.or-table-wrap--collapsed {
  display: none;
}

.or-context-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.or-ctx-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 9999px;
}

.or-ctx-badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-ctx-badge--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

.or-ctx-badge--moved {
  background: var(--color-added-bg);
  color: var(--color-added-text);
  border: 1px solid var(--color-added-border);
}

/* \u30C6\u30FC\u30D6\u30EB */
.or-table-wrap {
  overflow-x: auto;
}

.or-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 11px;
}

.or-th {
  padding: 6px 12px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.or-cell {
  padding: 5px 12px;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-code);
}

.or-row:last-child .or-cell { border-bottom: none; }

.or-cell--old { width: 35%; }
.or-cell--new { width: 35%; }
.or-cell--status { width: 30%; }

.or-cell--empty { background: var(--color-bg); }

.or-cell code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-code);
  word-break: break-all;
}

/* \u884C\u306E\u30B9\u30BF\u30A4\u30EB */
.or-row--equal .or-cell { color: var(--color-text-muted); }
.or-row--equal .or-cell code { color: var(--color-text-muted); }

.or-row--deleted { background: var(--color-removed-bg); }
.or-row--deleted .or-cell code { color: var(--color-removed-text); }

.or-row--added { background: var(--color-added-bg); }
.or-row--added .or-cell code { color: var(--color-added-text); }

.or-row--moved { background: var(--color-warning-bg); }
.or-row--moved.or-row--conflict { background: #fef9c3; }
.or-row--moved .or-cell code { color: var(--color-warning-text); font-weight: 600; }

/* \u30D0\u30C3\u30B8 */
.or-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 9999px;
  white-space: nowrap;
}

.or-badge--moved {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-badge--deleted {
  background: var(--color-removed-bg);
  color: var(--color-removed-text);
  border: 1px solid var(--color-removed-border);
}

.or-badge--added {
  background: var(--color-added-bg);
  color: var(--color-added-text);
  border: 1px solid var(--color-added-border);
}

/* \u8A73\u7D30\u5EA6 */
.or-spec-same {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  margin-left: 4px;
}

.or-spec-diff {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
  margin-left: 4px;
}

/* \u7AF6\u5408\u30D7\u30ED\u30D1\u30C6\u30A3 */
.or-conflicts {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.or-conflict-prop {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 4px;
  padding: 2px 6px;
  color: #9a3412;
}

.or-prop-name { font-weight: 700; }

.or-prop-absent {
  color: var(--color-text-muted);
  font-style: italic;
}

.or-prop-old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.or-prop-new {
  color: var(--color-added-text);
  font-weight: 700;
}

.or-prop-arrow { color: var(--color-text-muted); font-size: 9px; }

/* \u2500\u2500 \u30EC\u30B9\u30DD\u30F3\u30B7\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 600px) {
  .dropzones { flex-direction: column; }
  .dropzones-arrow { transform: rotate(90deg); }
  .controls-bar { flex-direction: column; align-items: stretch; }
  .filter-buttons { justify-content: flex-start; }
  .selector-detail { grid-template-columns: 1fr; }
}
`}var cl=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,ul=`
<script>
document.addEventListener('DOMContentLoaded', () => {
  // \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.selector-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.selector-card')
      if (!card) return
      const expanded = card.getAttribute('data-expanded') === 'true'
      card.setAttribute('data-expanded', expanded ? 'false' : 'true')
      const icon = header.querySelector('.selector-expand-icon')
      if (icon) icon.textContent = expanded ? '\u25BC' : '\u25B2'
    })
  })

  // \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30D8\u30C3\u30C0\u30FC\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.or-context-header').forEach(header => {
    header.addEventListener('click', () => {
      const wrap = header.nextElementSibling
      if (!wrap) return
      const collapsed = wrap.classList.toggle('or-table-wrap--collapsed')
      const icon = header.querySelector('.or-toggle-icon')
      if (icon) icon.textContent = collapsed ? '\u25B6' : '\u25BC'
      header.setAttribute('aria-expanded', String(!collapsed))
    })
  })
})
</script>
`;function Es(s,e,t){let r=al(),n=[],o=new Set;for(let[h,f]of s)for(let[p,d]of f.selectors)d.status!=="unchanged"&&(n.push({contextKey:h,selector:p,positions:new Set}),o.add(`${h}||${p}`));let l=n.length>0,a=e&&e.length>0,i=t&&t.risks&&t.risks.length>0,u=e?new Set(e.map(h=>h.contextKey)):new Set,c="";return l&&(c+=`<div class="diff-section">${Ss(s,n,{expandedSelectors:o})}</div>`),a&&(c+=bs(e,{expandedContexts:u})),i&&(c+=xs(t)),!l&&!a&&!i&&(c='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${r}</style>
  <style>${cl}</style>
</head>
<body>
  <div id="app">${c}</div>
  ${ul}
</body>
</html>`}var Ms=`Usage: css-cascade <old.css> <new.css> [options]

Arguments:
  old.css    \u6BD4\u8F03\u5143 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9
  new.css    \u6BD4\u8F03\u5148 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9

Options:
  --format <text|json|html>               \u51FA\u529B\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8 (default: text)
  --filter <changed|added|removed|unchanged|all>
                                          \u30B9\u30C6\u30FC\u30BF\u30B9\u3067\u7D5E\u308A\u8FBC\u307F (default: changed)
  --order-risk                            \u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --shorthand-risk                        shorthand/longhand \u306E\u9806\u5E8F\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --ignore-cosmetic                       \u8868\u8A18\u63FA\u308C\u3092\u7121\u8996
  --semantic-selectors                    \u5C5E\u6027\u30BB\u30EC\u30AF\u30BF\u306E\u30AF\u30A9\u30FC\u30C8\u6709\u7121\u3092\u540C\u4E00\u8996
  --no-color                              ANSI \u30AB\u30E9\u30FC\u3092\u7121\u52B9\u5316
  -v, --version                           \u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8868\u793A
  -h, --help                              \u30D8\u30EB\u30D7\u3092\u8868\u793A

Exit codes:
  0  \u5DEE\u5206\u306A\u3057\u30FB\u9806\u5E8F\u5909\u66F4\u306A\u3057
  1  \u5DEE\u5206\u3042\u308A\u3001\u307E\u305F\u306F --order-risk \u6307\u5B9A\u6642\u306B\u9806\u5E8F\u5909\u66F4\u3042\u308A\uFF08\u30D7\u30ED\u30D1\u30C6\u30A3\u5DEE\u5206\u30BC\u30ED\u3067\u3082 exit 1\uFF09
  2  \u30A8\u30E9\u30FC`,$s;try{$s=(0,Ls.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"shorthand-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(s){console.error(`Error: ${s.message}`),process.exit(2)}var{values:k,positionals:ks}=$s;k.version&&(console.log("1.1.0"),process.exit(0));k.help&&(console.log(Ms),process.exit(0));ks.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error(Ms),process.exit(2));var hl=new Set(["text","json","html"]);hl.has(k.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var pl=new Set(["changed","added","removed","unchanged","all"]);pl.has(k.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function Rs(s){try{return(0,As.readFileSync)(s,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${s}": ${e.message}`),process.exit(2)}}var[dl,ml]=ks,fr=Rs(dl),hr=Rs(ml),ge,me=[],oe={hasWarning:!1,risks:[]};try{let s={semanticSelectors:k["semantic-selectors"]};ge=sr(ne(V(fr,s)),ne(V(hr,s)),{ignoreCosmetic:k["ignore-cosmetic"]}),k["order-risk"]&&(me=cr(fr,hr,{semanticSelectors:k["semantic-selectors"]})),k["shorthand-risk"]&&(oe=ur(fr,hr,{semanticSelectors:k["semantic-selectors"]}),ws(ge,oe))}catch(s){console.error(`Parse error: ${s.message}`),process.exit(2)}function Os(s,e){return e==="all"?!0:e==="changed"?s!=="unchanged":s===e}function gl(s){let e=0,t=0,r=0,n=0;for(let[,o]of s)for(let[,l]of o.selectors)for(let[,a]of l.props)a.status==="changed"?e++:a.status==="added"?t++:a.status==="removed"?r++:n++;return{changed:e,added:t,removed:r,unchanged:n}}var U=gl(ge),Ps=U.changed>0||U.added>0||U.removed>0,Is=k["order-risk"]&&me.some(s=>s.hasWarning),Ns=k["shorthand-risk"]&&oe.hasWarning,pt=k.filter;if(k.format==="html"){let s=Es(ge,k["order-risk"]?me:null,k["shorthand-risk"]?oe:null);process.stdout.write(s),process.exit(Ps||Is||Ns?1:0)}if(k.format==="json"){let s=[];for(let[t,r]of ge){let n=[];for(let[o,l]of r.selectors){let a=[];for(let[i,u]of l.props)Os(u.status,pt)&&a.push({prop:i,...u});a.length>0&&n.push({selector:o,status:l.status,changeCount:l.changeCount,props:a})}n.length>0&&s.push({key:t,status:r.status,changeCount:r.changeCount,selectors:n})}let e={version:1,summary:U,contexts:s};k["order-risk"]&&(e.orderRisks=me),k["shorthand-risk"]&&(e.shorthandRisks=oe),console.log(JSON.stringify(e,null,2))}else{let s=!k["no-color"]&&!!process.stdout.isTTY,e={reset:s?"\x1B[0m":"",yellow:s?"\x1B[33m":"",green:s?"\x1B[32m":"",red:s?"\x1B[31m":"",cyan:s?"\x1B[36m":"",dim:s?"\x1B[2m":""};for(let[r,n]of ge){let o=[];for(let[l,a]of n.selectors){let i=[];for(let[u,c]of a.props)Os(c.status,pt)&&(c.status==="changed"?i.push(`    ${e.yellow}~${e.reset} ${u}: ${c.oldValue} \u2192 ${c.newValue}`):c.status==="added"?i.push(`    ${e.green}+${e.reset} ${u}: ${c.newValue}`):c.status==="removed"?i.push(`    ${e.red}-${e.reset} ${u}: ${c.oldValue}`):i.push(`      ${u}: ${c.value}`));i.length>0&&(o.push(`  ${e.dim}${l}${e.reset}`),o.push(...i))}o.length>0&&(console.log(`
${e.cyan}[${r}]${e.reset}`),o.forEach(l=>console.log(l)))}let t=[];if(U.changed&&t.push(`${e.yellow}${U.changed} changed${e.reset}`),U.added&&t.push(`${e.green}${U.added} added${e.reset}`),U.removed&&t.push(`${e.red}${U.removed} removed${e.reset}`),(pt==="all"||pt==="unchanged")&&U.unchanged&&t.push(`${U.unchanged} unchanged`),console.log(`
Summary: ${t.length?t.join(", "):"no differences"}`),k["order-risk"]&&me.length>0){console.log(`
Order Risks:`);for(let{contextKey:r,rows:n}of me){let o=n.filter(i=>i.type!=="equal");if(o.length===0)continue;let l=Math.max(6,...o.map(i=>(i.oldSelector??"-").length)),a=Math.max(6,...o.map(i=>(i.newSelector??"-").length));console.log(`
${e.cyan}[${r}]${e.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(l)}  ${"\u65B0 CSS".padEnd(a)}  \u72B6\u614B`),console.log(`  ${"-".repeat(l)}  ${"-".repeat(a)}  ------`);for(let i of o){let u=(i.oldSelector??"-").padEnd(l),c=(i.newSelector??"-").padEnd(a);if(i.type==="moved"){let h=i.sameSpecificity?` ${e.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${e.reset}`:"";if(console.log(`  ${u}  ${c}  ${e.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${e.reset}${h}`),i.conflictingProps&&i.conflictingProps.length>0)for(let f of i.conflictingProps){let p=y=>y?.important?" !important":"",d=f.oldEffective?`${f.oldEffective.value}${p(f.oldEffective)}`:"\u65E7 CSS \u672A\u5BA3\u8A00",w=f.newEffective?`${f.newEffective.value}${p(f.newEffective)}`:"\u65B0 CSS \u672A\u5BA3\u8A00";console.log(`    ${e.dim}${f.prop}: ${d} \u2192 ${w}${e.reset}`)}}else i.type==="deleted"?console.log(`  ${u}  ${"-".padEnd(a)}  ${e.red}- \u524A\u9664${e.reset}`):i.type==="added"&&console.log(`  ${"-".padEnd(l)}  ${c}  ${e.green}+ \u8FFD\u52A0${e.reset}`)}}}if(k["shorthand-risk"]&&oe.risks.length>0){console.log(`
Shorthand Risks:`);for(let{contextKey:r,selectors:n}of oe.risks){console.log(`
${e.cyan}[${r}]${e.reset}`);for(let{selector:o,conflicts:l}of n){console.log(`  ${e.dim}${o}${e.reset}`);for(let a of l){let{shorthand:i,longhand:u,direction:c,longhandValue:h,shorthandValue:f,oldLonghandValue:p,oldShorthandValue:d}=a;console.log(c==="A"?`    ${e.yellow}\u26A0 ${u}: shorthand \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: ${u}:${p} \u304C\u6709\u52B9 \u2192 \u65B0: ${i}:${f} \u306B\u4E0A\u66F8\u304D\uFF09${e.reset}`:`    ${e.green}\u2197 ${u}: shorthand \u4E0A\u66F8\u304D\u89E3\u6D88\uFF08\u65E7: ${i}:${d} \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: ${u}:${h} \u304C\u6709\u52B9\uFF09${e.reset}`)}}}}}process.exit(Ps||Is||Ns?1:0);
