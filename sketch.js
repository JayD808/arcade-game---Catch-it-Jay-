// based on "Willow Pill's Bathtub – The Game!" by Anna Lytical
// https://www.youtube.com/watch?v=lgr0elfcpAo

// play the game at https://editor.p5js.org/jay808/full/nVbGhEG3y

let jayImg;
let mpcImg;
let logoImg;
let electribeImg;
let mpcOneImg;

function preload() {
  jayImg = loadImage("jay.gif");
  mpcImg = loadImage("mpc live.png");
  logoImg = loadImage("logo.png");
  electribeImg = loadImage("e2.png");
  mpcOneImg = loadImage("mpc one.png");
  
  musicStart = createAudio('music.m4a');
  HitSound = createAudio('sound.wav');
  DropSound = createAudio('dropSound.wav');  
  E2Sound = createAudio('e2Sound.wav');  
  SnareSound = createAudio('snareSound.wav'); 
}

let fallingObjects;
let goodObjects;
let points = 0;
let jay;

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
    musicStart.loop();
  }
}

function setup() {
bg = loadImage('mpc one.png');
  
loadImage('mpc one.png', img => {
    image(img, 100, 90) } );
  
    createCanvas(window.screen.availWidth, window.screen.availHeight);
  
  fallingObjects = new Set();  
  goodObjects = [mpcImg,electribeImg,mpcOneImg];
  imageMode(CENTER);
  jay = new Jay();
}

// ----------------------------------------------------------


function draw() {
    background ("rgb(90,14,104)")
    background(bg);
  
  // todo: remove them when they go off screen
  if (fallingObjects.size < 100 && random() < .04) {
    let i = random(goodObjects);
    fallingObjects.add(new FallingObject(random(0, width), 0, i));
          DropSound.play();
    if (random() < .2) {
          fallingObjects.add(new FallingObject(random(0,width), 0, logoImg));
    }

    
  }
  
  fill("white")
  textSize(30);
  text("Score: " +points, 5, 28)

  
  fallingObjects.forEach(o => {
    o.update();
    o.show();
    
    if (o.hits(jay)) {
      // remove set
      fallingObjects.delete(o);
      
      // flashing background   
        background ("rgb(point, 15, 63)")
      HitSound.play();
      SnareSound.play(); 

      // increase points
      points += o.score;
    }
  })
  
  jay.update();
  jay.show();
  
}


class FallingObject {
  constructor(x,y,img) {
    this.x = x;
    this.y = y;
    this.v = 3;
    this.img = img;
    this.score = 5;
    
    if (this.img == mpcOneImg) {
      this.w = 80;      
    } else if (this.img == electribeImg) {
      this.w = 110;
        E2Sound.play();  

    } else if (this.img == mpcImg)  {
      this.w = 110;
      
    } else{
      this.w = 130;
      this.score = -10;
    }
    let aspectRatio = this.img.width / this.img.height;

    this.h = this.w / aspectRatio;
  }
  
  update() {
    this.y += this.v;
  }
  
  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
  
  hits(jay) {
 return collideRectRect(this.x, this.y, this.w, this.h, jay.x, jay.y, jay.w, jay.h);
  }
}


class Jay {
  constructor() {
    this.h = 130;
    this.w = 130;
    this.y = height - this.h/2;
  }
  
  update() {
    this.x = constrain(mouseX, 33, width - 50);
  }
  
  show() {
    image(jayImg, this.x, this.y, this.w, this.h);
  }
}

class Game {}
