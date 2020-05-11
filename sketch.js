var zPos = 2; // middle
var pnts = 0;
var lives = 3;
var killed = false;
var won = false;
var ship;
var asteroids1 = [];
var asteroids2 = [];
var asteroids3 = [];
var lasers = [];
var moan, explode;

function preload() {
	soundFormats('mp3');
	moan = loadSound('moan');
        explode = loadSound('explode');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  ship = new Ship();
  for (var i = 0; i < 5; i++) {
    asteroids1.push(new Asteroid(null, null, 1));
    asteroids2.push(new Asteroid(null, null, 2));
    asteroids3.push(new Asteroid(null, null, 3));
  }
}

function draw() {
  background(0);
  
  // z-dimension
  interface(zPos);
  if (zPos === 3) {
    ship.r = 30;
  } else if (zPos === 2) {
    ship.r = 20;
  } else if (zPos === 1) {
    ship.r = 10;
  }

  for (var i = 0; i < asteroids1.length; i++) {
    asteroids1[i].render();
    asteroids1[i].update();
    asteroids1[i].edges();
  }
  for (var i = 0; i < asteroids2.length; i++) {
    asteroids2[i].render();
    asteroids2[i].update();
    asteroids2[i].edges();
  }
  for (var i = 0; i < asteroids3.length; i++) {
    asteroids3[i].update();
    asteroids3[i].render();
    asteroids3[i].edges();
  }
  
  if (zPos === 1) {
  for (var i = asteroids1.length - 1; i >= 0; i--) {
    if (ship.hits(asteroids1[i])) {
      lives -= 1;
      explode.play();
      if (asteroids1[i].r > 10) {
            //var newAsteroids = asteroids1[i].breakup();
            //asteroids1 = asteroids1.concat(newAsteroids);
      }
      asteroids1.splice(i, 1);
    }
  }
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids1.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids1[j])) {
          pnts += 1;
          explode.play();
          if (asteroids1[j].r > 10) {
            var newAsteroids = asteroids1[j].breakup();
            asteroids1 = asteroids1.concat(newAsteroids);
          }
          asteroids1.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
}

if (zPos === 2) {
  for (var i = asteroids2.length - 1; i >= 0; i--) {
    if (ship.hits(asteroids2[i])) {
      lives -= 1;
      explode.play();
      if (asteroids2[i].r > 10) {
            //var newAsteroids = asteroids2[i].breakup();
            //asteroids2 = asteroids2.concat(newAsteroids);
      }
      asteroids2.splice(i, 1);
    }
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids2.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids2[j])) {
          pnts += 1;
          explode.play();
          if (asteroids2[j].r > 10) {
            var newAsteroids = asteroids2[j].breakup();
            asteroids2 = asteroids2.concat(newAsteroids);
          }
          asteroids2.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
}

if (zPos === 3) {
  for (var i = asteroids3.length - 1; i >= 0; i--) {
    if (ship.hits(asteroids3[i])) {
      lives -= 1;
      explode.play();
      if (asteroids3[i].r > 10) {
            //var newAsteroids = asteroids3[i].breakup();
            //asteroids3 = asteroids3.concat(newAsteroids);
      }
      asteroids3.splice(i, 1);
    }
  }
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids3.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids3[j])) {
          pnts += 1;
          explode.play();
          if (asteroids3[j].r > 10) {
            var newAsteroids = asteroids3[j].breakup();
            asteroids3 = asteroids3.concat(newAsteroids);
          }
          asteroids3.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
}

  if (lives <= 0) {killed = true;}
  if (!killed) {
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }

  if (killed === true) {kill();}
  if (asteroids1.length === 0 && asteroids2.length === 0 && asteroids3.length === 0) {won = true;}
  points();
  livesDisplay();
  if (won === true) {win();}
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
if (!killed) {
  if (key == ' ') {
    // moan.play();
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode == 90) { // z
    if (zPos !== 1) {zPos--;}
  } else if (keyCode == 88) { // x
    if (zPos !== 3) {zPos++;}
  }
}
}

function interface(vPos) {
    var x = width / 40;
    var y = width / 40;
    var w = width / 10;
    var h = 1.5 * width / 40;
    var offset = width / 20;
    var vertSet = width / 40;
    
    stroke(255);
    fill(255, 255, 255, 0); if (vPos === 3) {fill(12, 227, 4, 100);}
    quad(x + offset, y, x + w + offset, y, x + w, y + h, x, y + h);
    fill(255, 255, 255, 0); if (vPos === 2) {fill(245, 110, 238, 100);}
    quad(x + offset, y + vertSet, x + w + offset, y + vertSet, x + w, y + h + vertSet, x, y + h + vertSet);
    fill(255, 255, 255, 0); if (vPos === 1) {fill(12, 202, 240, 100);}
    quad(x + offset, y + vertSet + vertSet, x + w + offset, y + vertSet + vertSet, x + w, y + h + vertSet + vertSet, x, y + h + vertSet + vertSet);
}

function kill() {
  push();
  background(61, 9, 9, 200);
  fill(255); textSize(width * 0.06);
  text("You were obliterated!", width * 0.5, height * 0.5);
  pop();
}

function win() {
    push();
    background(237, 237, 104, 200);
    fill(0); textSize(width * 0.05);
    text("You have cleared all the asteroids!", width * 0.5, height * 0.45);
    textSize(width * 0.09);
    text("CONGRATULATIONS", width * 0.5, height * 0.65);
    pop();
}

function points() {
    push();
    fill(255, 255, 255, 150); textSize(width * 0.03);
    
    rect(width * 0.89, height * 0.93, width - (width * 0.89), height - (height * 0.93));
    
    fill(0); text(pnts + " pnts", width * 0.948, height * 0.985);
    pop();
}

function livesDisplay() {
    
    push();
    
    if (lives < 0) {lives = 0;}
    fill(255, 255, 255, 150); textSize(width * 0.03);
    
    rect(0, height * 0.93, width - (width * 0.89), height - (height * 0.93));
    
    fill(0); text(lives + " lifes", width * 0.046, height * 0.985);
    
    pop();

}

