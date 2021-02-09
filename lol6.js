(function(){
let dd=Math.ceil;
let du=Math.floor;
let ra=Math.random;
let movobjects = [];
let groundHMap = [];
let A=-20;
let B=255;
let C=25;
let sw=x=>Math.pow(Math.abs(x),1.5);
let er=Math.sin;
const baloonColors = [
  [[46, 139, 87], [46, 139, 87]],
  [[238, 59, 59], [232, 232, 232]],
  [[B, 236, 139], [238, 59, 59]],
  [[152, 245, B], [51, 161, 201]],
  [[65, 105, 225], [152, 245, B]]
];

const eachGridBlock=fn=>{for(let i=0;i<=10000;++i)fn(i%100,~~(i/100))};

const qorGridBlock = function(x, y, r, g, b) {
  let e=document.getElementById(x+"x"+y);
  if(e)e.style.backgroundColor=`rgb(${r},${g},${b})`;
};

const qorGridBlockDefault = function(x, y) {
  const randomSpread = 5;
  let r = 30;
  let g = 144;
  let b = B;
  const rSpread = 150;
  const gSpread = 150;
  const bSpread = 150;
  const fi = 1-((x+y+(er(y*y)*4))/(100+100));
  r -= ((rSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  g -= ((gSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  b -= ((bSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  return qorGridBlock(x, y, r, g, b);
};

const qorGridBlockShape = (x, y, shape) => (() => {
  const result = [];
  for (qor of shape) {
    const nx = x + ~~qor[0];
    const ny = y + ~~qor[1];
    result.push(qorGridBlock(nx, ny, qor[2][0], qor[2][1], qor[2][2]));
  }
  return result;
})();

const setupGrid = function() {
  txt="<div id=\"view\" style=\"width:800px;height:200px\">";
  eachGridBlock((x, y) => txt+=`<div id=\"${x}x${y}\"style="width:10px;height:10px;position:absolute;left:${-10+(x*10)}px;top:${-10 + (y*10)}px;"></div>`);
  document.write(txt+"</div>");
};

const addNewBaloon = function(minx) {
  let qorIndex = ~~(ra() * baloonColors.length);
  qorIndex += baloonColors.length;
  qorIndex %= baloonColors.length;
  const layerAColor = baloonColors[qorIndex][0];
  const layerBColor = baloonColors[qorIndex][1];
  const baloon = {
    x: ~~(minx+(ra()*2)),
    y: ~~(ra()*4),
    d: 2,
    c: 0,
    w() {
      const t=this;
      if (t.c === 0) {
        if (ra() > 0.5) {
          if (ra() > 0.4) {
            t.c = dd((ra()*1)+1);
          } else {
            t.c = -1;
          }
        }
      } else {
        if (ra() > 0.7) {
          t.c = 0;
        }
      }
      if ((t.y > 4) && (t.c > 0)) {
        t.c = 0;
      }
      if ((t.y < -1) && (t.c < 0)) {
        t.c;
      }
      return t.o;
    },
    o: [
      [2,5,[139,76,57]],
      [2,3,layerAColor],
      [1,2,layerBColor],
      [2,2,layerBColor],
      [3,2,layerBColor],
      [1,1,layerAColor],
      [2,1,layerAColor],
      [3,1,layerAColor],
      [2,0,layerBColor],
    ]
  };
  return movobjects.push(baloon);
};

const addNewBird = function(minx) {
  const bird = {
    x: ~~(minx+(ra()*2)),
    y: ~~(ra()*4),
    d: 3,
    f: 0,
    q: ~~((-ra()*50) + 73),
    w() {
      const t=this;
      switch (t.f) {
        case 0:
          t.f = 1;
          return [
            [1,0,[t.q, t.q, t.q]],
          ];
        case 1:
          t.f = 0;
          return [
            [0,2,[t.q, t.q, t.q]],
            [1,1,[t.q, t.q, t.q]],
            [0,0,[t.q, t.q, t.q]]
        ];
      }
    }
  };
  return movobjects.push(bird);
};

const addNewCloud = function(minx) {
  const cloud = {
    x: ~~(minx+(ra()*2)),
    y: ~~(ra()*4),
    d: 1
  };
  let lev = 0;
  const basewidth = ~~(ra()*6);
  let levwidth = basewidth;
  let levoffset = 0;
  const shape = [];
  while (levwidth > 0) {
    if (lev > 3) {
      levwidth = 0;
      break;
    }
    for (let i = 0, end = levwidth, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
      const x = basewidth-lev;
      const y = i+levoffset;
      const fi = dd(x*y*0.9);
      shape.push([y,x,[B-fi, B-fi, B-fi]]);
    }
    lev++;
    const levchangef = ra();
    let levchange = 0;
    if (levchangef > 0.95) { levchange = 3; }
    if (levchangef > 0.8) { levchange = 2; }
    if (levchangef > 0.1) { levchange = 1; }
    let levchangeUsed = 0;
    while (levchangeUsed < levchange) {
      if (ra() > 0.5) {
        levwidth--;
      } else {
        levoffset++;
        levwidth--;
      }
      levchangeUsed++;
    }
  }

  cloud.o = shape;
  return movobjects.push(cloud);
};

const initMovObjects = function() {
  movobjects = [];
  for(i=0;i<14;++i)addNewCloud( A+(i*10*ra()) );
};

const setupGround = function() {
  groundHMap = [C, C+1, C+2];
  for (let x = 0, end = 100, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
    var groundH;
    const groundHMapLen = groundHMap.length;
    if (ra() > 0.8) {
      groundH = C + (ra() * 3);
      groundH = groundH + groundHMap[groundHMapLen-1] + groundHMap[groundHMapLen-2] + groundHMap[groundHMapLen-3];
      groundH /= 4;
    } else if (ra() > 0.8) {
      groundH = (C + groundHMap[groundHMapLen-1]) - groundHMap[groundHMapLen-2];
    } else {
      groundH = groundHMap[groundHMapLen-1];
    }
    groundHMap.push(groundH);
  }
  groundHMap.shift();
  groundHMap.shift();
  return groundHMap.shift();
};

const drawGround = function() {
  const shape = [];
  for (let x = 0, end = 100, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
    const groundH = groundHMap[x];
    for (let y = groundH, end1 = 100+10, asc1 = groundH <= end1; asc1 ? y <= end1 : y >= end1; asc1 ? y++ : y--) {
      let fi = ((((y-C)+7)*2) + (ra()*4) + (er(x/10)*10)) - ((100-Math.min(sw(x+A)+(2*sw(y-C)), 100))*0.7);
      fi /= 1;
      shape.push([x, y, [152-fi,	B-fi,	152-fi]]);
    }
  }
  return qorGridBlockShape(0, 0, shape);
};

const drawSun = function() {
  let x, y;
  let asc, end;
  let asc2, end2, start;
  const shape = [];
  for (x = A, end = 20, asc = A <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
    var asc1, end1;
    for (y = A, end1 = 20, asc1 = A <= end1; asc1 ? y <= end1 : y >= end1; asc1 ? y++ : y--) {
      if (((x*x) + (y*y)) <= (20/2)) {
        let fi = dd((x+y)*7);
        if (Math.abs(du(((x*x) + (y*y)) - (20/2))) < 2) {
          if (ra() > 0.2) {
            fi*=-0.5;
          }
        }
        shape.push([x,y,[B-fi, 193-fi, 37-fi]]);
      }
    }
  }
  for (start = A-1, x = start, end2 = 20+1, asc2 = start <= end2; asc2 ? x <= end2 : x >= end2; asc2 ? x++ : x--) {
    var asc3, end3, start1;
    for (start1 = A-1, y = start1, end3 = 20+1, asc3 = start1 <= end3; asc3 ? y <= end3 : y >= end3; asc3 ? y++ : y--) {
      if ((((x*x) + (y*y)) <= (60/2)) && ( !(((x*x) + (y*y)) <= (20/2)) )) {
        if (ra() > 0.6) { shape.push([x,y,[99,184,B]]); }
      }
    }
  }
  return qorGridBlockShape(20, 5, shape);
};


const drawingLoop = function() {
  if (ra() > 0.97) {
    addNewBaloon( -10 );
  }
  if (ra() > 0.99) {
    const birdCount = ~~(ra()*3)+1;
    for (let k = 0, end = birdCount-1, asc = 0 <= end; asc ? k <= end : k >= end; asc ? k++ : k--) {
      addNewBird( -10 + (k*5) );
    }
  }
  eachGridBlock((x, y) => qorGridBlockDefault(x, y));
  drawSun();
  drawGround();
  for (let movobject of Array.from(movobjects)) {
    if (movobject.w != null) {
      movobject.o = movobject.w(movobject);
    }
    qorGridBlockShape(movobject.x, movobject.y, movobject.o);
    movobject.x += movobject.d;
    movobject.a = 0;
    movobject.b = movobject.d;
    if (movobject.c != null) {
      movobject.y += movobject.c;
      movobject.a = movobject.c;
    } else {
      if ((ra() > 0.8) && (movobject.y <= 3) && (movobject.y >= 0)) {
        if (ra() > 0.5) {
          ++movobject.y;
          movobject.a = 1;
        } else {
          --movobject.y;
          movobject.a = -1;
        }
      } else if (movobject.y >= 3) {
        --movobject.y;
        movobject.a = -1;
      } else {
        ++movobject.y;
        movobject.a = 1;
      }
    }
  }
  let i = movobjects.length-1;
  let remCounter = 0;
  while (i >= 0) {
    if (movobjects[i].x > 100) {
      movobjects.splice(i, 1);
      ++remCounter;
    }
    --i;
  }
  if (remCounter > 0) {
    for(j=0;j<remCounter;++j)addNewCloud( A+(j*10*ra()) );
  }
};
      
const startDrawingLoop = function() {
  let dloop;
  return dloop = setInterval(() => drawingLoop()
  , 180);
};
  
var setup = function() {
  setupGrid();
  setupGround();
  initMovObjects();
  return setupGrid();
};

setup();
startDrawingLoop();
addNewBaloon(-5);

})();