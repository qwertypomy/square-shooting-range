document.body.onload = function() {
  new Game();
};

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas'),
    this.ctx = this.canvas.getContext('2d'),
    this.scoreSpan = document.getElementById('score'),
    this.inProgress = false,
    this.score = 0,
    this.squares = [],
    this.scuareSize = 20,
    this.minSpeed = 1, // minSpeed * 60 pixels per second
    this.maxSpeed = 3, // maxSpeed * 60 pixels per second
    this.fps = 60,
    this.minSpawnTime = 800, // milliseconds
    this.maxSpawnTime = 1600, // milliseconds
    this.draw = this.fpsControl(this.animate.bind(this));
    document.getElementById('start').onclick = this.startGame.bind(this);
    document.getElementById('stop').onclick = this.stopGame.bind(this);

    canvas.addEventListener('click', function(event) {
      let x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
      for (let i in this.squares) {
        let square = this.squares[i];
        if (y > square.y && y < square.y + this.scuareSize && x > square.x && x < square.x + this.scuareSize) {
          this.score++;
          this.squares.splice(i, 1);
        }
      };
    }.bind(this), false);
  }

  startGame() {
    this.score = 0;
    this.squares = [];
    if (!this.inProgress) {
      this.draw();
      this.inProgress = true;
    }
  }

  stopGame() {
    this.inProgress = false;
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
    if (this.animation) {
      cancelAnimationFrame(this.animation);
    }
  }

  fpsControl(drawFunc) {
    var fps = this.fps;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;
    var timeToSpawn = 0;

    return function drawStep() {
      this.animation = requestAnimationFrame(drawStep.bind(this));
      now = Date.now();
      delta = now - then;
      if (delta > interval) {
        then = now - (delta % interval);
        timeToSpawn -= delta;
        if (timeToSpawn <= 0) {
          this.addSquare();
          timeToSpawn = xrandom(this.minSpawnTime, this.maxSpawnTime);
        }
        drawFunc();
      }
    }
  }

  animate() {
    this.scoreSpan.textContent = this.score;
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
    for (let i in this.squares) {
      let square = this.squares[i];
      if (square.y >= this.canvas.clientHeight) {
        this.squares.splice(i, 1);
      }
      this.ctx.fillStyle = square.color;
      this.ctx.fillRect(square.x, square.y, this.scuareSize, this.scuareSize);
      square.y += square.speed * 60 / this.fps;
    }
  }

  addSquare() {
    let square = {
      x: xrandom(0, this.canvas.clientWidth - this.scuareSize),
      y: 0,
      color: randomColor(),
      speed: xrandom(this.minSpeed, this.maxSpeed)
    };
    this.squares.push(square);
  }
}

function xrandom(min, max) {
  return Math.round(Math.random() * (min - max) + max);
}

function randomColor() {
  return 'rgb(' + (
  Math.floor(Math.random() * 256)) + ',' + (
  Math.floor(Math.random() * 256)) + ',' + (
  Math.floor(Math.random() * 256)) + ')';
}
