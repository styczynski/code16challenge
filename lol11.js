t=x=>~~x,n=Math.random,e=[],r=[],T=-75,c=-20,f=255,s=25,l=t=>Math.pow(Math.abs(t),1.5),u=Math.sin;let h=[[[46,139,87],[46,139,87]],[[238,59,59],[232,232,232]],
[[f,236,139],[238,59,59]],[[152,245,f],[51,161,201]],[[65,105,225],[152,245,f]]],a=t=>{for(let o=0;o<=1e4;++o)t(o%100,~~(o/100))},p=function(t,o,n,e,r){let c=document.getElementById(
t+"x"+o);c&&(c.style.backgroundColor=`rgb(${n},${e},${r})`)},q=(t,o,n)=>(()=>{let e=[];for(qor of n){let n=t+~~qor[0],r=o+~~qor[1];e.push(p(n,r,qor[2][0],qor[2][1],qor[2][2]))}
return e})(),y=function(){O='<div id="view" style="width:800px;height:200px">',a((t,o)=>O+=`<div id="${t}x${o}"style="width:10px;height:10px;position:absolute;left:${10*t-10}px;
top:${10*o-10}px;"></div>`),document.write(O+"</div>")},d=function(o){let r=~~(n()*h.length);r+=h.length;let Z=h[r%=h.length][0],f=h[r][1],i={x:~~(o+2*n()),y:~~(4*n()),d:2,c:0,w(){
let o=this;return 0===o.c?n()>.5&&(n()>.4?o.c=t(1*n()+1):o.c=-1):n()>.7&&(o.c=0),o.y>4&&o.c>0&&(o.c=0),o.y<-1&&o.c<0&&o.c,o.o},o:[[2,5,[139,76,57]],[2,3,Z],[1,2,f],[2,2,f],[3,2,f],
[1,1,Z],[2,1,Z],[3,1,Z],[2,0,f]]};return e.push(i)},x=t=>{let o={x:~~(t+2*n()),y:~~(4*n()),d:3,f:0,q:~~(50*-n()-T),w(){t=this;s=t.q;X=[s,s,s];switch(t.f){case 0:return t.f=1,[[1,0,X]];
case 1:return t.f=0,[[0,2,X],[1,1,X],[0,0,X]]}}};return e.push(o)},g=function(o){G={x:~~(o+2*n()),y:~~(4*n()),d:1};let c=0;let i=~~(6*n());let s=i,l=0;
let u=[];for(;s>0;){if(c>3){s=0;break}for(let o=0,n=s,e=0<=n;e?o<=n:o>=n;e?o++:o--){let n=i-c,e=o+l,r=t(n*e*.9);B=f-r,u.push([e,n,[B,B,B]])}c++;V=n();let e=0;V>.95&&(e=3),V>.8
&&(e=2),V>.1&&(e=1);let r=0;for(;r<e;)n()>.5?s--:(l++,s--),r++}return G.o=u,e.push(G)},w=()=>{if(n()>.97&&d(-10),n()>.99){for(let t=0,o=1+~~(3*n())-1,e=0<=o;e?t<=o:t>=o;e?t++:t--)
x(5*t-10)}a((t,o)=>(function(t,o){let e=30,r=144,c=f;let i=1-(t+o+4*u(o*o))/200;return e-=T*i+5*n(),r-=T*i+5*n(),c-=T*i+5*n(),p(t,o,e,r,c)})(t,o)),function(){let
e,r,i,s,l,u,h;let a=[];for(e=c,s=20,i=!0;e<=20;e++)for(r=c;r<=20;r++)if(e*e+r*r<=10){let c=t(7*(e+r));Math.abs(t(e*e+r*r-10))<2&&n()>.2&&(c*=-.5),a.push([e,r,
[f-c,193-c,37-c]])}for(h=-21,e=-21,u=21,l=!0;e<=21;e++)for(r=-21;r<=21;r++)e*e+r*r<=30&&!(e*e+r*r<=10)&&n()>.6&&a.push([e,r,[99,184,f]]);q(20,5,a)}(),function(){let t=[];for(let o=0,
e=100,i=0<=e;i?o<=e:o>=e;i?o++:o--){let e=r[o];for(let r=e,i=110,h=e<=i;h?r<=i:r>=i;h?r++:r--){let e=2*(r-s+7)+4*n()+10*u(o/10)-.7*(100-Math.min(l(o+c)+2*l(r-s),100));e/=1,
t.push([o,r,[152-e,f-e,152-e]])}}q(0,0,t)}();for(let t of Array.from(e))null!=t.w&&(t.o=t.w(t)),q(t.x,t.y,t.o),t.x+=t.d,t.a=0,t.b=t.d,null!=t.c?(t.y+=t.c,t.a=t.c):n()>.8&&t.y<=3&&t.y>=0
?n()>.5?(++t.y,t.a=1):(--t.y,t.a=-1):t.y>=3?(--t.y,t.a=-1):(++t.y,t.a=1);let i=e.length-1,h=0;for(;i>=0;)e[i].x>100&&(e.splice(i,1),++h),--i;if(h>0)for(j=0;j<h;++j)g(c+10*j*n())};y(),function()
{r=[s,26,27];for(let o=0,e=100,c=0<=e;c?o<=e:o>=e;c?o++:o--){var t;let o=r.length;n()>.8?(t=(t=s+3*n())+r[o-1]+r[o-2]+r[o-3],t/=4):t=n()>.8?s+r[o-1]-r[o-2]:r[o-1],r.push(t)}r.shift(),r.shift()
,r.shift()}(),function(){for(e=[],i=0;i<14;++i)g(c+10*i*n())}(),y(),setInterval(()=>w(),180),d(-5)