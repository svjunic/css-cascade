#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.1.0
// Source: https://github.com/svjunic/css-cascade
var Us=Object.create;var wr=Object.defineProperty;var zs=Object.getOwnPropertyDescriptor;var Fs=Object.getOwnPropertyNames;var js=Object.getPrototypeOf,Vs=Object.prototype.hasOwnProperty;var _=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var Ws=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Fs(e))!Vs.call(s,n)&&n!==t&&wr(s,n,{get:()=>e[n],enumerable:!(r=zs(e,n))||r.enumerable});return s};var Gs=(s,e,t)=>(t=s!=null?Us(js(s)):{},Ws(e||!s||!s.__esModule?wr(t,"default",{value:s,enumerable:!0}):t,s));var vt=_((xl,wt)=>{var Ve=process||{},vr=Ve.argv||[],je=Ve.env||{},Ks=!(je.NO_COLOR||vr.includes("--no-color"))&&(!!je.FORCE_COLOR||vr.includes("--color")||Ve.platform==="win32"||(Ve.stdout||{}).isTTY&&je.TERM!=="dumb"||!!je.CI),Hs=(s,e,t=s)=>r=>{let n=""+r,o=n.indexOf(e,s.length);return~o?s+Qs(n,e,t,o)+e:s+n+e},Qs=(s,e,t,r)=>{let n="",o=0;do n+=s.substring(o,r)+t,o=r+e.length,r=s.indexOf(e,o);while(~r);return n+s.substring(o)},br=(s=Ks)=>{let e=s?Hs:()=>String;return{isColorSupported:s,reset:e("\x1B[0m","\x1B[0m"),bold:e("\x1B[1m","\x1B[22m","\x1B[22m\x1B[1m"),dim:e("\x1B[2m","\x1B[22m","\x1B[22m\x1B[2m"),italic:e("\x1B[3m","\x1B[23m"),underline:e("\x1B[4m","\x1B[24m"),inverse:e("\x1B[7m","\x1B[27m"),hidden:e("\x1B[8m","\x1B[28m"),strikethrough:e("\x1B[9m","\x1B[29m"),black:e("\x1B[30m","\x1B[39m"),red:e("\x1B[31m","\x1B[39m"),green:e("\x1B[32m","\x1B[39m"),yellow:e("\x1B[33m","\x1B[39m"),blue:e("\x1B[34m","\x1B[39m"),magenta:e("\x1B[35m","\x1B[39m"),cyan:e("\x1B[36m","\x1B[39m"),white:e("\x1B[37m","\x1B[39m"),gray:e("\x1B[90m","\x1B[39m"),bgBlack:e("\x1B[40m","\x1B[49m"),bgRed:e("\x1B[41m","\x1B[49m"),bgGreen:e("\x1B[42m","\x1B[49m"),bgYellow:e("\x1B[43m","\x1B[49m"),bgBlue:e("\x1B[44m","\x1B[49m"),bgMagenta:e("\x1B[45m","\x1B[49m"),bgCyan:e("\x1B[46m","\x1B[49m"),bgWhite:e("\x1B[47m","\x1B[49m"),blackBright:e("\x1B[90m","\x1B[39m"),redBright:e("\x1B[91m","\x1B[39m"),greenBright:e("\x1B[92m","\x1B[39m"),yellowBright:e("\x1B[93m","\x1B[39m"),blueBright:e("\x1B[94m","\x1B[39m"),magentaBright:e("\x1B[95m","\x1B[39m"),cyanBright:e("\x1B[96m","\x1B[39m"),whiteBright:e("\x1B[97m","\x1B[39m"),bgBlackBright:e("\x1B[100m","\x1B[49m"),bgRedBright:e("\x1B[101m","\x1B[49m"),bgGreenBright:e("\x1B[102m","\x1B[49m"),bgYellowBright:e("\x1B[103m","\x1B[49m"),bgBlueBright:e("\x1B[104m","\x1B[49m"),bgMagentaBright:e("\x1B[105m","\x1B[49m"),bgCyanBright:e("\x1B[106m","\x1B[49m"),bgWhiteBright:e("\x1B[107m","\x1B[49m")}};wt.exports=br();wt.exports.createColors=br});var bt=_((Sl,Sr)=>{"use strict";var We=/[\t\n\f\r "#'()/;[\\\]{}]/g,Ge=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,Js=/.[\r\n"'(/\\]/,xr=/[\da-f]/i;Sr.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,o,l,a,i,u,c,h,f,p,d,w=r.length,y=0,g=[],m=[],S=-1;function C(){return y}function x(U){throw e.error("Unclosed "+U,y)}function b(){return m.length===0&&y>=w}function A(U){if(m.length)return m.pop();if(y>=w)return;let z=U?U.ignoreUnclosed:!1;switch(o=r.charCodeAt(y),o){case 10:case 32:case 9:case 13:case 12:{i=y;do i+=1,o=r.charCodeAt(i);while(o===32||o===10||o===9||o===13||o===12);c=["space",r.slice(y,i)],y=i-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let T=String.fromCharCode(o);c=[T,T,y];break}case 40:{if(d=g.length?g.pop()[1]:"",p=r.charCodeAt(y+1),d==="url"&&p!==39&&p!==34&&p!==32&&p!==10&&p!==9&&p!==12&&p!==13){i=y;do{if(h=!1,i=r.indexOf(")",i+1),i===-1)if(n||z){i=y;break}else x("bracket");for(f=i;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["brackets",r.slice(y,i+1),y,i],y=i}else y<=S?c=["(","(",y]:(i=r.indexOf(")",y+1),l=r.slice(y,i+1),i===-1||Js.test(l)?(S=i===-1?w:i,c=["(","(",y]):(c=["brackets",l,y,i],y=i));break}case 39:case 34:{u=o===39?"'":'"',i=y;do{if(h=!1,i=r.indexOf(u,i+1),i===-1)if(n||z){i=y+1;break}else x("string");for(f=i;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["string",r.slice(y,i+1),y,i],y=i;break}case 64:{We.lastIndex=y+1,We.test(r),We.lastIndex===0?i=r.length-1:i=We.lastIndex-2,c=["at-word",r.slice(y,i+1),y,i],y=i;break}case 92:{for(i=y,a=!0;r.charCodeAt(i+1)===92;)i+=1,a=!a;if(o=r.charCodeAt(i+1),a&&o!==47&&o!==32&&o!==10&&o!==9&&o!==13&&o!==12&&(i+=1,xr.test(r.charAt(i)))){for(;xr.test(r.charAt(i+1));)i+=1;r.charCodeAt(i+1)===32&&(i+=1)}c=["word",r.slice(y,i+1),y,i],y=i;break}default:{o===47&&r.charCodeAt(y+1)===42?(i=r.indexOf("*/",y+2)+1,i===0&&(n||z?i=r.length:x("comment")),c=["comment",r.slice(y,i+1),y,i],y=i):(Ge.lastIndex=y+1,Ge.test(r),Ge.lastIndex===0?i=r.length-1:i=Ge.lastIndex-2,c=["word",r.slice(y,i+1),y,i],g.push(c),y=i);break}}return y++,c}function O(U){m.push(U)}return{back:O,endOfFile:b,nextToken:A,position:C}}});var xt=_((Cl,Er)=>{"use strict";var N=vt(),Ys=bt(),Cr;function Xs(s){Cr=s}var Zs={";":N.yellow,":":N.yellow,"(":N.cyan,")":N.cyan,"[":N.yellow,"]":N.yellow,"{":N.yellow,"}":N.yellow,"at-word":N.cyan,brackets:N.cyan,call:N.cyan,class:N.yellow,comment:N.gray,hash:N.magenta,string:N.green};function eo([s,e],t){if(s==="word"){if(e[0]===".")return"class";if(e[0]==="#")return"hash"}if(!t.endOfFile()){let r=t.nextToken();if(t.back(r),r[0]==="brackets"||r[0]==="(")return"call"}return s}function _r(s){let e=Ys(new Cr(s),{ignoreErrors:!0}),t="";for(;!e.endOfFile();){let r=e.nextToken(),n=Zs[eo(r,e)];n?t+=r[1].split(/\r?\n/).map(o=>n(o)).join(`
`):t+=r[1]}return t}_r.registerInput=Xs;Er.exports=_r});var Ke=_((_l,Lr)=>{"use strict";var Or=vt(),Ar=xt(),ve=class s extends Error{constructor(e,t,r,n,o,l){super(e),this.name="CssSyntaxError",this.reason=e,o&&(this.file=o),n&&(this.source=n),l&&(this.plugin=l),typeof t<"u"&&typeof r<"u"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,s)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=Or.isColorSupported);let r=c=>c,n=c=>c,o=c=>c;if(e){let{bold:c,gray:h,red:f}=Or.createColors(!0);n=p=>c(f(p)),r=p=>h(p),Ar&&(o=p=>Ar(p))}let l=t.split(/\r?\n/),a=Math.max(this.line-3,0),i=Math.min(this.line+2,l.length),u=String(i).length;return l.slice(a,i).map((c,h)=>{let f=a+1+h,p=" "+(" "+f).slice(-u)+" | ";if(f===this.line){if(c.length>160){let w=20,y=Math.max(0,this.column-w),g=Math.max(this.column+w,this.endColumn+w),m=c.slice(y,g),S=r(p.replace(/\d/g," "))+c.slice(0,Math.min(this.column-1,w-1)).replace(/[^\t]/g," ");return n(">")+r(p)+o(m)+`
 `+S+n("^")}let d=r(p.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return n(">")+r(p)+o(c)+`
 `+d+n("^")}return" "+r(p)+o(c)}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};Lr.exports=ve;ve.default=ve});var St=_((El,$r)=>{"use strict";var to=/(<)(\/?style\b)/gi,ro=/(<)(!--)/g;function Q(s){return typeof s!="string"||!s.includes("<")?s:s.replace(to,"\\3c $2").replace(ro,"\\3c $2")}var Mr={after:`
`,beforeClose:`
`,beforeComment:`
`,beforeDecl:`
`,beforeOpen:" ",beforeRule:`
`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function no(s){return s[0].toUpperCase()+s.slice(1)}var be=class{constructor(e){this.builder=e}atrule(e,t){let r=e.raws,n="@"+e.name,o=e.params?this.rawValue(e,"params"):"";if(typeof r.afterName<"u"?n+=r.afterName:o&&(n+=" "),e.nodes)this.block(e,n+o);else{let l=(r.between||"")+(t?";":"");this.builder(Q(n+o+l),e)}}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,o=0;for(;n&&n.type!=="root";)o+=1,n=n.parent;if(r.includes(`
`)){let l=this.raw(e,null,"indent");if(l.length)for(let a=0;a<o;a++)r+=l}return r}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(Q(t+r)+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(Q(n)),this.builder("}",e,"end")}body(e){let t=e.nodes,r=t.length-1;for(;r>0&&t[r].type==="comment";)r-=1;let n=this.raw(e,"semicolon"),o=e.type==="document";for(let l=0;l<t.length;l++){let a=t[l],i=this.raw(a,"before");i&&this.builder(o?i:Q(i)),this.stringify(a,r!==l||n)}}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder(Q("/*"+t+e.text+r+"*/"),e)}decl(e,t){let r=e.raws,n=this.raw(e,"between","colon"),o=e.prop+n+this.rawValue(e,"value");e.important&&(o+=r.important||" !important"),t&&(o+=";"),this.builder(Q(o),e)}document(e){this.body(e)}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n<"u"))return n;let o=e.parent;if(r==="before"&&(!o||o.type==="root"&&o.first===e||o&&o.type==="document"))return"";if(!o)return Mr[r];let l=e.root(),a=l.rawCache||(l.rawCache={});if(typeof a[r]<"u")return a[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let i="raw"+no(r);this[i]?n=this[i](l,e):l.walk(u=>{if(n=u.raws[t],typeof n<"u")return!1})}return typeof n>"u"&&(n=Mr[r]),a[r]=n,n}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t<"u"))return!1}),t}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before<"u")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between<"u")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t<"u"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before<"u"){let o=r.raws.before.split(`
`);return t=o[o.length-1],t=t.replace(/\S/g,""),!1}}),t}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t<"u"))return!1}),t}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}root(e){if(this.body(e),e.raws.after){let t=e.raws.after,r=e.parent&&e.parent.type==="document";this.builder(r?t:Q(t))}}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(Q(e.raws.ownSemicolon),e,"end")}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}};$r.exports=be;be.default=be});var xe=_((Ol,kr)=>{"use strict";var so=St();function Ct(s,e){new so(e).stringify(s)}kr.exports=Ct;Ct.default=Ct});var He=_((Al,_t)=>{"use strict";_t.exports.isClean=Symbol("isClean");_t.exports.my=Symbol("my")});var _e=_((Ll,Rr)=>{"use strict";var oo=Ke(),io=St(),lo=xe(),{isClean:Se,my:ao}=He();function Et(s,e){let t=new s.constructor;for(let r in s){if(!Object.prototype.hasOwnProperty.call(s,r)||r==="proxyCache")continue;let n=s[r],o=typeof n;r==="parent"&&o==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(l=>Et(l,t)):(o==="object"&&n!==null&&(n=Et(n)),t[r]=n)}return t}function G(s,e){if(e&&typeof e.offset<"u")return e.offset;let t=1,r=1,n=0;for(let o=0;o<s.length;o++){if(r===e.line&&t===e.column){n=o;break}s[o]===`
`?(t=1,r+=1):t+=1}return n}var Ce=class{get proxyOf(){return this}constructor(e={}){this.raws={},this[Se]=!1,this[ao]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){for(let t in e)this[t]=e[t];return this}before(e){return this.parent.insertBefore(this,e),this}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}clone(e={}){let t=Et(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(e,t={}){if(this.source){let{end:r,start:n}=this.rangeBy(t);return this.source.input.error(e,{column:n.column,line:n.line},{column:r.column,line:r.line},t)}return new oo(e)}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0}}}markClean(){this[Se]=!0}markDirty(){if(this[Se]){this[Se]=!1;let e=this;for(;e=e.parent;)e[Se]=!1}}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e={}){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r="document"in this.source.input?this.source.input.document:this.source.input.css,o=r.slice(G(r,this.source.start),G(r,this.source.end)).indexOf(e.word);o!==-1&&(t=this.positionInside(o))}return t}positionInside(e){let t=this.source.start.column,r=this.source.start.line,n="document"in this.source.input?this.source.input.document:this.source.input.css,o=G(n,this.source.start),l=o+e;for(let a=o;a<l;a++)n[a]===`
`?(t=1,r+=1):t+=1;return{column:t,line:r,offset:l}}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}rangeBy(e={}){let t="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:G(t,this.source.start)},n=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:G(t,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(e.word){let l=t.slice(G(t,this.source.start),G(t,this.source.end)).indexOf(e.word);l!==-1&&(r=this.positionInside(l),n=this.positionInside(l+e.word.length))}else e.start?r={column:e.start.column,line:e.start.line,offset:G(t,e.start)}:e.index&&(r=this.positionInside(e.index)),e.end?n={column:e.end.column,line:e.end.line,offset:G(t,e.end)}:typeof e.endIndex=="number"?n=this.positionInside(e.endIndex):e.index&&(n=this.positionInside(e.index+1));return(n.line<r.line||n.line===r.line&&n.column<=r.column)&&(n={column:r.column+1,line:r.line,offset:r.offset+1}),{end:n,start:r}}raw(e,t){return new io().raw(this,e,t)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}toJSON(e,t){let r={},n=t==null;t=t||new Map;let o=0;for(let l in this){if(!Object.prototype.hasOwnProperty.call(this,l)||l==="parent"||l==="proxyCache")continue;let a=this[l];if(Array.isArray(a))r[l]=a.map(i=>typeof i=="object"&&i.toJSON?i.toJSON(null,t):i);else if(typeof a=="object"&&a.toJSON)r[l]=a.toJSON(null,t);else if(l==="source"){if(a==null)continue;let i=t.get(a.input);i==null&&(i=o,t.set(a.input,o),o++),r[l]={end:a.end,inputId:i,start:a.start}}else r[l]=a}return n&&(r.inputs=[...t.keys()].map(l=>l.toJSON())),r}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(e=lo){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}warn(e,t,r={}){let n={node:this};for(let o in r)n[o]=r[o];return e.warn(t,n)}};Rr.exports=Ce;Ce.default=Ce});var Oe=_((Ml,Pr)=>{"use strict";var co=_e(),Ee=class extends co{constructor(e){super(e),this.type="comment"}};Pr.exports=Ee;Ee.default=Ee});var Le=_(($l,Ir)=>{"use strict";var uo=_e(),Ae=class extends uo{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(e){e&&typeof e.value<"u"&&typeof e.value!="string"&&(e={...e,value:String(e.value)}),super(e),this.type="decl"}};Ir.exports=Ae;Ae.default=Ae});var J=_((kl,jr)=>{"use strict";var Nr=Oe(),qr=Le(),fo=_e(),{isClean:Tr,my:Dr}=He(),Ot,Br,Ur,At;function zr(s){return s.map(e=>(e.nodes&&(e.nodes=zr(e.nodes)),delete e.source,e))}function Fr(s){if(s[Tr]=!1,s.proxyOf.nodes)for(let e of s.proxyOf.nodes)Fr(e)}var F=class s extends fo{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}every(e){return this.nodes.every(e)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(o,l)=>n(o.toProxy(),l):n)):t==="every"||t==="some"?r=>e[t]((n,...o)=>r(n.toProxy(),...o)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0}}}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let l of n)this.proxyOf.nodes.splice(r+1,0,l);let o;for(let l in this.indexes)o=this.indexes[l],r<o&&(this.indexes[l]=o+n.length);return this.markDirty(),this}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,o=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let a of o)this.proxyOf.nodes.splice(r,0,a);let l;for(let a in this.indexes)l=this.indexes[a],r<=l&&(this.indexes[a]=l+o.length);return this.markDirty(),this}normalize(e,t){if(typeof e=="string")e=zr(Br(e).nodes);else if(typeof e>"u")e=[];else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value>"u")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new qr(e)]}else if(e.selector||e.selectors)e=[new At(e)];else if(e.name)e=[new Ot(e)];else if(e.text)e=[new Nr(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[Dr]||s.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[Tr]&&Fr(n),n.raws||(n.raws={}),typeof n.raws.before>"u"&&t&&typeof t.raws.before<"u"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(o){throw t.addToError(o)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}};F.registerParse=s=>{Br=s};F.registerRule=s=>{At=s};F.registerAtRule=s=>{Ot=s};F.registerRoot=s=>{Ur=s};jr.exports=F;F.default=F;F.rebuild=s=>{s.type==="atrule"?Object.setPrototypeOf(s,Ot.prototype):s.type==="rule"?Object.setPrototypeOf(s,At.prototype):s.type==="decl"?Object.setPrototypeOf(s,qr.prototype):s.type==="comment"?Object.setPrototypeOf(s,Nr.prototype):s.type==="root"&&Object.setPrototypeOf(s,Ur.prototype),s[Dr]=!0,s.nodes&&s.nodes.forEach(e=>{F.rebuild(e)})}});var Qe=_((Rl,Wr)=>{"use strict";var Vr=J(),ae=class extends Vr{constructor(e){super(e),this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Wr.exports=ae;ae.default=ae;Vr.registerAtRule(ae)});var Je=_((Pl,Hr)=>{"use strict";var ho=J(),Gr,Kr,ee=class extends ho{constructor(e){super({type:"document",...e}),this.nodes||(this.nodes=[])}toResult(e={}){return new Gr(new Kr,this,e).stringify()}};ee.registerLazyResult=s=>{Gr=s};ee.registerProcessor=s=>{Kr=s};Hr.exports=ee;ee.default=ee});var Jr=_((Il,Qr)=>{var po="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",mo=(s,e=21)=>(t=e)=>{let r="",n=t|0;for(;n--;)r+=s[Math.random()*s.length|0];return r},go=(s=21)=>{let e="",t=s|0;for(;t--;)e+=po[Math.random()*64|0];return e};Qr.exports={nanoid:go,customAlphabet:mo}});var Xr=_(Lt=>{var Yr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Lt.encode=function(s){if(0<=s&&s<Yr.length)return Yr[s];throw new TypeError("Must be between 0 and 63: "+s)};Lt.decode=function(s){var e=65,t=90,r=97,n=122,o=48,l=57,a=43,i=47,u=26,c=52;return e<=s&&s<=t?s-e:r<=s&&s<=n?s-r+u:o<=s&&s<=l?s-o+c:s==a?62:s==i?63:-1}});var kt=_($t=>{var Zr=Xr(),Mt=5,en=1<<Mt,tn=en-1,rn=en;function yo(s){return s<0?(-s<<1)+1:(s<<1)+0}function wo(s){var e=(s&1)===1,t=s>>1;return e?-t:t}$t.encode=function(e){var t="",r,n=yo(e);do r=n&tn,n>>>=Mt,n>0&&(r|=rn),t+=Zr.encode(r);while(n>0);return t};$t.decode=function(e,t,r){var n=e.length,o=0,l=0,a,i;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(i=Zr.decode(e.charCodeAt(t++)),i===-1)throw new Error("Invalid base64 digit: "+e.charAt(t-1));a=!!(i&rn),i&=tn,o=o+(i<<l),l+=Mt}while(a);r.value=wo(o),r.rest=t}});var ue=_(P=>{function vo(s,e,t){if(e in s)return s[e];if(arguments.length===3)return t;throw new Error('"'+e+'" is a required argument.')}P.getArg=vo;var nn=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,bo=/^data:.+\,.+$/;function Me(s){var e=s.match(nn);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}P.urlParse=Me;function ce(s){var e="";return s.scheme&&(e+=s.scheme+":"),e+="//",s.auth&&(e+=s.auth+"@"),s.host&&(e+=s.host),s.port&&(e+=":"+s.port),s.path&&(e+=s.path),e}P.urlGenerate=ce;var xo=32;function So(s){var e=[];return function(t){for(var r=0;r<e.length;r++)if(e[r].input===t){var n=e[0];return e[0]=e[r],e[r]=n,e[0].result}var o=s(t);return e.unshift({input:t,result:o}),e.length>xo&&e.pop(),o}}var Rt=So(function(e){var t=e,r=Me(e);if(r){if(!r.path)return e;t=r.path}for(var n=P.isAbsolute(t),o=[],l=0,a=0;;)if(l=a,a=t.indexOf("/",l),a===-1){o.push(t.slice(l));break}else for(o.push(t.slice(l,a));a<t.length&&t[a]==="/";)a++;for(var i,u=0,a=o.length-1;a>=0;a--)i=o[a],i==="."?o.splice(a,1):i===".."?u++:u>0&&(i===""?(o.splice(a+1,u),u=0):(o.splice(a,2),u--));return t=o.join("/"),t===""&&(t=n?"/":"."),r?(r.path=t,ce(r)):t});P.normalize=Rt;function sn(s,e){s===""&&(s="."),e===""&&(e=".");var t=Me(e),r=Me(s);if(r&&(s=r.path||"/"),t&&!t.scheme)return r&&(t.scheme=r.scheme),ce(t);if(t||e.match(bo))return e;if(r&&!r.host&&!r.path)return r.host=e,ce(r);var n=e.charAt(0)==="/"?e:Rt(s.replace(/\/+$/,"")+"/"+e);return r?(r.path=n,ce(r)):n}P.join=sn;P.isAbsolute=function(s){return s.charAt(0)==="/"||nn.test(s)};function Co(s,e){s===""&&(s="."),s=s.replace(/\/$/,"");for(var t=0;e.indexOf(s+"/")!==0;){var r=s.lastIndexOf("/");if(r<0||(s=s.slice(0,r),s.match(/^([^\/]+:\/)?\/*$/)))return e;++t}return Array(t+1).join("../")+e.substr(s.length+1)}P.relative=Co;var on=(function(){var s=Object.create(null);return!("__proto__"in s)})();function ln(s){return s}function _o(s){return an(s)?"$"+s:s}P.toSetString=on?ln:_o;function Eo(s){return an(s)?s.slice(1):s}P.fromSetString=on?ln:Eo;function an(s){if(!s)return!1;var e=s.length;if(e<9||s.charCodeAt(e-1)!==95||s.charCodeAt(e-2)!==95||s.charCodeAt(e-3)!==111||s.charCodeAt(e-4)!==116||s.charCodeAt(e-5)!==111||s.charCodeAt(e-6)!==114||s.charCodeAt(e-7)!==112||s.charCodeAt(e-8)!==95||s.charCodeAt(e-9)!==95)return!1;for(var t=e-10;t>=0;t--)if(s.charCodeAt(t)!==36)return!1;return!0}function Oo(s,e,t){var r=K(s.source,e.source);return r!==0||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}P.compareByOriginalPositions=Oo;function Ao(s,e,t){var r;return r=s.originalLine-e.originalLine,r!==0||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:K(s.name,e.name)}P.compareByOriginalPositionsNoSource=Ao;function Lo(s,e,t){var r=s.generatedLine-e.generatedLine;return r!==0||(r=s.generatedColumn-e.generatedColumn,r!==0||t)||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}P.compareByGeneratedPositionsDeflated=Lo;function Mo(s,e,t){var r=s.generatedColumn-e.generatedColumn;return r!==0||t||(r=K(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:K(s.name,e.name)}P.compareByGeneratedPositionsDeflatedNoLine=Mo;function K(s,e){return s===e?0:s===null?1:e===null?-1:s>e?1:-1}function $o(s,e){var t=s.generatedLine-e.generatedLine;return t!==0||(t=s.generatedColumn-e.generatedColumn,t!==0)||(t=K(s.source,e.source),t!==0)||(t=s.originalLine-e.originalLine,t!==0)||(t=s.originalColumn-e.originalColumn,t!==0)?t:K(s.name,e.name)}P.compareByGeneratedPositionsInflated=$o;function ko(s){return JSON.parse(s.replace(/^\)]}'[^\n]*\n/,""))}P.parseSourceMapInput=ko;function Ro(s,e,t){if(e=e||"",s&&(s[s.length-1]!=="/"&&e[0]!=="/"&&(s+="/"),e=s+e),t){var r=Me(t);if(!r)throw new Error("sourceMapURL could not be parsed");if(r.path){var n=r.path.lastIndexOf("/");n>=0&&(r.path=r.path.substring(0,n+1))}e=sn(ce(r),e)}return Rt(e)}P.computeSourceURL=Ro});var Nt=_(cn=>{var Pt=ue(),It=Object.prototype.hasOwnProperty,te=typeof Map<"u";function H(){this._array=[],this._set=te?new Map:Object.create(null)}H.fromArray=function(e,t){for(var r=new H,n=0,o=e.length;n<o;n++)r.add(e[n],t);return r};H.prototype.size=function(){return te?this._set.size:Object.getOwnPropertyNames(this._set).length};H.prototype.add=function(e,t){var r=te?e:Pt.toSetString(e),n=te?this.has(e):It.call(this._set,r),o=this._array.length;(!n||t)&&this._array.push(e),n||(te?this._set.set(e,o):this._set[r]=o)};H.prototype.has=function(e){if(te)return this._set.has(e);var t=Pt.toSetString(e);return It.call(this._set,t)};H.prototype.indexOf=function(e){if(te){var t=this._set.get(e);if(t>=0)return t}else{var r=Pt.toSetString(e);if(It.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')};H.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};H.prototype.toArray=function(){return this._array.slice()};cn.ArraySet=H});var hn=_(fn=>{var un=ue();function Po(s,e){var t=s.generatedLine,r=e.generatedLine,n=s.generatedColumn,o=e.generatedColumn;return r>t||r==t&&o>=n||un.compareByGeneratedPositionsInflated(s,e)<=0}function Ye(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Ye.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)};Ye.prototype.add=function(e){Po(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};Ye.prototype.toArray=function(){return this._sorted||(this._array.sort(un.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};fn.MappingList=Ye});var qt=_(pn=>{var $e=kt(),R=ue(),Xe=Nt().ArraySet,Io=hn().MappingList;function D(s){s||(s={}),this._file=R.getArg(s,"file",null),this._sourceRoot=R.getArg(s,"sourceRoot",null),this._skipValidation=R.getArg(s,"skipValidation",!1),this._ignoreInvalidMapping=R.getArg(s,"ignoreInvalidMapping",!1),this._sources=new Xe,this._names=new Xe,this._mappings=new Io,this._sourcesContents=null}D.prototype._version=3;D.fromSourceMap=function(e,t){var r=e.sourceRoot,n=new D(Object.assign(t||{},{file:e.file,sourceRoot:r}));return e.eachMapping(function(o){var l={generated:{line:o.generatedLine,column:o.generatedColumn}};o.source!=null&&(l.source=o.source,r!=null&&(l.source=R.relative(r,l.source)),l.original={line:o.originalLine,column:o.originalColumn},o.name!=null&&(l.name=o.name)),n.addMapping(l)}),e.sources.forEach(function(o){var l=o;r!==null&&(l=R.relative(r,o)),n._sources.has(l)||n._sources.add(l);var a=e.sourceContentFor(o);a!=null&&n.setSourceContent(o,a)}),n};D.prototype.addMapping=function(e){var t=R.getArg(e,"generated"),r=R.getArg(e,"original",null),n=R.getArg(e,"source",null),o=R.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(t,r,n,o)===!1||(n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),o!=null&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:n,name:o}))};D.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=R.relative(this._sourceRoot,r)),t!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[R.toSetString(r)]=t):this._sourcesContents&&(delete this._sourcesContents[R.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};D.prototype.applySourceMap=function(e,t,r){var n=t;if(t==null){if(e.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=e.file}var o=this._sourceRoot;o!=null&&(n=R.relative(o,n));var l=new Xe,a=new Xe;this._mappings.unsortedForEach(function(i){if(i.source===n&&i.originalLine!=null){var u=e.originalPositionFor({line:i.originalLine,column:i.originalColumn});u.source!=null&&(i.source=u.source,r!=null&&(i.source=R.join(r,i.source)),o!=null&&(i.source=R.relative(o,i.source)),i.originalLine=u.line,i.originalColumn=u.column,u.name!=null&&(i.name=u.name))}var c=i.source;c!=null&&!l.has(c)&&l.add(c);var h=i.name;h!=null&&!a.has(h)&&a.add(h)},this),this._sources=l,this._names=a,e.sources.forEach(function(i){var u=e.sourceContentFor(i);u!=null&&(r!=null&&(i=R.join(r,i)),o!=null&&(i=R.relative(o,i)),this.setSourceContent(i,u))},this)};D.prototype._validateMapping=function(e,t,r,n){if(t&&typeof t.line!="number"&&typeof t.column!="number"){var o="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!t&&!r&&!n)){if(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&r)return;var o="Invalid mapping: "+JSON.stringify({generated:e,source:r,original:t,name:n});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(o),!1;throw new Error(o)}};D.prototype._serializeMappings=function(){for(var e=0,t=1,r=0,n=0,o=0,l=0,a="",i,u,c,h,f=this._mappings.toArray(),p=0,d=f.length;p<d;p++){if(u=f[p],i="",u.generatedLine!==t)for(e=0;u.generatedLine!==t;)i+=";",t++;else if(p>0){if(!R.compareByGeneratedPositionsInflated(u,f[p-1]))continue;i+=","}i+=$e.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(h=this._sources.indexOf(u.source),i+=$e.encode(h-l),l=h,i+=$e.encode(u.originalLine-1-n),n=u.originalLine-1,i+=$e.encode(u.originalColumn-r),r=u.originalColumn,u.name!=null&&(c=this._names.indexOf(u.name),i+=$e.encode(c-o),o=c)),a+=i}return a};D.prototype._generateSourcesContent=function(e,t){return e.map(function(r){if(!this._sourcesContents)return null;t!=null&&(r=R.relative(t,r));var n=R.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)};D.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};D.prototype.toString=function(){return JSON.stringify(this.toJSON())};pn.SourceMapGenerator=D});var dn=_(re=>{re.GREATEST_LOWER_BOUND=1;re.LEAST_UPPER_BOUND=2;function Tt(s,e,t,r,n,o){var l=Math.floor((e-s)/2)+s,a=n(t,r[l],!0);return a===0?l:a>0?e-l>1?Tt(l,e,t,r,n,o):o==re.LEAST_UPPER_BOUND?e<r.length?e:-1:l:l-s>1?Tt(s,l,t,r,n,o):o==re.LEAST_UPPER_BOUND?l:s<0?-1:s}re.search=function(e,t,r,n){if(t.length===0)return-1;var o=Tt(-1,t.length,e,t,r,n||re.GREATEST_LOWER_BOUND);if(o<0)return-1;for(;o-1>=0&&r(t[o],t[o-1],!0)===0;)--o;return o}});var yn=_(gn=>{function No(s){function e(n,o,l){var a=n[o];n[o]=n[l],n[l]=a}function t(n,o){return Math.round(n+Math.random()*(o-n))}function r(n,o,l,a){if(l<a){var i=t(l,a),u=l-1;e(n,i,a);for(var c=n[a],h=l;h<a;h++)o(n[h],c,!1)<=0&&(u+=1,e(n,u,h));e(n,u+1,h);var f=u+1;r(n,o,l,f-1),r(n,o,f+1,a)}}return r}function qo(s){let e=No.toString();return new Function(`return ${e}`)()(s)}var mn=new WeakMap;gn.quickSort=function(s,e,t=0){let r=mn.get(e);r===void 0&&(r=qo(e),mn.set(e,r)),r(s,e,t,s.length-1)}});var bn=_(Ze=>{var v=ue(),Bt=dn(),fe=Nt().ArraySet,To=kt(),ke=yn().quickSort;function $(s,e){var t=s;return typeof s=="string"&&(t=v.parseSourceMapInput(s)),t.sections!=null?new j(t,e):new I(t,e)}$.fromSourceMap=function(s,e){return I.fromSourceMap(s,e)};$.prototype._version=3;$.prototype.__generatedMappings=null;Object.defineProperty($.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});$.prototype.__originalMappings=null;Object.defineProperty($.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});$.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return r===";"||r===","};$.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")};$.GENERATED_ORDER=1;$.ORIGINAL_ORDER=2;$.GREATEST_LOWER_BOUND=1;$.LEAST_UPPER_BOUND=2;$.prototype.eachMapping=function(e,t,r){var n=t||null,o=r||$.GENERATED_ORDER,l;switch(o){case $.GENERATED_ORDER:l=this._generatedMappings;break;case $.ORIGINAL_ORDER:l=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var a=this.sourceRoot,i=e.bind(n),u=this._names,c=this._sources,h=this._sourceMapURL,f=0,p=l.length;f<p;f++){var d=l[f],w=d.source===null?null:c.at(d.source);w!==null&&(w=v.computeSourceURL(a,w,h)),i({source:w,generatedLine:d.generatedLine,generatedColumn:d.generatedColumn,originalLine:d.originalLine,originalColumn:d.originalColumn,name:d.name===null?null:u.at(d.name)})}};$.prototype.allGeneratedPositionsFor=function(e){var t=v.getArg(e,"line"),r={source:v.getArg(e,"source"),originalLine:t,originalColumn:v.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var n=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",v.compareByOriginalPositions,Bt.LEAST_UPPER_BOUND);if(o>=0){var l=this._originalMappings[o];if(e.column===void 0)for(var a=l.originalLine;l&&l.originalLine===a;)n.push({line:v.getArg(l,"generatedLine",null),column:v.getArg(l,"generatedColumn",null),lastColumn:v.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++o];else for(var i=l.originalColumn;l&&l.originalLine===t&&l.originalColumn==i;)n.push({line:v.getArg(l,"generatedLine",null),column:v.getArg(l,"generatedColumn",null),lastColumn:v.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++o]}return n};Ze.SourceMapConsumer=$;function I(s,e){var t=s;typeof s=="string"&&(t=v.parseSourceMapInput(s));var r=v.getArg(t,"version"),n=v.getArg(t,"sources"),o=v.getArg(t,"names",[]),l=v.getArg(t,"sourceRoot",null),a=v.getArg(t,"sourcesContent",null),i=v.getArg(t,"mappings"),u=v.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);l&&(l=v.normalize(l)),n=n.map(String).map(v.normalize).map(function(c){return l&&v.isAbsolute(l)&&v.isAbsolute(c)?v.relative(l,c):c}),this._names=fe.fromArray(o.map(String),!0),this._sources=fe.fromArray(n,!0),this._absoluteSources=this._sources.toArray().map(function(c){return v.computeSourceURL(l,c,e)}),this.sourceRoot=l,this.sourcesContent=a,this._mappings=i,this._sourceMapURL=e,this.file=u}I.prototype=Object.create($.prototype);I.prototype.consumer=$;I.prototype._findSourceIndex=function(s){var e=s;if(this.sourceRoot!=null&&(e=v.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var t;for(t=0;t<this._absoluteSources.length;++t)if(this._absoluteSources[t]==s)return t;return-1};I.fromSourceMap=function(e,t){var r=Object.create(I.prototype),n=r._names=fe.fromArray(e._names.toArray(),!0),o=r._sources=fe.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=t,r._absoluteSources=r._sources.toArray().map(function(p){return v.computeSourceURL(r.sourceRoot,p,t)});for(var l=e._mappings.toArray().slice(),a=r.__generatedMappings=[],i=r.__originalMappings=[],u=0,c=l.length;u<c;u++){var h=l[u],f=new vn;f.generatedLine=h.generatedLine,f.generatedColumn=h.generatedColumn,h.source&&(f.source=o.indexOf(h.source),f.originalLine=h.originalLine,f.originalColumn=h.originalColumn,h.name&&(f.name=n.indexOf(h.name)),i.push(f)),a.push(f)}return ke(r.__originalMappings,v.compareByOriginalPositions),r};I.prototype._version=3;Object.defineProperty(I.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function vn(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var Dt=v.compareByGeneratedPositionsDeflatedNoLine;function wn(s,e){let t=s.length,r=s.length-e;if(!(r<=1))if(r==2){let n=s[e],o=s[e+1];Dt(n,o)>0&&(s[e]=o,s[e+1]=n)}else if(r<20)for(let n=e;n<t;n++)for(let o=n;o>e;o--){let l=s[o-1],a=s[o];if(Dt(l,a)<=0)break;s[o-1]=a,s[o]=l}else ke(s,Dt,e)}I.prototype._parseMappings=function(e,t){var r=1,n=0,o=0,l=0,a=0,i=0,u=e.length,c=0,h={},f={},p=[],d=[],w,y,g,m,S;let C=0;for(;c<u;)if(e.charAt(c)===";")r++,c++,n=0,wn(d,C),C=d.length;else if(e.charAt(c)===",")c++;else{for(w=new vn,w.generatedLine=r,m=c;m<u&&!this._charIsMappingSeparator(e,m);m++);for(y=e.slice(c,m),g=[];c<m;)To.decode(e,c,f),S=f.value,c=f.rest,g.push(S);if(g.length===2)throw new Error("Found a source, but no line and column");if(g.length===3)throw new Error("Found a source and line, but no column");if(w.generatedColumn=n+g[0],n=w.generatedColumn,g.length>1&&(w.source=a+g[1],a+=g[1],w.originalLine=o+g[2],o=w.originalLine,w.originalLine+=1,w.originalColumn=l+g[3],l=w.originalColumn,g.length>4&&(w.name=i+g[4],i+=g[4])),d.push(w),typeof w.originalLine=="number"){let b=w.source;for(;p.length<=b;)p.push(null);p[b]===null&&(p[b]=[]),p[b].push(w)}}wn(d,C),this.__generatedMappings=d;for(var x=0;x<p.length;x++)p[x]!=null&&ke(p[x],v.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...p)};I.prototype._findMapping=function(e,t,r,n,o,l){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return Bt.search(e,t,o,l)};I.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}};I.prototype.originalPositionFor=function(e){var t={generatedLine:v.getArg(e,"line"),generatedColumn:v.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",v.compareByGeneratedPositionsDeflated,v.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(r>=0){var n=this._generatedMappings[r];if(n.generatedLine===t.generatedLine){var o=v.getArg(n,"source",null);o!==null&&(o=this._sources.at(o),o=v.computeSourceURL(this.sourceRoot,o,this._sourceMapURL));var l=v.getArg(n,"name",null);return l!==null&&(l=this._names.at(l)),{source:o,line:v.getArg(n,"originalLine",null),column:v.getArg(n,"originalColumn",null),name:l}}}return{source:null,line:null,column:null,name:null}};I.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};I.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var n=e;this.sourceRoot!=null&&(n=v.relative(this.sourceRoot,n));var o;if(this.sourceRoot!=null&&(o=v.urlParse(this.sourceRoot))){var l=n.replace(/^file:\/\//,"");if(o.scheme=="file"&&this._sources.has(l))return this.sourcesContent[this._sources.indexOf(l)];if((!o.path||o.path=="/")&&this._sources.has("/"+n))return this.sourcesContent[this._sources.indexOf("/"+n)]}if(t)return null;throw new Error('"'+n+'" is not in the SourceMap.')};I.prototype.generatedPositionFor=function(e){var t=v.getArg(e,"source");if(t=this._findSourceIndex(t),t<0)return{line:null,column:null,lastColumn:null};var r={source:t,originalLine:v.getArg(e,"line"),originalColumn:v.getArg(e,"column")},n=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",v.compareByOriginalPositions,v.getArg(e,"bias",$.GREATEST_LOWER_BOUND));if(n>=0){var o=this._originalMappings[n];if(o.source===r.source)return{line:v.getArg(o,"generatedLine",null),column:v.getArg(o,"generatedColumn",null),lastColumn:v.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};Ze.BasicSourceMapConsumer=I;function j(s,e){var t=s;typeof s=="string"&&(t=v.parseSourceMapInput(s));var r=v.getArg(t,"version"),n=v.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new fe,this._names=new fe;var o={line:-1,column:0};this._sections=n.map(function(l){if(l.url)throw new Error("Support for url field in sections not implemented.");var a=v.getArg(l,"offset"),i=v.getArg(a,"line"),u=v.getArg(a,"column");if(i<o.line||i===o.line&&u<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=a,{generatedOffset:{generatedLine:i+1,generatedColumn:u+1},consumer:new $(v.getArg(l,"map"),e)}})}j.prototype=Object.create($.prototype);j.prototype.constructor=$;j.prototype._version=3;Object.defineProperty(j.prototype,"sources",{get:function(){for(var s=[],e=0;e<this._sections.length;e++)for(var t=0;t<this._sections[e].consumer.sources.length;t++)s.push(this._sections[e].consumer.sources[t]);return s}});j.prototype.originalPositionFor=function(e){var t={generatedLine:v.getArg(e,"line"),generatedColumn:v.getArg(e,"column")},r=Bt.search(t,this._sections,function(o,l){var a=o.generatedLine-l.generatedOffset.generatedLine;return a||o.generatedColumn-l.generatedOffset.generatedColumn}),n=this._sections[r];return n?n.consumer.originalPositionFor({line:t.generatedLine-(n.generatedOffset.generatedLine-1),column:t.generatedColumn-(n.generatedOffset.generatedLine===t.generatedLine?n.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};j.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};j.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r],o=n.consumer.sourceContentFor(e,!0);if(o||o==="")return o}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')};j.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(r.consumer._findSourceIndex(v.getArg(e,"source"))!==-1){var n=r.consumer.generatedPositionFor(e);if(n){var o={line:n.line+(r.generatedOffset.generatedLine-1),column:n.column+(r.generatedOffset.generatedLine===n.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}};j.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var n=this._sections[r],o=n.consumer._generatedMappings,l=0;l<o.length;l++){var a=o[l],i=n.consumer._sources.at(a.source);i!==null&&(i=v.computeSourceURL(n.consumer.sourceRoot,i,this._sourceMapURL)),this._sources.add(i),i=this._sources.indexOf(i);var u=null;a.name&&(u=n.consumer._names.at(a.name),this._names.add(u),u=this._names.indexOf(u));var c={source:i,generatedLine:a.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(n.generatedOffset.generatedLine===a.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:u};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}ke(this.__generatedMappings,v.compareByGeneratedPositionsDeflated),ke(this.__originalMappings,v.compareByOriginalPositions)};Ze.IndexedSourceMapConsumer=j});var Sn=_(xn=>{var Do=qt().SourceMapGenerator,et=ue(),Bo=/(\r?\n)/,Uo=10,he="$$$isSourceNode$$$";function q(s,e,t,r,n){this.children=[],this.sourceContents={},this.line=s??null,this.column=e??null,this.source=t??null,this.name=n??null,this[he]=!0,r!=null&&this.add(r)}q.fromStringWithSourceMap=function(e,t,r){var n=new q,o=e.split(Bo),l=0,a=function(){var f=d(),p=d()||"";return f+p;function d(){return l<o.length?o[l++]:void 0}},i=1,u=0,c=null;return t.eachMapping(function(f){if(c!==null)if(i<f.generatedLine)h(c,a()),i++,u=0;else{var p=o[l]||"",d=p.substr(0,f.generatedColumn-u);o[l]=p.substr(f.generatedColumn-u),u=f.generatedColumn,h(c,d),c=f;return}for(;i<f.generatedLine;)n.add(a()),i++;if(u<f.generatedColumn){var p=o[l]||"";n.add(p.substr(0,f.generatedColumn)),o[l]=p.substr(f.generatedColumn),u=f.generatedColumn}c=f},this),l<o.length&&(c&&h(c,a()),n.add(o.splice(l).join(""))),t.sources.forEach(function(f){var p=t.sourceContentFor(f);p!=null&&(r!=null&&(f=et.join(r,f)),n.setSourceContent(f,p))}),n;function h(f,p){if(f===null||f.source===void 0)n.add(p);else{var d=r?et.join(r,f.source):f.source;n.add(new q(f.originalLine,f.originalColumn,d,p,f.name))}}};q.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(t){this.add(t)},this);else if(e[he]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};q.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[he]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};q.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)t=this.children[r],t[he]?t.walk(e):t!==""&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})};q.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this};q.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[he]?r.replaceRight(e,t):typeof r=="string"?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this};q.prototype.setSourceContent=function(e,t){this.sourceContents[et.toSetString(e)]=t};q.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][he]&&this.children[t].walkSourceContents(e);for(var n=Object.keys(this.sourceContents),t=0,r=n.length;t<r;t++)e(et.fromSetString(n[t]),this.sourceContents[n[t]])};q.prototype.toString=function(){var e="";return this.walk(function(t){e+=t}),e};q.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new Do(e),n=!1,o=null,l=null,a=null,i=null;return this.walk(function(u,c){t.code+=u,c.source!==null&&c.line!==null&&c.column!==null?((o!==c.source||l!==c.line||a!==c.column||i!==c.name)&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name}),o=c.source,l=c.line,a=c.column,i=c.name,n=!0):n&&(r.addMapping({generated:{line:t.line,column:t.column}}),o=null,n=!1);for(var h=0,f=u.length;h<f;h++)u.charCodeAt(h)===Uo?(t.line++,t.column=0,h+1===f?(o=null,n=!1):n&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name})):t.column++}),this.walkSourceContents(function(u,c){r.setSourceContent(u,c)}),{code:t.code,map:r}};xn.SourceNode=q});var rt=_(tt=>{tt.SourceMapGenerator=qt().SourceMapGenerator;tt.SourceMapConsumer=bn().SourceMapConsumer;tt.SourceNode=Sn().SourceNode});var zt=_((Gl,En)=>{"use strict";var{existsSync:zo,readFileSync:Fo}=require("fs"),{dirname:Ut,join:jo}=require("path"),{SourceMapConsumer:Cn,SourceMapGenerator:_n}=rt();function Vo(s){return Buffer?Buffer.from(s,"base64").toString():window.atob(s)}var Re=class{constructor(e,t){if(t.map===!1)return;t.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:");let r=t.map?t.map.prev:void 0,n=this.loadMap(t.from,r);!this.mapFile&&t.from&&(this.mapFile=t.from),this.mapFile&&(this.root=Ut(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new Cn(this.json||this.text)),this.consumerCache}decodeInline(e){let t=/^data:application\/json;charset=utf-?8;base64,/,r=/^data:application\/json;base64,/,n=/^data:application\/json;charset=utf-?8,/,o=/^data:application\/json,/,l=e.match(n)||e.match(o);if(l)return decodeURIComponent(e.substr(l[0].length));let a=e.match(t)||e.match(r);if(a)return Vo(e.substr(a[0].length));let i=e.slice(22);throw i=i.slice(0,i.indexOf(",")),new Error("Unsupported source map encoding "+i)}getAnnotationURL(e){return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){return typeof e!="object"?!1:typeof e.mappings=="string"||typeof e._mappings=="string"||Array.isArray(e.sections)}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return;let r=e.lastIndexOf(t.pop()),n=e.indexOf("*/",r);r>-1&&n>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,n)))}loadFile(e,t,r){if(!(!r&&!this.unsafeMap&&!/\.map$/i.test(e))&&(this.root=Ut(e),zo(e)))return this.mapFile=e,Fo(e,"utf-8").toString().trim()}loadMap(e,t){if(t===!1)return!1;if(t){if(typeof t=="string")return t;if(typeof t=="function"){let r=t(e);if(r){let n=this.loadFile(r,e,!0);if(!n)throw new Error("Unable to load previous source map: "+r.toString());return n}}else{if(t instanceof Cn)return _n.fromSourceMap(t).toString();if(t instanceof _n)return t.toString();if(this.isMap(t))return JSON.stringify(t);throw new Error("Unsupported previous source map format: "+t.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;e&&(r=jo(Ut(e),r));let n=this.loadFile(r,e,!1);if(n)try{this.json=JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}catch{return}return n}}}startWith(e,t){return e?e.substr(0,t.length)===t:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};En.exports=Re;Re.default=Re});var Pe=_((Kl,$n)=>{"use strict";var{nanoid:Wo}=Jr(),{isAbsolute:Vt,resolve:Wt}=require("path"),{SourceMapConsumer:Go,SourceMapGenerator:Ko}=rt(),{fileURLToPath:On,pathToFileURL:nt}=require("url"),An=Ke(),Ho=zt(),Ft=xt(),jt=Symbol("lineToIndexCache"),Qo=!!(Go&&Ko),Ln=!!(Wt&&Vt);function Mn(s){if(s[jt])return s[jt];let e=s.css.split(`
`),t=new Array(e.length),r=0;for(let n=0,o=e.length;n<o;n++)t[n]=r,r+=e[n].length+1;return s[jt]=t,t}var pe=class{get from(){return this.file||this.id}constructor(e,t={}){if(e===null||typeof e>"u"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,t.document&&(this.document=t.document.toString()),t.from&&(!Ln||/^\w+:\/\//.test(t.from)||Vt(t.from)?this.file=t.from:this.file=Wt(t.from)),Ln&&Qo){let r=new Ho(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+Wo(6)+">"),this.map&&(this.map.file=this.from)}error(e,t,r,n={}){let o,l,a,i,u;if(t&&typeof t=="object"){let h=t,f=r;if(typeof h.offset=="number"){i=h.offset;let p=this.fromOffset(i);t=p.line,r=p.col}else t=h.line,r=h.column,i=this.fromLineAndColumn(t,r);if(typeof f.offset=="number"){a=f.offset;let p=this.fromOffset(a);l=p.line,o=p.col}else l=f.line,o=f.column,a=this.fromLineAndColumn(f.line,f.column)}else if(r)i=this.fromLineAndColumn(t,r);else{i=t;let h=this.fromOffset(i);t=h.line,r=h.col}let c=this.origin(t,r,l,o);return c?u=new An(e,c.endLine===void 0?c.line:{column:c.column,line:c.line},c.endLine===void 0?c.column:{column:c.endColumn,line:c.endLine},c.source,c.file,n.plugin):u=new An(e,l===void 0?t:{column:r,line:t},l===void 0?r:{column:o,line:l},this.css,this.file,n.plugin),u.input={column:r,endColumn:o,endLine:l,endOffset:a,line:t,offset:i,source:this.css},this.file&&(nt&&(u.input.url=nt(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(e,t){return Mn(this)[e-1]+t-1}fromOffset(e){let t=Mn(this),r=t[t.length-1],n=0;if(e>=r)n=t.length-1;else{let o=t.length-2,l;for(;n<o;)if(l=n+(o-n>>1),e<t[l])o=l-1;else if(e>=t[l+1])n=l+1;else{n=l;break}}return{col:e-t[n]+1,line:n+1}}mapResolve(e){return/^\w+:\/\//.test(e)?e:Wt(this.map.consumer().sourceRoot||this.map.root||".",e)}origin(e,t,r,n){if(!this.map)return!1;let o=this.map.consumer(),l=o.originalPositionFor({column:t,line:e});if(!l.source)return!1;let a;typeof r=="number"&&(a=o.originalPositionFor({column:n,line:r}));let i;Vt(l.source)?i=nt(l.source):i=new URL(l.source,this.map.consumer().sourceRoot||nt(this.map.mapFile));let u={column:l.column,endColumn:a&&a.column,endLine:a&&a.line,line:l.line,url:i.toString()};if(i.protocol==="file:")if(On)u.file=On(i);else throw new Error("file: protocol is not available in this PostCSS build");let c=o.sourceContentFor(l.source);return c&&(u.source=c),u}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};$n.exports=pe;pe.default=pe;Ft&&Ft.registerInput&&Ft.registerInput(pe)});var de=_((Hl,In)=>{"use strict";var kn=J(),Rn,Pn,Y=class extends kn{constructor(e){super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let o of n)o.raws.before=t.raws.before}return n}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}toResult(e={}){return new Rn(new Pn,this,e).stringify()}};Y.registerLazyResult=s=>{Rn=s};Y.registerProcessor=s=>{Pn=s};In.exports=Y;Y.default=Y;kn.registerRoot(Y)});var Gt=_((Ql,Nn)=>{"use strict";var Ie={comma(s){return Ie.split(s,[","],!0)},space(s){let e=[" ",`
`,"	"];return Ie.split(s,e)},split(s,e,t){let r=[],n="",o=!1,l=0,a=!1,i="",u=!1;for(let c of s)u?u=!1:c==="\\"?u=!0:a?c===i&&(a=!1):c==='"'||c==="'"?(a=!0,i=c):c==="("?l+=1:c===")"?l>0&&(l-=1):l===0&&e.includes(c)&&(o=!0),o?(n!==""&&r.push(n.trim()),n="",o=!1):n+=c;return(t||n!=="")&&r.push(n.trim()),r}};Nn.exports=Ie;Ie.default=Ie});var st=_((Jl,Tn)=>{"use strict";var qn=J(),Jo=Gt(),me=class extends qn{get selectors(){return Jo.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}constructor(e){super(e),this.type="rule",this.nodes||(this.nodes=[])}};Tn.exports=me;me.default=me;qn.registerRule(me)});var Bn=_((Yl,Dn)=>{"use strict";var Yo=Qe(),Xo=Oe(),Zo=Le(),ei=Pe(),ti=zt(),ri=de(),ni=st();function Ne(s,e){if(Array.isArray(s))return s.map(n=>Ne(n));let{inputs:t,...r}=s;if(t){e=[];for(let n of t){let o={...n,__proto__:ei.prototype};o.map&&(o.map={...o.map,__proto__:ti.prototype}),e.push(o)}}if(r.nodes&&(r.nodes=s.nodes.map(n=>Ne(n,e))),r.source){let{inputId:n,...o}=r.source;r.source=o,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new ri(r);if(r.type==="decl")return new Zo(r);if(r.type==="rule")return new ni(r);if(r.type==="comment")return new Xo(r);if(r.type==="atrule")return new Yo(r);throw new Error("Unknown node type: "+s.type)}Dn.exports=Ne;Ne.default=Ne});var Ht=_((Xl,Wn)=>{"use strict";var{dirname:ot,relative:zn,resolve:Fn,sep:jn}=require("path"),{SourceMapConsumer:Vn,SourceMapGenerator:it}=rt(),{pathToFileURL:Un}=require("url"),si=Pe(),oi=!!(Vn&&it),ii=!!(ot&&Fn&&zn&&jn),Kt=class{constructor(e,t,r,n){this.stringify=e,this.mapOpts=r.map||{},this.root=t,this.opts=r,this.css=n,this.originalCSS=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e;this.isInline()?e="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?e=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?e=this.mapOpts.annotation(this.opts.to,this.root):e=this.outputFile()+".map";let t=`
`;this.css.includes(`\r
`)&&(t=`\r
`),this.css+=t+"/*# sourceMappingURL="+e+" */"}applyPrevMaps(){for(let e of this.previous()){let t=this.toUrl(this.path(e.file)),r=e.root||ot(e.file),n;this.mapOpts.sourcesContent===!1?(n=new Vn(e.text),n.sourcesContent&&(n.sourcesContent=null)):n=e.consumer(),this.map.applySourceMap(n,t,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let e;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],e.type==="comment"&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)}else if(this.css){let e;for(;(e=this.css.lastIndexOf("/*#"))!==-1;){let t=this.css.indexOf("*/",e+3);if(t===-1)break;for(;e>0&&this.css[e-1]===`
`;)e--;this.css=this.css.slice(0,e)+this.css.slice(t+2)}}}}generate(){if(this.clearAnnotation(),ii&&oi&&this.isMap())return this.generateMap();{let e="";return this.stringify(this.root,t=>{e+=t}),[e]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let e=this.previous()[0].consumer();e.file=this.outputFile(),this.map=it.fromSourceMap(e,{ignoreInvalidMapping:!0})}else this.map=new it({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new it({file:this.outputFile(),ignoreInvalidMapping:!0});let e=1,t=1,r="<no source>",n={generated:{column:0,line:0},original:{column:0,line:0},source:""},o,l;this.stringify(this.root,(a,i,u)=>{if(this.css+=a,i&&u!=="end"&&(n.generated.line=e,n.generated.column=t-1,i.source&&i.source.start?(n.source=this.sourcePath(i),n.original.line=i.source.start.line,n.original.column=i.source.start.column-1,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,this.map.addMapping(n))),l=a.match(/\n/g),l?(e+=l.length,o=a.lastIndexOf(`
`),t=a.length-o):t+=a.length,i&&u!=="start"){let c=i.parent||{raws:{}};(!(i.type==="decl"||i.type==="atrule"&&!i.nodes)||i!==c.last||c.raws.semicolon)&&(i.source&&i.source.end?(n.source=this.sourcePath(i),n.original.line=i.source.end.line,n.original.column=i.source.end.column-1,n.generated.line=e,n.generated.column=t-2,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,n.generated.line=e,n.generated.column=t-1,this.map.addMapping(n)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(e=>e.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let e=this.mapOpts.annotation;return typeof e<"u"&&e!==!0?!1:this.previous().length?this.previous().some(t=>t.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(e=>e.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(e){if(this.mapOpts.absolute||e.charCodeAt(0)===60||/^\w+:\/\//.test(e))return e;let t=this.memoizedPaths.get(e);if(t)return t;let r=this.opts.to?ot(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=ot(Fn(r,this.mapOpts.annotation)));let n=zn(r,e);return this.memoizedPaths.set(e,n),n}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(e=>{if(e.source&&e.source.input.map){let t=e.source.input.map;this.previousMaps.includes(t)||this.previousMaps.push(t)}});else{let e=new si(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}return this.previousMaps}setSourcesContent(){let e={};if(this.root)this.root.walk(t=>{if(t.source){let r=t.source.input.from;if(r&&!e[r]){e[r]=!0;let n=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(n,t.source.input.css)}}});else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}sourcePath(e){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))}toBase64(e){return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(Un){let r=Un(e).toString();return this.memoizedFileURLs.set(e,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t;jn==="\\"&&(e=e.replace(/\\/g,"/"));let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(e,r),r}};Wn.exports=Kt});var Qn=_((Zl,Hn)=>{"use strict";var li=Qe(),ai=Oe(),ci=Le(),ui=de(),Gn=st(),fi=bt(),Kn={empty:!0,space:!0};function hi(s){for(let e=s.length-1;e>=0;e--){let t=s[e],r=t[3]||t[2];if(r)return r}}function Qt(s,e,t){let r="";for(let n=e;n<t;n++)r+=s[n][1];return r}var Jt=class{constructor(e){this.input=e,this.root=new ui,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0}}}atrule(e){let t=new li;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,o,l=!1,a=!1,i=[],u=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),t.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){a=!0;break}else if(r==="}"){if(i.length>0){for(o=i.length-1,n=i[o];n&&n[0]==="space";)n=i[--o];n&&(t.source.end=this.getPosition(n[3]||n[2]),t.source.end.offset++)}this.end(e);break}else i.push(e);else i.push(e);if(this.tokenizer.endOfFile()){l=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(i),i.length?(t.raws.afterName=this.spacesAndCommentsFromStart(i),this.raw(t,"params",i),l&&(e=i[i.length-1],t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++,this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),a&&(t.nodes=[],this.current=t)}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let o=t-1;o>=0&&(n=e[o],!(n[0]!=="space"&&(r+=1,r===2)));o--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}colon(e){let t=0,r,n,o;for(let[l,a]of e.entries()){if(n=a,o=n[0],o==="("&&(t+=1),o===")"&&(t-=1),t===0&&o===":")if(!r)this.doubleColon(n);else{if(r[0]==="word"&&r[1]==="progid")continue;return l}r=n}return!1}comment(e){let t=new ai;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++;let r=e[1].slice(2,-2);if(!r.trim())t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}createTokenizer(){this.tokenizer=fi(this.input)}decl(e,t){let r=new ci;this.init(r,e[0][2]);let n=e[e.length-1];n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||hi(e)),r.source.end.offset++;let o=0;for(;e[o][0]!=="word";)o===e.length-1&&this.unknownWord([e[o]]),o++;r.raws.before+=Qt(e,0,o),r.source.start=this.getPosition(e[o][2]);let l=o;for(;o<e.length;){let f=e[o][0];if(f===":"||f==="space"||f==="comment")break;o++}r.prop=Qt(e,l,o);let a=o,i;for(;o<e.length&&(i=e[o],o++,i[0]!==":");)i[0]==="word"&&/\w/.test(i[1])&&this.unknownWord([i]);r.raws.between=Qt(e,a,o),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=o;for(;o<e.length;){let f=e[o][0];if(f!=="space"&&f!=="comment")break;o++}let c=e.slice(u,o);e=e.slice(o),this.precheckMissedSemicolon(e);for(let f=e.length-1;f>=0;f--){if(i=e[f],i[1].toLowerCase()==="!important"){r.important=!0;let p=this.stringFrom(e,f);p=this.spacesFromEnd(e)+p,p!==" !important"&&(r.raws.important=p);break}else if(i[1].toLowerCase()==="important"){let p=e.slice(0),d="";for(let w=f;w>0;w--){let y=p[w][0];if(d.trim().startsWith("!")&&y!=="space")break;d=p.pop()[1]+d}d.trim().startsWith("!")&&(r.important=!0,r.raws.important=d,e=p)}if(i[0]!=="space"&&i[0]!=="comment")break}e.some(f=>f[0]!=="space"&&f[0]!=="comment")&&(r.raws.between+=c.map(f=>f[1]).join(""),c=[]),this.raw(r,"value",c.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}emptyRule(e){let t=new Gn;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="",t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,start:this.getPosition(t)},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}other(e){let t=!1,r=null,n=!1,o=null,l=[],a=e[1].startsWith("--"),i=[],u=e;for(;u;){if(r=u[0],i.push(u),r==="("||r==="[")o||(o=u),l.push(r==="("?")":"]");else if(a&&n&&r==="{")o||(o=u),l.push("}");else if(l.length===0)if(r===";")if(n){this.decl(i,a);return}else break;else if(r==="{"){this.rule(i);return}else if(r==="}"){this.tokenizer.back(i.pop()),t=!0;break}else r===":"&&(n=!0);else r===l[l.length-1]&&(l.pop(),l.length===0&&(o=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),l.length>0&&this.unclosedBracket(o),t&&n){if(!a)for(;i.length&&(u=i[i.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(i.pop());this.decl(i,a)}else this.unknownWord(i)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,n){let o,l,a=r.length,i="",u=!0,c,h;for(let f=0;f<a;f+=1)o=r[f],l=o[0],l==="space"&&f===a-1&&!n?u=!1:l==="comment"?(h=r[f-1]?r[f-1][0]:"empty",c=r[f+1]?r[f+1][0]:"empty",!Kn[h]&&!Kn[c]?i.slice(-1)===","?u=!1:i+=o[1]:u=!1):i+=o[1];if(!u){let f=r.reduce((p,d)=>p+d[1],"");e.raws[t]={raw:f,value:i}}e[t]=i}rule(e){e.pop();let t=new Gn;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}};Hn.exports=Jt});var at=_((ea,Jn)=>{"use strict";var pi=J(),di=Pe(),mi=Qn();function lt(s,e){let t=new di(s,e),r=new mi(t);try{r.parse()}catch(n){throw process.env.NODE_ENV!=="production"&&n.name==="CssSyntaxError"&&e&&e.from&&(/\.scss$/i.test(e.from)?n.message+=`
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser`:/\.sass/i.test(e.from)?n.message+=`
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser`:/\.less$/i.test(e.from)&&(n.message+=`
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)),n}return r.root}Jn.exports=lt;lt.default=lt;pi.registerParse(lt)});var Yt=_((ta,Yn)=>{"use strict";var qe=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Yn.exports=qe;qe.default=qe});var ct=_((ra,Xn)=>{"use strict";var gi=Yt(),Te=class{get content(){return this.css}constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new gi(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}};Xn.exports=Te;Te.default=Te});var Xt=_((na,es)=>{"use strict";var Zn={};es.exports=function(e){Zn[e]||(Zn[e]=!0,typeof console<"u"&&console.warn&&console.warn(e))}});var tr=_((sa,ss)=>{"use strict";var yi=J(),wi=Je(),vi=Ht(),bi=at(),ts=ct(),xi=de(),Si=xe(),{isClean:V,my:Ci}=He(),_i=Xt(),Ei={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},Oi={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},Ai={Once:!0,postcssPlugin:!0,prepare:!0},ge=0;function De(s){return typeof s=="object"&&typeof s.then=="function"}function ns(s){let e=!1,t=Ei[s.type];return s.type==="decl"?e=s.prop.toLowerCase():s.type==="atrule"&&(e=s.name.toLowerCase()),e&&s.append?[t,t+"-"+e,ge,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:s.append?[t,ge,t+"Exit"]:[t,t+"Exit"]}function rs(s){let e;return s.type==="document"?e=["Document",ge,"DocumentExit"]:s.type==="root"?e=["Root",ge,"RootExit"]:e=ns(s),{eventIndex:0,events:e,iterator:0,node:s,visitorIndex:0,visitors:[]}}function Zt(s){return s[V]=!1,s.nodes&&s.nodes.forEach(e=>Zt(e)),s}var er={},X=class s{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Zt(t);else if(t instanceof s||t instanceof ts)n=Zt(t.root),t.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let o=bi;r.syntax&&(o=r.syntax.parse),r.parser&&(o=r.parser),o.parse&&(o=o.parse);try{n=o(t,r)}catch(l){this.processed=!0,this.error=l}n&&!n[Ci]&&yi.rebuild(n)}this.result=new ts(e,n,r),this.helpers={...er,postcss:er,result:this.result},this.plugins=this.processor.plugins.map(o=>typeof o=="object"&&o.prepare?{...o,...o.prepare(this.result)}:o)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{if(t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin)e.plugin=r.postcssPlugin,e.setMessage();else if(r.postcssVersion&&process.env.NODE_ENV!=="production"){let n=r.postcssPlugin,o=r.postcssVersion,l=this.result.processor.version,a=o.split("."),i=l.split(".");(a[0]!==i[0]||parseInt(a[1])>parseInt(i[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+l+", but "+n+" uses "+o+". Perhaps this is the source of the error below.")}}catch(n){console&&console.error&&console.error(n)}return e}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!Oi[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!Ai[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(De(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[V];){e[V]=!0;let t=[rs(e)];for(;t.length>0;){let r=this.visitTick(t);if(De(r))try{await r}catch(n){let o=t[t.length-1].node;throw this.handleError(n,o)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(o=>r(o,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return De(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=Si;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let r=this.result.root.source;if(e.map===void 0&&!(r&&r.input&&r.input.map)){let l="";return t(this.result.root,a=>{l+=a}),this.result.css=l,this.result}let o=new vi(t,this.result.root,this.result.opts).generate();return this.result.css=o[0],this.result.map=o[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(De(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[V];)e[V]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this.opts||_i("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this.css}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let o;try{o=n(t,this.helpers)}catch(l){throw this.handleError(l,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(De(o))throw this.getAsyncError()}}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[l,a]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=l;try{return a(r.toProxy(),this.helpers)}catch(i){throw this.handleError(i,r)}}if(t.iterator!==0){let l=t.iterator,a;for(;a=r.nodes[r.indexes[l]];)if(r.indexes[l]+=1,!a[V]){a[V]=!0,e.push(rs(a));return}t.iterator=0,delete r.indexes[l]}let o=t.events;for(;t.eventIndex<o.length;){let l=o[t.eventIndex];if(t.eventIndex+=1,l===ge){r.nodes&&r.nodes.length&&(r[V]=!0,t.iterator=r.getIterator());return}else if(this.listeners[l]){t.visitors=this.listeners[l];return}}e.pop()}walkSync(e){e[V]=!0;let t=ns(e);for(let r of t)if(r===ge)e.nodes&&e.each(n=>{n[V]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}warnings(){return this.sync().warnings()}};X.registerPostcss=s=>{er=s};ss.exports=X;X.default=X;xi.registerLazyResult(X);wi.registerLazyResult(X)});var is=_((oa,os)=>{"use strict";var Li=Ht(),Mi=at(),$i=ct(),ki=xe(),Ri=Xt(),Be=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let e,t=Mi;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n=ki;this.result=new $i(this._processor,void 0,this._opts),this.result.css=t;let o=this;Object.defineProperty(this.result,"root",{get(){return o.root}});let l=new Li(n,void 0,this._opts,t);if(l.isMap()){let[a,i]=l.generate();a&&(this.result.css=a),i&&(this.result.map=i)}else l.clearAnnotation(),this.result.css=l.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}sync(){if(this.error)throw this.error;return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this._opts||Ri("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this._css}warnings(){return[]}};os.exports=Be;Be.default=Be});var as=_((ia,ls)=>{"use strict";var Pi=Je(),Ii=tr(),Ni=is(),qi=de(),ne=class{constructor(e=[]){this.version="8.5.15",this.plugins=this.normalize(e)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(typeof r=="object"&&(r.parse||r.stringify)){if(process.env.NODE_ENV!=="production")throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}else throw new Error(r+" is not a PostCSS plugin");return t}process(e,t={}){return!this.plugins.length&&!t.parser&&!t.stringifier&&!t.syntax?new Ni(this,e,t):new Ii(this,e,t)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}};ls.exports=ne;ne.default=ne;qi.registerProcessor(ne);Pi.registerProcessor(ne)});var gs=_((la,ms)=>{"use strict";var cs=Qe(),us=Oe(),Ti=J(),Di=Ke(),fs=Le(),hs=Je(),Bi=Bn(),Ui=Pe(),zi=tr(),Fi=Gt(),ji=_e(),Vi=at(),rr=as(),Wi=ct(),ps=de(),ds=st(),Gi=xe(),Ki=Yt();function L(...s){return s.length===1&&Array.isArray(s[0])&&(s=s[0]),new rr(s)}L.plugin=function(e,t){let r=!1;function n(...l){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let a=t(...l);return a.postcssPlugin=e,a.postcssVersion=new rr().version,a}let o;return Object.defineProperty(n,"postcss",{get(){return o||(o=n()),o}}),n.process=function(l,a,i){return L([n(i)]).process(l,a)},n};L.stringify=Gi;L.parse=Vi;L.fromJSON=Bi;L.list=Fi;L.comment=s=>new us(s);L.atRule=s=>new cs(s);L.decl=s=>new fs(s);L.rule=s=>new ds(s);L.root=s=>new ps(s);L.document=s=>new hs(s);L.CssSyntaxError=Di;L.Declaration=fs;L.Container=Ti;L.Processor=rr;L.Document=hs;L.Comment=us;L.Warning=Ki;L.AtRule=cs;L.Result=Wi;L.Input=Ui;L.Rule=ds;L.Root=ps;L.Node=ji;zi.registerPostcss(L);ms.exports=L;L.default=L});var $s=require("node:fs"),ks=require("node:util");var M=Gs(gs(),1),nr=M.default,aa=M.default.stringify,ca=M.default.fromJSON,ua=M.default.plugin,fa=M.default.parse,ha=M.default.list,pa=M.default.document,da=M.default.comment,ma=M.default.atRule,ga=M.default.rule,ya=M.default.decl,wa=M.default.root,va=M.default.CssSyntaxError,ba=M.default.Declaration,xa=M.default.Container,Sa=M.default.Processor,Ca=M.default.Document,_a=M.default.Comment,Ea=M.default.Warning,Oa=M.default.AtRule,Aa=M.default.Result,La=M.default.Input,Ma=M.default.Rule,$a=M.default.Root,ka=M.default.Node;function Ue(s){return s.trim().replace(/\s+/g," ").replace(/\s*([>+~])\s*/g," $1 ").trim()}function ut(s){let e=[],t=s.replace(/url\((?:[^)"'\\]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)/gi,a=>(e.push(a),"\0"+(e.length-1)+"\0")),r="",n=0;for(;n<t.length;){if(t[n]!=="s"&&t[n]!=="S"){r+=t[n++];continue}let a=t.slice(n).match(/^selector\s*\(/i);if(a){let i=1,u=n+a[0].length,c=null,h=0;for(;u<t.length&&i>0;){let f=t[u];c?f===c&&(c=null):f==='"'||f==="'"?c=f:f==="["?h++:f==="]"?h>0&&h--:h===0&&f==="("?i++:h===0&&f===")"&&i--,u++}e.push(t.slice(n,u)),r+="\0"+(e.length-1)+"\0",n=u}else r+=t[n++]}t=r;{let a="",i=0;for(;i<t.length;)if(t[i]==="("){let u=t.slice(i+1).match(/^\s*[\w-]+\s*:/);if(u){let c=i+1+u[0].length,h=1,f=c,p=null;for(;f<t.length&&h>0;){let w=t[f];p?w===p&&(p=null):w==='"'||w==="'"?p=w:w==="("?h++:w===")"&&h--,f++}let d=t.slice(c,f-1).trimStart();/\b(?:not|only)\s*\(/i.test(d)?(e.push(d),a+=t.slice(i,c)+"\0"+(e.length-1)+"\0",i=f-1):a+=t[i++]}else a+=t[i++]}else a+=t[i++];t=a}let l=t.trim().replace(/\s*:\s*/g,": ").replace(/\s+/g," ").replace(/\b(not|only)\s*\(/gi,"$1 (").replace(/\)\s*(and|or|not|only)\s*\(/gi,") $1 (").trim().replace(/\s+/g," ");for(;/\x00\d+\x00/.test(l);)l=l.replace(/\x00(\d+)\x00/g,(a,i)=>e[+i]);return l}function ft(s){return s.trim()}function Hi(s){let e=s.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function ht(s){let e=s.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(t,r,n,o)=>r==="-"?` - 0.${o}`:`${r}${n}0.${o}`),e=e.replace(/([%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,t=>Hi(t)),e}function pt(s){let e=Ue(s);return e=e.replace(/\[([^\]]*)\]/g,(t,r)=>{let n=r.replace(/\s*([~|^$*]?)\s*=\s*/g,"$1=");return n=n.replace(/(['"])(.*?)\1/g,"$2"),"["+n.trim()+"]"}),e}function Qi(s){let e={};for(let o of s){let l=o.prop.toLowerCase();(l==="font-family"||l==="font-weight"||l==="font-style")&&(e[l]=ft(o.value).replace(/['"]/g,""))}let t=(e["font-family"]||"unknown").toLowerCase(),r=(e["font-weight"]||"normal").toLowerCase(),n=(e["font-style"]||"normal").toLowerCase();return`${t}/${r}/${n}`}function Ji(s,e){return`@keyframes ${e.trim()}`}var sr=new Set(["media","supports","container"]);function ys(s,e,t){if(!t)return s;let r=new Map;for(let[o,l]of s)r.set(o,l.slice());let n=r.get(e);return n?n.push(t):r.set(e,[t]),r}function ze(s){let e=[];for(let t of sr){let r=s.get(t);r&&r.length&&e.push(`@${t} ${r.join(" and ")}`)}return e.length?e.join(" and "):"base"}function Yi(s,e,t,r){let n=s==null?null:t.get(s)??null,o=n!=null;return e?r+1+(o?r-n:0):o?n:r}function dt(s,e={}){let t=new Map,r=0;function n(f){return t.has(f)||t.set(f,new Map),t.get(f)}function o(f,p){n(f).set(p,r++)}let l=e.semanticSelectors?pt:Ue;function a(f,p){for(let d of f.selectors.map(w=>l(w)))o(p,d)}function i(f,p){let d=f.name.toLowerCase();if(sr.has(d)){let w=ys(p,d,ut(f.params)),y=ze(w);f.each(g=>{g.type==="rule"?a(g,y):g.type==="atrule"&&i(g,w)})}else if(!(d==="font-face"||d==="keyframes"||d==="-webkit-keyframes"||d==="charset"||d==="import"||d==="namespace")){if(f.nodes){let w=ze(p);f.each(y=>{y.type==="rule"?a(y,w):y.type==="atrule"&&i(y,p)})}}}let u=nr.parse(s,{from:void 0}),c=new Map;u.each(f=>{f.type==="rule"?a(f,"base"):f.type==="atrule"&&i(f,c)});let h=new Map;for(let[f,p]of t)h.set(f,[...p.entries()].sort((d,w)=>d[1]-w[1]).map(d=>d[0]));return h}function W(s,e={}){let t=new Map;function r(g){return t.has(g)||t.set(g,[]),t.get(g)}let n=[],o=new Set,l=0;function a(g){o.has(g)||(o.add(g),n.push(g))}function i(g,m){return g?`${g}.${m}`:m}function u(g,m,S,C){r(g).push({selector:m,prop:S.prop.toLowerCase(),value:ft(S.value),important:S.important||!1,layer:C})}let c=e.semanticSelectors?pt:Ue;function h(g,m,S){let C=g.selectors.map(x=>c(x));for(let x of C)g.each(b=>{b.type==="decl"&&u(m,x,b,S)})}function f(g,m,S){let C=g.name.toLowerCase();if(sr.has(C)){let x=ys(m,C,ut(g.params)),b=ze(x);g.each(A=>{A.type==="rule"?h(A,b,S):A.type==="atrule"&&f(A,x,S)})}else if(C==="layer"){let x=g.params.trim();if(g.nodes){let b=x?i(S,x):i(S,`__anon${l++}`);a(b);let A=ze(m);g.each(O=>{O.type==="rule"?h(O,A,b):O.type==="atrule"&&f(O,m,b)})}else for(let b of x.split(",")){let A=b.trim();A&&a(i(S,A))}}else if(C==="font-face"){let x="@font-face",b=[];g.each(O=>{O.type==="decl"&&b.push(O)});let A=Qi(b);for(let O of b)u(x,A,O,S)}else if(C==="keyframes"||C==="-webkit-keyframes"){let x=Ji(C,g.params);g.each(b=>{if(b.type==="rule"){let A=b.selectors.map(O=>O.trim()).join(", ");b.each(O=>{O.type==="decl"&&u(x,A,O,S)})}})}else if(!(C==="charset"||C==="import"||C==="namespace")){if(g.nodes){let x=ze(m);g.each(b=>{b.type==="rule"?h(b,x,S):b.type==="atrule"&&f(b,m,S)})}}}let p=nr.parse(s,{from:void 0}),d=new Map;p.each(g=>{g.type==="rule"?h(g,"base",null):g.type==="atrule"&&f(g,d,null)});let w=new Map;n.forEach((g,m)=>w.set(g,m));let y=n.length;for(let g of t.values())for(let m of g)m.layerRank=Yi(m.layer,m.important,w,y),delete m.layer;return t}function se(s){let e=new Map;for(let[t,r]of s){e.has(t)||e.set(t,new Map);let n=e.get(t),o=new Map;for(let{selector:l,prop:a,value:i,important:u,layerRank:c}of r){let h=c??(u?1:0);n.has(l)||(n.set(l,new Map),o.set(l,new Map));let f=n.get(l),p=o.get(l),d=p.get(a);(d===void 0||h>=d)&&(f.set(a,{value:i,important:u}),p.set(a,h))}}return e}function or(s,e,t={}){let r=new Map,n=new Set([...s.keys(),...e.keys()]),o=["base",...[...n].filter(l=>l!=="base").sort()];for(let l of o){if(!n.has(l))continue;let a=s.get(l)||new Map,i=e.get(l)||new Map,u=new Set([...a.keys(),...i.keys()]),c=new Map,h=0;for(let p of[...u].sort()){let d=a.get(p)||new Map,w=i.get(p)||new Map,y=new Set([...d.keys(),...w.keys()]),g=new Map,m=0;for(let C of[...y].sort()){let x=d.get(C),b=w.get(C),A;!x&&b?(A={status:"added",newValue:b.value,newImportant:b.important},m++):x&&!b?(A={status:"removed",oldValue:x.value,oldImportant:x.important},m++):(t.ignoreCosmetic?ht(x.value)!==ht(b.value):x.value!==b.value)||x.important!==b.important?(A={status:"changed",oldValue:x.value,oldImportant:x.important,newValue:b.value,newImportant:b.important},m++):A={status:"unchanged",value:b.value,important:b.important},g.set(C,A)}let S;a.has(p)?i.has(p)?m>0?S="changed":S="unchanged":S="removed":S="added",c.set(p,{status:S,changeCount:m,props:g}),h+=m}let f;s.has(l)?e.has(l)?h>0?f="changed":f="unchanged":f="removed":f="added",r.set(l,{status:f,changeCount:h,selectors:c})}return r}function ir([s,e,t],[r,n,o]){return s>r||s===r&&e>n||s===r&&e===n&&t>o}function lr(s,e){return ir(s,e)?1:ir(e,s)?-1:0}function Xi(s){let e=[],t=0,r=0,n=0,o=null;for(let a=0;a<s.length;a++){let i=s[a];o?i===o&&(o=null):i==='"'||i==="'"?o=i:i==="("?t++:i===")"?t>0&&t--:i==="["?r++:i==="]"?r>0&&r--:i===","&&t===0&&r===0&&(e.push(s.slice(n,a).trim()),n=a+1)}let l=s.slice(n).trim();return l&&e.push(l),e}function Zi(s,e){let t=1,r=0,n=e,o=null;for(;n<s.length&&t>0;){let l=s[n];o?l===o&&(o=null):l==='"'||l==="'"?o=l:l==="["?r++:l==="]"?r>0&&r--:r===0&&l==="("?t++:r===0&&l===")"&&t--,n++}return t===0?n:null}function ws(s,e,t){let r=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");r.lastIndex=0;let n="",o=0,l;for(;(l=r.exec(s))!==null;){let a=l.index+l[0].length,i=Zi(s,a);if(n+=s.slice(o,l.index),i===null){n+=s.slice(a),o=s.length;break}t(s,a,i,l),o=i,r.lastIndex=o}return n+s.slice(o)}function oe(s,e=0){if(e>100)return[0,0,0];let t=0,r=0,n=0,o=s.replace(/\\./g,"x"),l=i=>{let u=[0,0,0];for(let c of Xi(i)){let h=oe(c,e+1);ir(h,u)&&(u=h)}t+=u[0],r+=u[1],n+=u[2]};o=ws(o,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(i,u,c,h)=>{let f=h.groups.name.toLowerCase(),p=i.slice(u,c-1).trim();if(f==="nth-child"||f==="nth-last-child"){let d=p.match(/\sof\b/i);d&&l(p.slice(d.index+d[0].length).trim()),r++}else f==="where"||(l(p),(f==="host"||f==="host-context")&&r++)}),o=ws(o,/::(?:slotted|cue)\s*\(/gi,(i,u,c)=>{l(i.slice(u,c-1).trim()),n++}),o=o.replace(/::[\w-]+(\([^)]*\))?/g,()=>(n++,"")),o=o.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(n++,"")),o=o.replace(/\[[^\]]*\]/g,()=>(r++,"")),o=o.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(r++,"")),o=o.replace(/#[\w-]+/g,()=>(t++,"")),o=o.replace(/\.[\w-]+/g,()=>(r++,"")),o=o.replace(/\|\|/g," ").replace(/[>+~]/g," "),o=o.replace(/(?:[\w-]+|\*)?\|/g,"");let a=o.split(/\s+/).filter(i=>i&&i!=="*"&&/^[a-zA-Z][\w-]*/.test(i));return n+=a.length,[t,r,n]}function ar(s,e){let[t,r,n]=oe(s),[o,l,a]=oe(e);return t===o&&r===l&&n===a}function el(s,e){let t=new Set(s),r=new Set(e),n=s.filter(c=>r.has(c)),o=e.filter(c=>t.has(c)),l=new Map;for(let c=0;c<n.length;c++)l.set(n[c],o[c]);let a=[],i=0,u=new Set;for(let c of s){if(!r.has(c)){a.push({type:"deleted",oldSelector:c,newSelector:null});continue}let h=l.get(c);for(;i<e.length&&!t.has(e[i]);)a.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;if(c===h)a.push({type:"equal",oldSelector:c,newSelector:h});else{let f=[c,h].sort().join("\0");u.has(f)||(u.add(f),a.push({type:"moved",oldSelector:c,newSelector:h}))}i++}for(;i<e.length;)t.has(e[i])||a.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;return a}function cr(s,e,t,r,n,o,l){return!t&&!r?null:t?r?t.important!==r.important?t.important?s:e:n!==0?n>0?s:e:o>l?s:e:s:e}function tl(s,e,t,r,n){let o=s.oldSelector,l=s.newSelector;s.sameSpecificity=ar(o,l),s.conflictingProps=[],s.hasOverlappingProps=!1;let a=e.indexOf(o),i=e.indexOf(l),u=t.indexOf(o),c=t.indexOf(l);if(a<0||i<0||u<0||c<0)return;let h=a<i,f=u<c;if(h===f)return;let p=lr(oe(o),oe(l)),d=r.get(o)||new Map,w=r.get(l)||new Map,y=n.get(o)||new Map,g=n.get(l)||new Map;for(let[m,S]of y){let C=g.get(m);if(!C||(s.hasOverlappingProps=!0,S.value===C.value&&S.important===C.important))continue;let x=cr(o,l,d.get(m),w.get(m),p,a,i),b=cr(o,l,S,C,p,u,c);if(!b)continue;if(!x){let U=cr(o,l,S,C,p,a,i);if(!U||U===b)continue;let z=n.get(U)?.get(m),T=n.get(b)?.get(m);if(!z||!T||z.value===T.value&&z.important===T.important)continue;s.conflictingProps.push({prop:m,oldEffective:null,newEffective:{value:T.value,important:T.important}});continue}let A=r.get(x)?.get(m),O=n.get(b)?.get(m);!A||!O||A.value===O.value&&A.important===O.important||s.conflictingProps.push({prop:m,oldEffective:{value:A.value,important:A.important},newEffective:{value:O.value,important:O.important}})}}function ur(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=dt(s,r),o=dt(e,r),l=se(W(s,r)),a=se(W(e,r)),i=new Set([...n.keys(),...o.keys()]),u=["base",...[...i].filter(h=>h!=="base").sort()],c=[];for(let h of u){if(!i.has(h))continue;let f=n.get(h)||[],p=o.get(h)||[],d=el(f,p),w=l.get(h)||new Map,y=a.get(h)||new Map;for(let m of d)m.type==="moved"&&tl(m,f,p,w,y);let g=d.some(m=>m.type==="moved"&&m.hasOverlappingProps);d.some(m=>m.type!=="equal")&&c.push({contextKey:h,rows:d,hasWarning:g})}return c}var rl=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-inline","padding-block"]],["margin",["margin-top","margin-right","margin-bottom","margin-left","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-inline","margin-block"]],["border",["border-top","border-right","border-bottom","border-left","border-width","border-style","border-color","border-top-width","border-top-style","border-top-color","border-right-width","border-right-style","border-right-color","border-bottom-width","border-bottom-style","border-bottom-color","border-left-width","border-left-style","border-left-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["border-inline",["border-inline-start","border-inline-end","border-inline-width","border-inline-style","border-inline-color"]],["border-block",["border-block-start","border-block-end","border-block-width","border-block-style","border-block-color"]],["background",["background-color","background-image","background-position","background-size","background-repeat","background-attachment","background-origin","background-clip"]],["font",["font-style","font-variant","font-weight","font-stretch","font-size","font-family","line-height"]],["flex",["flex-grow","flex-shrink","flex-basis"]],["flex-flow",["flex-direction","flex-wrap"]],["grid-column",["grid-column-start","grid-column-end"]],["grid-row",["grid-row-start","grid-row-end"]],["grid-template",["grid-template-rows","grid-template-columns","grid-template-areas"]],["transition",["transition-property","transition-duration","transition-timing-function","transition-delay"]],["animation",["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode","animation-play-state"]],["inset",["top","right","bottom","left","inset-inline-start","inset-inline-end","inset-block-start","inset-block-end","inset-inline","inset-block"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["overflow",["overflow-x","overflow-y"]],["text-decoration",["text-decoration-line","text-decoration-style","text-decoration-color","text-decoration-thickness"]],["outline",["outline-width","outline-style","outline-color"]],["list-style",["list-style-type","list-style-position","list-style-image"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["mask",["mask-image","mask-position","mask-size","mask-repeat","mask-origin","mask-clip","mask-mode","mask-composite"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]);function vs(s){let e=new Map;for(let t=0;t<s.length;t++){let r=s[t];e.has(r.selector)||e.set(r.selector,[]),e.get(r.selector).push({...r,idx:t})}return e}function bs(s,e,t){let r=null,n=null;for(let o of s)o.prop===e?(!r||o.layerRank>r.layerRank||o.layerRank===r.layerRank&&o.idx>r.idx)&&(r=o):o.prop===t&&(!n||o.layerRank>n.layerRank||o.layerRank===n.layerRank&&o.idx>n.idx)&&(n=o);return!r&&!n?null:r?n?r.layerRank!==n.layerRank?r.layerRank>n.layerRank?"shorthand":"longhand":r.idx>n.idx?"shorthand":"longhand":"shorthand":"longhand"}function fr(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=W(s,r),o=W(e,r),l=new Set([...n.keys(),...o.keys()]),a=["base",...[...l].filter(h=>h!=="base").sort()],i=[],u=!1;for(let h of a){if(!l.has(h))continue;let f=n.get(h)??[],p=o.get(h)??[],d=vs(f),w=vs(p);for(let[y,g]of w){let m=d.get(y)??[],S=[],C=new Set;for(let[x,b]of rl)if(g.some(O=>O.prop===x))for(let O of b){if(!g.some(yt=>yt.prop===O)||C.has(O))continue;let z=bs(m,x,O),T=bs(g,x,O);if(z===T)continue;let gt;T==="shorthand"?(gt="A",z!==null&&(u=!0)):gt="B";let Fe=(yt,Bs)=>yt.reduce((le,Z)=>Z.prop!==Bs?le:!le||Z.layerRank>le.layerRank||Z.layerRank===le.layerRank&&Z.idx>le.idx?Z:le,null),dr=Fe(g,x),mr=Fe(g,O),gr=Fe(m,x),yr=Fe(m,O);C.add(O),S.push({shorthand:x,longhand:O,oldWinner:z,newWinner:T,direction:gt,oldShorthandValue:gr?.value??null,oldLonghandValue:yr?.value??null,longhandValue:mr?.value??null,shorthandValue:dr?.value??null,oldShorthandImportant:gr?.important??!1,oldLonghandImportant:yr?.important??!1,shorthandImportant:dr?.important??!1,longhandImportant:mr?.important??!1})}S.length>0&&i.push({contextKey:h,selector:y,conflicts:S})}}let c=new Map;for(let h of i)c.has(h.contextKey)||c.set(h.contextKey,{contextKey:h.contextKey,selectors:[]}),c.get(h.contextKey).selectors.push({selector:h.selector,conflicts:h.conflicts});return{hasWarning:u,risks:[...c.values()]}}function xs(s,e){if(e?.risks?.length)for(let{contextKey:t,selectors:r}of e.risks){let n=s.get(t);if(n)for(let{selector:o,conflicts:l}of r){let a=n.selectors.get(o);if(!a)continue;let i=0;for(let{longhand:u,oldWinner:c,newWinner:h,longhandValue:f,shorthandValue:p,oldShorthandValue:d,oldLonghandValue:w,oldShorthandImportant:y,oldLonghandImportant:g,shorthandImportant:m,longhandImportant:S}of l){if(c===h)continue;let C=c==="longhand"?w:d,x=h==="longhand"?f:p,b=a.props.get(u);if(!b||b.status!=="unchanged")continue;let A=c==="longhand"?g:y,O=h==="longhand"?S:m;a.props.set(u,{status:"changed",oldValue:C,oldImportant:A,newValue:x,newImportant:O}),i++}i>0&&(a.changeCount+=i,a.status="changed",n.changeCount+=i,n.status="changed")}}}var Os=require("node:fs"),As=require("node:url");function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ss(s,e){let{status:t}=e;function r(n){return n?' <span class="important">!important</span>':""}return t==="added"?`
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
    </div>`}function nl(s,e){let{props:t}=e,r=[],n=[];for(let[l,a]of t){let i=E(l);if(a.status==="unchanged"){let u=E(a.value)+(a.important?" !important":"");r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="added"){r.push('<div class="detail-line detail-line--empty"></div>');let u=E(a.newValue)+(a.newImportant?" !important":"");n.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="removed"){let u=E(a.oldValue)+(a.oldImportant?" !important":"");r.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push('<div class="detail-line detail-line--empty"></div>')}else{let u=E(a.oldValue)+(a.oldImportant?" !important":""),c=E(a.newValue)+(a.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${c}</span>;</div>`)}}let o=E(s);return`
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
    </div>`}function sl(s,e,{highlightHtml:t,showUnchanged:r=!1,contextKey:n="",expanded:o=!1}={}){let{status:l,changeCount:a,props:i}=e,u=t||E(s),c={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[l],h={added:`+${[...i.values()].filter(m=>m.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...i.values()].filter(m=>m.status==="removed").length} \u524A\u9664`,changed:(()=>{let m=[...i.values()].filter(b=>b.status==="added").length,S=[...i.values()].filter(b=>b.status==="removed").length,C=[...i.values()].filter(b=>b.status==="changed").length,x=[];return m&&x.push(`+${m}`),S&&x.push(`\u2212${S}`),C&&x.push(`~${C}`),x.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[l],f=[...i.entries()].filter(([,m])=>m.status!=="unchanged"),p=[...i.entries()].filter(([,m])=>m.status==="unchanged"),d=[...f.map(([m,S])=>Ss(m,S)),...r?p.map(([m,S])=>Ss(m,S)):[]].join(""),w=p.length>0&&!r?`<button class="unchanged-toggle" data-selector="${E(s)}">
           \u5909\u66F4\u306A\u3057 ${p.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",y=o?nl(s,e):"",g=o?' data-expanded="true"':"";return`
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
    </div>`}function ol(s,e,t,{showUnchanged:r=!1,expandedSelectors:n=new Set}={}){let{status:o,changeCount:l}=e,i=s==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(s),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[o],c=l>0?`<span class="context-badge ${u}">${l} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',h=t?t.map(({selector:p,positions:d})=>({selector:p,positions:d,selDiff:e.selectors.get(p)})).filter(p=>p.selDiff):[...e.selectors.entries()].map(([p,d])=>({selector:p,positions:new Set,selDiff:d}));if(h.length===0)return"";let f=h.map(({selector:p,positions:d,selDiff:w})=>sl(p,w,{highlightHtml:d.size>0?il(p,d):null,showUnchanged:r,contextKey:s,expanded:n.has(`${s}||${p}`)})).join("");return`
    <section class="context-section context-section--${o}">
      <div class="context-header">
        <span class="context-label">${i}</span>
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
    </tr>`:""}function ul(s,e=!1){let{contextKey:t,rows:r,hasWarning:n}=s,o=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(t),l=r.filter(c=>c.type==="moved").length,a=l===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':n?`<span class="or-ctx-badge or-ctx-badge--warning">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,i=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,u=r.map(c=>c.type==="moved"?al(c):cl(c)).join("");return`<div class="or-context">
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
  </div>`}function Cs(s,{activeContext:e="all",filterOrderRisk:t=!1,expandedContexts:r=new Set}={}){if(!s||s.length===0)return"";let n=t?s.filter(u=>u.hasWarning):s,o=e==="all"?n:n.filter(u=>u.contextKey===e);if(o.length===0)return"";let l=o.reduce((u,c)=>u+c.rows.filter(h=>h.type==="moved").length,0);if(l===0)return"";let a=o.some(u=>u.hasWarning),i=o.map(u=>ul(u,r.has(u.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${a?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${i}
  </section>`}function _s(s){if(!s||!s.risks||s.risks.length===0)return"";let{risks:e,hasWarning:t}=s,r=e.reduce((o,l)=>o+l.selectors.reduce((a,i)=>a+i.conflicts.length,0),0);if(r===0)return"";let n=e.map(({contextKey:o,selectors:l})=>{let a=o==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(o),i=l.some(h=>h.conflicts.some(f=>f.direction==="A")),u=l.map(({selector:h,conflicts:f})=>{let p=f.map(({shorthand:d,longhand:w,direction:y,longhandValue:g,shorthandValue:m})=>{let S=E(d),C=E(w),x=E(m??""),b=E(g??"");return y==="A"?`<div class="sr-conflict sr-conflict--risk">
            <span class="sr-badge sr-badge--risk">\u26A0 \u30EA\u30B9\u30AF</span>
            <code class="sr-longhand">${C}</code>
            <span class="sr-desc">\u304C <code>${S}: ${x}</code> \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: longhand \u304C\u6709\u52B9 \u2192 \u65B0: shorthand \u304C\u4E0A\u66F8\u304D\uFF09</span>
          </div>`:`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u89E3\u6D88</span>
            <code class="sr-longhand">${C}</code>
            <span class="sr-desc">\u306E shorthand \u4E0A\u66F8\u304D\u304C\u89E3\u6D88\uFF08\u65E7: <code>${S}: ${x}</code> \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: <code>${C}: ${b}</code> \u304C\u6709\u52B9\uFF09</span>
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
  </section>`}function Es(s,e,{activeContext:t="all",showUnchanged:r=!1,expandedSelectors:n=new Set}={}){if(!s||s.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let o=null;if(e!==null){o=new Map;for(let a of e)o.has(a.contextKey)||o.set(a.contextKey,[]),o.get(a.contextKey).push({selector:a.selector,positions:a.positions||new Set})}let l="";for(let[a,i]of s){if(t!=="all"&&a!==t)continue;let u=o?o.get(a)||[]:null;o&&u.length===0||(l+=ol(a,i,u,{showUnchanged:r,expandedSelectors:n}))}return l||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var dl={};function fl(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`;function Ls(s,e,t){let r=fl(),n=[],o=new Set;for(let[h,f]of s)for(let[p,d]of f.selectors)d.status!=="unchanged"&&(n.push({contextKey:h,selector:p,positions:new Set}),o.add(`${h}||${p}`));let l=n.length>0,a=e&&e.length>0,i=t&&t.risks&&t.risks.length>0,u=e?new Set(e.map(h=>h.contextKey)):new Set,c="";return l&&(c+=`<div class="diff-section">${Es(s,n,{expandedSelectors:o})}</div>`),a&&(c+=Cs(e,{expandedContexts:u})),i&&(c+=_s(t)),!l&&!a&&!i&&(c='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
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
</html>`}var Rs=`Usage: css-cascade <old.css> <new.css> [options]

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
  2  \u30A8\u30E9\u30FC`,Ps;try{Ps=(0,ks.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"shorthand-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(s){console.error(`Error: ${s.message}`),process.exit(2)}var{values:k,positionals:Is}=Ps;k.version&&(console.log("1.1.0"),process.exit(0));k.help&&(console.log(Rs),process.exit(0));Is.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error(Rs),process.exit(2));var ml=new Set(["text","json","html"]);ml.has(k.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var gl=new Set(["changed","added","removed","unchanged","all"]);gl.has(k.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function Ns(s){try{return(0,$s.readFileSync)(s,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${s}": ${e.message}`),process.exit(2)}}var[yl,wl]=Is,hr=Ns(yl),pr=Ns(wl),we,ye=[],ie={hasWarning:!1,risks:[]};try{let s={semanticSelectors:k["semantic-selectors"]};we=or(se(W(hr,s)),se(W(pr,s)),{ignoreCosmetic:k["ignore-cosmetic"]}),k["order-risk"]&&(ye=ur(hr,pr,{semanticSelectors:k["semantic-selectors"]})),k["shorthand-risk"]&&(ie=fr(hr,pr,{semanticSelectors:k["semantic-selectors"]}),xs(we,ie))}catch(s){console.error(`Parse error: ${s.message}`),process.exit(2)}function Ms(s,e){return e==="all"?!0:e==="changed"?s!=="unchanged":s===e}function vl(s){let e=0,t=0,r=0,n=0;for(let[,o]of s)for(let[,l]of o.selectors)for(let[,a]of l.props)a.status==="changed"?e++:a.status==="added"?t++:a.status==="removed"?r++:n++;return{changed:e,added:t,removed:r,unchanged:n}}var B=vl(we),qs=B.changed>0||B.added>0||B.removed>0,Ts=k["order-risk"]&&ye.some(s=>s.hasWarning),Ds=k["shorthand-risk"]&&ie.hasWarning,mt=k.filter;if(k.format==="html"){let s=Ls(we,k["order-risk"]?ye:null,k["shorthand-risk"]?ie:null);process.stdout.write(s),process.exit(qs||Ts||Ds?1:0)}if(k.format==="json"){let s=[];for(let[t,r]of we){let n=[];for(let[o,l]of r.selectors){let a=[];for(let[i,u]of l.props)Ms(u.status,mt)&&a.push({prop:i,...u});a.length>0&&n.push({selector:o,status:l.status,changeCount:l.changeCount,props:a})}n.length>0&&s.push({key:t,status:r.status,changeCount:r.changeCount,selectors:n})}let e={version:1,summary:B,contexts:s};k["order-risk"]&&(e.orderRisks=ye),k["shorthand-risk"]&&(e.shorthandRisks=ie),console.log(JSON.stringify(e,null,2))}else{let s=!k["no-color"]&&!!process.stdout.isTTY,e={reset:s?"\x1B[0m":"",yellow:s?"\x1B[33m":"",green:s?"\x1B[32m":"",red:s?"\x1B[31m":"",cyan:s?"\x1B[36m":"",dim:s?"\x1B[2m":""};for(let[r,n]of we){let o=[];for(let[l,a]of n.selectors){let i=[];for(let[u,c]of a.props)Ms(c.status,mt)&&(c.status==="changed"?i.push(`    ${e.yellow}~${e.reset} ${u}: ${c.oldValue} \u2192 ${c.newValue}`):c.status==="added"?i.push(`    ${e.green}+${e.reset} ${u}: ${c.newValue}`):c.status==="removed"?i.push(`    ${e.red}-${e.reset} ${u}: ${c.oldValue}`):i.push(`      ${u}: ${c.value}`));i.length>0&&(o.push(`  ${e.dim}${l}${e.reset}`),o.push(...i))}o.length>0&&(console.log(`
${e.cyan}[${r}]${e.reset}`),o.forEach(l=>console.log(l)))}let t=[];if(B.changed&&t.push(`${e.yellow}${B.changed} changed${e.reset}`),B.added&&t.push(`${e.green}${B.added} added${e.reset}`),B.removed&&t.push(`${e.red}${B.removed} removed${e.reset}`),(mt==="all"||mt==="unchanged")&&B.unchanged&&t.push(`${B.unchanged} unchanged`),console.log(`
Summary: ${t.length?t.join(", "):"no differences"}`),k["order-risk"]&&ye.length>0){console.log(`
Order Risks:`);for(let{contextKey:r,rows:n}of ye){let o=n.filter(i=>i.type!=="equal");if(o.length===0)continue;let l=Math.max(6,...o.map(i=>(i.oldSelector??"-").length)),a=Math.max(6,...o.map(i=>(i.newSelector??"-").length));console.log(`
${e.cyan}[${r}]${e.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(l)}  ${"\u65B0 CSS".padEnd(a)}  \u72B6\u614B`),console.log(`  ${"-".repeat(l)}  ${"-".repeat(a)}  ------`);for(let i of o){let u=(i.oldSelector??"-").padEnd(l),c=(i.newSelector??"-").padEnd(a);if(i.type==="moved"){let h=i.sameSpecificity?` ${e.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${e.reset}`:"";if(console.log(`  ${u}  ${c}  ${e.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${e.reset}${h}`),i.conflictingProps&&i.conflictingProps.length>0)for(let f of i.conflictingProps){let p=y=>y?.important?" !important":"",d=f.oldEffective?`${f.oldEffective.value}${p(f.oldEffective)}`:"\u65E7 CSS \u672A\u5BA3\u8A00",w=f.newEffective?`${f.newEffective.value}${p(f.newEffective)}`:"\u65B0 CSS \u672A\u5BA3\u8A00";console.log(`    ${e.dim}${f.prop}: ${d} \u2192 ${w}${e.reset}`)}}else i.type==="deleted"?console.log(`  ${u}  ${"-".padEnd(a)}  ${e.red}- \u524A\u9664${e.reset}`):i.type==="added"&&console.log(`  ${"-".padEnd(l)}  ${c}  ${e.green}+ \u8FFD\u52A0${e.reset}`)}}}if(k["shorthand-risk"]&&ie.risks.length>0){console.log(`
Shorthand Risks:`);for(let{contextKey:r,selectors:n}of ie.risks){console.log(`
${e.cyan}[${r}]${e.reset}`);for(let{selector:o,conflicts:l}of n){console.log(`  ${e.dim}${o}${e.reset}`);for(let a of l){let{shorthand:i,longhand:u,direction:c,longhandValue:h,shorthandValue:f}=a;console.log(c==="A"?`    ${e.yellow}\u26A0 ${u}: shorthand \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: ${u}:${h} \u304C\u6709\u52B9 \u2192 \u65B0: ${i}:${f} \u306B\u4E0A\u66F8\u304D\uFF09${e.reset}`:`    ${e.green}\u2197 ${u}: shorthand \u4E0A\u66F8\u304D\u89E3\u6D88\uFF08\u65E7: ${i}:${f} \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: ${u}:${h} \u304C\u6709\u52B9\uFF09${e.reset}`)}}}}}process.exit(qs||Ts||Ds?1:0);
