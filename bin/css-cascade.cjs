#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.1.0
// Source: https://github.com/svjunic/css-cascade
var Ds=Object.create;var pr=Object.defineProperty;var Bs=Object.getOwnPropertyDescriptor;var Us=Object.getOwnPropertyNames;var zs=Object.getPrototypeOf,Fs=Object.prototype.hasOwnProperty;var C=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var js=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Us(e))!Fs.call(s,n)&&n!==t&&pr(s,n,{get:()=>e[n],enumerable:!(r=Bs(e,n))||r.enumerable});return s};var Vs=(s,e,t)=>(t=s!=null?Ds(zs(s)):{},js(e||!s||!s.__esModule?pr(t,"default",{value:s,enumerable:!0}):t,s));var yt=C((xl,gt)=>{var ze=process||{},dr=ze.argv||[],Ue=ze.env||{},Ws=!(Ue.NO_COLOR||dr.includes("--no-color"))&&(!!Ue.FORCE_COLOR||dr.includes("--color")||ze.platform==="win32"||(ze.stdout||{}).isTTY&&Ue.TERM!=="dumb"||!!Ue.CI),Gs=(s,e,t=s)=>r=>{let n=""+r,o=n.indexOf(e,s.length);return~o?s+Ks(n,e,t,o)+e:s+n+e},Ks=(s,e,t,r)=>{let n="",o=0;do n+=s.substring(o,r)+t,o=r+e.length,r=s.indexOf(e,o);while(~r);return n+s.substring(o)},mr=(s=Ws)=>{let e=s?Gs:()=>String;return{isColorSupported:s,reset:e("\x1B[0m","\x1B[0m"),bold:e("\x1B[1m","\x1B[22m","\x1B[22m\x1B[1m"),dim:e("\x1B[2m","\x1B[22m","\x1B[22m\x1B[2m"),italic:e("\x1B[3m","\x1B[23m"),underline:e("\x1B[4m","\x1B[24m"),inverse:e("\x1B[7m","\x1B[27m"),hidden:e("\x1B[8m","\x1B[28m"),strikethrough:e("\x1B[9m","\x1B[29m"),black:e("\x1B[30m","\x1B[39m"),red:e("\x1B[31m","\x1B[39m"),green:e("\x1B[32m","\x1B[39m"),yellow:e("\x1B[33m","\x1B[39m"),blue:e("\x1B[34m","\x1B[39m"),magenta:e("\x1B[35m","\x1B[39m"),cyan:e("\x1B[36m","\x1B[39m"),white:e("\x1B[37m","\x1B[39m"),gray:e("\x1B[90m","\x1B[39m"),bgBlack:e("\x1B[40m","\x1B[49m"),bgRed:e("\x1B[41m","\x1B[49m"),bgGreen:e("\x1B[42m","\x1B[49m"),bgYellow:e("\x1B[43m","\x1B[49m"),bgBlue:e("\x1B[44m","\x1B[49m"),bgMagenta:e("\x1B[45m","\x1B[49m"),bgCyan:e("\x1B[46m","\x1B[49m"),bgWhite:e("\x1B[47m","\x1B[49m"),blackBright:e("\x1B[90m","\x1B[39m"),redBright:e("\x1B[91m","\x1B[39m"),greenBright:e("\x1B[92m","\x1B[39m"),yellowBright:e("\x1B[93m","\x1B[39m"),blueBright:e("\x1B[94m","\x1B[39m"),magentaBright:e("\x1B[95m","\x1B[39m"),cyanBright:e("\x1B[96m","\x1B[39m"),whiteBright:e("\x1B[97m","\x1B[39m"),bgBlackBright:e("\x1B[100m","\x1B[49m"),bgRedBright:e("\x1B[101m","\x1B[49m"),bgGreenBright:e("\x1B[102m","\x1B[49m"),bgYellowBright:e("\x1B[103m","\x1B[49m"),bgBlueBright:e("\x1B[104m","\x1B[49m"),bgMagentaBright:e("\x1B[105m","\x1B[49m"),bgCyanBright:e("\x1B[106m","\x1B[49m"),bgWhiteBright:e("\x1B[107m","\x1B[49m")}};gt.exports=mr();gt.exports.createColors=mr});var wt=C((Sl,yr)=>{"use strict";var Fe=/[\t\n\f\r "#'()/;[\\\]{}]/g,je=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,Hs=/.[\r\n"'(/\\]/,gr=/[\da-f]/i;yr.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,o,i,a,l,u,c,h,f,p,d,w=r.length,y=0,g=[],m=[],S=-1;function _(){return y}function x(P){throw e.error("Unclosed "+P,y)}function v(){return m.length===0&&y>=w}function O(P){if(m.length)return m.pop();if(y>=w)return;let I=P?P.ignoreUnclosed:!1;switch(o=r.charCodeAt(y),o){case 10:case 32:case 9:case 13:case 12:{l=y;do l+=1,o=r.charCodeAt(l);while(o===32||o===10||o===9||o===13||o===12);c=["space",r.slice(y,l)],y=l-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let W=String.fromCharCode(o);c=[W,W,y];break}case 40:{if(d=g.length?g.pop()[1]:"",p=r.charCodeAt(y+1),d==="url"&&p!==39&&p!==34&&p!==32&&p!==10&&p!==9&&p!==12&&p!==13){l=y;do{if(h=!1,l=r.indexOf(")",l+1),l===-1)if(n||I){l=y;break}else x("bracket");for(f=l;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["brackets",r.slice(y,l+1),y,l],y=l}else y<=S?c=["(","(",y]:(l=r.indexOf(")",y+1),i=r.slice(y,l+1),l===-1||Hs.test(i)?(S=l===-1?w:l,c=["(","(",y]):(c=["brackets",i,y,l],y=l));break}case 39:case 34:{u=o===39?"'":'"',l=y;do{if(h=!1,l=r.indexOf(u,l+1),l===-1)if(n||I){l=y+1;break}else x("string");for(f=l;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["string",r.slice(y,l+1),y,l],y=l;break}case 64:{Fe.lastIndex=y+1,Fe.test(r),Fe.lastIndex===0?l=r.length-1:l=Fe.lastIndex-2,c=["at-word",r.slice(y,l+1),y,l],y=l;break}case 92:{for(l=y,a=!0;r.charCodeAt(l+1)===92;)l+=1,a=!a;if(o=r.charCodeAt(l+1),a&&o!==47&&o!==32&&o!==10&&o!==9&&o!==13&&o!==12&&(l+=1,gr.test(r.charAt(l)))){for(;gr.test(r.charAt(l+1));)l+=1;r.charCodeAt(l+1)===32&&(l+=1)}c=["word",r.slice(y,l+1),y,l],y=l;break}default:{o===47&&r.charCodeAt(y+1)===42?(l=r.indexOf("*/",y+2)+1,l===0&&(n||I?l=r.length:x("comment")),c=["comment",r.slice(y,l+1),y,l],y=l):(je.lastIndex=y+1,je.test(r),je.lastIndex===0?l=r.length-1:l=je.lastIndex-2,c=["word",r.slice(y,l+1),y,l],g.push(c),y=l);break}}return y++,c}function A(P){m.push(P)}return{back:A,endOfFile:v,nextToken:O,position:_}}});var vt=C((Cl,br)=>{"use strict";var T=yt(),Qs=wt(),wr;function Js(s){wr=s}var Ys={";":T.yellow,":":T.yellow,"(":T.cyan,")":T.cyan,"[":T.yellow,"]":T.yellow,"{":T.yellow,"}":T.yellow,"at-word":T.cyan,brackets:T.cyan,call:T.cyan,class:T.yellow,comment:T.gray,hash:T.magenta,string:T.green};function Xs([s,e],t){if(s==="word"){if(e[0]===".")return"class";if(e[0]==="#")return"hash"}if(!t.endOfFile()){let r=t.nextToken();if(t.back(r),r[0]==="brackets"||r[0]==="(")return"call"}return s}function vr(s){let e=Qs(new wr(s),{ignoreErrors:!0}),t="";for(;!e.endOfFile();){let r=e.nextToken(),n=Ys[Xs(r,e)];n?t+=r[1].split(/\r?\n/).map(o=>n(o)).join(`
`):t+=r[1]}return t}vr.registerInput=Js;br.exports=vr});var Ve=C((_l,Cr)=>{"use strict";var xr=yt(),Sr=vt(),ye=class s extends Error{constructor(e,t,r,n,o,i){super(e),this.name="CssSyntaxError",this.reason=e,o&&(this.file=o),n&&(this.source=n),i&&(this.plugin=i),typeof t<"u"&&typeof r<"u"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,s)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=xr.isColorSupported);let r=c=>c,n=c=>c,o=c=>c;if(e){let{bold:c,gray:h,red:f}=xr.createColors(!0);n=p=>c(f(p)),r=p=>h(p),Sr&&(o=p=>Sr(p))}let i=t.split(/\r?\n/),a=Math.max(this.line-3,0),l=Math.min(this.line+2,i.length),u=String(l).length;return i.slice(a,l).map((c,h)=>{let f=a+1+h,p=" "+(" "+f).slice(-u)+" | ";if(f===this.line){if(c.length>160){let w=20,y=Math.max(0,this.column-w),g=Math.max(this.column+w,this.endColumn+w),m=c.slice(y,g),S=r(p.replace(/\d/g," "))+c.slice(0,Math.min(this.column-1,w-1)).replace(/[^\t]/g," ");return n(">")+r(p)+o(m)+`
 `+S+n("^")}let d=r(p.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return n(">")+r(p)+o(c)+`
 `+d+n("^")}return" "+r(p)+o(c)}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};Cr.exports=ye;ye.default=ye});var bt=C((El,Er)=>{"use strict";var Zs=/(<)(\/?style\b)/gi,eo=/(<)(!--)/g;function Q(s){return typeof s!="string"||!s.includes("<")?s:s.replace(Zs,"\\3c $2").replace(eo,"\\3c $2")}var _r={after:`
`,beforeClose:`
`,beforeComment:`
`,beforeDecl:`
`,beforeOpen:" ",beforeRule:`
`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function to(s){return s[0].toUpperCase()+s.slice(1)}var we=class{constructor(e){this.builder=e}atrule(e,t){let r=e.raws,n="@"+e.name,o=e.params?this.rawValue(e,"params"):"";if(typeof r.afterName<"u"?n+=r.afterName:o&&(n+=" "),e.nodes)this.block(e,n+o);else{let i=(r.between||"")+(t?";":"");this.builder(Q(n+o+i),e)}}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,o=0;for(;n&&n.type!=="root";)o+=1,n=n.parent;if(r.includes(`
`)){let i=this.raw(e,null,"indent");if(i.length)for(let a=0;a<o;a++)r+=i}return r}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(Q(t+r)+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(Q(n)),this.builder("}",e,"end")}body(e){let t=e.nodes,r=t.length-1;for(;r>0&&t[r].type==="comment";)r-=1;let n=this.raw(e,"semicolon"),o=e.type==="document";for(let i=0;i<t.length;i++){let a=t[i],l=this.raw(a,"before");l&&this.builder(o?l:Q(l)),this.stringify(a,r!==i||n)}}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder(Q("/*"+t+e.text+r+"*/"),e)}decl(e,t){let r=e.raws,n=this.raw(e,"between","colon"),o=e.prop+n+this.rawValue(e,"value");e.important&&(o+=r.important||" !important"),t&&(o+=";"),this.builder(Q(o),e)}document(e){this.body(e)}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n<"u"))return n;let o=e.parent;if(r==="before"&&(!o||o.type==="root"&&o.first===e||o&&o.type==="document"))return"";if(!o)return _r[r];let i=e.root(),a=i.rawCache||(i.rawCache={});if(typeof a[r]<"u")return a[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let l="raw"+to(r);this[l]?n=this[l](i,e):i.walk(u=>{if(n=u.raws[t],typeof n<"u")return!1})}return typeof n>"u"&&(n=_r[r]),a[r]=n,n}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t<"u"))return!1}),t}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before<"u")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between<"u")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t<"u"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before<"u"){let o=r.raws.before.split(`
`);return t=o[o.length-1],t=t.replace(/\S/g,""),!1}}),t}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t<"u"))return!1}),t}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}root(e){if(this.body(e),e.raws.after){let t=e.raws.after,r=e.parent&&e.parent.type==="document";this.builder(r?t:Q(t))}}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(Q(e.raws.ownSemicolon),e,"end")}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}};Er.exports=we;we.default=we});var ve=C((Ol,Or)=>{"use strict";var ro=bt();function xt(s,e){new ro(e).stringify(s)}Or.exports=xt;xt.default=xt});var We=C((Al,St)=>{"use strict";St.exports.isClean=Symbol("isClean");St.exports.my=Symbol("my")});var Se=C((Ml,Ar)=>{"use strict";var no=Ve(),so=bt(),oo=ve(),{isClean:be,my:io}=We();function Ct(s,e){let t=new s.constructor;for(let r in s){if(!Object.prototype.hasOwnProperty.call(s,r)||r==="proxyCache")continue;let n=s[r],o=typeof n;r==="parent"&&o==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(i=>Ct(i,t)):(o==="object"&&n!==null&&(n=Ct(n)),t[r]=n)}return t}function G(s,e){if(e&&typeof e.offset<"u")return e.offset;let t=1,r=1,n=0;for(let o=0;o<s.length;o++){if(r===e.line&&t===e.column){n=o;break}s[o]===`
`?(t=1,r+=1):t+=1}return n}var xe=class{get proxyOf(){return this}constructor(e={}){this.raws={},this[be]=!1,this[io]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){for(let t in e)this[t]=e[t];return this}before(e){return this.parent.insertBefore(this,e),this}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}clone(e={}){let t=Ct(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(e,t={}){if(this.source){let{end:r,start:n}=this.rangeBy(t);return this.source.input.error(e,{column:n.column,line:n.line},{column:r.column,line:r.line},t)}return new no(e)}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0}}}markClean(){this[be]=!0}markDirty(){if(this[be]){this[be]=!1;let e=this;for(;e=e.parent;)e[be]=!1}}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e={}){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r="document"in this.source.input?this.source.input.document:this.source.input.css,o=r.slice(G(r,this.source.start),G(r,this.source.end)).indexOf(e.word);o!==-1&&(t=this.positionInside(o))}return t}positionInside(e){let t=this.source.start.column,r=this.source.start.line,n="document"in this.source.input?this.source.input.document:this.source.input.css,o=G(n,this.source.start),i=o+e;for(let a=o;a<i;a++)n[a]===`
`?(t=1,r+=1):t+=1;return{column:t,line:r,offset:i}}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}rangeBy(e={}){let t="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:G(t,this.source.start)},n=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:G(t,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(e.word){let i=t.slice(G(t,this.source.start),G(t,this.source.end)).indexOf(e.word);i!==-1&&(r=this.positionInside(i),n=this.positionInside(i+e.word.length))}else e.start?r={column:e.start.column,line:e.start.line,offset:G(t,e.start)}:e.index&&(r=this.positionInside(e.index)),e.end?n={column:e.end.column,line:e.end.line,offset:G(t,e.end)}:typeof e.endIndex=="number"?n=this.positionInside(e.endIndex):e.index&&(n=this.positionInside(e.index+1));return(n.line<r.line||n.line===r.line&&n.column<=r.column)&&(n={column:r.column+1,line:r.line,offset:r.offset+1}),{end:n,start:r}}raw(e,t){return new so().raw(this,e,t)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}toJSON(e,t){let r={},n=t==null;t=t||new Map;let o=0;for(let i in this){if(!Object.prototype.hasOwnProperty.call(this,i)||i==="parent"||i==="proxyCache")continue;let a=this[i];if(Array.isArray(a))r[i]=a.map(l=>typeof l=="object"&&l.toJSON?l.toJSON(null,t):l);else if(typeof a=="object"&&a.toJSON)r[i]=a.toJSON(null,t);else if(i==="source"){if(a==null)continue;let l=t.get(a.input);l==null&&(l=o,t.set(a.input,o),o++),r[i]={end:a.end,inputId:l,start:a.start}}else r[i]=a}return n&&(r.inputs=[...t.keys()].map(i=>i.toJSON())),r}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(e=oo){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}warn(e,t,r={}){let n={node:this};for(let o in r)n[o]=r[o];return e.warn(t,n)}};Ar.exports=xe;xe.default=xe});var _e=C((Ll,Mr)=>{"use strict";var lo=Se(),Ce=class extends lo{constructor(e){super(e),this.type="comment"}};Mr.exports=Ce;Ce.default=Ce});var Oe=C(($l,Lr)=>{"use strict";var ao=Se(),Ee=class extends ao{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(e){e&&typeof e.value<"u"&&typeof e.value!="string"&&(e={...e,value:String(e.value)}),super(e),this.type="decl"}};Lr.exports=Ee;Ee.default=Ee});var J=C((kl,Dr)=>{"use strict";var $r=_e(),kr=Oe(),co=Se(),{isClean:Rr,my:Pr}=We(),_t,Ir,Nr,Et;function qr(s){return s.map(e=>(e.nodes&&(e.nodes=qr(e.nodes)),delete e.source,e))}function Tr(s){if(s[Rr]=!1,s.proxyOf.nodes)for(let e of s.proxyOf.nodes)Tr(e)}var z=class s extends co{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}every(e){return this.nodes.every(e)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(o,i)=>n(o.toProxy(),i):n)):t==="every"||t==="some"?r=>e[t]((n,...o)=>r(n.toProxy(),...o)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0}}}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let i of n)this.proxyOf.nodes.splice(r+1,0,i);let o;for(let i in this.indexes)o=this.indexes[i],r<o&&(this.indexes[i]=o+n.length);return this.markDirty(),this}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,o=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let a of o)this.proxyOf.nodes.splice(r,0,a);let i;for(let a in this.indexes)i=this.indexes[a],r<=i&&(this.indexes[a]=i+o.length);return this.markDirty(),this}normalize(e,t){if(typeof e=="string")e=qr(Ir(e).nodes);else if(typeof e>"u")e=[];else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value>"u")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new kr(e)]}else if(e.selector||e.selectors)e=[new Et(e)];else if(e.name)e=[new _t(e)];else if(e.text)e=[new $r(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[Pr]||s.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[Rr]&&Tr(n),n.raws||(n.raws={}),typeof n.raws.before>"u"&&t&&typeof t.raws.before<"u"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(o){throw t.addToError(o)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}};z.registerParse=s=>{Ir=s};z.registerRule=s=>{Et=s};z.registerAtRule=s=>{_t=s};z.registerRoot=s=>{Nr=s};Dr.exports=z;z.default=z;z.rebuild=s=>{s.type==="atrule"?Object.setPrototypeOf(s,_t.prototype):s.type==="rule"?Object.setPrototypeOf(s,Et.prototype):s.type==="decl"?Object.setPrototypeOf(s,kr.prototype):s.type==="comment"?Object.setPrototypeOf(s,$r.prototype):s.type==="root"&&Object.setPrototypeOf(s,Nr.prototype),s[Pr]=!0,s.nodes&&s.nodes.forEach(e=>{z.rebuild(e)})}});var Ge=C((Rl,Ur)=>{"use strict";var Br=J(),ie=class extends Br{constructor(e){super(e),this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Ur.exports=ie;ie.default=ie;Br.registerAtRule(ie)});var Ke=C((Pl,jr)=>{"use strict";var uo=J(),zr,Fr,Z=class extends uo{constructor(e){super({type:"document",...e}),this.nodes||(this.nodes=[])}toResult(e={}){return new zr(new Fr,this,e).stringify()}};Z.registerLazyResult=s=>{zr=s};Z.registerProcessor=s=>{Fr=s};jr.exports=Z;Z.default=Z});var Wr=C((Il,Vr)=>{var fo="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",ho=(s,e=21)=>(t=e)=>{let r="",n=t|0;for(;n--;)r+=s[Math.random()*s.length|0];return r},po=(s=21)=>{let e="",t=s|0;for(;t--;)e+=fo[Math.random()*64|0];return e};Vr.exports={nanoid:po,customAlphabet:ho}});var Kr=C(Ot=>{var Gr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Ot.encode=function(s){if(0<=s&&s<Gr.length)return Gr[s];throw new TypeError("Must be between 0 and 63: "+s)};Ot.decode=function(s){var e=65,t=90,r=97,n=122,o=48,i=57,a=43,l=47,u=26,c=52;return e<=s&&s<=t?s-e:r<=s&&s<=n?s-r+u:o<=s&&s<=i?s-o+c:s==a?62:s==l?63:-1}});var Lt=C(Mt=>{var Hr=Kr(),At=5,Qr=1<<At,Jr=Qr-1,Yr=Qr;function mo(s){return s<0?(-s<<1)+1:(s<<1)+0}function go(s){var e=(s&1)===1,t=s>>1;return e?-t:t}Mt.encode=function(e){var t="",r,n=mo(e);do r=n&Jr,n>>>=At,n>0&&(r|=Yr),t+=Hr.encode(r);while(n>0);return t};Mt.decode=function(e,t,r){var n=e.length,o=0,i=0,a,l;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(l=Hr.decode(e.charCodeAt(t++)),l===-1)throw new Error("Invalid base64 digit: "+e.charAt(t-1));a=!!(l&Yr),l&=Jr,o=o+(l<<i),i+=At}while(a);r.value=go(o),r.rest=t}});var ae=C(N=>{function yo(s,e,t){if(e in s)return s[e];if(arguments.length===3)return t;throw new Error('"'+e+'" is a required argument.')}N.getArg=yo;var Xr=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,wo=/^data:.+\,.+$/;function Ae(s){var e=s.match(Xr);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}N.urlParse=Ae;function le(s){var e="";return s.scheme&&(e+=s.scheme+":"),e+="//",s.auth&&(e+=s.auth+"@"),s.host&&(e+=s.host),s.port&&(e+=":"+s.port),s.path&&(e+=s.path),e}N.urlGenerate=le;var vo=32;function bo(s){var e=[];return function(t){for(var r=0;r<e.length;r++)if(e[r].input===t){var n=e[0];return e[0]=e[r],e[r]=n,e[0].result}var o=s(t);return e.unshift({input:t,result:o}),e.length>vo&&e.pop(),o}}var $t=bo(function(e){var t=e,r=Ae(e);if(r){if(!r.path)return e;t=r.path}for(var n=N.isAbsolute(t),o=[],i=0,a=0;;)if(i=a,a=t.indexOf("/",i),a===-1){o.push(t.slice(i));break}else for(o.push(t.slice(i,a));a<t.length&&t[a]==="/";)a++;for(var l,u=0,a=o.length-1;a>=0;a--)l=o[a],l==="."?o.splice(a,1):l===".."?u++:u>0&&(l===""?(o.splice(a+1,u),u=0):(o.splice(a,2),u--));return t=o.join("/"),t===""&&(t=n?"/":"."),r?(r.path=t,le(r)):t});N.normalize=$t;function Zr(s,e){s===""&&(s="."),e===""&&(e=".");var t=Ae(e),r=Ae(s);if(r&&(s=r.path||"/"),t&&!t.scheme)return r&&(t.scheme=r.scheme),le(t);if(t||e.match(wo))return e;if(r&&!r.host&&!r.path)return r.host=e,le(r);var n=e.charAt(0)==="/"?e:$t(s.replace(/\/+$/,"")+"/"+e);return r?(r.path=n,le(r)):n}N.join=Zr;N.isAbsolute=function(s){return s.charAt(0)==="/"||Xr.test(s)};function xo(s,e){s===""&&(s="."),s=s.replace(/\/$/,"");for(var t=0;e.indexOf(s+"/")!==0;){var r=s.lastIndexOf("/");if(r<0||(s=s.slice(0,r),s.match(/^([^\/]+:\/)?\/*$/)))return e;++t}return Array(t+1).join("../")+e.substr(s.length+1)}N.relative=xo;var en=(function(){var s=Object.create(null);return!("__proto__"in s)})();function tn(s){return s}function So(s){return rn(s)?"$"+s:s}N.toSetString=en?tn:So;function Co(s){return rn(s)?s.slice(1):s}N.fromSetString=en?tn:Co;function rn(s){if(!s)return!1;var e=s.length;if(e<9||s.charCodeAt(e-1)!==95||s.charCodeAt(e-2)!==95||s.charCodeAt(e-3)!==111||s.charCodeAt(e-4)!==116||s.charCodeAt(e-5)!==111||s.charCodeAt(e-6)!==114||s.charCodeAt(e-7)!==112||s.charCodeAt(e-8)!==95||s.charCodeAt(e-9)!==95)return!1;for(var t=e-10;t>=0;t--)if(s.charCodeAt(t)!==36)return!1;return!0}function _o(s,e,t){var r=K(s.source,e.source);return r!==0||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}N.compareByOriginalPositions=_o;function Eo(s,e,t){var r;return r=s.originalLine-e.originalLine,r!==0||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}N.compareByOriginalPositionsNoSource=Eo;function Oo(s,e,t){var r=s.generatedLine-e.generatedLine;return r!==0||(r=s.generatedColumn-e.generatedColumn,r!==0||t)||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}N.compareByGeneratedPositionsDeflated=Oo;function Ao(s,e,t){var r=s.generatedColumn-e.generatedColumn;return r!==0||t||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}N.compareByGeneratedPositionsDeflatedNoLine=Ao;function K(s,e){return s===e?0:s===null?1:e===null?-1:s>e?1:-1}function Mo(s,e){var t=s.generatedLine-e.generatedLine;return t!==0||(t=s.generatedColumn-e.generatedColumn,t!==0)||(t=K(s.source,e.source),t!==0)||(t=s.originalLine-e.originalLine,t!==0)||(t=s.originalColumn-e.originalColumn,t!==0)?t:K(s.name,e.name)}N.compareByGeneratedPositionsInflated=Mo;function Lo(s){return JSON.parse(s.replace(/^\)]}'[^\n]*\n/,""))}N.parseSourceMapInput=Lo;function $o(s,e,t){if(e=e||"",s&&(s[s.length-1]!=="/"&&e[0]!=="/"&&(s+="/"),e=s+e),t){var r=Ae(t);if(!r)throw new Error("sourceMapURL could not be parsed");if(r.path){var n=r.path.lastIndexOf("/");n>=0&&(r.path=r.path.substring(0,n+1))}e=Zr(le(r),e)}return $t(e)}N.computeSourceURL=$o});var Pt=C(nn=>{var kt=ae(),Rt=Object.prototype.hasOwnProperty,ee=typeof Map<"u";function H(){this._array=[],this._set=ee?new Map:Object.create(null)}H.fromArray=function(e,t){for(var r=new H,n=0,o=e.length;n<o;n++)r.add(e[n],t);return r};H.prototype.size=function(){return ee?this._set.size:Object.getOwnPropertyNames(this._set).length};H.prototype.add=function(e,t){var r=ee?e:kt.toSetString(e),n=ee?this.has(e):Rt.call(this._set,r),o=this._array.length;(!n||t)&&this._array.push(e),n||(ee?this._set.set(e,o):this._set[r]=o)};H.prototype.has=function(e){if(ee)return this._set.has(e);var t=kt.toSetString(e);return Rt.call(this._set,t)};H.prototype.indexOf=function(e){if(ee){var t=this._set.get(e);if(t>=0)return t}else{var r=kt.toSetString(e);if(Rt.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')};H.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};H.prototype.toArray=function(){return this._array.slice()};nn.ArraySet=H});var ln=C(on=>{var sn=ae();function ko(s,e){var t=s.generatedLine,r=e.generatedLine,n=s.generatedColumn,o=e.generatedColumn;return r>t||r==t&&o>=n||sn.compareByGeneratedPositionsInflated(s,e)<=0}function He(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}He.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)};He.prototype.add=function(e){ko(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};He.prototype.toArray=function(){return this._sorted||(this._array.sort(sn.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};on.MappingList=He});var It=C(an=>{var Me=Lt(),R=ae(),Qe=Pt().ArraySet,Ro=ln().MappingList;function B(s){s||(s={}),this._file=R.getArg(s,"file",null),this._sourceRoot=R.getArg(s,"sourceRoot",null),this._skipValidation=R.getArg(s,"skipValidation",!1),this._ignoreInvalidMapping=R.getArg(s,"ignoreInvalidMapping",!1),this._sources=new Qe,this._names=new Qe,this._mappings=new Ro,this._sourcesContents=null}B.prototype._version=3;B.fromSourceMap=function(e,t){var r=e.sourceRoot,n=new B(Object.assign(t||{},{file:e.file,sourceRoot:r}));return e.eachMapping(function(o){var i={generated:{line:o.generatedLine,column:o.generatedColumn}};o.source!=null&&(i.source=o.source,r!=null&&(i.source=R.relative(r,i.source)),i.original={line:o.originalLine,column:o.originalColumn},o.name!=null&&(i.name=o.name)),n.addMapping(i)}),e.sources.forEach(function(o){var i=o;r!==null&&(i=R.relative(r,o)),n._sources.has(i)||n._sources.add(i);var a=e.sourceContentFor(o);a!=null&&n.setSourceContent(o,a)}),n};B.prototype.addMapping=function(e){var t=R.getArg(e,"generated"),r=R.getArg(e,"original",null),n=R.getArg(e,"source",null),o=R.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(t,r,n,o)===!1||(n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:n,name:o}))};B.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=R.relative(this._sourceRoot,r)),t!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[R.toSetString(r)]=t):this._sourcesContents&&(delete this._sourcesContents[R.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};B.prototype.applySourceMap=function(e,t,r){var n=t;if(t==null){if(e.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=e.file}var o=this._sourceRoot;o!=null&&(n=R.relative(o,n));var i=new Qe,a=new Qe;this._mappings.unsortedForEach(function(l){if(l.source===n&&l.originalLine!=null){var u=e.originalPositionFor({line:l.originalLine,column:l.originalColumn});u.source!=null&&(l.source=u.source,r!=null&&(l.source=R.join(r,l.source)),o!=null&&(l.source=R.relative(o,l.source)),l.originalLine=u.line,l.originalColumn=u.column,u.name!=null&&(l.name=u.name))}var c=l.source;c!=null&&!i.has(c)&&i.add(c);var h=l.name;h!=null&&!a.has(h)&&a.add(h)},this),this._sources=i,this._names=a,e.sources.forEach(function(l){var u=e.sourceContentFor(l);u!=null&&(r!=null&&(l=R.join(r,l)),o!=null&&(l=R.relative(o,l)),this.setSourceContent(l,u))},this)};B.prototype._validateMapping=function(e,t,r,n){if(t&&typeof t.line!="number"&&typeof t.column!="number"){var o="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!t&&!r&&!n)){if(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&r)return;var o="Invalid mapping: "+JSON.stringify({generated:e,source:r,original:t,name:n});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}};B.prototype._serializeMappings=function(){for(var e=0,t=1,r=0,n=0,o=0,i=0,a="",l,u,c,h,f=this._mappings.toArray(),p=0,d=f.length;p<d;p++){if(u=f[p],l="",u.generatedLine!==t)for(e=0;u.generatedLine!==t;)l+=";",t++;else if(p>0){if(!R.compareByGeneratedPositionsInflated(u,f[p-1]))continue;l+=","}l+=Me.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(h=this._sources.indexOf(u.source),l+=Me.encode(h-i),i=h,l+=Me.encode(u.originalLine-1-n),n=u.originalLine-1,l+=Me.encode(u.originalColumn-r),r=u.originalColumn,u.name!=null&&(c=this._names.indexOf(u.name),l+=Me.encode(c-o),o=c)),a+=l}return a};B.prototype._generateSourcesContent=function(e,t){return e.map(function(r){if(!this._sourcesContents)return null;t!=null&&(r=R.relative(t,r));var n=R.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)};B.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};B.prototype.toString=function(){return JSON.stringify(this.toJSON())};an.SourceMapGenerator=B});var cn=C(te=>{te.GREATEST_LOWER_BOUND=1;te.LEAST_UPPER_BOUND=2;function Nt(s,e,t,r,n,o){var i=Math.floor((e-s)/2)+s,a=n(t,r[i],!0);return a===0?i:a>0?e-i>1?Nt(i,e,t,r,n,o):o==te.LEAST_UPPER_BOUND?e<r.length?e:-1:i:i-s>1?Nt(s,i,t,r,n,o):o==te.LEAST_UPPER_BOUND?i:s<0?-1:s}te.search=function(e,t,r,n){if(t.length===0)return-1;var o=Nt(-1,t.length,e,t,r,n||te.GREATEST_LOWER_BOUND);if(o<0)return-1;for(;o-1>=0&&r(t[o],t[o-1],!0)===0;)--o;return o}});var hn=C(fn=>{function Po(s){function e(n,o,i){var a=n[o];n[o]=n[i],n[i]=a}function t(n,o){return Math.round(n+Math.random()*(o-n))}function r(n,o,i,a){if(i<a){var l=t(i,a),u=i-1;e(n,l,a);for(var c=n[a],h=i;h<a;h++)o(n[h],c,!1)<=0&&(u+=1,e(n,u,h));e(n,u+1,h);var f=u+1;r(n,o,i,f-1),r(n,o,f+1,a)}}return r}function Io(s){let e=Po.toString();return new Function(`return ${e}`)()(s)}var un=new WeakMap;fn.quickSort=function(s,e,t=0){let r=un.get(e);r===void 0&&(r=Io(e),un.set(e,r)),r(s,e,t,s.length-1)}});var mn=C(Je=>{var b=ae(),Tt=cn(),ce=Pt().ArraySet,No=Lt(),Le=hn().quickSort;function $(s,e){var t=s;return typeof s=="string"&&(t=b.parseSourceMapInput(s)),t.sections!=null?new F(t,e):new q(t,e)}$.fromSourceMap=function(s,e){return q.fromSourceMap(s,e)};$.prototype._version=3;$.prototype.__generatedMappings=null;Object.defineProperty($.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});$.prototype.__originalMappings=null;Object.defineProperty($.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});$.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return r===";"||r===","};$.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")};$.GENERATED_ORDER=1;$.ORIGINAL_ORDER=2;$.GREATEST_LOWER_BOUND=1;$.LEAST_UPPER_BOUND=2;$.prototype.eachMapping=function(e,t,r){var n=t||null,o=r||$.GENERATED_ORDER,i;switch(o){case $.GENERATED_ORDER:i=this._generatedMappings;break;case $.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var a=this.sourceRoot,l=e.bind(n),u=this._names,c=this._sources,h=this._sourceMapURL,f=0,p=i.length;f<p;f++){var d=i[f],w=d.source===null?null:c.at(d.source);w!==null&&(w=b.computeSourceURL(a,w,h)),l({source:w,generatedLine:d.generatedLine,generatedColumn:d.generatedColumn,originalLine:d.originalLine,originalColumn:d.originalColumn,name:d.name===null?null:u.at(d.name)})}};$.prototype.allGeneratedPositionsFor=function(e){var t=b.getArg(e,"line"),r={source:b.getArg(e,"source"),originalLine:t,originalColumn:b.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var n=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",b.compareByOriginalPositions,Tt.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(e.column===void 0)for(var a=i.originalLine;i&&i.originalLine===a;)n.push({line:b.getArg(i,"generatedLine",null),column:b.getArg(i,"generatedColumn",null),lastColumn:b.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var l=i.originalColumn;i&&i.originalLine===t&&i.originalColumn==l;)n.push({line:b.getArg(i,"generatedLine",null),column:b.getArg(i,"generatedColumn",null),lastColumn:b.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return n};Je.SourceMapConsumer=$;function q(s,e){var t=s;typeof s=="string"&&(t=b.parseSourceMapInput(s));var r=b.getArg(t,"version"),n=b.getArg(t,"sources"),o=b.getArg(t,"names",[]),i=b.getArg(t,"sourceRoot",null),a=b.getArg(t,"sourcesContent",null),l=b.getArg(t,"mappings"),u=b.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);i&&(i=b.normalize(i)),n=n.map(String).map(b.normalize).map(function(c){return i&&b.isAbsolute(i)&&b.isAbsolute(c)?b.relative(i,c):c}),this._names=ce.fromArray(o.map(String),!0),this._sources=ce.fromArray(n,!0),this._absoluteSources=this._sources.toArray().map(function(c){return b.computeSourceURL(i,c,e)}),this.sourceRoot=i,this.sourcesContent=a,this._mappings=l,this._sourceMapURL=e,this.file=u}q.prototype=Object.create($.prototype);q.prototype.consumer=$;q.prototype._findSourceIndex=function(s){var e=s;if(this.sourceRoot!=null&&(e=b.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var t;for(t=0;t<this._absoluteSources.length;++t)if(this._absoluteSources[t]==s)return t;return-1};q.fromSourceMap=function(e,t){var r=Object.create(q.prototype),n=r._names=ce.fromArray(e._names.toArray(),!0),o=r._sources=ce.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=t,r._absoluteSources=r._sources.toArray().map(function(p){return b.computeSourceURL(r.sourceRoot,p,t)});for(var i=e._mappings.toArray().slice(),a=r.__generatedMappings=[],l=r.__originalMappings=[],u=0,c=i.length;u<c;u++){var h=i[u],f=new dn;f.generatedLine=h.generatedLine,f.generatedColumn=h.generatedColumn,h.source&&(f.source=o.indexOf(h.source),f.originalLine=h.originalLine,f.originalColumn=h.originalColumn,h.name&&(f.name=n.indexOf(h.name)),l.push(f)),a.push(f)}return Le(r.__originalMappings,b.compareByOriginalPositions),r};q.prototype._version=3;Object.defineProperty(q.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function dn(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var qt=b.compareByGeneratedPositionsDeflatedNoLine;function pn(s,e){let t=s.length,r=s.length-e;if(!(r<=1))if(r==2){let n=s[e],o=s[e+1];qt(n,o)>0&&(s[e]=o,s[e+1]=n)}else if(r<20)for(let n=e;n<t;n++)for(let o=n;o>e;o--){let i=s[o-1],a=s[o];if(qt(i,a)<=0)break;s[o-1]=a,s[o]=i}else Le(s,qt,e)}q.prototype._parseMappings=function(e,t){var r=1,n=0,o=0,i=0,a=0,l=0,u=e.length,c=0,h={},f={},p=[],d=[],w,y,g,m,S;let _=0;for(;c<u;)if(e.charAt(c)===";")r++,c++,n=0,pn(d,_),_=d.length;else if(e.charAt(c)===",")c++;else{for(w=new dn,w.generatedLine=r,m=c;m<u&&!this._charIsMappingSeparator(e,m);m++);for(y=e.slice(c,m),g=[];c<m;)No.decode(e,c,f),S=f.value,c=f.rest,g.push(S);if(g.length===2)throw new Error("Found a source, but no line and column");if(g.length===3)throw new Error("Found a source and line, but no column");if(w.generatedColumn=n+g[0],n=w.generatedColumn,g.length>1&&(w.source=a+g[1],a+=g[1],w.originalLine=o+g[2],o=w.originalLine,w.originalLine+=1,w.originalColumn=i+g[3],i=w.originalColumn,g.length>4&&(w.name=l+g[4],l+=g[4])),d.push(w),typeof w.originalLine=="number"){let v=w.source;for(;p.length<=v;)p.push(null);p[v]===null&&(p[v]=[]),p[v].push(w)}}pn(d,_),this.__generatedMappings=d;for(var x=0;x<p.length;x++)p[x]!=null&&Le(p[x],b.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...p)};q.prototype._findMapping=function(e,t,r,n,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return Tt.search(e,t,o,i)};q.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}};q.prototype.originalPositionFor=function(e){var t={generatedLine:b.getArg(e,"line"),generatedColumn:b.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",b.compareByGeneratedPositionsDeflated,b.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(r>=0){var n=this._generatedMappings[r];if(n.generatedLine===t.generatedLine){var o=b.getArg(n,"source",null);o!==null&&(o=this._sources.at(o),o=b.computeSourceURL(this.sourceRoot,o,this._sourceMapURL));var i=b.getArg(n,"name",null);return i!==null&&(i=this._names.at(i)),{source:o,line:b.getArg(n,"originalLine",null),column:b.getArg(n,"originalColumn",null),name:i}}}return{source:null,line:null,column:null,name:null}};q.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};q.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var n=e;this.sourceRoot!=null&&(n=b.relative(this.sourceRoot,n));var o;if(this.sourceRoot!=null&&(o=b.urlParse(this.sourceRoot))){var i=n.replace(/^file:\/\//,"");if(o.scheme=="file"&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!o.path||o.path=="/")&&this._sources.has("/"+n))return this.sourcesContent[this._sources.indexOf("/"+n)]}if(t)return null;throw new Error('"'+n+'" is not in the SourceMap.')};q.prototype.generatedPositionFor=function(e){var t=b.getArg(e,"source");if(t=this._findSourceIndex(t),t<0)return{line:null,column:null,lastColumn:null};var r={source:t,originalLine:b.getArg(e,"line"),originalColumn:b.getArg(e,"column")},n=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",b.compareByOriginalPositions,b.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(n>=0){var o=this._originalMappings[n];if(o.source===r.source)return{line:b.getArg(o,"generatedLine",null),column:b.getArg(o,"generatedColumn",null),lastColumn:b.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};Je.BasicSourceMapConsumer=q;function F(s,e){var t=s;typeof s=="string"&&(t=b.parseSourceMapInput(s));var r=b.getArg(t,"version"),n=b.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new ce,this._names=new ce;var o={line:-1,column:0};this._sections=n.map(function(i){if(i.url)throw new Error("Support for url field in sections not implemented.");var a=b.getArg(i,"offset"),l=b.getArg(a,"line"),u=b.getArg(a,"column");if(l<o.line||l===o.line&&u<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=a,{generatedOffset:{generatedLine:l+1,generatedColumn:u+1},consumer:new $(b.getArg(i,"map"),e)}})}F.prototype=Object.create($.prototype);F.prototype.constructor=$;F.prototype._version=3;Object.defineProperty(F.prototype,"sources",{get:function(){for(var s=[],e=0;e<this._sections.length;e++)for(var t=0;t<this._sections[e].consumer.sources.length;t++)s.push(this._sections[e].consumer.sources[t]);return s}});F.prototype.originalPositionFor=function(e){var t={generatedLine:b.getArg(e,"line"),generatedColumn:b.getArg(e,"column")},r=Tt.search(t,this._sections,function(o,i){var a=o.generatedLine-i.generatedOffset.generatedLine;return a||o.generatedColumn-i.generatedOffset.generatedColumn}),n=this._sections[r];return n?n.consumer.originalPositionFor({line:t.generatedLine-(n.generatedOffset.generatedLine-1),column:t.generatedColumn-(n.generatedOffset.generatedLine===t.generatedLine?n.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};F.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};F.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r],o=n.consumer.sourceContentFor(e,!0);if(o||o==="")return o}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')};F.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(r.consumer._findSourceIndex(b.getArg(e,"source"))!==-1){var n=r.consumer.generatedPositionFor(e);if(n){var o={line:n.line+(r.generatedOffset.generatedLine-1),column:n.column+(r.generatedOffset.generatedLine===n.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}};F.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var n=this._sections[r],o=n.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],l=n.consumer._sources.at(a.source);l!==null&&(l=b.computeSourceURL(n.consumer.sourceRoot,l,this._sourceMapURL)),this._sources.add(l),l=this._sources.indexOf(l);var u=null;a.name&&(u=n.consumer._names.at(a.name),this._names.add(u),u=this._names.indexOf(u));var c={source:l,generatedLine:a.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(n.generatedOffset.generatedLine===a.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:u};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}Le(this.__generatedMappings,b.compareByGeneratedPositionsDeflated),Le(this.__originalMappings,b.compareByOriginalPositions)};Je.IndexedSourceMapConsumer=F});var yn=C(gn=>{var qo=It().SourceMapGenerator,Ye=ae(),To=/(\r?\n)/,Do=10,ue="$$$isSourceNode$$$";function D(s,e,t,r,n){this.children=[],this.sourceContents={},this.line=s??null,this.column=e??null,this.source=t??null,this.name=n??null,this[ue]=!0,r!=null&&this.add(r)}D.fromStringWithSourceMap=function(e,t,r){var n=new D,o=e.split(To),i=0,a=function(){var f=d(),p=d()||"";return f+p;function d(){return i<o.length?o[i++]:void 0}},l=1,u=0,c=null;return t.eachMapping(function(f){if(c!==null)if(l<f.generatedLine)h(c,a()),l++,u=0;else{var p=o[i]||"",d=p.substr(0,f.generatedColumn-u);o[i]=p.substr(f.generatedColumn-u),u=f.generatedColumn,h(c,d),c=f;return}for(;l<f.generatedLine;)n.add(a()),l++;if(u<f.generatedColumn){var p=o[i]||"";n.add(p.substr(0,f.generatedColumn)),o[i]=p.substr(f.generatedColumn),u=f.generatedColumn}c=f},this),i<o.length&&(c&&h(c,a()),n.add(o.splice(i).join(""))),t.sources.forEach(function(f){var p=t.sourceContentFor(f);p!=null&&(r!=null&&(f=Ye.join(r,f)),n.setSourceContent(f,p))}),n;function h(f,p){if(f===null||f.source===void 0)n.add(p);else{var d=r?Ye.join(r,f.source):f.source;n.add(new D(f.originalLine,f.originalColumn,d,p,f.name))}}};D.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(t){this.add(t)},this);else if(e[ue]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};D.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[ue]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};D.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)t=this.children[r],t[ue]?t.walk(e):t!==""&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})};D.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this};D.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[ue]?r.replaceRight(e,t):typeof r=="string"?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this};D.prototype.setSourceContent=function(e,t){this.sourceContents[Ye.toSetString(e)]=t};D.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][ue]&&this.children[t].walkSourceContents(e);for(var n=Object.keys(this.sourceContents),t=0,r=n.length;t<r;t++)e(Ye.fromSetString(n[t]),this.sourceContents[n[t]])};D.prototype.toString=function(){var e="";return this.walk(function(t){e+=t}),e};D.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new qo(e),n=!1,o=null,i=null,a=null,l=null;return this.walk(function(u,c){t.code+=u,c.source!==null&&c.line!==null&&c.column!==null?((o!==c.source||i!==c.line||a!==c.column||l!==c.name)&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name}),o=c.source,i=c.line,a=c.column,l=c.name,n=!0):n&&(r.addMapping({generated:{line:t.line,column:t.column}}),o=null,n=!1);for(var h=0,f=u.length;h<f;h++)u.charCodeAt(h)===Do?(t.line++,t.column=0,h+1===f?(o=null,n=!1):n&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name})):t.column++}),this.walkSourceContents(function(u,c){r.setSourceContent(u,c)}),{code:t.code,map:r}};gn.SourceNode=D});var Ze=C(Xe=>{Xe.SourceMapGenerator=It().SourceMapGenerator;Xe.SourceMapConsumer=mn().SourceMapConsumer;Xe.SourceNode=yn().SourceNode});var Bt=C((Gl,bn)=>{"use strict";var{existsSync:Bo,readFileSync:Uo}=require("fs"),{dirname:Dt,join:zo}=require("path"),{SourceMapConsumer:wn,SourceMapGenerator:vn}=Ze();function Fo(s){return Buffer?Buffer.from(s,"base64").toString():window.atob(s)}var $e=class{constructor(e,t){if(t.map===!1)return;t.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:");let r=t.map?t.map.prev:void 0,n=this.loadMap(t.from,r);!this.mapFile&&t.from&&(this.mapFile=t.from),this.mapFile&&(this.root=Dt(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new wn(this.json||this.text)),this.consumerCache}decodeInline(e){let t=/^data:application\/json;charset=utf-?8;base64,/,r=/^data:application\/json;base64,/,n=/^data:application\/json;charset=utf-?8,/,o=/^data:application\/json,/,i=e.match(n)||e.match(o);if(i)return decodeURIComponent(e.substr(i[0].length));let a=e.match(t)||e.match(r);if(a)return Fo(e.substr(a[0].length));let l=e.slice(22);throw l=l.slice(0,l.indexOf(",")),new Error("Unsupported source map encoding "+l)}getAnnotationURL(e){return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){return typeof e!="object"?!1:typeof e.mappings=="string"||typeof e._mappings=="string"||Array.isArray(e.sections)}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return;let r=e.lastIndexOf(t.pop()),n=e.indexOf("*/",r);r>-1&&n>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,n)))}loadFile(e,t,r){if(!(!r&&!this.unsafeMap&&!/\.map$/i.test(e))&&(this.root=Dt(e),Bo(e)))return this.mapFile=e,Uo(e,"utf-8").toString().trim()}loadMap(e,t){if(t===!1)return!1;if(t){if(typeof t=="string")return t;if(typeof t=="function"){let r=t(e);if(r){let n=this.loadFile(r,e,!0);if(!n)throw new Error("Unable to load previous source map: "+r.toString());return n}}else{if(t instanceof wn)return vn.fromSourceMap(t).toString();if(t instanceof vn)return t.toString();if(this.isMap(t))return JSON.stringify(t);throw new Error("Unsupported previous source map format: "+t.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;e&&(r=zo(Dt(e),r));let n=this.loadFile(r,e,!1);if(n)try{this.json=JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}catch{return}return n}}}startWith(e,t){return e?e.substr(0,t.length)===t:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};bn.exports=$e;$e.default=$e});var ke=C((Kl,En)=>{"use strict";var{nanoid:jo}=Wr(),{isAbsolute:Ft,resolve:jt}=require("path"),{SourceMapConsumer:Vo,SourceMapGenerator:Wo}=Ze(),{fileURLToPath:xn,pathToFileURL:et}=require("url"),Sn=Ve(),Go=Bt(),Ut=vt(),zt=Symbol("lineToIndexCache"),Ko=!!(Vo&&Wo),Cn=!!(jt&&Ft);function _n(s){if(s[zt])return s[zt];let e=s.css.split(`
`),t=new Array(e.length),r=0;for(let n=0,o=e.length;n<o;n++)t[n]=r,r+=e[n].length+1;return s[zt]=t,t}var fe=class{get from(){return this.file||this.id}constructor(e,t={}){if(e===null||typeof e>"u"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,t.document&&(this.document=t.document.toString()),t.from&&(!Cn||/^\w+:\/\//.test(t.from)||Ft(t.from)?this.file=t.from:this.file=jt(t.from)),Cn&&Ko){let r=new Go(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+jo(6)+">"),this.map&&(this.map.file=this.from)}error(e,t,r,n={}){let o,i,a,l,u;if(t&&typeof t=="object"){let h=t,f=r;if(typeof h.offset=="number"){l=h.offset;let p=this.fromOffset(l);t=p.line,r=p.col}else t=h.line,r=h.column,l=this.fromLineAndColumn(t,r);if(typeof f.offset=="number"){a=f.offset;let p=this.fromOffset(a);i=p.line,o=p.col}else i=f.line,o=f.column,a=this.fromLineAndColumn(f.line,f.column)}else if(r)l=this.fromLineAndColumn(t,r);else{l=t;let h=this.fromOffset(l);t=h.line,r=h.col}let c=this.origin(t,r,i,o);return c?u=new Sn(e,c.endLine===void 0?c.line:{column:c.column,line:c.line},c.endLine===void 0?c.column:{column:c.endColumn,line:c.endLine},c.source,c.file,n.plugin):u=new Sn(e,i===void 0?t:{column:r,line:t},i===void 0?r:{column:o,line:i},this.css,this.file,n.plugin),u.input={column:r,endColumn:o,endLine:i,endOffset:a,line:t,offset:l,source:this.css},this.file&&(et&&(u.input.url=et(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(e,t){return _n(this)[e-1]+t-1}fromOffset(e){let t=_n(this),r=t[t.length-1],n=0;if(e>=r)n=t.length-1;else{let o=t.length-2,i;for(;n<o;)if(i=n+(o-n>>1),e<t[i])o=i-1;else if(e>=t[i+1])n=i+1;else{n=i;break}}return{col:e-t[n]+1,line:n+1}}mapResolve(e){return/^\w+:\/\//.test(e)?e:jt(this.map.consumer().sourceRoot||this.map.root||".",e)}origin(e,t,r,n){if(!this.map)return!1;let o=this.map.consumer(),i=o.originalPositionFor({column:t,line:e});if(!i.source)return!1;let a;typeof r=="number"&&(a=o.originalPositionFor({column:n,line:r}));let l;Ft(i.source)?l=et(i.source):l=new URL(i.source,this.map.consumer().sourceRoot||et(this.map.mapFile));let u={column:i.column,endColumn:a&&a.column,endLine:a&&a.line,line:i.line,url:l.toString()};if(l.protocol==="file:")if(xn)u.file=xn(l);else throw new Error("file: protocol is not available in this PostCSS build");let c=o.sourceContentFor(i.source);return c&&(u.source=c),u}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};En.exports=fe;fe.default=fe;Ut&&Ut.registerInput&&Ut.registerInput(fe)});var he=C((Hl,Ln)=>{"use strict";var On=J(),An,Mn,Y=class extends On{constructor(e){super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let o of n)o.raws.before=t.raws.before}return n}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}toResult(e={}){return new An(new Mn,this,e).stringify()}};Y.registerLazyResult=s=>{An=s};Y.registerProcessor=s=>{Mn=s};Ln.exports=Y;Y.default=Y;On.registerRoot(Y)});var Vt=C((Ql,$n)=>{"use strict";var Re={comma(s){return Re.split(s,[","],!0)},space(s){let e=[" ",`
`,"	"];return Re.split(s,e)},split(s,e,t){let r=[],n="",o=!1,i=0,a=!1,l="",u=!1;for(let c of s)u?u=!1:c==="\\"?u=!0:a?c===l&&(a=!1):c==='"'||c==="'"?(a=!0,l=c):c==="("?i+=1:c===")"?i>0&&(i-=1):i===0&&e.includes(c)&&(o=!0),o?(n!==""&&r.push(n.trim()),n="",o=!1):n+=c;return(t||n!=="")&&r.push(n.trim()),r}};$n.exports=Re;Re.default=Re});var tt=C((Jl,Rn)=>{"use strict";var kn=J(),Ho=Vt(),pe=class extends kn{get selectors(){return Ho.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}constructor(e){super(e),this.type="rule",this.nodes||(this.nodes=[])}};Rn.exports=pe;pe.default=pe;kn.registerRule(pe)});var In=C((Yl,Pn)=>{"use strict";var Qo=Ge(),Jo=_e(),Yo=Oe(),Xo=ke(),Zo=Bt(),ei=he(),ti=tt();function Pe(s,e){if(Array.isArray(s))return s.map(n=>Pe(n));let{inputs:t,...r}=s;if(t){e=[];for(let n of t){let o={...n,__proto__:Xo.prototype};o.map&&(o.map={...o.map,__proto__:Zo.prototype}),e.push(o)}}if(r.nodes&&(r.nodes=s.nodes.map(n=>Pe(n,e))),r.source){let{inputId:n,...o}=r.source;r.source=o,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new ei(r);if(r.type==="decl")return new Yo(r);if(r.type==="rule")return new ti(r);if(r.type==="comment")return new Jo(r);if(r.type==="atrule")return new Qo(r);throw new Error("Unknown node type: "+s.type)}Pn.exports=Pe;Pe.default=Pe});var Gt=C((Xl,Un)=>{"use strict";var{dirname:rt,relative:qn,resolve:Tn,sep:Dn}=require("path"),{SourceMapConsumer:Bn,SourceMapGenerator:nt}=Ze(),{pathToFileURL:Nn}=require("url"),ri=ke(),ni=!!(Bn&&nt),si=!!(rt&&Tn&&qn&&Dn),Wt=class{constructor(e,t,r,n){this.stringify=e,this.mapOpts=r.map||{},this.root=t,this.opts=r,this.css=n,this.originalCSS=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e;this.isInline()?e="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?e=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?e=this.mapOpts.annotation(this.opts.to,this.root):e=this.outputFile()+".map";let t=`
`;this.css.includes(`\r
`)&&(t=`\r
`),this.css+=t+"/*# sourceMappingURL="+e+" */"}applyPrevMaps(){for(let e of this.previous()){let t=this.toUrl(this.path(e.file)),r=e.root||rt(e.file),n;this.mapOpts.sourcesContent===!1?(n=new Bn(e.text),n.sourcesContent&&(n.sourcesContent=null)):n=e.consumer(),this.map.applySourceMap(n,t,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let e;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],e.type==="comment"&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)}else if(this.css){let e;for(;(e=this.css.lastIndexOf("/*#"))!==-1;){let t=this.css.indexOf("*/",e+3);if(t===-1)break;for(;e>0&&this.css[e-1]===`
`;)e--;this.css=this.css.slice(0,e)+this.css.slice(t+2)}}}}generate(){if(this.clearAnnotation(),si&&ni&&this.isMap())return this.generateMap();{let e="";return this.stringify(this.root,t=>{e+=t}),[e]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let e=this.previous()[0].consumer();e.file=this.outputFile(),this.map=nt.fromSourceMap(e,{ignoreInvalidMapping:!0})}else this.map=new nt({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new nt({file:this.outputFile(),ignoreInvalidMapping:!0});let e=1,t=1,r="<no source>",n={generated:{column:0,line:0},original:{column:0,line:0},source:""},o,i;this.stringify(this.root,(a,l,u)=>{if(this.css+=a,l&&u!=="end"&&(n.generated.line=e,n.generated.column=t-1,l.source&&l.source.start?(n.source=this.sourcePath(l),n.original.line=l.source.start.line,n.original.column=l.source.start.column-1,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,this.map.addMapping(n))),i=a.match(/\n/g),i?(e+=i.length,o=a.lastIndexOf(`
`),t=a.length-o):t+=a.length,l&&u!=="start"){let c=l.parent||{raws:{}};(!(l.type==="decl"||l.type==="atrule"&&!l.nodes)||l!==c.last||c.raws.semicolon)&&(l.source&&l.source.end?(n.source=this.sourcePath(l),n.original.line=l.source.end.line,n.original.column=l.source.end.column-1,n.generated.line=e,n.generated.column=t-2,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,n.generated.line=e,n.generated.column=t-1,this.map.addMapping(n)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(e=>e.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let e=this.mapOpts.annotation;return typeof e<"u"&&e!==!0?!1:this.previous().length?this.previous().some(t=>t.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(e=>e.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(e){if(this.mapOpts.absolute||e.charCodeAt(0)===60||/^\w+:\/\//.test(e))return e;let t=this.memoizedPaths.get(e);if(t)return t;let r=this.opts.to?rt(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=rt(Tn(r,this.mapOpts.annotation)));let n=qn(r,e);return this.memoizedPaths.set(e,n),n}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(e=>{if(e.source&&e.source.input.map){let t=e.source.input.map;this.previousMaps.includes(t)||this.previousMaps.push(t)}});else{let e=new ri(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}return this.previousMaps}setSourcesContent(){let e={};if(this.root)this.root.walk(t=>{if(t.source){let r=t.source.input.from;if(r&&!e[r]){e[r]=!0;let n=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(n,t.source.input.css)}}});else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}sourcePath(e){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))}toBase64(e){return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(Nn){let r=Nn(e).toString();return this.memoizedFileURLs.set(e,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t;Dn==="\\"&&(e=e.replace(/\\/g,"/"));let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(e,r),r}};Un.exports=Wt});var Vn=C((Zl,jn)=>{"use strict";var oi=Ge(),ii=_e(),li=Oe(),ai=he(),zn=tt(),ci=wt(),Fn={empty:!0,space:!0};function ui(s){for(let e=s.length-1;e>=0;e--){let t=s[e],r=t[3]||t[2];if(r)return r}}function Kt(s,e,t){let r="";for(let n=e;n<t;n++)r+=s[n][1];return r}var Ht=class{constructor(e){this.input=e,this.root=new ai,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0}}}atrule(e){let t=new oi;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,o,i=!1,a=!1,l=[],u=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),t.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){a=!0;break}else if(r==="}"){if(l.length>0){for(o=l.length-1,n=l[o];n&&n[0]==="space";)n=l[--o];n&&(t.source.end=this.getPosition(n[3]||n[2]),t.source.end.offset++)}this.end(e);break}else l.push(e);else l.push(e);if(this.tokenizer.endOfFile()){i=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(l),l.length?(t.raws.afterName=this.spacesAndCommentsFromStart(l),this.raw(t,"params",l),i&&(e=l[l.length-1],t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++,this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),a&&(t.nodes=[],this.current=t)}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let o=t-1;o>=0&&(n=e[o],!(n[0]!=="space"&&(r+=1,r===2)));o--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}colon(e){let t=0,r,n,o;for(let[i,a]of e.entries()){if(n=a,o=n[0],o==="("&&(t+=1),o===")"&&(t-=1),t===0&&o===":")if(!r)this.doubleColon(n);else{if(r[0]==="word"&&r[1]==="progid")continue;return i}r=n}return!1}comment(e){let t=new ii;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++;let r=e[1].slice(2,-2);if(!r.trim())t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}createTokenizer(){this.tokenizer=ci(this.input)}decl(e,t){let r=new li;this.init(r,e[0][2]);let n=e[e.length-1];n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||ui(e)),r.source.end.offset++;let o=0;for(;e[o][0]!=="word";)o===e.length-1&&this.unknownWord([e[o]]),o++;r.raws.before+=Kt(e,0,o),r.source.start=this.getPosition(e[o][2]);let i=o;for(;o<e.length;){let f=e[o][0];if(f===":"||f==="space"||f==="comment")break;o++}r.prop=Kt(e,i,o);let a=o,l;for(;o<e.length&&(l=e[o],o++,l[0]!==":");)l[0]==="word"&&/\w/.test(l[1])&&this.unknownWord([l]);r.raws.between=Kt(e,a,o),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=o;for(;o<e.length;){let f=e[o][0];if(f!=="space"&&f!=="comment")break;o++}let c=e.slice(u,o);e=e.slice(o),this.precheckMissedSemicolon(e);for(let f=e.length-1;f>=0;f--){if(l=e[f],l[1].toLowerCase()==="!important"){r.important=!0;let p=this.stringFrom(e,f);p=this.spacesFromEnd(e)+p,p!==" !important"&&(r.raws.important=p);break}else if(l[1].toLowerCase()==="important"){let p=e.slice(0),d="";for(let w=f;w>0;w--){let y=p[w][0];if(d.trim().startsWith("!")&&y!=="space")break;d=p.pop()[1]+d}d.trim().startsWith("!")&&(r.important=!0,r.raws.important=d,e=p)}if(l[0]!=="space"&&l[0]!=="comment")break}e.some(f=>f[0]!=="space"&&f[0]!=="comment")&&(r.raws.between+=c.map(f=>f[1]).join(""),c=[]),this.raw(r,"value",c.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}emptyRule(e){let t=new zn;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="",t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,start:this.getPosition(t)},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}other(e){let t=!1,r=null,n=!1,o=null,i=[],a=e[1].startsWith("--"),l=[],u=e;for(;u;){if(r=u[0],l.push(u),r==="("||r==="[")o||(o=u),i.push(r==="("?")":"]");else if(a&&n&&r==="{")o||(o=u),i.push("}");else if(i.length===0)if(r===";")if(n){this.decl(l,a);return}else break;else if(r==="{"){this.rule(l);return}else if(r==="}"){this.tokenizer.back(l.pop()),t=!0;break}else r===":"&&(n=!0);else r===i[i.length-1]&&(i.pop(),i.length===0&&(o=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),i.length>0&&this.unclosedBracket(o),t&&n){if(!a)for(;l.length&&(u=l[l.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(l.pop());this.decl(l,a)}else this.unknownWord(l)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,n){let o,i,a=r.length,l="",u=!0,c,h;for(let f=0;f<a;f+=1)o=r[f],i=o[0],i==="space"&&f===a-1&&!n?u=!1:i==="comment"?(h=r[f-1]?r[f-1][0]:"empty",c=r[f+1]?r[f+1][0]:"empty",!Fn[h]&&!Fn[c]?l.slice(-1)===","?u=!1:l+=o[1]:u=!1):l+=o[1];if(!u){let f=r.reduce((p,d)=>p+d[1],"");e.raws[t]={raw:f,value:l}}e[t]=l}rule(e){e.pop();let t=new zn;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}};jn.exports=Ht});var ot=C((ea,Wn)=>{"use strict";var fi=J(),hi=ke(),pi=Vn();function st(s,e){let t=new hi(s,e),r=new pi(t);try{r.parse()}catch(n){throw process.env.NODE_ENV!=="production"&&n.name==="CssSyntaxError"&&e&&e.from&&(/\.scss$/i.test(e.from)?n.message+=`
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser`:/\.sass/i.test(e.from)?n.message+=`
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser`:/\.less$/i.test(e.from)&&(n.message+=`
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)),n}return r.root}Wn.exports=st;st.default=st;fi.registerParse(st)});var Qt=C((ta,Gn)=>{"use strict";var Ie=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Gn.exports=Ie;Ie.default=Ie});var it=C((ra,Kn)=>{"use strict";var di=Qt(),Ne=class{get content(){return this.css}constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new di(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}};Kn.exports=Ne;Ne.default=Ne});var Jt=C((na,Qn)=>{"use strict";var Hn={};Qn.exports=function(e){Hn[e]||(Hn[e]=!0,typeof console<"u"&&console.warn&&console.warn(e))}});var Zt=C((sa,Zn)=>{"use strict";var mi=J(),gi=Ke(),yi=Gt(),wi=ot(),Jn=it(),vi=he(),bi=ve(),{isClean:j,my:xi}=We(),Si=Jt(),Ci={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},_i={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},Ei={Once:!0,postcssPlugin:!0,prepare:!0},de=0;function qe(s){return typeof s=="object"&&typeof s.then=="function"}function Xn(s){let e=!1,t=Ci[s.type];return s.type==="decl"?e=s.prop.toLowerCase():s.type==="atrule"&&(e=s.name.toLowerCase()),e&&s.append?[t,t+"-"+e,de,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:s.append?[t,de,t+"Exit"]:[t,t+"Exit"]}function Yn(s){let e;return s.type==="document"?e=["Document",de,"DocumentExit"]:s.type==="root"?e=["Root",de,"RootExit"]:e=Xn(s),{eventIndex:0,events:e,iterator:0,node:s,visitorIndex:0,visitors:[]}}function Yt(s){return s[j]=!1,s.nodes&&s.nodes.forEach(e=>Yt(e)),s}var Xt={},X=class s{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Yt(t);else if(t instanceof s||t instanceof Jn)n=Yt(t.root),t.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let o=wi;r.syntax&&(o=r.syntax.parse),r.parser&&(o=r.parser),o.parse&&(o=o.parse);try{n=o(t,r)}catch(i){this.processed=!0,this.error=i}n&&!n[xi]&&mi.rebuild(n)}this.result=new Jn(e,n,r),this.helpers={...Xt,postcss:Xt,result:this.result},this.plugins=this.processor.plugins.map(o=>typeof o=="object"&&o.prepare?{...o,...o.prepare(this.result)}:o)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{if(t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin)e.plugin=r.postcssPlugin,e.setMessage();else if(r.postcssVersion&&process.env.NODE_ENV!=="production"){let n=r.postcssPlugin,o=r.postcssVersion,i=this.result.processor.version,a=o.split("."),l=i.split(".");(a[0]!==l[0]||parseInt(a[1])>parseInt(l[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+i+", but "+n+" uses "+o+". Perhaps this is the source of the error below.")}}catch(n){console&&console.error&&console.error(n)}return e}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!_i[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!Ei[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(qe(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[j];){e[j]=!0;let t=[Yn(e)];for(;t.length>0;){let r=this.visitTick(t);if(qe(r))try{await r}catch(n){let o=t[t.length-1].node;throw this.handleError(n,o)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(o=>r(o,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return qe(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=bi;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let r=this.result.root.source;if(e.map===void 0&&!(r&&r.input&&r.input.map)){let i="";return t(this.result.root,a=>{i+=a}),this.result.css=i,this.result}let o=new yi(t,this.result.root,this.result.opts).generate();return this.result.css=o[0],this.result.map=o[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(qe(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[j];)e[j]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this.opts||Si("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this.css}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let o;try{o=n(t,this.helpers)}catch(i){throw this.handleError(i,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(qe(o))throw this.getAsyncError()}}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[i,a]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=i;try{return a(r.toProxy(),this.helpers)}catch(l){throw this.handleError(l,r)}}if(t.iterator!==0){let i=t.iterator,a;for(;a=r.nodes[r.indexes[i]];)if(r.indexes[i]+=1,!a[j]){a[j]=!0,e.push(Yn(a));return}t.iterator=0,delete r.indexes[i]}let o=t.events;for(;t.eventIndex<o.length;){let i=o[t.eventIndex];if(t.eventIndex+=1,i===de){r.nodes&&r.nodes.length&&(r[j]=!0,t.iterator=r.getIterator());return}else if(this.listeners[i]){t.visitors=this.listeners[i];return}}e.pop()}walkSync(e){e[j]=!0;let t=Xn(e);for(let r of t)if(r===de)e.nodes&&e.each(n=>{n[j]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}warnings(){return this.sync().warnings()}};X.registerPostcss=s=>{Xt=s};Zn.exports=X;X.default=X;vi.registerLazyResult(X);gi.registerLazyResult(X)});var ts=C((oa,es)=>{"use strict";var Oi=Gt(),Ai=ot(),Mi=it(),Li=ve(),$i=Jt(),Te=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let e,t=Ai;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n=Li;this.result=new Mi(this._processor,void 0,this._opts),this.result.css=t;let o=this;Object.defineProperty(this.result,"root",{get(){return o.root}});let i=new Oi(n,void 0,this._opts,t);if(i.isMap()){let[a,l]=i.generate();a&&(this.result.css=a),l&&(this.result.map=l)}else i.clearAnnotation(),this.result.css=i.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}sync(){if(this.error)throw this.error;return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this._opts||$i("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this._css}warnings(){return[]}};es.exports=Te;Te.default=Te});var ns=C((ia,rs)=>{"use strict";var ki=Ke(),Ri=Zt(),Pi=ts(),Ii=he(),re=class{constructor(e=[]){this.version="8.5.15",this.plugins=this.normalize(e)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(typeof r=="object"&&(r.parse||r.stringify)){if(process.env.NODE_ENV!=="production")throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}else throw new Error(r+" is not a PostCSS plugin");return t}process(e,t={}){return!this.plugins.length&&!t.parser&&!t.stringifier&&!t.syntax?new Pi(this,e,t):new Ri(this,e,t)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}};rs.exports=re;re.default=re;Ii.registerProcessor(re);ki.registerProcessor(re)});var fs=C((la,us)=>{"use strict";var ss=Ge(),os=_e(),Ni=J(),qi=Ve(),is=Oe(),ls=Ke(),Ti=In(),Di=ke(),Bi=Zt(),Ui=Vt(),zi=Se(),Fi=ot(),er=ns(),ji=it(),as=he(),cs=tt(),Vi=ve(),Wi=Qt();function M(...s){return s.length===1&&Array.isArray(s[0])&&(s=s[0]),new er(s)}M.plugin=function(e,t){let r=!1;function n(...i){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let a=t(...i);return a.postcssPlugin=e,a.postcssVersion=new er().version,a}let o;return Object.defineProperty(n,"postcss",{get(){return o||(o=n()),o}}),n.process=function(i,a,l){return M([n(l)]).process(i,a)},n};M.stringify=Vi;M.parse=Fi;M.fromJSON=Ti;M.list=Ui;M.comment=s=>new os(s);M.atRule=s=>new ss(s);M.decl=s=>new is(s);M.rule=s=>new cs(s);M.root=s=>new as(s);M.document=s=>new ls(s);M.CssSyntaxError=qi;M.Declaration=is;M.Container=Ni;M.Processor=er;M.Document=ls;M.Comment=os;M.Warning=Wi;M.AtRule=ss;M.Result=ji;M.Input=Di;M.Rule=cs;M.Root=as;M.Node=zi;Bi.registerPostcss(M);us.exports=M;M.default=M});var Ms=require("node:fs"),Ls=require("node:util");var L=Vs(fs(),1),tr=L.default,aa=L.default.stringify,ca=L.default.fromJSON,ua=L.default.plugin,fa=L.default.parse,ha=L.default.list,pa=L.default.document,da=L.default.comment,ma=L.default.atRule,ga=L.default.rule,ya=L.default.decl,wa=L.default.root,va=L.default.CssSyntaxError,ba=L.default.Declaration,xa=L.default.Container,Sa=L.default.Processor,Ca=L.default.Document,_a=L.default.Comment,Ea=L.default.Warning,Oa=L.default.AtRule,Aa=L.default.Result,Ma=L.default.Input,La=L.default.Rule,$a=L.default.Root,ka=L.default.Node;function De(s){return s.trim().replace(/\s+/g," ").replace(/\s*([>+~])\s*/g," $1 ").trim()}function lt(s){let e=[],t=s.replace(/url\((?:[^)"'\\]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)/gi,a=>(e.push(a),"\0"+(e.length-1)+"\0")),r="",n=0;for(;n<t.length;){if(t[n]!=="s"&&t[n]!=="S"){r+=t[n++];continue}let a=t.slice(n).match(/^selector\s*\(/i);if(a){let l=1,u=n+a[0].length,c=null,h=0;for(;u<t.length&&l>0;){let f=t[u];c?f===c&&(c=null):f==='"'||f==="'"?c=f:f==="["?h++:f==="]"?h>0&&h--:h===0&&f==="("?l++:h===0&&f===")"&&l--,u++}e.push(t.slice(n,u)),r+="\0"+(e.length-1)+"\0",n=u}else r+=t[n++]}t=r;{let a="",l=0;for(;l<t.length;)if(t[l]==="("){let u=t.slice(l+1).match(/^\s*[\w-]+\s*:/);if(u){let c=l+1+u[0].length,h=1,f=c,p=null;for(;f<t.length&&h>0;){let w=t[f];p?w===p&&(p=null):w==='"'||w==="'"?p=w:w==="("?h++:w===")"&&h--,f++}let d=t.slice(c,f-1).trimStart();/\b(?:not|only)\s*\(/i.test(d)?(e.push(d),a+=t.slice(l,c)+"\0"+(e.length-1)+"\0",l=f-1):a+=t[l++]}else a+=t[l++]}else a+=t[l++];t=a}let i=t.trim().replace(/\s*:\s*/g,": ").replace(/\s+/g," ").replace(/\b(not|only)\s*\(/gi,"$1 (").replace(/\)\s*(and|or|not|only)\s*\(/gi,") $1 (").trim().replace(/\s+/g," ");for(;/\x00\d+\x00/.test(i);)i=i.replace(/\x00(\d+)\x00/g,(a,l)=>e[+l]);return i}function at(s){return s.trim()}function Gi(s){let e=s.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function ct(s){let e=s.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(t,r,n,o)=>r==="-"?` - 0.${o}`:`${r}${n}0.${o}`),e=e.replace(/([%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,t=>Gi(t)),e}function ut(s){let e=De(s);return e=e.replace(/\[([^\]]*)\]/g,(t,r)=>{let n=r.replace(/\s*([~|^$*]?)\s*=\s*/g,"$1=");return n=n.replace(/(['"])(.*?)\1/g,"$2"),"["+n.trim()+"]"}),e}function Ki(s){let e={};for(let o of s){let i=o.prop.toLowerCase();(i==="font-family"||i==="font-weight"||i==="font-style")&&(e[i]=at(o.value).replace(/['"]/g,""))}let t=(e["font-family"]||"unknown").toLowerCase(),r=(e["font-weight"]||"normal").toLowerCase(),n=(e["font-style"]||"normal").toLowerCase();return`${t}/${r}/${n}`}function Hi(s,e){return`@keyframes ${e.trim()}`}var rr=new Set(["media","supports","container"]);function hs(s,e,t){if(!t)return s;let r=new Map;for(let[o,i]of s)r.set(o,i.slice());let n=r.get(e);return n?n.push(t):r.set(e,[t]),r}function Be(s){let e=[];for(let t of rr){let r=s.get(t);r&&r.length&&e.push(`@${t} ${r.join(" and ")}`)}return e.length?e.join(" and "):"base"}function Qi(s,e,t,r){let n=s==null?null:t.get(s)??null,o=n!=null;return e?r+1+(o?r-n:0):o?n:r}function ft(s,e={}){let t=new Map,r=0;function n(f){return t.has(f)||t.set(f,new Map),t.get(f)}function o(f,p){n(f).set(p,r++)}let i=e.semanticSelectors?ut:De;function a(f,p){for(let d of f.selectors.map(w=>i(w)))o(p,d)}function l(f,p){let d=f.name.toLowerCase();if(rr.has(d)){let w=hs(p,d,lt(f.params)),y=Be(w);f.each(g=>{g.type==="rule"?a(g,y):g.type==="atrule"&&l(g,w)})}else if(!(d==="font-face"||d==="keyframes"||d==="-webkit-keyframes"||d==="charset"||d==="import"||d==="namespace")){if(f.nodes){let w=Be(p);f.each(y=>{y.type==="rule"?a(y,w):y.type==="atrule"&&l(y,p)})}}}let u=tr.parse(s,{from:void 0}),c=new Map;u.each(f=>{f.type==="rule"?a(f,"base"):f.type==="atrule"&&l(f,c)});let h=new Map;for(let[f,p]of t)h.set(f,[...p.entries()].sort((d,w)=>d[1]-w[1]).map(d=>d[0]));return h}function V(s,e={}){let t=new Map;function r(g){return t.has(g)||t.set(g,[]),t.get(g)}let n=[],o=new Set,i=0;function a(g){o.has(g)||(o.add(g),n.push(g))}function l(g,m){return g?`${g}.${m}`:m}function u(g,m,S,_){r(g).push({selector:m,prop:S.prop.toLowerCase(),value:at(S.value),important:S.important||!1,layer:_})}let c=e.semanticSelectors?ut:De;function h(g,m,S){let _=g.selectors.map(x=>c(x));for(let x of _)g.each(v=>{v.type==="decl"&&u(m,x,v,S)})}function f(g,m,S){let _=g.name.toLowerCase();if(rr.has(_)){let x=hs(m,_,lt(g.params)),v=Be(x);g.each(O=>{O.type==="rule"?h(O,v,S):O.type==="atrule"&&f(O,x,S)})}else if(_==="layer"){let x=g.params.trim();if(g.nodes){let v=x?l(S,x):l(S,`__anon${i++}`);a(v);let O=Be(m);g.each(A=>{A.type==="rule"?h(A,O,v):A.type==="atrule"&&f(A,m,v)})}else for(let v of x.split(",")){let O=v.trim();O&&a(l(S,O))}}else if(_==="font-face"){let x="@font-face",v=[];g.each(A=>{A.type==="decl"&&v.push(A)});let O=Ki(v);for(let A of v)u(x,O,A,S)}else if(_==="keyframes"||_==="-webkit-keyframes"){let x=Hi(_,g.params);g.each(v=>{if(v.type==="rule"){let O=v.selectors.map(A=>A.trim()).join(", ");v.each(A=>{A.type==="decl"&&u(x,O,A,S)})}})}else if(!(_==="charset"||_==="import"||_==="namespace")){if(g.nodes){let x=Be(m);g.each(v=>{v.type==="rule"?h(v,x,S):v.type==="atrule"&&f(v,m,S)})}}}let p=tr.parse(s,{from:void 0}),d=new Map;p.each(g=>{g.type==="rule"?h(g,"base",null):g.type==="atrule"&&f(g,d,null)});let w=new Map;n.forEach((g,m)=>w.set(g,m));let y=n.length;for(let g of t.values())for(let m of g)m.layerRank=Qi(m.layer,m.important,w,y),delete m.layer;return t}function ne(s){let e=new Map;for(let[t,r]of s){e.has(t)||e.set(t,new Map);let n=e.get(t),o=new Map;for(let{selector:i,prop:a,value:l,important:u,layerRank:c}of r){let h=c??(u?1:0);n.has(i)||(n.set(i,new Map),o.set(i,new Map));let f=n.get(i),p=o.get(i),d=p.get(a);(d===void 0||h>=d)&&(f.set(a,{value:l,important:u}),p.set(a,h))}}return e}function nr(s,e,t={}){let r=new Map,n=new Set([...s.keys(),...e.keys()]),o=["base",...[...n].filter(i=>i!=="base").sort()];for(let i of o){if(!n.has(i))continue;let a=s.get(i)||new Map,l=e.get(i)||new Map,u=new Set([...a.keys(),...l.keys()]),c=new Map,h=0;for(let p of[...u].sort()){let d=a.get(p)||new Map,w=l.get(p)||new Map,y=new Set([...d.keys(),...w.keys()]),g=new Map,m=0;for(let _ of[...y].sort()){let x=d.get(_),v=w.get(_),O;!x&&v?(O={status:"added",newValue:v.value,newImportant:v.important},m++):x&&!v?(O={status:"removed",oldValue:x.value,oldImportant:x.important},m++):(t.ignoreCosmetic?ct(x.value)!==ct(v.value):x.value!==v.value)||x.important!==v.important?(O={status:"changed",oldValue:x.value,oldImportant:x.important,newValue:v.value,newImportant:v.important},m++):O={status:"unchanged",value:v.value,important:v.important},g.set(_,O)}let S;a.has(p)?l.has(p)?m>0?S="changed":S="unchanged":S="removed":S="added",c.set(p,{status:S,changeCount:m,props:g}),h+=m}let f;s.has(i)?e.has(i)?h>0?f="changed":f="unchanged":f="removed":f="added",r.set(i,{status:f,changeCount:h,selectors:c})}return r}function sr([s,e,t],[r,n,o]){return s>r||s===r&&e>n||s===r&&e===n&&t>o}function or(s,e){return sr(s,e)?1:sr(e,s)?-1:0}function Ji(s){let e=[],t=0,r=0,n=0,o=null;for(let a=0;a<s.length;a++){let l=s[a];o?l===o&&(o=null):l==='"'||l==="'"?o=l:l==="("?t++:l===")"?t>0&&t--:l==="["?r++:l==="]"?r>0&&r--:l===","&&t===0&&r===0&&(e.push(s.slice(n,a).trim()),n=a+1)}let i=s.slice(n).trim();return i&&e.push(i),e}function Yi(s,e){let t=1,r=0,n=e,o=null;for(;n<s.length&&t>0;){let i=s[n];o?i===o&&(o=null):i==='"'||i==="'"?o=i:i==="["?r++:i==="]"?r>0&&r--:r===0&&i==="("?t++:r===0&&i===")"&&t--,n++}return t===0?n:null}function ps(s,e,t){let r=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");r.lastIndex=0;let n="",o=0,i;for(;(i=r.exec(s))!==null;){let a=i.index+i[0].length,l=Yi(s,a);if(n+=s.slice(o,i.index),l===null){n+=s.slice(a),o=s.length;break}t(s,a,l,i),o=l,r.lastIndex=o}return n+s.slice(o)}function se(s,e=0){if(e>100)return[0,0,0];let t=0,r=0,n=0,o=s.replace(/\\./g,"x"),i=l=>{let u=[0,0,0];for(let c of Ji(l)){let h=se(c,e+1);sr(h,u)&&(u=h)}t+=u[0],r+=u[1],n+=u[2]};o=ps(o,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(l,u,c,h)=>{let f=h.groups.name.toLowerCase(),p=l.slice(u,c-1).trim();if(f==="nth-child"||f==="nth-last-child"){let d=p.match(/\sof\b/i);d&&i(p.slice(d.index+d[0].length).trim()),r++}else f==="where"||(i(p),(f==="host"||f==="host-context")&&r++)}),o=ps(o,/::(?:slotted|cue)\s*\(/gi,(l,u,c)=>{i(l.slice(u,c-1).trim()),n++}),o=o.replace(/::[\w-]+(\([^)]*\))?/g,()=>(n++,"")),o=o.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(n++,"")),o=o.replace(/\[[^\]]*\]/g,()=>(r++,"")),o=o.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(r++,"")),o=o.replace(/#[\w-]+/g,()=>(t++,"")),o=o.replace(/\.[\w-]+/g,()=>(r++,"")),o=o.replace(/\|\|/g," ").replace(/[>+~]/g," "),o=o.replace(/(?:[\w-]+|\*)?\|/g,"");let a=o.split(/\s+/).filter(l=>l&&l!=="*"&&/^[a-zA-Z][\w-]*/.test(l));return n+=a.length,[t,r,n]}function ir(s,e){let[t,r,n]=se(s),[o,i,a]=se(e);return t===o&&r===i&&n===a}function Xi(s,e){let t=new Set(s),r=new Set(e),n=s.filter(c=>r.has(c)),o=e.filter(c=>t.has(c)),i=new Map;for(let c=0;c<n.length;c++)i.set(n[c],o[c]);let a=[],l=0,u=new Set;for(let c of s){if(!r.has(c)){a.push({type:"deleted",oldSelector:c,newSelector:null});continue}let h=i.get(c);for(;l<e.length&&!t.has(e[l]);)a.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;if(c===h)a.push({type:"equal",oldSelector:c,newSelector:h});else{let f=[c,h].sort().join("\0");u.has(f)||(u.add(f),a.push({type:"moved",oldSelector:c,newSelector:h}))}l++}for(;l<e.length;)t.has(e[l])||a.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;return a}function lr(s,e,t,r,n,o,i){return!t&&!r?null:t?r?t.important!==r.important?t.important?s:e:n!==0?n>0?s:e:o>i?s:e:s:e}function Zi(s,e,t,r,n){let o=s.oldSelector,i=s.newSelector;s.sameSpecificity=ir(o,i),s.conflictingProps=[],s.hasOverlappingProps=!1;let a=e.indexOf(o),l=e.indexOf(i),u=t.indexOf(o),c=t.indexOf(i);if(a<0||l<0||u<0||c<0)return;let h=a<l,f=u<c;if(h===f)return;let p=or(se(o),se(i)),d=r.get(o)||new Map,w=r.get(i)||new Map,y=n.get(o)||new Map,g=n.get(i)||new Map;for(let[m,S]of y){let _=g.get(m);if(!_||(s.hasOverlappingProps=!0,S.value===_.value&&S.important===_.important))continue;let x=lr(o,i,d.get(m),w.get(m),p,a,l),v=lr(o,i,S,_,p,u,c);if(!v)continue;if(!x){let P=lr(o,i,S,_,p,a,l);if(!P||P===v)continue;let I=n.get(P)?.get(m),W=n.get(v)?.get(m);if(!I||!W||I.value===W.value&&I.important===W.important)continue;s.conflictingProps.push({prop:m,oldEffective:null,newEffective:{value:W.value,important:W.important}});continue}let O=r.get(x)?.get(m),A=n.get(v)?.get(m);!O||!A||O.value===A.value&&O.important===A.important||s.conflictingProps.push({prop:m,oldEffective:{value:O.value,important:O.important},newEffective:{value:A.value,important:A.important}})}}function ar(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=ft(s,r),o=ft(e,r),i=ne(V(s,r)),a=ne(V(e,r)),l=new Set([...n.keys(),...o.keys()]),u=["base",...[...l].filter(h=>h!=="base").sort()],c=[];for(let h of u){if(!l.has(h))continue;let f=n.get(h)||[],p=o.get(h)||[],d=Xi(f,p),w=i.get(h)||new Map,y=a.get(h)||new Map;for(let m of d)m.type==="moved"&&Zi(m,f,p,w,y);let g=d.some(m=>m.type==="moved"&&m.hasOverlappingProps);d.some(m=>m.type!=="equal")&&c.push({contextKey:h,rows:d,hasWarning:g})}return c}var el=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-inline","padding-block"]],["margin",["margin-top","margin-right","margin-bottom","margin-left","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-inline","margin-block"]],["border",["border-top","border-right","border-bottom","border-left","border-width","border-style","border-color","border-top-width","border-top-style","border-top-color","border-right-width","border-right-style","border-right-color","border-bottom-width","border-bottom-style","border-bottom-color","border-left-width","border-left-style","border-left-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["border-inline",["border-inline-start","border-inline-end","border-inline-width","border-inline-style","border-inline-color"]],["border-block",["border-block-start","border-block-end","border-block-width","border-block-style","border-block-color"]],["background",["background-color","background-image","background-position","background-size","background-repeat","background-attachment","background-origin","background-clip"]],["font",["font-style","font-variant","font-weight","font-stretch","font-size","font-family","line-height"]],["flex",["flex-grow","flex-shrink","flex-basis"]],["flex-flow",["flex-direction","flex-wrap"]],["grid-column",["grid-column-start","grid-column-end"]],["grid-row",["grid-row-start","grid-row-end"]],["grid-template",["grid-template-rows","grid-template-columns","grid-template-areas"]],["transition",["transition-property","transition-duration","transition-timing-function","transition-delay"]],["animation",["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode","animation-play-state"]],["inset",["top","right","bottom","left","inset-inline-start","inset-inline-end","inset-block-start","inset-block-end","inset-inline","inset-block"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["overflow",["overflow-x","overflow-y"]],["text-decoration",["text-decoration-line","text-decoration-style","text-decoration-color","text-decoration-thickness"]],["outline",["outline-width","outline-style","outline-color"]],["list-style",["list-style-type","list-style-position","list-style-image"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["mask",["mask-image","mask-position","mask-size","mask-repeat","mask-origin","mask-clip","mask-mode","mask-composite"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]);function ds(s){let e=new Map;for(let t=0;t<s.length;t++){let r=s[t];e.has(r.selector)||e.set(r.selector,[]),e.get(r.selector).push({...r,idx:t})}return e}function ms(s,e,t){let r=null,n=null;for(let o of s)o.prop===e?(!r||o.layerRank>r.layerRank||o.layerRank===r.layerRank&&o.idx>r.idx)&&(r=o):o.prop===t&&(!n||o.layerRank>n.layerRank||o.layerRank===n.layerRank&&o.idx>n.idx)&&(n=o);return!r&&!n?null:r?n?r.layerRank!==n.layerRank?r.layerRank>n.layerRank?"shorthand":"longhand":r.idx>n.idx?"shorthand":"longhand":"shorthand":"longhand"}function ht(s,e){return s.reduce((t,r)=>r.prop!==e?t:!t||r.layerRank>t.layerRank||r.layerRank===t.layerRank&&r.idx>t.idx?r:t,null)}function cr(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=s instanceof Map?s:V(s,r),o=e instanceof Map?e:V(e,r),i=new Set([...n.keys(),...o.keys()]),a=["base",...[...i].filter(h=>h!=="base").sort()],l=[],u=!1;for(let h of a){if(!i.has(h))continue;let f=n.get(h)??[],p=o.get(h)??[],d=ds(f),w=ds(p);for(let[y,g]of w){let m=d.get(y)??[],S=[],_=new Set;for(let[x,v]of el){if(!g.some(I=>I.prop===x))continue;let A=ht(g,x),P=ht(m,x);for(let I of v){if(!g.some(Ts=>Ts.prop===I)||_.has(I))continue;let ur=ms(m,x,I),dt=ms(g,x,I);if(ur===dt)continue;let mt;dt==="shorthand"?(mt="A",u=!0):mt="B";let fr=ht(g,I),hr=ht(m,I);_.add(I),S.push({shorthand:x,longhand:I,oldWinner:ur,newWinner:dt,direction:mt,oldShorthandValue:P?.value??null,oldLonghandValue:hr?.value??null,longhandValue:fr?.value??null,shorthandValue:A?.value??null,oldShorthandImportant:P?.important??!1,oldLonghandImportant:hr?.important??!1,shorthandImportant:A?.important??!1,longhandImportant:fr?.important??!1})}}S.length>0&&l.push({contextKey:h,selector:y,conflicts:S})}}let c=new Map;for(let h of l)c.has(h.contextKey)||c.set(h.contextKey,{contextKey:h.contextKey,selectors:[]}),c.get(h.contextKey).selectors.push({selector:h.selector,conflicts:h.conflicts});return{hasWarning:u,risks:[...c.values()]}}var tl=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left"]],["margin",["margin-top","margin-right","margin-bottom","margin-left"]],["inset",["top","right","bottom","left"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]),rl=new Map([["overflow",["overflow-x","overflow-y"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]]]);function gs(s,e,t){let r=tl.get(s);if(r){let o=r.indexOf(e);if(o!==-1){let i=t.trim().split(/\s+/);return(i.length===1?[i[0],i[0],i[0],i[0]]:i.length===2?[i[0],i[1],i[0],i[1]]:i.length===3?[i[0],i[1],i[2],i[1]]:[i[0],i[1],i[2],i[3]])[o]}}let n=rl.get(s);if(n){let o=n.indexOf(e);if(o!==-1){let i=t.trim().split(/\s+/);return i.length===1?i[0]:i[o]??i[0]}}return t}function ys(s,e){if(e?.risks?.length)for(let{contextKey:t,selectors:r}of e.risks){let n=s.get(t);if(n)for(let{selector:o,conflicts:i}of r){let a=n.selectors.get(o);if(!a)continue;let l=0;for(let{shorthand:u,longhand:c,oldWinner:h,newWinner:f,longhandValue:p,shorthandValue:d,oldShorthandValue:w,oldLonghandValue:y,oldShorthandImportant:g,oldLonghandImportant:m,shorthandImportant:S,longhandImportant:_}of i){let x=h==="longhand"?y:gs(u,c,w??""),v=f==="longhand"?p:gs(u,c,d??""),O=a.props.get(c);if(!O||O.status!=="unchanged")continue;let A=h==="longhand"?m:g,P=f==="longhand"?_:S;a.props.set(c,{status:"changed",oldValue:x,oldImportant:A,newValue:v,newImportant:P}),l++}l>0&&(a.changeCount+=l,a.status!=="added"&&a.status!=="removed"&&(a.status="changed"),n.changeCount+=l,n.status!=="added"&&n.status!=="removed"&&(n.status="changed"))}}}var Ss=require("node:fs"),Cs=require("node:url");function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ws(s,e){let{status:t}=e;function r(n){return n?' <span class="important">!important</span>':""}return t==="added"?`
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
    </div>`}function nl(s,e){let{props:t}=e,r=[],n=[];for(let[i,a]of t){let l=E(i);if(a.status==="unchanged"){let u=E(a.value)+(a.important?" !important":"");r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="added"){r.push('<div class="detail-line detail-line--empty"></div>');let u=E(a.newValue)+(a.newImportant?" !important":"");n.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="removed"){let u=E(a.oldValue)+(a.oldImportant?" !important":"");r.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push('<div class="detail-line detail-line--empty"></div>')}else{let u=E(a.oldValue)+(a.oldImportant?" !important":""),c=E(a.newValue)+(a.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${c}</span>;</div>`)}}let o=E(s);return`
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
    </div>`}function sl(s,e,{highlightHtml:t,showUnchanged:r=!1,contextKey:n="",expanded:o=!1}={}){let{status:i,changeCount:a,props:l}=e,u=t||E(s),c={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[i],h={added:`+${[...l.values()].filter(m=>m.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...l.values()].filter(m=>m.status==="removed").length} \u524A\u9664`,changed:(()=>{let m=[...l.values()].filter(v=>v.status==="added").length,S=[...l.values()].filter(v=>v.status==="removed").length,_=[...l.values()].filter(v=>v.status==="changed").length,x=[];return m&&x.push(`+${m}`),S&&x.push(`\u2212${S}`),_&&x.push(`~${_}`),x.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[i],f=[...l.entries()].filter(([,m])=>m.status!=="unchanged"),p=[...l.entries()].filter(([,m])=>m.status==="unchanged"),d=[...f.map(([m,S])=>ws(m,S)),...r?p.map(([m,S])=>ws(m,S)):[]].join(""),w=p.length>0&&!r?`<button class="unchanged-toggle" data-selector="${E(s)}">
           \u5909\u66F4\u306A\u3057 ${p.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",y=o?nl(s,e):"",g=o?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${i}" data-selector="${E(s)}" data-context="${E(n)}"${g}>
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
    </div>`}function ol(s,e,t,{showUnchanged:r=!1,expandedSelectors:n=new Set}={}){let{status:o,changeCount:i}=e,l=s==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(s),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[o],c=i>0?`<span class="context-badge ${u}">${i} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',h=t?t.map(({selector:p,positions:d})=>({selector:p,positions:d,selDiff:e.selectors.get(p)})).filter(p=>p.selDiff):[...e.selectors.entries()].map(([p,d])=>({selector:p,positions:new Set,selDiff:d}));if(h.length===0)return"";let f=h.map(({selector:p,positions:d,selDiff:w})=>sl(p,w,{highlightHtml:d.size>0?il(p,d):null,showUnchanged:r,contextKey:s,expanded:n.has(`${s}||${p}`)})).join("");return`
    <section class="context-section context-section--${o}">
      <div class="context-header">
        <span class="context-label">${l}</span>
        ${c}
      </div>
      <div class="context-selectors">
        ${f}
      </div>
    </section>`}function il(s,e){return[...s].map((t,r)=>{let n=E(t);return e.has(r)?`<mark class="fzf-match">${n}</mark>`:n}).join("")}function ll(s){let e=E(s.prop),t=s.oldEffective?E(s.oldEffective.value)+(s.oldEffective.important?" !important":""):'<span class="or-prop-absent">\u65E7 CSS \u672A\u5BA3\u8A00</span>',r=s.newEffective?E(s.newEffective.value)+(s.newEffective.important?" !important":""):'<span class="or-prop-absent">\u65B0 CSS \u672A\u5BA3\u8A00</span>';return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${t}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${r}</span></span>`}function al(s){let e=E(s.oldSelector),t=E(s.newSelector),r=s.conflictingProps&&s.conflictingProps.length>0,n=s.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',o=r?`<div class="or-conflicts">${s.conflictingProps.map(ll).join("")}</div>`:"";return`<tr class="${r?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${t}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${n}
      ${o}
    </td>
  </tr>`}function cl(s){return s.type==="equal"?`<tr class="or-row or-row--equal">
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
    </tr>`:""}function ul(s,e=!1){let{contextKey:t,rows:r,hasWarning:n}=s,o=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(t),i=r.filter(c=>c.type==="moved").length,a=i===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':n?`<span class="or-ctx-badge or-ctx-badge--warning">${i} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${i} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,l=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,u=r.map(c=>c.type==="moved"?al(c):cl(c)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${E(t)}" aria-expanded="${e}" role="button" tabindex="0">
      ${l}
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
  </div>`}function vs(s,{activeContext:e="all",filterOrderRisk:t=!1,expandedContexts:r=new Set}={}){if(!s||s.length===0)return"";let n=t?s.filter(u=>u.hasWarning):s,o=e==="all"?n:n.filter(u=>u.contextKey===e);if(o.length===0)return"";let i=o.reduce((u,c)=>u+c.rows.filter(h=>h.type==="moved").length,0);if(i===0)return"";let a=o.some(u=>u.hasWarning),l=o.map(u=>ul(u,r.has(u.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${a?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${i} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${i} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${l}
  </section>`}function bs(s){if(!s||!s.risks||s.risks.length===0)return"";let{risks:e,hasWarning:t}=s,r=e.reduce((o,i)=>o+i.selectors.reduce((a,l)=>a+l.conflicts.length,0),0);if(r===0)return"";let n=e.map(({contextKey:o,selectors:i})=>{let a=o==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(o),l=i.some(h=>h.conflicts.some(f=>f.direction==="A")),u=i.map(({selector:h,conflicts:f})=>{let p=f.map(({shorthand:d,longhand:w,direction:y,oldWinner:g,longhandValue:m,shorthandValue:S,oldShorthandValue:_})=>{let x=E(d),v=E(w),O=E(S??""),A=E(_??""),P=E(m??"");return y==="A"?`<div class="sr-conflict sr-conflict--risk">
            <span class="sr-badge sr-badge--risk">\u26A0 \u30EA\u30B9\u30AF</span>
            <code class="sr-longhand">${v}</code>
            <span class="sr-desc">\u304C <code>${x}: ${O}</code> \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: longhand \u304C\u6709\u52B9 \u2192 \u65B0: shorthand \u304C\u4E0A\u66F8\u304D\uFF09</span>
          </div>`:g===null?`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u65B0\u898F</span>
            <code class="sr-longhand">${v}</code>
            <span class="sr-desc">\uFF08\u65B0\u898F\u8FFD\u52A0: <code>${v}: ${P}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`:`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u89E3\u6D88</span>
            <code class="sr-longhand">${v}</code>
            <span class="sr-desc">\u306E shorthand \u4E0A\u66F8\u304D\u304C\u89E3\u6D88\uFF08\u65E7: <code>${x}: ${A}</code> \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: <code>${v}: ${P}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`}).join("");return`<div class="sr-selector">
        <code class="sr-selector-name">${E(h)}</code>
        <div class="sr-conflicts">${p}</div>
      </div>`}).join("");return`<div class="sr-context">
      <div class="sr-context-header">
        <span class="sr-context-label">${a}</span>
        ${l?'<span class="sr-ctx-badge sr-ctx-badge--warning">\u26A0 \u30EA\u30B9\u30AF\u3042\u308A</span>':'<span class="sr-ctx-badge sr-ctx-badge--ok">\u5909\u66F4\u306E\u307F</span>'}
      </div>
      <div class="sr-selectors">${u}</div>
    </div>`}).join("");return`<section class="shorthand-risks-section">
    <div class="shorthand-risks-header">
      <span class="shorthand-risks-title">Shorthand/Longhand \u7AF6\u5408</span>
      ${t?`<span class="shorthand-risks-count shorthand-risks-count--warning">\u26A0 ${r} \u4EF6\u306E\u7AF6\u5408\uFF08\u30EA\u30B9\u30AF\u3042\u308A\uFF09</span>`:`<span class="shorthand-risks-count shorthand-risks-count--ok">${r} \u4EF6\u306E\u7AF6\u5408\uFF08\u5909\u66F4\u306E\u307F\uFF09</span>`}
    </div>
    ${n}
  </section>`}function xs(s,e,{activeContext:t="all",showUnchanged:r=!1,expandedSelectors:n=new Set}={}){if(!s||s.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let o=null;if(e!==null){o=new Map;for(let a of e)o.has(a.contextKey)||o.set(a.contextKey,[]),o.get(a.contextKey).push({selector:a.selector,positions:a.positions||new Set})}let i="";for(let[a,l]of s){if(t!=="all"&&a!==t)continue;let u=o?o.get(a)||[]:null;o&&u.length===0||(i+=ol(a,l,u,{showUnchanged:r,expandedSelectors:n}))}return i||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var dl={};function fl(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`}var hl=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,pl=`
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
`;function _s(s,e,t){let r=fl(),n=[],o=new Set;for(let[h,f]of s)for(let[p,d]of f.selectors)d.status!=="unchanged"&&(n.push({contextKey:h,selector:p,positions:new Set}),o.add(`${h}||${p}`));let i=n.length>0,a=e&&e.length>0,l=t&&t.risks&&t.risks.length>0,u=e?new Set(e.map(h=>h.contextKey)):new Set,c="";return i&&(c+=`<div class="diff-section">${xs(s,n,{expandedSelectors:o})}</div>`),a&&(c+=vs(e,{expandedContexts:u})),l&&(c+=bs(t)),!i&&!a&&!l&&(c='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${r}</style>
  <style>${hl}</style>
</head>
<body>
  <div id="app">${c}</div>
  ${pl}
</body>
</html>`}var $s=`Usage: css-cascade <old.css> <new.css> [options]

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
  2  \u30A8\u30E9\u30FC`,ks;try{ks=(0,Ls.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"shorthand-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(s){console.error(`Error: ${s.message}`),process.exit(2)}var{values:k,positionals:Rs}=ks;k.version&&(console.log("1.1.0"),process.exit(0));k.help&&(console.log($s),process.exit(0));Rs.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error($s),process.exit(2));var ml=new Set(["text","json","html"]);ml.has(k.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var gl=new Set(["changed","added","removed","unchanged","all"]);gl.has(k.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function Ps(s){try{return(0,Ms.readFileSync)(s,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${s}": ${e.message}`),process.exit(2)}}var[yl,wl]=Rs,Es=Ps(yl),Os=Ps(wl),ge,me=[],oe={hasWarning:!1,risks:[]};try{let s={semanticSelectors:k["semantic-selectors"]},e=V(Es,s),t=V(Os,s);ge=nr(ne(e),ne(t),{ignoreCosmetic:k["ignore-cosmetic"]}),k["order-risk"]&&(me=ar(Es,Os,{semanticSelectors:k["semantic-selectors"]})),k["shorthand-risk"]&&(oe=cr(e,t,{semanticSelectors:k["semantic-selectors"]}),ys(ge,oe))}catch(s){console.error(`Parse error: ${s.message}`),process.exit(2)}function As(s,e){return e==="all"?!0:e==="changed"?s!=="unchanged":s===e}function vl(s){let e=0,t=0,r=0,n=0;for(let[,o]of s)for(let[,i]of o.selectors)for(let[,a]of i.props)a.status==="changed"?e++:a.status==="added"?t++:a.status==="removed"?r++:n++;return{changed:e,added:t,removed:r,unchanged:n}}var U=vl(ge),Is=U.changed>0||U.added>0||U.removed>0,Ns=k["order-risk"]&&me.some(s=>s.hasWarning),qs=k["shorthand-risk"]&&oe.hasWarning,pt=k.filter;if(k.format==="html"){let s=_s(ge,k["order-risk"]?me:null,k["shorthand-risk"]?oe:null);process.stdout.write(s),process.exit(Is||Ns||qs?1:0)}if(k.format==="json"){let s=[];for(let[t,r]of ge){let n=[];for(let[o,i]of r.selectors){let a=[];for(let[l,u]of i.props)As(u.status,pt)&&a.push({prop:l,...u});a.length>0&&n.push({selector:o,status:i.status,changeCount:i.changeCount,props:a})}n.length>0&&s.push({key:t,status:r.status,changeCount:r.changeCount,selectors:n})}let e={version:1,summary:U,contexts:s};k["order-risk"]&&(e.orderRisks=me),k["shorthand-risk"]&&(e.shorthandRisks=oe),console.log(JSON.stringify(e,null,2))}else{let s=!k["no-color"]&&!!process.stdout.isTTY,e={reset:s?"\x1B[0m":"",yellow:s?"\x1B[33m":"",green:s?"\x1B[32m":"",red:s?"\x1B[31m":"",cyan:s?"\x1B[36m":"",dim:s?"\x1B[2m":""};for(let[r,n]of ge){let o=[];for(let[i,a]of n.selectors){let l=[];for(let[u,c]of a.props)As(c.status,pt)&&(c.status==="changed"?l.push(`    ${e.yellow}~${e.reset} ${u}: ${c.oldValue} \u2192 ${c.newValue}`):c.status==="added"?l.push(`    ${e.green}+${e.reset} ${u}: ${c.newValue}`):c.status==="removed"?l.push(`    ${e.red}-${e.reset} ${u}: ${c.oldValue}`):l.push(`      ${u}: ${c.value}`));l.length>0&&(o.push(`  ${e.dim}${i}${e.reset}`),o.push(...l))}o.length>0&&(console.log(`
${e.cyan}[${r}]${e.reset}`),o.forEach(i=>console.log(i)))}let t=[];if(U.changed&&t.push(`${e.yellow}${U.changed} changed${e.reset}`),U.added&&t.push(`${e.green}${U.added} added${e.reset}`),U.removed&&t.push(`${e.red}${U.removed} removed${e.reset}`),(pt==="all"||pt==="unchanged")&&U.unchanged&&t.push(`${U.unchanged} unchanged`),console.log(`
Summary: ${t.length?t.join(", "):"no differences"}`),k["order-risk"]&&me.length>0){console.log(`
Order Risks:`);for(let{contextKey:r,rows:n}of me){let o=n.filter(l=>l.type!=="equal");if(o.length===0)continue;let i=Math.max(6,...o.map(l=>(l.oldSelector??"-").length)),a=Math.max(6,...o.map(l=>(l.newSelector??"-").length));console.log(`
${e.cyan}[${r}]${e.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(i)}  ${"\u65B0 CSS".padEnd(a)}  \u72B6\u614B`),console.log(`  ${"-".repeat(i)}  ${"-".repeat(a)}  ------`);for(let l of o){let u=(l.oldSelector??"-").padEnd(i),c=(l.newSelector??"-").padEnd(a);if(l.type==="moved"){let h=l.sameSpecificity?` ${e.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${e.reset}`:"";if(console.log(`  ${u}  ${c}  ${e.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${e.reset}${h}`),l.conflictingProps&&l.conflictingProps.length>0)for(let f of l.conflictingProps){let p=y=>y?.important?" !important":"",d=f.oldEffective?`${f.oldEffective.value}${p(f.oldEffective)}`:"\u65E7 CSS \u672A\u5BA3\u8A00",w=f.newEffective?`${f.newEffective.value}${p(f.newEffective)}`:"\u65B0 CSS \u672A\u5BA3\u8A00";console.log(`    ${e.dim}${f.prop}: ${d} \u2192 ${w}${e.reset}`)}}else l.type==="deleted"?console.log(`  ${u}  ${"-".padEnd(a)}  ${e.red}- \u524A\u9664${e.reset}`):l.type==="added"&&console.log(`  ${"-".padEnd(i)}  ${c}  ${e.green}+ \u8FFD\u52A0${e.reset}`)}}}if(k["shorthand-risk"]&&oe.risks.length>0){console.log(`
Shorthand Risks:`);for(let{contextKey:r,selectors:n}of oe.risks){console.log(`
${e.cyan}[${r}]${e.reset}`);for(let{selector:o,conflicts:i}of n){console.log(`  ${e.dim}${o}${e.reset}`);for(let a of i){let{shorthand:l,longhand:u,direction:c,oldWinner:h,longhandValue:f,shorthandValue:p,oldLonghandValue:d,oldShorthandValue:w}=a;console.log(c==="A"?`    ${e.yellow}\u26A0 ${u}: shorthand \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: ${u}:${d??""} \u304C\u6709\u52B9 \u2192 \u65B0: ${l}:${p??""} \u306B\u4E0A\u66F8\u304D\uFF09${e.reset}`:h===null?`    ${e.green}\u2197 ${u}: \u65B0\u898F\uFF08longhand \u304C\u6709\u52B9: ${u}:${f??""}\uFF09${e.reset}`:`    ${e.green}\u2197 ${u}: shorthand \u4E0A\u66F8\u304D\u89E3\u6D88\uFF08\u65E7: ${l}:${w??""} \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: ${u}:${f??""} \u304C\u6709\u52B9\uFF09${e.reset}`)}}}}}process.exit(Is||Ns||qs?1:0);
