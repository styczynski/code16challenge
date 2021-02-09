(function(){
let dd=Math.ceil;
let du=Math.floor;
let ra=Math.random;
let movobjects = [];
let groundHMap = [];
const baloonColors = [
  [[46, 139, 87], [46, 139, 87]],
  [[238, 59, 59], [232, 232, 232]],
  [[255, 236, 139], [238, 59, 59]],
  [[152, 245, 255], [51, 161, 201]],
  [[65, 105, 225], [152, 245, 255]]
];

const eachGridBlock=fn=>{for(let i=0;i<=10000;++i)fn(i%100,~~(i/100))};

const colorGridBlock = function(x, y, r, g, b) {
  let e=document.getElementById(`block${x}x${y}`);
  if(e)e.style.backgroundColor=`rgb(${r},${g},${b})`;
};

const colorGridBlockDefault = function(x, y) {
  const randomSpread = 5;
  let r = 30;
  let g = 144;
  let b = 255;
  const rSpread = 150;
  const gSpread = 150;
  const bSpread = 150;
  const fi = 1-((x+y+(Math.sin(y*y)*4))/(100+100));
  r -= ((rSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  g -= ((gSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  b -= ((bSpread/2) - (fi*rSpread)) + (ra()*randomSpread);
  return colorGridBlock(x, y, r, g, b);
};

const colorGridBlockShape = (x, y, shape) => (() => {
  const result = [];
  for (color of shape) {
    const nx = x + ~~color[0];
    const ny = y + ~~color[1];
    result.push(colorGridBlock(nx, ny, color[2][0], color[2][1], color[2][2]));
  }
  return result;
})();

const setupGrid = function() {
  txt="<div id=\"view\" style=\"width:800px;height:200px\"><div id=\"grid\"/>";
  eachGridBlock((x, y) => txt+=`<div id=\"block${x}x${y}\" class=\"grid-block\" data-coords=\"${x}x${y}\" style="width:10px;height:10px;position:absolute;left:${-10 + (x*10)}px;top:${-10 + (y*10)}px;"></div>`);
  document.write(txt+"</div></div>");
};

const addNewBaloon = function(minx) {
  let colorIndex = ~~(ra() * baloonColors.length);
  colorIndex += baloonColors.length;
  colorIndex %= baloonColors.length;
  const layerAColor = baloonColors[colorIndex][0];
  const layerBColor = baloonColors[colorIndex][1];
  const baloon = {
    x: ~~(minx+(ra()*2)),
    y: ~~(ra()*4),
    speed: 2,
    speedY: 0,
    shapefn() {
      if (this.speedY === 0) {
        if (ra() > 0.5) {
          if (ra() > 0.4) {
            this.speedY = dd((ra()*1)+1);
          } else {
            this.speedY = -1;
          }
        }
      } else {
        if (ra() > 0.7) {
          this.speedY = 0;
        }
      }
      if ((this.y > 4) && (this.speedY > 0)) {
        this.speedY = 0;
      }
      if ((this.y < -1) && (this.speedY < 0)) {
        this.speedY;
      }
      return this.shape;
    },
    shape: [
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
    speed: 3,
    mode: 0,
    col: ~~((-ra()*50) + 73),
    shapefn(self) {
      switch (this.mode) {
        case 0:
          this.mode = 1;
          return [
            [1,0,[this.col, this.col, this.col]],
          ];
        case 1:
          this.mode = 0;
          return [
            [0,2,[this.col, this.col, this.col]],
            [1,1,[this.col, this.col, this.col]],
            [0,0,[this.col, this.col, this.col]]
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
    speed: 1
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
      shape.push([y,x,[250-fi, 250-fi, 250-fi]]);
    }
    lev++;
    const levchangemode = ra();
    let levchange = 0;
    if (levchangemode > 0.95) { levchange = 3; }
    if (levchangemode > 0.8) { levchange = 2; }
    if (levchangemode > 0.1) { levchange = 1; }
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

  cloud.shape = shape;
  return movobjects.push(cloud);
};

const initMovObjects = function() {
  movobjects = [];
  const c = du(100 / 7);
  for(i=0;i<c;++i)addNewCloud( -20+(i*10*ra()) );
};

const setupGround = function() {
  groundHMap = [25, 25+1, 25+2];
  for (let x = 0, end = 100, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
    var groundH;
    const groundHMapLen = groundHMap.length;
    if (ra() > 0.8) {
      groundH = 25 + (ra() * 3);
      groundH = groundH + groundHMap[groundHMapLen-1] + groundHMap[groundHMapLen-2] + groundHMap[groundHMapLen-3];
      groundH /= 4;
    } else if (ra() > 0.8) {
      groundH = (25 + groundHMap[groundHMapLen-1]) - groundHMap[groundHMapLen-2];
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
      let fi = ((((y-25)+7)*2) + (ra()*4) + (Math.sin(x/10)*10)) - ((100-Math.min(Math.pow(Math.abs(x-20), 1.5)+(2*Math.pow(Math.abs(y-25), 1.5)), 100))*0.7);
      fi /= 1;
      shape.push([x, y, [152-fi,	251-fi,	152-fi]]);
    }
  }
  return colorGridBlockShape(0, 0, shape);
};

const drawSun = function() {
  let x, y;
  let asc, end;
  let asc2, end2, start;
  const shape = [];
  for (x = -20, end = 20, asc = -20 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) {
    var asc1, end1;
    for (y = -20, end1 = 20, asc1 = -20 <= end1; asc1 ? y <= end1 : y >= end1; asc1 ? y++ : y--) {
      if (((x*x) + (y*y)) <= (20/2)) {
        let fi = dd((x+y)*7);
        if (Math.abs(du(((x*x) + (y*y)) - (20/2))) < 2) {
          if (ra() > 0.2) {
            fi*=-0.5;
          }
        }
        shape.push([x,y,[255-fi, 193-fi, 37-fi]]);
      }
    }
  }
  for (start = -20-1, x = start, end2 = 20+1, asc2 = start <= end2; asc2 ? x <= end2 : x >= end2; asc2 ? x++ : x--) {
    var asc3, end3, start1;
    for (start1 = -20-1, y = start1, end3 = 20+1, asc3 = start1 <= end3; asc3 ? y <= end3 : y >= end3; asc3 ? y++ : y--) {
      if ((((x*x) + (y*y)) <= (60/2)) && ( !(((x*x) + (y*y)) <= (20/2)) )) {
        if (ra() > 0.6) { shape.push([x,y,[99,184,255]]); }
      }
    }
  }
  return colorGridBlockShape(20, 5, shape);
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
  eachGridBlock((x, y) => colorGridBlockDefault(x, y));
  drawSun();
  drawGround();
  for (let movobject of Array.from(movobjects)) {
    if (movobject.shapefn != null) {
      movobject.shape = movobject.shapefn(movobject);
    }
    colorGridBlockShape(movobject.x, movobject.y, movobject.shape);
    movobject.x += movobject.speed;
    movobject.measuredSpeedY = 0;
    movobject.measuredSpeedX = movobject.speed;
    if (movobject.speedY != null) {
      movobject.y += movobject.speedY;
      movobject.measuredSpeedY = movobject.speedY;
    } else {
      if ((ra() > 0.8) && (movobject.y <= 3) && (movobject.y >= 0)) {
        if (ra() > 0.5) {
          ++movobject.y;
          movobject.measuredSpeedY = 1;
        } else {
          --movobject.y;
          movobject.measuredSpeedY = -1;
        }
      } else if (movobject.y >= 3) {
        --movobject.y;
        movobject.measuredSpeedY = -1;
      } else {
        ++movobject.y;
        movobject.measuredSpeedY = 1;
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
    for(j=0;j<remCounter;++j)addNewCloud( -20+(j*10*ra()) );
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