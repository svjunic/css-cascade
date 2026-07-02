#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.0.1
// Source: https://github.com/svjunic/css-cascade
var Cs=Object.create;var tr=Object.defineProperty;var _s=Object.getOwnPropertyDescriptor;var Es=Object.getOwnPropertyNames;var Os=Object.getPrototypeOf,As=Object.prototype.hasOwnProperty;var C=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var Ms=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Es(e))!As.call(s,n)&&n!==t&&tr(s,n,{get:()=>e[n],enumerable:!(r=_s(e,n))||r.enumerable});return s};var Ls=(s,e,t)=>(t=s!=null?Cs(Os(s)):{},Ms(e||!s||!s.__esModule?tr(t,"default",{value:s,enumerable:!0}):t,s));var at=C((nl,lt)=>{var Ue=process||{},rr=Ue.argv||[],De=Ue.env||{},Rs=!(De.NO_COLOR||rr.includes("--no-color"))&&(!!De.FORCE_COLOR||rr.includes("--color")||Ue.platform==="win32"||(Ue.stdout||{}).isTTY&&De.TERM!=="dumb"||!!De.CI),$s=(s,e,t=s)=>r=>{let n=""+r,i=n.indexOf(e,s.length);return~i?s+Ps(n,e,t,i)+e:s+n+e},Ps=(s,e,t,r)=>{let n="",i=0;do n+=s.substring(i,r)+t,i=r+e.length,r=s.indexOf(e,i);while(~r);return n+s.substring(i)},nr=(s=Rs)=>{let e=s?$s:()=>String;return{isColorSupported:s,reset:e("\x1B[0m","\x1B[0m"),bold:e("\x1B[1m","\x1B[22m","\x1B[22m\x1B[1m"),dim:e("\x1B[2m","\x1B[22m","\x1B[22m\x1B[2m"),italic:e("\x1B[3m","\x1B[23m"),underline:e("\x1B[4m","\x1B[24m"),inverse:e("\x1B[7m","\x1B[27m"),hidden:e("\x1B[8m","\x1B[28m"),strikethrough:e("\x1B[9m","\x1B[29m"),black:e("\x1B[30m","\x1B[39m"),red:e("\x1B[31m","\x1B[39m"),green:e("\x1B[32m","\x1B[39m"),yellow:e("\x1B[33m","\x1B[39m"),blue:e("\x1B[34m","\x1B[39m"),magenta:e("\x1B[35m","\x1B[39m"),cyan:e("\x1B[36m","\x1B[39m"),white:e("\x1B[37m","\x1B[39m"),gray:e("\x1B[90m","\x1B[39m"),bgBlack:e("\x1B[40m","\x1B[49m"),bgRed:e("\x1B[41m","\x1B[49m"),bgGreen:e("\x1B[42m","\x1B[49m"),bgYellow:e("\x1B[43m","\x1B[49m"),bgBlue:e("\x1B[44m","\x1B[49m"),bgMagenta:e("\x1B[45m","\x1B[49m"),bgCyan:e("\x1B[46m","\x1B[49m"),bgWhite:e("\x1B[47m","\x1B[49m"),blackBright:e("\x1B[90m","\x1B[39m"),redBright:e("\x1B[91m","\x1B[39m"),greenBright:e("\x1B[92m","\x1B[39m"),yellowBright:e("\x1B[93m","\x1B[39m"),blueBright:e("\x1B[94m","\x1B[39m"),magentaBright:e("\x1B[95m","\x1B[39m"),cyanBright:e("\x1B[96m","\x1B[39m"),whiteBright:e("\x1B[97m","\x1B[39m"),bgBlackBright:e("\x1B[100m","\x1B[49m"),bgRedBright:e("\x1B[101m","\x1B[49m"),bgGreenBright:e("\x1B[102m","\x1B[49m"),bgYellowBright:e("\x1B[103m","\x1B[49m"),bgBlueBright:e("\x1B[104m","\x1B[49m"),bgMagentaBright:e("\x1B[105m","\x1B[49m"),bgCyanBright:e("\x1B[106m","\x1B[49m"),bgWhiteBright:e("\x1B[107m","\x1B[49m")}};lt.exports=nr();lt.exports.createColors=nr});var ut=C((sl,ir)=>{"use strict";var Be=/[\t\n\f\r "#'()/;[\\\]{}]/g,Fe=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,Is=/.[\r\n"'(/\\]/,sr=/[\da-f]/i;ir.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,i,o,a,l,u,c,h,f,p,d,v=r.length,y=0,g=[],m=[],b=-1;function _(){return y}function S(F){throw e.error("Unclosed "+F,y)}function x(){return m.length===0&&y>=v}function A(F){if(m.length)return m.pop();if(y>=v)return;let Y=F?F.ignoreUnclosed:!1;switch(i=r.charCodeAt(y),i){case 10:case 32:case 9:case 13:case 12:{l=y;do l+=1,i=r.charCodeAt(l);while(i===32||i===10||i===9||i===13||i===12);c=["space",r.slice(y,l)],y=l-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let W=String.fromCharCode(i);c=[W,W,y];break}case 40:{if(d=g.length?g.pop()[1]:"",p=r.charCodeAt(y+1),d==="url"&&p!==39&&p!==34&&p!==32&&p!==10&&p!==9&&p!==12&&p!==13){l=y;do{if(h=!1,l=r.indexOf(")",l+1),l===-1)if(n||Y){l=y;break}else S("bracket");for(f=l;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["brackets",r.slice(y,l+1),y,l],y=l}else y<=b?c=["(","(",y]:(l=r.indexOf(")",y+1),o=r.slice(y,l+1),l===-1||Is.test(o)?(b=l===-1?v:l,c=["(","(",y]):(c=["brackets",o,y,l],y=l));break}case 39:case 34:{u=i===39?"'":'"',l=y;do{if(h=!1,l=r.indexOf(u,l+1),l===-1)if(n||Y){l=y+1;break}else S("string");for(f=l;r.charCodeAt(f-1)===92;)f-=1,h=!h}while(h);c=["string",r.slice(y,l+1),y,l],y=l;break}case 64:{Be.lastIndex=y+1,Be.test(r),Be.lastIndex===0?l=r.length-1:l=Be.lastIndex-2,c=["at-word",r.slice(y,l+1),y,l],y=l;break}case 92:{for(l=y,a=!0;r.charCodeAt(l+1)===92;)l+=1,a=!a;if(i=r.charCodeAt(l+1),a&&i!==47&&i!==32&&i!==10&&i!==9&&i!==13&&i!==12&&(l+=1,sr.test(r.charAt(l)))){for(;sr.test(r.charAt(l+1));)l+=1;r.charCodeAt(l+1)===32&&(l+=1)}c=["word",r.slice(y,l+1),y,l],y=l;break}default:{i===47&&r.charCodeAt(y+1)===42?(l=r.indexOf("*/",y+2)+1,l===0&&(n||Y?l=r.length:S("comment")),c=["comment",r.slice(y,l+1),y,l],y=l):(Fe.lastIndex=y+1,Fe.test(r),Fe.lastIndex===0?l=r.length-1:l=Fe.lastIndex-2,c=["word",r.slice(y,l+1),y,l],g.push(c),y=l);break}}return y++,c}function R(F){m.push(F)}return{back:R,endOfFile:x,nextToken:A,position:_}}});var ct=C((il,ar)=>{"use strict";var k=at(),Ns=ut(),or;function ks(s){or=s}var qs={";":k.yellow,":":k.yellow,"(":k.cyan,")":k.cyan,"[":k.yellow,"]":k.yellow,"{":k.yellow,"}":k.yellow,"at-word":k.cyan,brackets:k.cyan,call:k.cyan,class:k.yellow,comment:k.gray,hash:k.magenta,string:k.green};function Ts([s,e],t){if(s==="word"){if(e[0]===".")return"class";if(e[0]==="#")return"hash"}if(!t.endOfFile()){let r=t.nextToken();if(t.back(r),r[0]==="brackets"||r[0]==="(")return"call"}return s}function lr(s){let e=Ns(new or(s),{ignoreErrors:!0}),t="";for(;!e.endOfFile();){let r=e.nextToken(),n=qs[Ts(r,e)];n?t+=r[1].split(/\r?\n/).map(i=>n(i)).join(`
`):t+=r[1]}return t}lr.registerInput=ks;ar.exports=lr});var ze=C((ol,fr)=>{"use strict";var ur=at(),cr=ct(),me=class s extends Error{constructor(e,t,r,n,i,o){super(e),this.name="CssSyntaxError",this.reason=e,i&&(this.file=i),n&&(this.source=n),o&&(this.plugin=o),typeof t<"u"&&typeof r<"u"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,s)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=ur.isColorSupported);let r=c=>c,n=c=>c,i=c=>c;if(e){let{bold:c,gray:h,red:f}=ur.createColors(!0);n=p=>c(f(p)),r=p=>h(p),cr&&(i=p=>cr(p))}let o=t.split(/\r?\n/),a=Math.max(this.line-3,0),l=Math.min(this.line+2,o.length),u=String(l).length;return o.slice(a,l).map((c,h)=>{let f=a+1+h,p=" "+(" "+f).slice(-u)+" | ";if(f===this.line){if(c.length>160){let v=20,y=Math.max(0,this.column-v),g=Math.max(this.column+v,this.endColumn+v),m=c.slice(y,g),b=r(p.replace(/\d/g," "))+c.slice(0,Math.min(this.column-1,v-1)).replace(/[^\t]/g," ");return n(">")+r(p)+i(m)+`
 `+b+n("^")}let d=r(p.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return n(">")+r(p)+i(c)+`
 `+d+n("^")}return" "+r(p)+i(c)}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};fr.exports=me;me.default=me});var ft=C((ll,pr)=>{"use strict";var Ds=/(<)(\/?style\b)/gi,Us=/(<)(!--)/g;function K(s){return typeof s!="string"||!s.includes("<")?s:s.replace(Ds,"\\3c $2").replace(Us,"\\3c $2")}var hr={after:`
`,beforeClose:`
`,beforeComment:`
`,beforeDecl:`
`,beforeOpen:" ",beforeRule:`
`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function Bs(s){return s[0].toUpperCase()+s.slice(1)}var ge=class{constructor(e){this.builder=e}atrule(e,t){let r=e.raws,n="@"+e.name,i=e.params?this.rawValue(e,"params"):"";if(typeof r.afterName<"u"?n+=r.afterName:i&&(n+=" "),e.nodes)this.block(e,n+i);else{let o=(r.between||"")+(t?";":"");this.builder(K(n+i+o),e)}}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,i=0;for(;n&&n.type!=="root";)i+=1,n=n.parent;if(r.includes(`
`)){let o=this.raw(e,null,"indent");if(o.length)for(let a=0;a<i;a++)r+=o}return r}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(K(t+r)+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(K(n)),this.builder("}",e,"end")}body(e){let t=e.nodes,r=t.length-1;for(;r>0&&t[r].type==="comment";)r-=1;let n=this.raw(e,"semicolon"),i=e.type==="document";for(let o=0;o<t.length;o++){let a=t[o],l=this.raw(a,"before");l&&this.builder(i?l:K(l)),this.stringify(a,r!==o||n)}}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder(K("/*"+t+e.text+r+"*/"),e)}decl(e,t){let r=e.raws,n=this.raw(e,"between","colon"),i=e.prop+n+this.rawValue(e,"value");e.important&&(i+=r.important||" !important"),t&&(i+=";"),this.builder(K(i),e)}document(e){this.body(e)}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n<"u"))return n;let i=e.parent;if(r==="before"&&(!i||i.type==="root"&&i.first===e||i&&i.type==="document"))return"";if(!i)return hr[r];let o=e.root(),a=o.rawCache||(o.rawCache={});if(typeof a[r]<"u")return a[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let l="raw"+Bs(r);this[l]?n=this[l](o,e):o.walk(u=>{if(n=u.raws[t],typeof n<"u")return!1})}return typeof n>"u"&&(n=hr[r]),a[r]=n,n}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t<"u"))return!1}),t}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before<"u")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between<"u")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t<"u"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before<"u"){let i=r.raws.before.split(`
`);return t=i[i.length-1],t=t.replace(/\S/g,""),!1}}),t}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t<"u"))return!1}),t}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}root(e){if(this.body(e),e.raws.after){let t=e.raws.after,r=e.parent&&e.parent.type==="document";this.builder(r?t:K(t))}}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(K(e.raws.ownSemicolon),e,"end")}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}};pr.exports=ge;ge.default=ge});var ye=C((al,dr)=>{"use strict";var Fs=ft();function ht(s,e){new Fs(e).stringify(s)}dr.exports=ht;ht.default=ht});var je=C((ul,pt)=>{"use strict";pt.exports.isClean=Symbol("isClean");pt.exports.my=Symbol("my")});var xe=C((cl,mr)=>{"use strict";var zs=ze(),js=ft(),Gs=ye(),{isClean:we,my:Vs}=je();function dt(s,e){let t=new s.constructor;for(let r in s){if(!Object.prototype.hasOwnProperty.call(s,r)||r==="proxyCache")continue;let n=s[r],i=typeof n;r==="parent"&&i==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(o=>dt(o,t)):(i==="object"&&n!==null&&(n=dt(n)),t[r]=n)}return t}function j(s,e){if(e&&typeof e.offset<"u")return e.offset;let t=1,r=1,n=0;for(let i=0;i<s.length;i++){if(r===e.line&&t===e.column){n=i;break}s[i]===`
`?(t=1,r+=1):t+=1}return n}var ve=class{get proxyOf(){return this}constructor(e={}){this.raws={},this[we]=!1,this[Vs]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){for(let t in e)this[t]=e[t];return this}before(e){return this.parent.insertBefore(this,e),this}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}clone(e={}){let t=dt(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(e,t={}){if(this.source){let{end:r,start:n}=this.rangeBy(t);return this.source.input.error(e,{column:n.column,line:n.line},{column:r.column,line:r.line},t)}return new zs(e)}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0}}}markClean(){this[we]=!0}markDirty(){if(this[we]){this[we]=!1;let e=this;for(;e=e.parent;)e[we]=!1}}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e={}){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r="document"in this.source.input?this.source.input.document:this.source.input.css,i=r.slice(j(r,this.source.start),j(r,this.source.end)).indexOf(e.word);i!==-1&&(t=this.positionInside(i))}return t}positionInside(e){let t=this.source.start.column,r=this.source.start.line,n="document"in this.source.input?this.source.input.document:this.source.input.css,i=j(n,this.source.start),o=i+e;for(let a=i;a<o;a++)n[a]===`
`?(t=1,r+=1):t+=1;return{column:t,line:r,offset:o}}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}rangeBy(e={}){let t="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:j(t,this.source.start)},n=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:j(t,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(e.word){let o=t.slice(j(t,this.source.start),j(t,this.source.end)).indexOf(e.word);o!==-1&&(r=this.positionInside(o),n=this.positionInside(o+e.word.length))}else e.start?r={column:e.start.column,line:e.start.line,offset:j(t,e.start)}:e.index&&(r=this.positionInside(e.index)),e.end?n={column:e.end.column,line:e.end.line,offset:j(t,e.end)}:typeof e.endIndex=="number"?n=this.positionInside(e.endIndex):e.index&&(n=this.positionInside(e.index+1));return(n.line<r.line||n.line===r.line&&n.column<=r.column)&&(n={column:r.column+1,line:r.line,offset:r.offset+1}),{end:n,start:r}}raw(e,t){return new js().raw(this,e,t)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}toJSON(e,t){let r={},n=t==null;t=t||new Map;let i=0;for(let o in this){if(!Object.prototype.hasOwnProperty.call(this,o)||o==="parent"||o==="proxyCache")continue;let a=this[o];if(Array.isArray(a))r[o]=a.map(l=>typeof l=="object"&&l.toJSON?l.toJSON(null,t):l);else if(typeof a=="object"&&a.toJSON)r[o]=a.toJSON(null,t);else if(o==="source"){if(a==null)continue;let l=t.get(a.input);l==null&&(l=i,t.set(a.input,i),i++),r[o]={end:a.end,inputId:l,start:a.start}}else r[o]=a}return n&&(r.inputs=[...t.keys()].map(o=>o.toJSON())),r}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(e=Gs){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}warn(e,t,r={}){let n={node:this};for(let i in r)n[i]=r[i];return e.warn(t,n)}};mr.exports=ve;ve.default=ve});var be=C((fl,gr)=>{"use strict";var Ws=xe(),Se=class extends Ws{constructor(e){super(e),this.type="comment"}};gr.exports=Se;Se.default=Se});var _e=C((hl,yr)=>{"use strict";var Ks=xe(),Ce=class extends Ks{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(e){e&&typeof e.value<"u"&&typeof e.value!="string"&&(e={...e,value:String(e.value)}),super(e),this.type="decl"}};yr.exports=Ce;Ce.default=Ce});var H=C((pl,Or)=>{"use strict";var wr=be(),vr=_e(),Hs=xe(),{isClean:xr,my:Sr}=je(),mt,br,Cr,gt;function _r(s){return s.map(e=>(e.nodes&&(e.nodes=_r(e.nodes)),delete e.source,e))}function Er(s){if(s[xr]=!1,s.proxyOf.nodes)for(let e of s.proxyOf.nodes)Er(e)}var U=class s extends Hs{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}every(e){return this.nodes.every(e)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(i,o)=>n(i.toProxy(),o):n)):t==="every"||t==="some"?r=>e[t]((n,...i)=>r(n.toProxy(),...i)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0}}}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let o of n)this.proxyOf.nodes.splice(r+1,0,o);let i;for(let o in this.indexes)i=this.indexes[o],r<i&&(this.indexes[o]=i+n.length);return this.markDirty(),this}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,i=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let a of i)this.proxyOf.nodes.splice(r,0,a);let o;for(let a in this.indexes)o=this.indexes[a],r<=o&&(this.indexes[a]=o+i.length);return this.markDirty(),this}normalize(e,t){if(typeof e=="string")e=_r(br(e).nodes);else if(typeof e>"u")e=[];else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value>"u")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new vr(e)]}else if(e.selector||e.selectors)e=[new gt(e)];else if(e.name)e=[new mt(e)];else if(e.text)e=[new wr(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[Sr]||s.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[xr]&&Er(n),n.raws||(n.raws={}),typeof n.raws.before>"u"&&t&&typeof t.raws.before<"u"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(i){throw t.addToError(i)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}};U.registerParse=s=>{br=s};U.registerRule=s=>{gt=s};U.registerAtRule=s=>{mt=s};U.registerRoot=s=>{Cr=s};Or.exports=U;U.default=U;U.rebuild=s=>{s.type==="atrule"?Object.setPrototypeOf(s,mt.prototype):s.type==="rule"?Object.setPrototypeOf(s,gt.prototype):s.type==="decl"?Object.setPrototypeOf(s,vr.prototype):s.type==="comment"?Object.setPrototypeOf(s,wr.prototype):s.type==="root"&&Object.setPrototypeOf(s,Cr.prototype),s[Sr]=!0,s.nodes&&s.nodes.forEach(e=>{U.rebuild(e)})}});var Ge=C((dl,Mr)=>{"use strict";var Ar=H(),re=class extends Ar{constructor(e){super(e),this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Mr.exports=re;re.default=re;Ar.registerAtRule(re)});var Ve=C((ml,$r)=>{"use strict";var Qs=H(),Lr,Rr,X=class extends Qs{constructor(e){super({type:"document",...e}),this.nodes||(this.nodes=[])}toResult(e={}){return new Lr(new Rr,this,e).stringify()}};X.registerLazyResult=s=>{Lr=s};X.registerProcessor=s=>{Rr=s};$r.exports=X;X.default=X});var Ir=C((gl,Pr)=>{var Js="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",Ys=(s,e=21)=>(t=e)=>{let r="",n=t|0;for(;n--;)r+=s[Math.random()*s.length|0];return r},Xs=(s=21)=>{let e="",t=s|0;for(;t--;)e+=Js[Math.random()*64|0];return e};Pr.exports={nanoid:Xs,customAlphabet:Ys}});var kr=C(yt=>{var Nr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");yt.encode=function(s){if(0<=s&&s<Nr.length)return Nr[s];throw new TypeError("Must be between 0 and 63: "+s)};yt.decode=function(s){var e=65,t=90,r=97,n=122,i=48,o=57,a=43,l=47,u=26,c=52;return e<=s&&s<=t?s-e:r<=s&&s<=n?s-r+u:i<=s&&s<=o?s-i+c:s==a?62:s==l?63:-1}});var xt=C(vt=>{var qr=kr(),wt=5,Tr=1<<wt,Dr=Tr-1,Ur=Tr;function Zs(s){return s<0?(-s<<1)+1:(s<<1)+0}function ei(s){var e=(s&1)===1,t=s>>1;return e?-t:t}vt.encode=function(e){var t="",r,n=Zs(e);do r=n&Dr,n>>>=wt,n>0&&(r|=Ur),t+=qr.encode(r);while(n>0);return t};vt.decode=function(e,t,r){var n=e.length,i=0,o=0,a,l;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(l=qr.decode(e.charCodeAt(t++)),l===-1)throw new Error("Invalid base64 digit: "+e.charAt(t-1));a=!!(l&Ur),l&=Dr,i=i+(l<<o),o+=wt}while(a);r.value=ei(i),r.rest=t}});var se=C(P=>{function ti(s,e,t){if(e in s)return s[e];if(arguments.length===3)return t;throw new Error('"'+e+'" is a required argument.')}P.getArg=ti;var Br=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,ri=/^data:.+\,.+$/;function Ee(s){var e=s.match(Br);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}P.urlParse=Ee;function ne(s){var e="";return s.scheme&&(e+=s.scheme+":"),e+="//",s.auth&&(e+=s.auth+"@"),s.host&&(e+=s.host),s.port&&(e+=":"+s.port),s.path&&(e+=s.path),e}P.urlGenerate=ne;var ni=32;function si(s){var e=[];return function(t){for(var r=0;r<e.length;r++)if(e[r].input===t){var n=e[0];return e[0]=e[r],e[r]=n,e[0].result}var i=s(t);return e.unshift({input:t,result:i}),e.length>ni&&e.pop(),i}}var St=si(function(e){var t=e,r=Ee(e);if(r){if(!r.path)return e;t=r.path}for(var n=P.isAbsolute(t),i=[],o=0,a=0;;)if(o=a,a=t.indexOf("/",o),a===-1){i.push(t.slice(o));break}else for(i.push(t.slice(o,a));a<t.length&&t[a]==="/";)a++;for(var l,u=0,a=i.length-1;a>=0;a--)l=i[a],l==="."?i.splice(a,1):l===".."?u++:u>0&&(l===""?(i.splice(a+1,u),u=0):(i.splice(a,2),u--));return t=i.join("/"),t===""&&(t=n?"/":"."),r?(r.path=t,ne(r)):t});P.normalize=St;function Fr(s,e){s===""&&(s="."),e===""&&(e=".");var t=Ee(e),r=Ee(s);if(r&&(s=r.path||"/"),t&&!t.scheme)return r&&(t.scheme=r.scheme),ne(t);if(t||e.match(ri))return e;if(r&&!r.host&&!r.path)return r.host=e,ne(r);var n=e.charAt(0)==="/"?e:St(s.replace(/\/+$/,"")+"/"+e);return r?(r.path=n,ne(r)):n}P.join=Fr;P.isAbsolute=function(s){return s.charAt(0)==="/"||Br.test(s)};function ii(s,e){s===""&&(s="."),s=s.replace(/\/$/,"");for(var t=0;e.indexOf(s+"/")!==0;){var r=s.lastIndexOf("/");if(r<0||(s=s.slice(0,r),s.match(/^([^\/]+:\/)?\/*$/)))return e;++t}return Array(t+1).join("../")+e.substr(s.length+1)}P.relative=ii;var zr=(function(){var s=Object.create(null);return!("__proto__"in s)})();function jr(s){return s}function oi(s){return Gr(s)?"$"+s:s}P.toSetString=zr?jr:oi;function li(s){return Gr(s)?s.slice(1):s}P.fromSetString=zr?jr:li;function Gr(s){if(!s)return!1;var e=s.length;if(e<9||s.charCodeAt(e-1)!==95||s.charCodeAt(e-2)!==95||s.charCodeAt(e-3)!==111||s.charCodeAt(e-4)!==116||s.charCodeAt(e-5)!==111||s.charCodeAt(e-6)!==114||s.charCodeAt(e-7)!==112||s.charCodeAt(e-8)!==95||s.charCodeAt(e-9)!==95)return!1;for(var t=e-10;t>=0;t--)if(s.charCodeAt(t)!==36)return!1;return!0}function ai(s,e,t){var r=G(s.source,e.source);return r!==0||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:G(s.name,e.name)}P.compareByOriginalPositions=ai;function ui(s,e,t){var r;return r=s.originalLine-e.originalLine,r!==0||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:G(s.name,e.name)}P.compareByOriginalPositionsNoSource=ui;function ci(s,e,t){var r=s.generatedLine-e.generatedLine;return r!==0||(r=s.generatedColumn-e.generatedColumn,r!==0||t)||(r=G(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:G(s.name,e.name)}P.compareByGeneratedPositionsDeflated=ci;function fi(s,e,t){var r=s.generatedColumn-e.generatedColumn;return r!==0||t||(r=G(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:G(s.name,e.name)}P.compareByGeneratedPositionsDeflatedNoLine=fi;function G(s,e){return s===e?0:s===null?1:e===null?-1:s>e?1:-1}function hi(s,e){var t=s.generatedLine-e.generatedLine;return t!==0||(t=s.generatedColumn-e.generatedColumn,t!==0)||(t=G(s.source,e.source),t!==0)||(t=s.originalLine-e.originalLine,t!==0)||(t=s.originalColumn-e.originalColumn,t!==0)?t:G(s.name,e.name)}P.compareByGeneratedPositionsInflated=hi;function pi(s){return JSON.parse(s.replace(/^\)]}'[^\n]*\n/,""))}P.parseSourceMapInput=pi;function di(s,e,t){if(e=e||"",s&&(s[s.length-1]!=="/"&&e[0]!=="/"&&(s+="/"),e=s+e),t){var r=Ee(t);if(!r)throw new Error("sourceMapURL could not be parsed");if(r.path){var n=r.path.lastIndexOf("/");n>=0&&(r.path=r.path.substring(0,n+1))}e=Fr(ne(r),e)}return St(e)}P.computeSourceURL=di});var _t=C(Vr=>{var bt=se(),Ct=Object.prototype.hasOwnProperty,Z=typeof Map<"u";function V(){this._array=[],this._set=Z?new Map:Object.create(null)}V.fromArray=function(e,t){for(var r=new V,n=0,i=e.length;n<i;n++)r.add(e[n],t);return r};V.prototype.size=function(){return Z?this._set.size:Object.getOwnPropertyNames(this._set).length};V.prototype.add=function(e,t){var r=Z?e:bt.toSetString(e),n=Z?this.has(e):Ct.call(this._set,r),i=this._array.length;(!n||t)&&this._array.push(e),n||(Z?this._set.set(e,i):this._set[r]=i)};V.prototype.has=function(e){if(Z)return this._set.has(e);var t=bt.toSetString(e);return Ct.call(this._set,t)};V.prototype.indexOf=function(e){if(Z){var t=this._set.get(e);if(t>=0)return t}else{var r=bt.toSetString(e);if(Ct.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')};V.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};V.prototype.toArray=function(){return this._array.slice()};Vr.ArraySet=V});var Hr=C(Kr=>{var Wr=se();function mi(s,e){var t=s.generatedLine,r=e.generatedLine,n=s.generatedColumn,i=e.generatedColumn;return r>t||r==t&&i>=n||Wr.compareByGeneratedPositionsInflated(s,e)<=0}function We(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}We.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)};We.prototype.add=function(e){mi(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};We.prototype.toArray=function(){return this._sorted||(this._array.sort(Wr.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Kr.MappingList=We});var Et=C(Qr=>{var Oe=xt(),$=se(),Ke=_t().ArraySet,gi=Hr().MappingList;function T(s){s||(s={}),this._file=$.getArg(s,"file",null),this._sourceRoot=$.getArg(s,"sourceRoot",null),this._skipValidation=$.getArg(s,"skipValidation",!1),this._ignoreInvalidMapping=$.getArg(s,"ignoreInvalidMapping",!1),this._sources=new Ke,this._names=new Ke,this._mappings=new gi,this._sourcesContents=null}T.prototype._version=3;T.fromSourceMap=function(e,t){var r=e.sourceRoot,n=new T(Object.assign(t||{},{file:e.file,sourceRoot:r}));return e.eachMapping(function(i){var o={generated:{line:i.generatedLine,column:i.generatedColumn}};i.source!=null&&(o.source=i.source,r!=null&&(o.source=$.relative(r,o.source)),o.original={line:i.originalLine,column:i.originalColumn},i.name!=null&&(o.name=i.name)),n.addMapping(o)}),e.sources.forEach(function(i){var o=i;r!==null&&(o=$.relative(r,i)),n._sources.has(o)||n._sources.add(o);var a=e.sourceContentFor(i);a!=null&&n.setSourceContent(i,a)}),n};T.prototype.addMapping=function(e){var t=$.getArg(e,"generated"),r=$.getArg(e,"original",null),n=$.getArg(e,"source",null),i=$.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(t,r,n,i)===!1||(n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:n,name:i}))};T.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=$.relative(this._sourceRoot,r)),t!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[$.toSetString(r)]=t):this._sourcesContents&&(delete this._sourcesContents[$.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};T.prototype.applySourceMap=function(e,t,r){var n=t;if(t==null){if(e.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=e.file}var i=this._sourceRoot;i!=null&&(n=$.relative(i,n));var o=new Ke,a=new Ke;this._mappings.unsortedForEach(function(l){if(l.source===n&&l.originalLine!=null){var u=e.originalPositionFor({line:l.originalLine,column:l.originalColumn});u.source!=null&&(l.source=u.source,r!=null&&(l.source=$.join(r,l.source)),i!=null&&(l.source=$.relative(i,l.source)),l.originalLine=u.line,l.originalColumn=u.column,u.name!=null&&(l.name=u.name))}var c=l.source;c!=null&&!o.has(c)&&o.add(c);var h=l.name;h!=null&&!a.has(h)&&a.add(h)},this),this._sources=o,this._names=a,e.sources.forEach(function(l){var u=e.sourceContentFor(l);u!=null&&(r!=null&&(l=$.join(r,l)),i!=null&&(l=$.relative(i,l)),this.setSourceContent(l,u))},this)};T.prototype._validateMapping=function(e,t,r,n){if(t&&typeof t.line!="number"&&typeof t.column!="number"){var i="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(i),!1;throw new Error(i)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!t&&!r&&!n)){if(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&r)return;var i="Invalid mapping: "+JSON.stringify({generated:e,source:r,original:t,name:n});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(i),!1;throw new Error(i)}};T.prototype._serializeMappings=function(){for(var e=0,t=1,r=0,n=0,i=0,o=0,a="",l,u,c,h,f=this._mappings.toArray(),p=0,d=f.length;p<d;p++){if(u=f[p],l="",u.generatedLine!==t)for(e=0;u.generatedLine!==t;)l+=";",t++;else if(p>0){if(!$.compareByGeneratedPositionsInflated(u,f[p-1]))continue;l+=","}l+=Oe.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(h=this._sources.indexOf(u.source),l+=Oe.encode(h-o),o=h,l+=Oe.encode(u.originalLine-1-n),n=u.originalLine-1,l+=Oe.encode(u.originalColumn-r),r=u.originalColumn,u.name!=null&&(c=this._names.indexOf(u.name),l+=Oe.encode(c-i),i=c)),a+=l}return a};T.prototype._generateSourcesContent=function(e,t){return e.map(function(r){if(!this._sourcesContents)return null;t!=null&&(r=$.relative(t,r));var n=$.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)};T.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};T.prototype.toString=function(){return JSON.stringify(this.toJSON())};Qr.SourceMapGenerator=T});var Jr=C(ee=>{ee.GREATEST_LOWER_BOUND=1;ee.LEAST_UPPER_BOUND=2;function Ot(s,e,t,r,n,i){var o=Math.floor((e-s)/2)+s,a=n(t,r[o],!0);return a===0?o:a>0?e-o>1?Ot(o,e,t,r,n,i):i==ee.LEAST_UPPER_BOUND?e<r.length?e:-1:o:o-s>1?Ot(s,o,t,r,n,i):i==ee.LEAST_UPPER_BOUND?o:s<0?-1:s}ee.search=function(e,t,r,n){if(t.length===0)return-1;var i=Ot(-1,t.length,e,t,r,n||ee.GREATEST_LOWER_BOUND);if(i<0)return-1;for(;i-1>=0&&r(t[i],t[i-1],!0)===0;)--i;return i}});var Zr=C(Xr=>{function yi(s){function e(n,i,o){var a=n[i];n[i]=n[o],n[o]=a}function t(n,i){return Math.round(n+Math.random()*(i-n))}function r(n,i,o,a){if(o<a){var l=t(o,a),u=o-1;e(n,l,a);for(var c=n[a],h=o;h<a;h++)i(n[h],c,!1)<=0&&(u+=1,e(n,u,h));e(n,u+1,h);var f=u+1;r(n,i,o,f-1),r(n,i,f+1,a)}}return r}function wi(s){let e=yi.toString();return new Function(`return ${e}`)()(s)}var Yr=new WeakMap;Xr.quickSort=function(s,e,t=0){let r=Yr.get(e);r===void 0&&(r=wi(e),Yr.set(e,r)),r(s,e,t,s.length-1)}});var rn=C(He=>{var w=se(),Mt=Jr(),ie=_t().ArraySet,vi=xt(),Ae=Zr().quickSort;function L(s,e){var t=s;return typeof s=="string"&&(t=w.parseSourceMapInput(s)),t.sections!=null?new B(t,e):new I(t,e)}L.fromSourceMap=function(s,e){return I.fromSourceMap(s,e)};L.prototype._version=3;L.prototype.__generatedMappings=null;Object.defineProperty(L.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});L.prototype.__originalMappings=null;Object.defineProperty(L.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});L.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return r===";"||r===","};L.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")};L.GENERATED_ORDER=1;L.ORIGINAL_ORDER=2;L.GREATEST_LOWER_BOUND=1;L.LEAST_UPPER_BOUND=2;L.prototype.eachMapping=function(e,t,r){var n=t||null,i=r||L.GENERATED_ORDER,o;switch(i){case L.GENERATED_ORDER:o=this._generatedMappings;break;case L.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var a=this.sourceRoot,l=e.bind(n),u=this._names,c=this._sources,h=this._sourceMapURL,f=0,p=o.length;f<p;f++){var d=o[f],v=d.source===null?null:c.at(d.source);v!==null&&(v=w.computeSourceURL(a,v,h)),l({source:v,generatedLine:d.generatedLine,generatedColumn:d.generatedColumn,originalLine:d.originalLine,originalColumn:d.originalColumn,name:d.name===null?null:u.at(d.name)})}};L.prototype.allGeneratedPositionsFor=function(e){var t=w.getArg(e,"line"),r={source:w.getArg(e,"source"),originalLine:t,originalColumn:w.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var n=[],i=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",w.compareByOriginalPositions,Mt.LEAST_UPPER_BOUND);if(i>=0){var o=this._originalMappings[i];if(e.column===void 0)for(var a=o.originalLine;o&&o.originalLine===a;)n.push({line:w.getArg(o,"generatedLine",null),column:w.getArg(o,"generatedColumn",null),lastColumn:w.getArg(o,"lastGeneratedColumn",null)}),o=this._originalMappings[++i];else for(var l=o.originalColumn;o&&o.originalLine===t&&o.originalColumn==l;)n.push({line:w.getArg(o,"generatedLine",null),column:w.getArg(o,"generatedColumn",null),lastColumn:w.getArg(o,"lastGeneratedColumn",null)}),o=this._originalMappings[++i]}return n};He.SourceMapConsumer=L;function I(s,e){var t=s;typeof s=="string"&&(t=w.parseSourceMapInput(s));var r=w.getArg(t,"version"),n=w.getArg(t,"sources"),i=w.getArg(t,"names",[]),o=w.getArg(t,"sourceRoot",null),a=w.getArg(t,"sourcesContent",null),l=w.getArg(t,"mappings"),u=w.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);o&&(o=w.normalize(o)),n=n.map(String).map(w.normalize).map(function(c){return o&&w.isAbsolute(o)&&w.isAbsolute(c)?w.relative(o,c):c}),this._names=ie.fromArray(i.map(String),!0),this._sources=ie.fromArray(n,!0),this._absoluteSources=this._sources.toArray().map(function(c){return w.computeSourceURL(o,c,e)}),this.sourceRoot=o,this.sourcesContent=a,this._mappings=l,this._sourceMapURL=e,this.file=u}I.prototype=Object.create(L.prototype);I.prototype.consumer=L;I.prototype._findSourceIndex=function(s){var e=s;if(this.sourceRoot!=null&&(e=w.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var t;for(t=0;t<this._absoluteSources.length;++t)if(this._absoluteSources[t]==s)return t;return-1};I.fromSourceMap=function(e,t){var r=Object.create(I.prototype),n=r._names=ie.fromArray(e._names.toArray(),!0),i=r._sources=ie.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=t,r._absoluteSources=r._sources.toArray().map(function(p){return w.computeSourceURL(r.sourceRoot,p,t)});for(var o=e._mappings.toArray().slice(),a=r.__generatedMappings=[],l=r.__originalMappings=[],u=0,c=o.length;u<c;u++){var h=o[u],f=new tn;f.generatedLine=h.generatedLine,f.generatedColumn=h.generatedColumn,h.source&&(f.source=i.indexOf(h.source),f.originalLine=h.originalLine,f.originalColumn=h.originalColumn,h.name&&(f.name=n.indexOf(h.name)),l.push(f)),a.push(f)}return Ae(r.__originalMappings,w.compareByOriginalPositions),r};I.prototype._version=3;Object.defineProperty(I.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function tn(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var At=w.compareByGeneratedPositionsDeflatedNoLine;function en(s,e){let t=s.length,r=s.length-e;if(!(r<=1))if(r==2){let n=s[e],i=s[e+1];At(n,i)>0&&(s[e]=i,s[e+1]=n)}else if(r<20)for(let n=e;n<t;n++)for(let i=n;i>e;i--){let o=s[i-1],a=s[i];if(At(o,a)<=0)break;s[i-1]=a,s[i]=o}else Ae(s,At,e)}I.prototype._parseMappings=function(e,t){var r=1,n=0,i=0,o=0,a=0,l=0,u=e.length,c=0,h={},f={},p=[],d=[],v,y,g,m,b;let _=0;for(;c<u;)if(e.charAt(c)===";")r++,c++,n=0,en(d,_),_=d.length;else if(e.charAt(c)===",")c++;else{for(v=new tn,v.generatedLine=r,m=c;m<u&&!this._charIsMappingSeparator(e,m);m++);for(y=e.slice(c,m),g=[];c<m;)vi.decode(e,c,f),b=f.value,c=f.rest,g.push(b);if(g.length===2)throw new Error("Found a source, but no line and column");if(g.length===3)throw new Error("Found a source and line, but no column");if(v.generatedColumn=n+g[0],n=v.generatedColumn,g.length>1&&(v.source=a+g[1],a+=g[1],v.originalLine=i+g[2],i=v.originalLine,v.originalLine+=1,v.originalColumn=o+g[3],o=v.originalColumn,g.length>4&&(v.name=l+g[4],l+=g[4])),d.push(v),typeof v.originalLine=="number"){let x=v.source;for(;p.length<=x;)p.push(null);p[x]===null&&(p[x]=[]),p[x].push(v)}}en(d,_),this.__generatedMappings=d;for(var S=0;S<p.length;S++)p[S]!=null&&Ae(p[S],w.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...p)};I.prototype._findMapping=function(e,t,r,n,i,o){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return Mt.search(e,t,i,o)};I.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}};I.prototype.originalPositionFor=function(e){var t={generatedLine:w.getArg(e,"line"),generatedColumn:w.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",w.compareByGeneratedPositionsDeflated,w.getArg(e,"bias",L.GREATEST_LOWER_BOUND));if(r>=0){var n=this._generatedMappings[r];if(n.generatedLine===t.generatedLine){var i=w.getArg(n,"source",null);i!==null&&(i=this._sources.at(i),i=w.computeSourceURL(this.sourceRoot,i,this._sourceMapURL));var o=w.getArg(n,"name",null);return o!==null&&(o=this._names.at(o)),{source:i,line:w.getArg(n,"originalLine",null),column:w.getArg(n,"originalColumn",null),name:o}}}return{source:null,line:null,column:null,name:null}};I.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};I.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var n=e;this.sourceRoot!=null&&(n=w.relative(this.sourceRoot,n));var i;if(this.sourceRoot!=null&&(i=w.urlParse(this.sourceRoot))){var o=n.replace(/^file:\/\//,"");if(i.scheme=="file"&&this._sources.has(o))return this.sourcesContent[this._sources.indexOf(o)];if((!i.path||i.path=="/")&&this._sources.has("/"+n))return this.sourcesContent[this._sources.indexOf("/"+n)]}if(t)return null;throw new Error('"'+n+'" is not in the SourceMap.')};I.prototype.generatedPositionFor=function(e){var t=w.getArg(e,"source");if(t=this._findSourceIndex(t),t<0)return{line:null,column:null,lastColumn:null};var r={source:t,originalLine:w.getArg(e,"line"),originalColumn:w.getArg(e,"column")},n=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",w.compareByOriginalPositions,w.getArg(e,"bias",L.GREATEST_LOWER_BOUND));if(n>=0){var i=this._originalMappings[n];if(i.source===r.source)return{line:w.getArg(i,"generatedLine",null),column:w.getArg(i,"generatedColumn",null),lastColumn:w.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};He.BasicSourceMapConsumer=I;function B(s,e){var t=s;typeof s=="string"&&(t=w.parseSourceMapInput(s));var r=w.getArg(t,"version"),n=w.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new ie,this._names=new ie;var i={line:-1,column:0};this._sections=n.map(function(o){if(o.url)throw new Error("Support for url field in sections not implemented.");var a=w.getArg(o,"offset"),l=w.getArg(a,"line"),u=w.getArg(a,"column");if(l<i.line||l===i.line&&u<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=a,{generatedOffset:{generatedLine:l+1,generatedColumn:u+1},consumer:new L(w.getArg(o,"map"),e)}})}B.prototype=Object.create(L.prototype);B.prototype.constructor=L;B.prototype._version=3;Object.defineProperty(B.prototype,"sources",{get:function(){for(var s=[],e=0;e<this._sections.length;e++)for(var t=0;t<this._sections[e].consumer.sources.length;t++)s.push(this._sections[e].consumer.sources[t]);return s}});B.prototype.originalPositionFor=function(e){var t={generatedLine:w.getArg(e,"line"),generatedColumn:w.getArg(e,"column")},r=Mt.search(t,this._sections,function(i,o){var a=i.generatedLine-o.generatedOffset.generatedLine;return a||i.generatedColumn-o.generatedOffset.generatedColumn}),n=this._sections[r];return n?n.consumer.originalPositionFor({line:t.generatedLine-(n.generatedOffset.generatedLine-1),column:t.generatedColumn-(n.generatedOffset.generatedLine===t.generatedLine?n.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};B.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};B.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r],i=n.consumer.sourceContentFor(e,!0);if(i||i==="")return i}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')};B.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(r.consumer._findSourceIndex(w.getArg(e,"source"))!==-1){var n=r.consumer.generatedPositionFor(e);if(n){var i={line:n.line+(r.generatedOffset.generatedLine-1),column:n.column+(r.generatedOffset.generatedLine===n.line?r.generatedOffset.generatedColumn-1:0)};return i}}}return{line:null,column:null}};B.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var n=this._sections[r],i=n.consumer._generatedMappings,o=0;o<i.length;o++){var a=i[o],l=n.consumer._sources.at(a.source);l!==null&&(l=w.computeSourceURL(n.consumer.sourceRoot,l,this._sourceMapURL)),this._sources.add(l),l=this._sources.indexOf(l);var u=null;a.name&&(u=n.consumer._names.at(a.name),this._names.add(u),u=this._names.indexOf(u));var c={source:l,generatedLine:a.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(n.generatedOffset.generatedLine===a.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:u};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}Ae(this.__generatedMappings,w.compareByGeneratedPositionsDeflated),Ae(this.__originalMappings,w.compareByOriginalPositions)};He.IndexedSourceMapConsumer=B});var sn=C(nn=>{var xi=Et().SourceMapGenerator,Qe=se(),Si=/(\r?\n)/,bi=10,oe="$$$isSourceNode$$$";function q(s,e,t,r,n){this.children=[],this.sourceContents={},this.line=s??null,this.column=e??null,this.source=t??null,this.name=n??null,this[oe]=!0,r!=null&&this.add(r)}q.fromStringWithSourceMap=function(e,t,r){var n=new q,i=e.split(Si),o=0,a=function(){var f=d(),p=d()||"";return f+p;function d(){return o<i.length?i[o++]:void 0}},l=1,u=0,c=null;return t.eachMapping(function(f){if(c!==null)if(l<f.generatedLine)h(c,a()),l++,u=0;else{var p=i[o]||"",d=p.substr(0,f.generatedColumn-u);i[o]=p.substr(f.generatedColumn-u),u=f.generatedColumn,h(c,d),c=f;return}for(;l<f.generatedLine;)n.add(a()),l++;if(u<f.generatedColumn){var p=i[o]||"";n.add(p.substr(0,f.generatedColumn)),i[o]=p.substr(f.generatedColumn),u=f.generatedColumn}c=f},this),o<i.length&&(c&&h(c,a()),n.add(i.splice(o).join(""))),t.sources.forEach(function(f){var p=t.sourceContentFor(f);p!=null&&(r!=null&&(f=Qe.join(r,f)),n.setSourceContent(f,p))}),n;function h(f,p){if(f===null||f.source===void 0)n.add(p);else{var d=r?Qe.join(r,f.source):f.source;n.add(new q(f.originalLine,f.originalColumn,d,p,f.name))}}};q.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(t){this.add(t)},this);else if(e[oe]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};q.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[oe]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};q.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)t=this.children[r],t[oe]?t.walk(e):t!==""&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})};q.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this};q.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[oe]?r.replaceRight(e,t):typeof r=="string"?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this};q.prototype.setSourceContent=function(e,t){this.sourceContents[Qe.toSetString(e)]=t};q.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][oe]&&this.children[t].walkSourceContents(e);for(var n=Object.keys(this.sourceContents),t=0,r=n.length;t<r;t++)e(Qe.fromSetString(n[t]),this.sourceContents[n[t]])};q.prototype.toString=function(){var e="";return this.walk(function(t){e+=t}),e};q.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new xi(e),n=!1,i=null,o=null,a=null,l=null;return this.walk(function(u,c){t.code+=u,c.source!==null&&c.line!==null&&c.column!==null?((i!==c.source||o!==c.line||a!==c.column||l!==c.name)&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name}),i=c.source,o=c.line,a=c.column,l=c.name,n=!0):n&&(r.addMapping({generated:{line:t.line,column:t.column}}),i=null,n=!1);for(var h=0,f=u.length;h<f;h++)u.charCodeAt(h)===bi?(t.line++,t.column=0,h+1===f?(i=null,n=!1):n&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name})):t.column++}),this.walkSourceContents(function(u,c){r.setSourceContent(u,c)}),{code:t.code,map:r}};nn.SourceNode=q});var Ye=C(Je=>{Je.SourceMapGenerator=Et().SourceMapGenerator;Je.SourceMapConsumer=rn().SourceMapConsumer;Je.SourceNode=sn().SourceNode});var Rt=C((Ml,an)=>{"use strict";var{existsSync:Ci,readFileSync:_i}=require("fs"),{dirname:Lt,join:Ei}=require("path"),{SourceMapConsumer:on,SourceMapGenerator:ln}=Ye();function Oi(s){return Buffer?Buffer.from(s,"base64").toString():window.atob(s)}var Me=class{constructor(e,t){if(t.map===!1)return;t.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:");let r=t.map?t.map.prev:void 0,n=this.loadMap(t.from,r);!this.mapFile&&t.from&&(this.mapFile=t.from),this.mapFile&&(this.root=Lt(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new on(this.json||this.text)),this.consumerCache}decodeInline(e){let t=/^data:application\/json;charset=utf-?8;base64,/,r=/^data:application\/json;base64,/,n=/^data:application\/json;charset=utf-?8,/,i=/^data:application\/json,/,o=e.match(n)||e.match(i);if(o)return decodeURIComponent(e.substr(o[0].length));let a=e.match(t)||e.match(r);if(a)return Oi(e.substr(a[0].length));let l=e.slice(22);throw l=l.slice(0,l.indexOf(",")),new Error("Unsupported source map encoding "+l)}getAnnotationURL(e){return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){return typeof e!="object"?!1:typeof e.mappings=="string"||typeof e._mappings=="string"||Array.isArray(e.sections)}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return;let r=e.lastIndexOf(t.pop()),n=e.indexOf("*/",r);r>-1&&n>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,n)))}loadFile(e,t,r){if(!(!r&&!this.unsafeMap&&!/\.map$/i.test(e))&&(this.root=Lt(e),Ci(e)))return this.mapFile=e,_i(e,"utf-8").toString().trim()}loadMap(e,t){if(t===!1)return!1;if(t){if(typeof t=="string")return t;if(typeof t=="function"){let r=t(e);if(r){let n=this.loadFile(r,e,!0);if(!n)throw new Error("Unable to load previous source map: "+r.toString());return n}}else{if(t instanceof on)return ln.fromSourceMap(t).toString();if(t instanceof ln)return t.toString();if(this.isMap(t))return JSON.stringify(t);throw new Error("Unsupported previous source map format: "+t.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;e&&(r=Ei(Lt(e),r));let n=this.loadFile(r,e,!1);if(n)try{this.json=JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}catch{return}return n}}}startWith(e,t){return e?e.substr(0,t.length)===t:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};an.exports=Me;Me.default=Me});var Le=C((Ll,pn)=>{"use strict";var{nanoid:Ai}=Ir(),{isAbsolute:It,resolve:Nt}=require("path"),{SourceMapConsumer:Mi,SourceMapGenerator:Li}=Ye(),{fileURLToPath:un,pathToFileURL:Xe}=require("url"),cn=ze(),Ri=Rt(),$t=ct(),Pt=Symbol("lineToIndexCache"),$i=!!(Mi&&Li),fn=!!(Nt&&It);function hn(s){if(s[Pt])return s[Pt];let e=s.css.split(`
`),t=new Array(e.length),r=0;for(let n=0,i=e.length;n<i;n++)t[n]=r,r+=e[n].length+1;return s[Pt]=t,t}var le=class{get from(){return this.file||this.id}constructor(e,t={}){if(e===null||typeof e>"u"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,t.document&&(this.document=t.document.toString()),t.from&&(!fn||/^\w+:\/\//.test(t.from)||It(t.from)?this.file=t.from:this.file=Nt(t.from)),fn&&$i){let r=new Ri(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+Ai(6)+">"),this.map&&(this.map.file=this.from)}error(e,t,r,n={}){let i,o,a,l,u;if(t&&typeof t=="object"){let h=t,f=r;if(typeof h.offset=="number"){l=h.offset;let p=this.fromOffset(l);t=p.line,r=p.col}else t=h.line,r=h.column,l=this.fromLineAndColumn(t,r);if(typeof f.offset=="number"){a=f.offset;let p=this.fromOffset(a);o=p.line,i=p.col}else o=f.line,i=f.column,a=this.fromLineAndColumn(f.line,f.column)}else if(r)l=this.fromLineAndColumn(t,r);else{l=t;let h=this.fromOffset(l);t=h.line,r=h.col}let c=this.origin(t,r,o,i);return c?u=new cn(e,c.endLine===void 0?c.line:{column:c.column,line:c.line},c.endLine===void 0?c.column:{column:c.endColumn,line:c.endLine},c.source,c.file,n.plugin):u=new cn(e,o===void 0?t:{column:r,line:t},o===void 0?r:{column:i,line:o},this.css,this.file,n.plugin),u.input={column:r,endColumn:i,endLine:o,endOffset:a,line:t,offset:l,source:this.css},this.file&&(Xe&&(u.input.url=Xe(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(e,t){return hn(this)[e-1]+t-1}fromOffset(e){let t=hn(this),r=t[t.length-1],n=0;if(e>=r)n=t.length-1;else{let i=t.length-2,o;for(;n<i;)if(o=n+(i-n>>1),e<t[o])i=o-1;else if(e>=t[o+1])n=o+1;else{n=o;break}}return{col:e-t[n]+1,line:n+1}}mapResolve(e){return/^\w+:\/\//.test(e)?e:Nt(this.map.consumer().sourceRoot||this.map.root||".",e)}origin(e,t,r,n){if(!this.map)return!1;let i=this.map.consumer(),o=i.originalPositionFor({column:t,line:e});if(!o.source)return!1;let a;typeof r=="number"&&(a=i.originalPositionFor({column:n,line:r}));let l;It(o.source)?l=Xe(o.source):l=new URL(o.source,this.map.consumer().sourceRoot||Xe(this.map.mapFile));let u={column:o.column,endColumn:a&&a.column,endLine:a&&a.line,line:o.line,url:l.toString()};if(l.protocol==="file:")if(un)u.file=un(l);else throw new Error("file: protocol is not available in this PostCSS build");let c=i.sourceContentFor(o.source);return c&&(u.source=c),u}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};pn.exports=le;le.default=le;$t&&$t.registerInput&&$t.registerInput(le)});var ae=C((Rl,yn)=>{"use strict";var dn=H(),mn,gn,Q=class extends dn{constructor(e){super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let i of n)i.raws.before=t.raws.before}return n}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}toResult(e={}){return new mn(new gn,this,e).stringify()}};Q.registerLazyResult=s=>{mn=s};Q.registerProcessor=s=>{gn=s};yn.exports=Q;Q.default=Q;dn.registerRoot(Q)});var kt=C(($l,wn)=>{"use strict";var Re={comma(s){return Re.split(s,[","],!0)},space(s){let e=[" ",`
`,"	"];return Re.split(s,e)},split(s,e,t){let r=[],n="",i=!1,o=0,a=!1,l="",u=!1;for(let c of s)u?u=!1:c==="\\"?u=!0:a?c===l&&(a=!1):c==='"'||c==="'"?(a=!0,l=c):c==="("?o+=1:c===")"?o>0&&(o-=1):o===0&&e.includes(c)&&(i=!0),i?(n!==""&&r.push(n.trim()),n="",i=!1):n+=c;return(t||n!=="")&&r.push(n.trim()),r}};wn.exports=Re;Re.default=Re});var Ze=C((Pl,xn)=>{"use strict";var vn=H(),Pi=kt(),ue=class extends vn{get selectors(){return Pi.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}constructor(e){super(e),this.type="rule",this.nodes||(this.nodes=[])}};xn.exports=ue;ue.default=ue;vn.registerRule(ue)});var bn=C((Il,Sn)=>{"use strict";var Ii=Ge(),Ni=be(),ki=_e(),qi=Le(),Ti=Rt(),Di=ae(),Ui=Ze();function $e(s,e){if(Array.isArray(s))return s.map(n=>$e(n));let{inputs:t,...r}=s;if(t){e=[];for(let n of t){let i={...n,__proto__:qi.prototype};i.map&&(i.map={...i.map,__proto__:Ti.prototype}),e.push(i)}}if(r.nodes&&(r.nodes=s.nodes.map(n=>$e(n,e))),r.source){let{inputId:n,...i}=r.source;r.source=i,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new Di(r);if(r.type==="decl")return new ki(r);if(r.type==="rule")return new Ui(r);if(r.type==="comment")return new Ni(r);if(r.type==="atrule")return new Ii(r);throw new Error("Unknown node type: "+s.type)}Sn.exports=$e;$e.default=$e});var Tt=C((Nl,Mn)=>{"use strict";var{dirname:et,relative:_n,resolve:En,sep:On}=require("path"),{SourceMapConsumer:An,SourceMapGenerator:tt}=Ye(),{pathToFileURL:Cn}=require("url"),Bi=Le(),Fi=!!(An&&tt),zi=!!(et&&En&&_n&&On),qt=class{constructor(e,t,r,n){this.stringify=e,this.mapOpts=r.map||{},this.root=t,this.opts=r,this.css=n,this.originalCSS=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e;this.isInline()?e="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?e=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?e=this.mapOpts.annotation(this.opts.to,this.root):e=this.outputFile()+".map";let t=`
`;this.css.includes(`\r
`)&&(t=`\r
`),this.css+=t+"/*# sourceMappingURL="+e+" */"}applyPrevMaps(){for(let e of this.previous()){let t=this.toUrl(this.path(e.file)),r=e.root||et(e.file),n;this.mapOpts.sourcesContent===!1?(n=new An(e.text),n.sourcesContent&&(n.sourcesContent=null)):n=e.consumer(),this.map.applySourceMap(n,t,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let e;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],e.type==="comment"&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)}else if(this.css){let e;for(;(e=this.css.lastIndexOf("/*#"))!==-1;){let t=this.css.indexOf("*/",e+3);if(t===-1)break;for(;e>0&&this.css[e-1]===`
`;)e--;this.css=this.css.slice(0,e)+this.css.slice(t+2)}}}}generate(){if(this.clearAnnotation(),zi&&Fi&&this.isMap())return this.generateMap();{let e="";return this.stringify(this.root,t=>{e+=t}),[e]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let e=this.previous()[0].consumer();e.file=this.outputFile(),this.map=tt.fromSourceMap(e,{ignoreInvalidMapping:!0})}else this.map=new tt({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new tt({file:this.outputFile(),ignoreInvalidMapping:!0});let e=1,t=1,r="<no source>",n={generated:{column:0,line:0},original:{column:0,line:0},source:""},i,o;this.stringify(this.root,(a,l,u)=>{if(this.css+=a,l&&u!=="end"&&(n.generated.line=e,n.generated.column=t-1,l.source&&l.source.start?(n.source=this.sourcePath(l),n.original.line=l.source.start.line,n.original.column=l.source.start.column-1,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,this.map.addMapping(n))),o=a.match(/\n/g),o?(e+=o.length,i=a.lastIndexOf(`
`),t=a.length-i):t+=a.length,l&&u!=="start"){let c=l.parent||{raws:{}};(!(l.type==="decl"||l.type==="atrule"&&!l.nodes)||l!==c.last||c.raws.semicolon)&&(l.source&&l.source.end?(n.source=this.sourcePath(l),n.original.line=l.source.end.line,n.original.column=l.source.end.column-1,n.generated.line=e,n.generated.column=t-2,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,n.generated.line=e,n.generated.column=t-1,this.map.addMapping(n)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(e=>e.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let e=this.mapOpts.annotation;return typeof e<"u"&&e!==!0?!1:this.previous().length?this.previous().some(t=>t.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(e=>e.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(e){if(this.mapOpts.absolute||e.charCodeAt(0)===60||/^\w+:\/\//.test(e))return e;let t=this.memoizedPaths.get(e);if(t)return t;let r=this.opts.to?et(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=et(En(r,this.mapOpts.annotation)));let n=_n(r,e);return this.memoizedPaths.set(e,n),n}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(e=>{if(e.source&&e.source.input.map){let t=e.source.input.map;this.previousMaps.includes(t)||this.previousMaps.push(t)}});else{let e=new Bi(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}return this.previousMaps}setSourcesContent(){let e={};if(this.root)this.root.walk(t=>{if(t.source){let r=t.source.input.from;if(r&&!e[r]){e[r]=!0;let n=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(n,t.source.input.css)}}});else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}sourcePath(e){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))}toBase64(e){return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(Cn){let r=Cn(e).toString();return this.memoizedFileURLs.set(e,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t;On==="\\"&&(e=e.replace(/\\/g,"/"));let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(e,r),r}};Mn.exports=qt});var Pn=C((kl,$n)=>{"use strict";var ji=Ge(),Gi=be(),Vi=_e(),Wi=ae(),Ln=Ze(),Ki=ut(),Rn={empty:!0,space:!0};function Hi(s){for(let e=s.length-1;e>=0;e--){let t=s[e],r=t[3]||t[2];if(r)return r}}function Dt(s,e,t){let r="";for(let n=e;n<t;n++)r+=s[n][1];return r}var Ut=class{constructor(e){this.input=e,this.root=new Wi,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0}}}atrule(e){let t=new ji;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,i,o=!1,a=!1,l=[],u=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),t.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){a=!0;break}else if(r==="}"){if(l.length>0){for(i=l.length-1,n=l[i];n&&n[0]==="space";)n=l[--i];n&&(t.source.end=this.getPosition(n[3]||n[2]),t.source.end.offset++)}this.end(e);break}else l.push(e);else l.push(e);if(this.tokenizer.endOfFile()){o=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(l),l.length?(t.raws.afterName=this.spacesAndCommentsFromStart(l),this.raw(t,"params",l),o&&(e=l[l.length-1],t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++,this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),a&&(t.nodes=[],this.current=t)}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let i=t-1;i>=0&&(n=e[i],!(n[0]!=="space"&&(r+=1,r===2)));i--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}colon(e){let t=0,r,n,i;for(let[o,a]of e.entries()){if(n=a,i=n[0],i==="("&&(t+=1),i===")"&&(t-=1),t===0&&i===":")if(!r)this.doubleColon(n);else{if(r[0]==="word"&&r[1]==="progid")continue;return o}r=n}return!1}comment(e){let t=new Gi;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++;let r=e[1].slice(2,-2);if(!r.trim())t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}createTokenizer(){this.tokenizer=Ki(this.input)}decl(e,t){let r=new Vi;this.init(r,e[0][2]);let n=e[e.length-1];n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||Hi(e)),r.source.end.offset++;let i=0;for(;e[i][0]!=="word";)i===e.length-1&&this.unknownWord([e[i]]),i++;r.raws.before+=Dt(e,0,i),r.source.start=this.getPosition(e[i][2]);let o=i;for(;i<e.length;){let f=e[i][0];if(f===":"||f==="space"||f==="comment")break;i++}r.prop=Dt(e,o,i);let a=i,l;for(;i<e.length&&(l=e[i],i++,l[0]!==":");)l[0]==="word"&&/\w/.test(l[1])&&this.unknownWord([l]);r.raws.between=Dt(e,a,i),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=i;for(;i<e.length;){let f=e[i][0];if(f!=="space"&&f!=="comment")break;i++}let c=e.slice(u,i);e=e.slice(i),this.precheckMissedSemicolon(e);for(let f=e.length-1;f>=0;f--){if(l=e[f],l[1].toLowerCase()==="!important"){r.important=!0;let p=this.stringFrom(e,f);p=this.spacesFromEnd(e)+p,p!==" !important"&&(r.raws.important=p);break}else if(l[1].toLowerCase()==="important"){let p=e.slice(0),d="";for(let v=f;v>0;v--){let y=p[v][0];if(d.trim().startsWith("!")&&y!=="space")break;d=p.pop()[1]+d}d.trim().startsWith("!")&&(r.important=!0,r.raws.important=d,e=p)}if(l[0]!=="space"&&l[0]!=="comment")break}e.some(f=>f[0]!=="space"&&f[0]!=="comment")&&(r.raws.between+=c.map(f=>f[1]).join(""),c=[]),this.raw(r,"value",c.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}emptyRule(e){let t=new Ln;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="",t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,start:this.getPosition(t)},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}other(e){let t=!1,r=null,n=!1,i=null,o=[],a=e[1].startsWith("--"),l=[],u=e;for(;u;){if(r=u[0],l.push(u),r==="("||r==="[")i||(i=u),o.push(r==="("?")":"]");else if(a&&n&&r==="{")i||(i=u),o.push("}");else if(o.length===0)if(r===";")if(n){this.decl(l,a);return}else break;else if(r==="{"){this.rule(l);return}else if(r==="}"){this.tokenizer.back(l.pop()),t=!0;break}else r===":"&&(n=!0);else r===o[o.length-1]&&(o.pop(),o.length===0&&(i=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),o.length>0&&this.unclosedBracket(i),t&&n){if(!a)for(;l.length&&(u=l[l.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(l.pop());this.decl(l,a)}else this.unknownWord(l)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,n){let i,o,a=r.length,l="",u=!0,c,h;for(let f=0;f<a;f+=1)i=r[f],o=i[0],o==="space"&&f===a-1&&!n?u=!1:o==="comment"?(h=r[f-1]?r[f-1][0]:"empty",c=r[f+1]?r[f+1][0]:"empty",!Rn[h]&&!Rn[c]?l.slice(-1)===","?u=!1:l+=i[1]:u=!1):l+=i[1];if(!u){let f=r.reduce((p,d)=>p+d[1],"");e.raws[t]={raw:f,value:l}}e[t]=l}rule(e){e.pop();let t=new Ln;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}};$n.exports=Ut});var nt=C((ql,In)=>{"use strict";var Qi=H(),Ji=Le(),Yi=Pn();function rt(s,e){let t=new Ji(s,e),r=new Yi(t);try{r.parse()}catch(n){throw process.env.NODE_ENV!=="production"&&n.name==="CssSyntaxError"&&e&&e.from&&(/\.scss$/i.test(e.from)?n.message+=`
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser`:/\.sass/i.test(e.from)?n.message+=`
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser`:/\.less$/i.test(e.from)&&(n.message+=`
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)),n}return r.root}In.exports=rt;rt.default=rt;Qi.registerParse(rt)});var Bt=C((Tl,Nn)=>{"use strict";var Pe=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Nn.exports=Pe;Pe.default=Pe});var st=C((Dl,kn)=>{"use strict";var Xi=Bt(),Ie=class{get content(){return this.css}constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new Xi(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}};kn.exports=Ie;Ie.default=Ie});var Ft=C((Ul,Tn)=>{"use strict";var qn={};Tn.exports=function(e){qn[e]||(qn[e]=!0,typeof console<"u"&&console.warn&&console.warn(e))}});var Gt=C((Bl,Fn)=>{"use strict";var Zi=H(),eo=Ve(),to=Tt(),ro=nt(),Dn=st(),no=ae(),so=ye(),{isClean:z,my:io}=je(),oo=Ft(),lo={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},ao={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},uo={Once:!0,postcssPlugin:!0,prepare:!0},ce=0;function Ne(s){return typeof s=="object"&&typeof s.then=="function"}function Bn(s){let e=!1,t=lo[s.type];return s.type==="decl"?e=s.prop.toLowerCase():s.type==="atrule"&&(e=s.name.toLowerCase()),e&&s.append?[t,t+"-"+e,ce,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:s.append?[t,ce,t+"Exit"]:[t,t+"Exit"]}function Un(s){let e;return s.type==="document"?e=["Document",ce,"DocumentExit"]:s.type==="root"?e=["Root",ce,"RootExit"]:e=Bn(s),{eventIndex:0,events:e,iterator:0,node:s,visitorIndex:0,visitors:[]}}function zt(s){return s[z]=!1,s.nodes&&s.nodes.forEach(e=>zt(e)),s}var jt={},J=class s{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=zt(t);else if(t instanceof s||t instanceof Dn)n=zt(t.root),t.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let i=ro;r.syntax&&(i=r.syntax.parse),r.parser&&(i=r.parser),i.parse&&(i=i.parse);try{n=i(t,r)}catch(o){this.processed=!0,this.error=o}n&&!n[io]&&Zi.rebuild(n)}this.result=new Dn(e,n,r),this.helpers={...jt,postcss:jt,result:this.result},this.plugins=this.processor.plugins.map(i=>typeof i=="object"&&i.prepare?{...i,...i.prepare(this.result)}:i)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{if(t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin)e.plugin=r.postcssPlugin,e.setMessage();else if(r.postcssVersion&&process.env.NODE_ENV!=="production"){let n=r.postcssPlugin,i=r.postcssVersion,o=this.result.processor.version,a=i.split("."),l=o.split(".");(a[0]!==l[0]||parseInt(a[1])>parseInt(l[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+o+", but "+n+" uses "+i+". Perhaps this is the source of the error below.")}}catch(n){console&&console.error&&console.error(n)}return e}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!ao[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!uo[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(Ne(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[z];){e[z]=!0;let t=[Un(e)];for(;t.length>0;){let r=this.visitTick(t);if(Ne(r))try{await r}catch(n){let i=t[t.length-1].node;throw this.handleError(n,i)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(i=>r(i,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return Ne(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=so;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let r=this.result.root.source;if(e.map===void 0&&!(r&&r.input&&r.input.map)){let o="";return t(this.result.root,a=>{o+=a}),this.result.css=o,this.result}let i=new to(t,this.result.root,this.result.opts).generate();return this.result.css=i[0],this.result.map=i[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(Ne(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[z];)e[z]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this.opts||oo("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this.css}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let i;try{i=n(t,this.helpers)}catch(o){throw this.handleError(o,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(Ne(i))throw this.getAsyncError()}}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[o,a]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=o;try{return a(r.toProxy(),this.helpers)}catch(l){throw this.handleError(l,r)}}if(t.iterator!==0){let o=t.iterator,a;for(;a=r.nodes[r.indexes[o]];)if(r.indexes[o]+=1,!a[z]){a[z]=!0,e.push(Un(a));return}t.iterator=0,delete r.indexes[o]}let i=t.events;for(;t.eventIndex<i.length;){let o=i[t.eventIndex];if(t.eventIndex+=1,o===ce){r.nodes&&r.nodes.length&&(r[z]=!0,t.iterator=r.getIterator());return}else if(this.listeners[o]){t.visitors=this.listeners[o];return}}e.pop()}walkSync(e){e[z]=!0;let t=Bn(e);for(let r of t)if(r===ce)e.nodes&&e.each(n=>{n[z]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}warnings(){return this.sync().warnings()}};J.registerPostcss=s=>{jt=s};Fn.exports=J;J.default=J;no.registerLazyResult(J);eo.registerLazyResult(J)});var jn=C((Fl,zn)=>{"use strict";var co=Tt(),fo=nt(),ho=st(),po=ye(),mo=Ft(),ke=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let e,t=fo;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n=po;this.result=new ho(this._processor,void 0,this._opts),this.result.css=t;let i=this;Object.defineProperty(this.result,"root",{get(){return i.root}});let o=new co(n,void 0,this._opts,t);if(o.isMap()){let[a,l]=o.generate();a&&(this.result.css=a),l&&(this.result.map=l)}else o.clearAnnotation(),this.result.css=o.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}sync(){if(this.error)throw this.error;return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this._opts||mo("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this._css}warnings(){return[]}};zn.exports=ke;ke.default=ke});var Vn=C((zl,Gn)=>{"use strict";var go=Ve(),yo=Gt(),wo=jn(),vo=ae(),te=class{constructor(e=[]){this.version="8.5.15",this.plugins=this.normalize(e)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(typeof r=="object"&&(r.parse||r.stringify)){if(process.env.NODE_ENV!=="production")throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}else throw new Error(r+" is not a PostCSS plugin");return t}process(e,t={}){return!this.plugins.length&&!t.parser&&!t.stringifier&&!t.syntax?new wo(this,e,t):new yo(this,e,t)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}};Gn.exports=te;te.default=te;vo.registerProcessor(te);go.registerProcessor(te)});var Zn=C((jl,Xn)=>{"use strict";var Wn=Ge(),Kn=be(),xo=H(),So=ze(),Hn=_e(),Qn=Ve(),bo=bn(),Co=Le(),_o=Gt(),Eo=kt(),Oo=xe(),Ao=nt(),Vt=Vn(),Mo=st(),Jn=ae(),Yn=Ze(),Lo=ye(),Ro=Bt();function O(...s){return s.length===1&&Array.isArray(s[0])&&(s=s[0]),new Vt(s)}O.plugin=function(e,t){let r=!1;function n(...o){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let a=t(...o);return a.postcssPlugin=e,a.postcssVersion=new Vt().version,a}let i;return Object.defineProperty(n,"postcss",{get(){return i||(i=n()),i}}),n.process=function(o,a,l){return O([n(l)]).process(o,a)},n};O.stringify=Lo;O.parse=Ao;O.fromJSON=bo;O.list=Eo;O.comment=s=>new Kn(s);O.atRule=s=>new Wn(s);O.decl=s=>new Hn(s);O.rule=s=>new Yn(s);O.root=s=>new Jn(s);O.document=s=>new Qn(s);O.CssSyntaxError=So;O.Declaration=Hn;O.Container=xo;O.Processor=Vt;O.Document=Qn;O.Comment=Kn;O.Warning=Ro;O.AtRule=Wn;O.Result=Mo;O.Input=Co;O.Rule=Yn;O.Root=Jn;O.Node=Oo;_o.registerPostcss(O);Xn.exports=O;O.default=O});var ms=require("node:fs"),gs=require("node:util");var M=Ls(Zn(),1),Wt=M.default,Gl=M.default.stringify,Vl=M.default.fromJSON,Wl=M.default.plugin,Kl=M.default.parse,Hl=M.default.list,Ql=M.default.document,Jl=M.default.comment,Yl=M.default.atRule,Xl=M.default.rule,Zl=M.default.decl,ea=M.default.root,ta=M.default.CssSyntaxError,ra=M.default.Declaration,na=M.default.Container,sa=M.default.Processor,ia=M.default.Document,oa=M.default.Comment,la=M.default.Warning,aa=M.default.AtRule,ua=M.default.Result,ca=M.default.Input,fa=M.default.Rule,ha=M.default.Root,pa=M.default.Node;function it(s){return s.trim().replace(/\s+/g," ").replace(/\s*([>+~])\s*/g," $1 ").trim()}function Kt(s){let e=[],t=s.replace(/url\((?:[^)"'\\]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)/gi,o=>(e.push(o),"\0"+(e.length-1)+"\0")),r="",n=0;for(;n<t.length;){if(t[n]!=="s"&&t[n]!=="S"){r+=t[n++];continue}let o=t.slice(n).match(/^selector\s*\(/i);if(o){let a=1,l=n+o[0].length,u=null,c=0;for(;l<t.length&&a>0;){let h=t[l];u?h===u&&(u=null):h==='"'||h==="'"?u=h:h==="["?c++:h==="]"?c>0&&c--:c===0&&h==="("?a++:c===0&&h===")"&&a--,l++}e.push(t.slice(n,l)),r+="\0"+(e.length-1)+"\0",n=l}else r+=t[n++]}return t=r,t.trim().replace(/\s*:\s*/g,": ").replace(/\s+/g," ").replace(/\b(not|only)\s*\(/gi,"$1 (").replace(/\)\s*(and|or|not|only)\s*\(/gi,") $1 (").trim().replace(/\s+/g," ").replace(/\x00(\d+)\x00/g,(o,a)=>e[+a])}function Ht(s){return s.trim()}function $o(s){let e=s.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function Qt(s){let e=s.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(t,r,n,i)=>r==="-"?` - 0.${i}`:`${r}${n}0.${i}`),e=e.replace(/([\d%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,t=>$o(t)),e}function Jt(s){let e=it(s);return e=e.replace(/\[([^\]]*)\]/g,(t,r)=>{let n=r.replace(/\s*([~|^$*]?)\s*=\s*/g,"$1=");return n=n.replace(/(['"])(.*?)\1/g,"$2"),"["+n.trim()+"]"}),e}function Po(s){let e={};for(let i of s){let o=i.prop.toLowerCase();(o==="font-family"||o==="font-weight"||o==="font-style")&&(e[o]=Ht(i.value).replace(/['"]/g,""))}let t=(e["font-family"]||"unknown").toLowerCase(),r=(e["font-weight"]||"normal").toLowerCase(),n=(e["font-style"]||"normal").toLowerCase();return`${t}/${r}/${n}`}function Io(s,e){return`@keyframes ${e.trim()}`}var Yt=new Set(["media","supports","container"]);function es(s,e,t){if(!t)return s;let r=new Map;for(let[i,o]of s)r.set(i,o.slice());let n=r.get(e);return n?n.push(t):r.set(e,[t]),r}function qe(s){let e=[];for(let t of Yt){let r=s.get(t);r&&r.length&&e.push(`@${t} ${r.join(" and ")}`)}return e.length?e.join(" and "):"base"}function No(s,e,t,r){let n=s==null?null:t.get(s)??null,i=n!=null;return e?r+1+(i?r-n:0):i?n:r}function Xt(s,e={}){let t=new Map,r=0;function n(f){return t.has(f)||t.set(f,new Map),t.get(f)}function i(f,p){n(f).set(p,r++)}let o=e.semanticSelectors?Jt:it;function a(f,p){for(let d of f.selectors.map(v=>o(v)))i(p,d)}function l(f,p){let d=f.name.toLowerCase();if(Yt.has(d)){let v=es(p,d,Kt(f.params)),y=qe(v);f.each(g=>{g.type==="rule"?a(g,y):g.type==="atrule"&&l(g,v)})}else if(!(d==="font-face"||d==="keyframes"||d==="-webkit-keyframes"||d==="charset"||d==="import"||d==="namespace")){if(f.nodes){let v=qe(p);f.each(y=>{y.type==="rule"?a(y,v):y.type==="atrule"&&l(y,p)})}}}let u=Wt.parse(s,{from:void 0}),c=new Map;u.each(f=>{f.type==="rule"?a(f,"base"):f.type==="atrule"&&l(f,c)});let h=new Map;for(let[f,p]of t)h.set(f,[...p.entries()].sort((d,v)=>d[1]-v[1]).map(d=>d[0]));return h}function fe(s,e={}){let t=new Map;function r(g){return t.has(g)||t.set(g,[]),t.get(g)}let n=[],i=new Set,o=0;function a(g){i.has(g)||(i.add(g),n.push(g))}function l(g,m){return g?`${g}.${m}`:m}function u(g,m,b,_){r(g).push({selector:m,prop:b.prop.toLowerCase(),value:Ht(b.value),important:b.important||!1,layer:_})}let c=e.semanticSelectors?Jt:it;function h(g,m,b){let _=g.selectors.map(S=>c(S));for(let S of _)g.each(x=>{x.type==="decl"&&u(m,S,x,b)})}function f(g,m,b){let _=g.name.toLowerCase();if(Yt.has(_)){let S=es(m,_,Kt(g.params)),x=qe(S);g.each(A=>{A.type==="rule"?h(A,x,b):A.type==="atrule"&&f(A,S,b)})}else if(_==="layer"){let S=g.params.trim();if(g.nodes){let x=S?l(b,S):l(b,`__anon${o++}`);a(x);let A=qe(m);g.each(R=>{R.type==="rule"?h(R,A,x):R.type==="atrule"&&f(R,m,x)})}else for(let x of S.split(",")){let A=x.trim();A&&a(l(b,A))}}else if(_==="font-face"){let S="@font-face",x=[];g.each(R=>{R.type==="decl"&&x.push(R)});let A=Po(x);for(let R of x)u(S,A,R,b)}else if(_==="keyframes"||_==="-webkit-keyframes"){let S=Io(_,g.params);g.each(x=>{if(x.type==="rule"){let A=x.selectors.map(R=>R.trim()).join(", ");x.each(R=>{R.type==="decl"&&u(S,A,R,b)})}})}else if(!(_==="charset"||_==="import"||_==="namespace")){if(g.nodes){let S=qe(m);g.each(x=>{x.type==="rule"?h(x,S,b):x.type==="atrule"&&f(x,m,b)})}}}let p=Wt.parse(s,{from:void 0}),d=new Map;p.each(g=>{g.type==="rule"?h(g,"base",null):g.type==="atrule"&&f(g,d,null)});let v=new Map;n.forEach((g,m)=>v.set(g,m));let y=n.length;for(let g of t.values())for(let m of g)m.layerRank=No(m.layer,m.important,v,y),delete m.layer;return t}function he(s){let e=new Map;for(let[t,r]of s){e.has(t)||e.set(t,new Map);let n=e.get(t),i=new Map;for(let{selector:o,prop:a,value:l,important:u,layerRank:c}of r){let h=c??(u?1:0);n.has(o)||(n.set(o,new Map),i.set(o,new Map));let f=n.get(o),p=i.get(o),d=p.get(a);(d===void 0||h>=d)&&(f.set(a,{value:l,important:u}),p.set(a,h))}}return e}function ts(s,e,t={}){let r=new Map,n=new Set([...s.keys(),...e.keys()]),i=["base",...[...n].filter(o=>o!=="base").sort()];for(let o of i){if(!n.has(o))continue;let a=s.get(o)||new Map,l=e.get(o)||new Map,u=new Set([...a.keys(),...l.keys()]),c=new Map,h=0;for(let p of[...u].sort()){let d=a.get(p)||new Map,v=l.get(p)||new Map,y=new Set([...d.keys(),...v.keys()]),g=new Map,m=0;for(let _ of[...y].sort()){let S=d.get(_),x=v.get(_),A;!S&&x?(A={status:"added",newValue:x.value,newImportant:x.important},m++):S&&!x?(A={status:"removed",oldValue:S.value,oldImportant:S.important},m++):(t.ignoreCosmetic?Qt(S.value)!==Qt(x.value):S.value!==x.value)||S.important!==x.important?(A={status:"changed",oldValue:S.value,oldImportant:S.important,newValue:x.value,newImportant:x.important},m++):A={status:"unchanged",value:x.value,important:x.important},g.set(_,A)}let b;a.has(p)?l.has(p)?m>0?b="changed":b="unchanged":b="removed":b="added",c.set(p,{status:b,changeCount:m,props:g}),h+=m}let f;s.has(o)?e.has(o)?h>0?f="changed":f="unchanged":f="removed":f="added",r.set(o,{status:f,changeCount:h,selectors:c})}return r}function Zt([s,e,t],[r,n,i]){return s>r||s===r&&e>n||s===r&&e===n&&t>i}function ns(s,e){return Zt(s,e)?1:Zt(e,s)?-1:0}function ko(s){let e=[],t=0,r=0,n=0,i=null;for(let a=0;a<s.length;a++){let l=s[a];i?l===i&&(i=null):l==='"'||l==="'"?i=l:l==="("?t++:l===")"?t>0&&t--:l==="["?r++:l==="]"?r>0&&r--:l===","&&t===0&&r===0&&(e.push(s.slice(n,a).trim()),n=a+1)}let o=s.slice(n).trim();return o&&e.push(o),e}function qo(s,e){let t=1,r=0,n=e,i=null;for(;n<s.length&&t>0;){let o=s[n];i?o===i&&(i=null):o==='"'||o==="'"?i=o:o==="["?r++:o==="]"?r>0&&r--:r===0&&o==="("?t++:r===0&&o===")"&&t--,n++}return t===0?n:null}function rs(s,e,t){let r=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");r.lastIndex=0;let n="",i=0,o;for(;(o=r.exec(s))!==null;){let a=o.index+o[0].length,l=qo(s,a);if(n+=s.slice(i,o.index),l===null){n+=s.slice(a),i=s.length;break}t(s,a,l,o),i=l,r.lastIndex=i}return n+s.slice(i)}function pe(s,e=0){if(e>100)return[0,0,0];let t=0,r=0,n=0,i=s.replace(/\\./g,"x"),o=l=>{let u=[0,0,0];for(let c of ko(l)){let h=pe(c,e+1);Zt(h,u)&&(u=h)}t+=u[0],r+=u[1],n+=u[2]};i=rs(i,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(l,u,c,h)=>{let f=h.groups.name.toLowerCase(),p=l.slice(u,c-1).trim();if(f==="nth-child"||f==="nth-last-child"){let d=p.match(/\sof\b/i);d&&o(p.slice(d.index+d[0].length).trim()),r++}else f==="where"||(o(p),(f==="host"||f==="host-context")&&r++)}),i=rs(i,/::(?:slotted|cue)\s*\(/gi,(l,u,c)=>{o(l.slice(u,c-1).trim()),n++}),i=i.replace(/::[\w-]+(\([^)]*\))?/g,()=>(n++,"")),i=i.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(n++,"")),i=i.replace(/\[[^\]]*\]/g,()=>(r++,"")),i=i.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(r++,"")),i=i.replace(/#[\w-]+/g,()=>(t++,"")),i=i.replace(/\.[\w-]+/g,()=>(r++,"")),i=i.replace(/\|\|/g," ").replace(/[>+~]/g," "),i=i.replace(/(?:[\w-]+|\*)?\|/g,"");let a=i.split(/\s+/).filter(l=>l&&l!=="*"&&/^[a-zA-Z][\w-]*/.test(l));return n+=a.length,[t,r,n]}function ss(s,e){let[t,r,n]=pe(s),[i,o,a]=pe(e);return t===i&&r===o&&n===a}function To(s,e){let t=new Set(s),r=new Set(e),n=s.filter(c=>r.has(c)),i=e.filter(c=>t.has(c)),o=new Map;for(let c=0;c<n.length;c++)o.set(n[c],i[c]);let a=[],l=0,u=new Set;for(let c of s){if(!r.has(c)){a.push({type:"deleted",oldSelector:c,newSelector:null});continue}let h=o.get(c);for(;l<e.length&&!t.has(e[l]);)a.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;if(c===h)a.push({type:"equal",oldSelector:c,newSelector:h});else{let f=[c,h].sort().join("\0");u.has(f)||(u.add(f),a.push({type:"moved",oldSelector:c,newSelector:h}))}l++}for(;l<e.length;)t.has(e[l])||a.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;return a}function er(s,e,t,r,n,i,o){return!t&&!r?null:t?r?t.important!==r.important?t.important?s:e:n!==0?n>0?s:e:i>o?s:e:s:e}function Do(s,e,t,r,n){let i=s.oldSelector,o=s.newSelector;s.sameSpecificity=ss(i,o),s.conflictingProps=[],s.hasOverlappingProps=!1;let a=e.indexOf(i),l=e.indexOf(o),u=t.indexOf(i),c=t.indexOf(o);if(a<0||l<0||u<0||c<0)return;let h=a<l,f=u<c;if(h===f)return;let p=ns(pe(i),pe(o)),d=r.get(i)||new Map,v=r.get(o)||new Map,y=n.get(i)||new Map,g=n.get(o)||new Map;for(let[m,b]of y){let _=g.get(m);if(!_||(s.hasOverlappingProps=!0,b.value===_.value&&b.important===_.important))continue;let S=er(i,o,d.get(m),v.get(m),p,a,l),x=er(i,o,b,_,p,u,c);if(!x)continue;if(!S){let F=er(i,o,b,_,p,a,l);if(!F||F===x)continue;let Y=n.get(F)?.get(m),W=n.get(x)?.get(m);if(!Y||!W||Y.value===W.value&&Y.important===W.important)continue;s.conflictingProps.push({prop:m,oldEffective:null,newEffective:{value:W.value,important:W.important}});continue}let A=r.get(S)?.get(m),R=n.get(x)?.get(m);!A||!R||A.value===R.value&&A.important===R.important||s.conflictingProps.push({prop:m,oldEffective:{value:A.value,important:A.important},newEffective:{value:R.value,important:R.important}})}}function is(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=Xt(s,r),i=Xt(e,r),o=he(fe(s,r)),a=he(fe(e,r)),l=new Set([...n.keys(),...i.keys()]),u=["base",...[...l].filter(h=>h!=="base").sort()],c=[];for(let h of u){if(!l.has(h))continue;let f=n.get(h)||[],p=i.get(h)||[],d=To(f,p),v=o.get(h)||new Map,y=a.get(h)||new Map;for(let m of d)m.type==="moved"&&Do(m,f,p,v,y);let g=d.some(m=>m.type==="moved"&&m.hasOverlappingProps);d.some(m=>m.type!=="equal")&&c.push({contextKey:h,rows:d,hasWarning:g})}return c}var us=require("node:fs"),cs=require("node:url");function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function os(s,e){let{status:t}=e;function r(n){return n?' <span class="important">!important</span>':""}return t==="added"?`
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
    </div>`}function Uo(s,e){let{props:t}=e,r=[],n=[];for(let[o,a]of t){let l=E(o);if(a.status==="unchanged"){let u=E(a.value)+(a.important?" !important":"");r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="added"){r.push('<div class="detail-line detail-line--empty"></div>');let u=E(a.newValue)+(a.newImportant?" !important":"");n.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="removed"){let u=E(a.oldValue)+(a.oldImportant?" !important":"");r.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push('<div class="detail-line detail-line--empty"></div>')}else{let u=E(a.oldValue)+(a.oldImportant?" !important":""),c=E(a.newValue)+(a.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${c}</span>;</div>`)}}let i=E(s);return`
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">\u65E7</div>
        <pre class="detail-block"><code>${i} {
${r.join(`
`)}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">\u65B0</div>
        <pre class="detail-block"><code>${i} {
${n.join(`
`)}}</code></pre>
      </div>
    </div>`}function Bo(s,e,{highlightHtml:t,showUnchanged:r=!1,contextKey:n="",expanded:i=!1}={}){let{status:o,changeCount:a,props:l}=e,u=t||E(s),c={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[o],h={added:`+${[...l.values()].filter(m=>m.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...l.values()].filter(m=>m.status==="removed").length} \u524A\u9664`,changed:(()=>{let m=[...l.values()].filter(x=>x.status==="added").length,b=[...l.values()].filter(x=>x.status==="removed").length,_=[...l.values()].filter(x=>x.status==="changed").length,S=[];return m&&S.push(`+${m}`),b&&S.push(`\u2212${b}`),_&&S.push(`~${_}`),S.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[o],f=[...l.entries()].filter(([,m])=>m.status!=="unchanged"),p=[...l.entries()].filter(([,m])=>m.status==="unchanged"),d=[...f.map(([m,b])=>os(m,b)),...r?p.map(([m,b])=>os(m,b)):[]].join(""),v=p.length>0&&!r?`<button class="unchanged-toggle" data-selector="${E(s)}">
           \u5909\u66F4\u306A\u3057 ${p.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",y=i?Uo(s,e):"",g=i?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${o}" data-selector="${E(s)}" data-context="${E(n)}"${g}>
      <div class="selector-header" role="button" tabindex="0" title="\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u65E7\u306E\u5168\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A">
        <code class="selector-name">${u}</code>
        <span class="selector-badge ${c}">${h}</span>
        <span class="selector-expand-icon">${i?"\u25B2":"\u25BC"}</span>
      </div>
      <div class="props-list">
        ${d||'<div class="no-props">\u30D7\u30ED\u30D1\u30C6\u30A3\u306A\u3057</div>'}
        ${v}
      </div>
      ${y}
    </div>`}function Fo(s,e,t,{showUnchanged:r=!1,expandedSelectors:n=new Set}={}){let{status:i,changeCount:o}=e,l=s==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(s),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[i],c=o>0?`<span class="context-badge ${u}">${o} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',h=t?t.map(({selector:p,positions:d})=>({selector:p,positions:d,selDiff:e.selectors.get(p)})).filter(p=>p.selDiff):[...e.selectors.entries()].map(([p,d])=>({selector:p,positions:new Set,selDiff:d}));if(h.length===0)return"";let f=h.map(({selector:p,positions:d,selDiff:v})=>Bo(p,v,{highlightHtml:d.size>0?zo(p,d):null,showUnchanged:r,contextKey:s,expanded:n.has(`${s}||${p}`)})).join("");return`
    <section class="context-section context-section--${i}">
      <div class="context-header">
        <span class="context-label">${l}</span>
        ${c}
      </div>
      <div class="context-selectors">
        ${f}
      </div>
    </section>`}function zo(s,e){return[...s].map((t,r)=>{let n=E(t);return e.has(r)?`<mark class="fzf-match">${n}</mark>`:n}).join("")}function jo(s){let e=E(s.prop),t=s.oldEffective?E(s.oldEffective.value)+(s.oldEffective.important?" !important":""):'<span class="or-prop-absent">\u65E7 CSS \u672A\u5BA3\u8A00</span>',r=s.newEffective?E(s.newEffective.value)+(s.newEffective.important?" !important":""):'<span class="or-prop-absent">\u65B0 CSS \u672A\u5BA3\u8A00</span>';return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${t}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${r}</span></span>`}function Go(s){let e=E(s.oldSelector),t=E(s.newSelector),r=s.conflictingProps&&s.conflictingProps.length>0,n=s.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',i=r?`<div class="or-conflicts">${s.conflictingProps.map(jo).join("")}</div>`:"";return`<tr class="${r?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${t}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${n}
      ${i}
    </td>
  </tr>`}function Vo(s){return s.type==="equal"?`<tr class="or-row or-row--equal">
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
    </tr>`:""}function Wo(s,e=!1){let{contextKey:t,rows:r,hasWarning:n}=s,i=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":E(t),o=r.filter(h=>h.type==="moved").length,a=r.filter(h=>h.type==="moved"&&h.hasOverlappingProps).length,l=o===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':n?`<span class="or-ctx-badge or-ctx-badge--warning">${o} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${o} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,u=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,c=r.map(h=>h.type==="moved"?Go(h):Vo(h)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${E(t)}" aria-expanded="${e}" role="button" tabindex="0">
      ${u}
      <span class="or-context-label">${i}</span>
      ${l}
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
        <tbody>${c}</tbody>
      </table>
    </div>
  </div>`}function ls(s,{activeContext:e="all",filterOrderRisk:t=!1,expandedContexts:r=new Set}={}){if(!s||s.length===0)return"";let n=s.filter(u=>u.hasWarning).length,i=t?s.filter(u=>u.hasWarning):s,o=e==="all"?i:i.filter(u=>u.contextKey===e);if(o.length===0)return"";let a=o.reduce((u,c)=>u+c.rows.filter(h=>h.type==="moved").length,0);if(a===0)return"";let l=o.map(u=>Wo(u,r.has(u.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${n>0?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${a} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${a} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${l}
  </section>`}function as(s,e,{activeContext:t="all",showUnchanged:r=!1,expandedSelectors:n=new Set}={}){if(!s||s.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let i=null;if(e!==null){i=new Map;for(let a of e)i.has(a.contextKey)||i.set(a.contextKey,[]),i.get(a.contextKey).push({selector:a.selector,positions:a.positions||new Set})}let o="";for(let[a,l]of s){if(t!=="all"&&a!==t)continue;let u=i?i.get(a)||[]:null;i&&u.length===0||(o+=Fo(a,l,u,{showUnchanged:r,expandedSelectors:n}))}return o||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var Jo={};function Ko(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`}var Ho=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,Qo=`
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
`;function fs(s,e){let t=Ko(),r=[],n=new Set;for(let[u,c]of s)for(let[h,f]of c.selectors)f.status!=="unchanged"&&(r.push({contextKey:u,selector:h,positions:new Set}),n.add(`${u}||${h}`));let i=r.length>0,o=e&&e.length>0,a=e?new Set(e.map(u=>u.contextKey)):new Set,l="";return i&&(l+=`<div class="diff-section">${as(s,r,{expandedSelectors:n})}</div>`),o&&(l+=ls(e,{expandedContexts:a})),!i&&!o&&(l='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${t}</style>
  <style>${Ho}</style>
</head>
<body>
  <div id="app">${l}</div>
  ${Qo}
</body>
</html>`}var ys=`Usage: css-cascade <old.css> <new.css> [options]

Arguments:
  old.css    \u6BD4\u8F03\u5143 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9
  new.css    \u6BD4\u8F03\u5148 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9

Options:
  --format <text|json|html>               \u51FA\u529B\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8 (default: text)
  --filter <changed|added|removed|unchanged|all>
                                          \u30B9\u30C6\u30FC\u30BF\u30B9\u3067\u7D5E\u308A\u8FBC\u307F (default: changed)
  --order-risk                            \u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --ignore-cosmetic                       \u8868\u8A18\u63FA\u308C\u3092\u7121\u8996
  --semantic-selectors                    \u5C5E\u6027\u30BB\u30EC\u30AF\u30BF\u306E\u30AF\u30A9\u30FC\u30C8\u6709\u7121\u3092\u540C\u4E00\u8996
  --no-color                              ANSI \u30AB\u30E9\u30FC\u3092\u7121\u52B9\u5316
  -v, --version                           \u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8868\u793A
  -h, --help                              \u30D8\u30EB\u30D7\u3092\u8868\u793A

Exit codes:
  0  \u5DEE\u5206\u306A\u3057\u30FB\u9806\u5E8F\u5909\u66F4\u306A\u3057
  1  \u5DEE\u5206\u3042\u308A\u3001\u307E\u305F\u306F --order-risk \u6307\u5B9A\u6642\u306B\u9806\u5E8F\u5909\u66F4\u3042\u308A\uFF08\u30D7\u30ED\u30D1\u30C6\u30A3\u5DEE\u5206\u30BC\u30ED\u3067\u3082 exit 1\uFF09
  2  \u30A8\u30E9\u30FC`,ws;try{ws=(0,gs.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(s){console.error(`Error: ${s.message}`),process.exit(2)}var{values:N,positionals:vs}=ws;N.version&&(console.log("1.0.1"),process.exit(0));N.help&&(console.log(ys),process.exit(0));vs.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error(ys),process.exit(2));var Yo=new Set(["text","json","html"]);Yo.has(N.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var Xo=new Set(["changed","added","removed","unchanged","all"]);Xo.has(N.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function xs(s){try{return(0,ms.readFileSync)(s,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${s}": ${e.message}`),process.exit(2)}}var[Zo,el]=vs,hs=xs(Zo),ps=xs(el),Te,de=[];try{let s={semanticSelectors:N["semantic-selectors"]};Te=ts(he(fe(hs,s)),he(fe(ps,s)),{ignoreCosmetic:N["ignore-cosmetic"]}),N["order-risk"]&&(de=is(hs,ps,{semanticSelectors:N["semantic-selectors"]}))}catch(s){console.error(`Parse error: ${s.message}`),process.exit(2)}function ds(s,e){return e==="all"?!0:e==="changed"?s!=="unchanged":s===e}function tl(s){let e=0,t=0,r=0,n=0;for(let[,i]of s)for(let[,o]of i.selectors)for(let[,a]of o.props)a.status==="changed"?e++:a.status==="added"?t++:a.status==="removed"?r++:n++;return{changed:e,added:t,removed:r,unchanged:n}}var D=tl(Te),Ss=D.changed>0||D.added>0||D.removed>0,bs=N["order-risk"]&&de.some(s=>s.hasWarning),ot=N.filter;if(N.format==="html"){let s=fs(Te,N["order-risk"]?de:null);process.stdout.write(s),process.exit(Ss||bs?1:0)}if(N.format==="json"){let s=[];for(let[t,r]of Te){let n=[];for(let[i,o]of r.selectors){let a=[];for(let[l,u]of o.props)ds(u.status,ot)&&a.push({prop:l,...u});a.length>0&&n.push({selector:i,status:o.status,changeCount:o.changeCount,props:a})}n.length>0&&s.push({key:t,status:r.status,changeCount:r.changeCount,selectors:n})}let e={version:1,summary:D,contexts:s};N["order-risk"]&&(e.orderRisks=de),console.log(JSON.stringify(e,null,2))}else{let s=!N["no-color"]&&!!process.stdout.isTTY,e={reset:s?"\x1B[0m":"",yellow:s?"\x1B[33m":"",green:s?"\x1B[32m":"",red:s?"\x1B[31m":"",cyan:s?"\x1B[36m":"",dim:s?"\x1B[2m":""};for(let[r,n]of Te){let i=[];for(let[o,a]of n.selectors){let l=[];for(let[u,c]of a.props)ds(c.status,ot)&&(c.status==="changed"?l.push(`    ${e.yellow}~${e.reset} ${u}: ${c.oldValue} \u2192 ${c.newValue}`):c.status==="added"?l.push(`    ${e.green}+${e.reset} ${u}: ${c.newValue}`):c.status==="removed"?l.push(`    ${e.red}-${e.reset} ${u}: ${c.oldValue}`):l.push(`      ${u}: ${c.value}`));l.length>0&&(i.push(`  ${e.dim}${o}${e.reset}`),i.push(...l))}i.length>0&&(console.log(`
${e.cyan}[${r}]${e.reset}`),i.forEach(o=>console.log(o)))}let t=[];if(D.changed&&t.push(`${e.yellow}${D.changed} changed${e.reset}`),D.added&&t.push(`${e.green}${D.added} added${e.reset}`),D.removed&&t.push(`${e.red}${D.removed} removed${e.reset}`),(ot==="all"||ot==="unchanged")&&D.unchanged&&t.push(`${D.unchanged} unchanged`),console.log(`
Summary: ${t.length?t.join(", "):"no differences"}`),N["order-risk"]&&de.length>0){console.log(`
Order Risks:`);for(let{contextKey:r,rows:n}of de){let i=n.filter(l=>l.type!=="equal");if(i.length===0)continue;let o=Math.max(6,...i.map(l=>(l.oldSelector??"-").length)),a=Math.max(6,...i.map(l=>(l.newSelector??"-").length));console.log(`
${e.cyan}[${r}]${e.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(o)}  ${"\u65B0 CSS".padEnd(a)}  \u72B6\u614B`),console.log(`  ${"-".repeat(o)}  ${"-".repeat(a)}  ------`);for(let l of i){let u=(l.oldSelector??"-").padEnd(o),c=(l.newSelector??"-").padEnd(a);if(l.type==="moved"){let h=l.sameSpecificity?` ${e.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${e.reset}`:"";if(console.log(`  ${u}  ${c}  ${e.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${e.reset}${h}`),l.conflictingProps&&l.conflictingProps.length>0)for(let f of l.conflictingProps){let p=d=>d.important?" !important":"";console.log(`    ${e.dim}${f.prop}: ${f.oldEffective.value}${p(f.oldEffective)} \u2192 ${f.newEffective.value}${p(f.newEffective)}${e.reset}`)}}else l.type==="deleted"?console.log(`  ${u}  ${"-".padEnd(a)}  ${e.red}- \u524A\u9664${e.reset}`):l.type==="added"&&console.log(`  ${"-".padEnd(o)}  ${c}  ${e.green}+ \u8FFD\u52A0${e.reset}`)}}}}process.exit(Ss||bs?1:0);
