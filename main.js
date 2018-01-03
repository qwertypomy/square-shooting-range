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
    this.minSpeed = 1,
    this.maxSpeed = 3,
    this.minTimeout = 700,
    this.maxTimeout = 1500;
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
    this.addSquare();
    if (!this.inProgress) {
      this.animate();
      this.inProgress = true;
      this.generateSquares();
    }
  }

  stopGame() {
    this.inProgress = false;
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
    if (this.animation) {
      cancelAnimationFrame(this.animation);
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
      square.y += square.speed;
    }

    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  generateSquares() {
    let that = this;
    if (this.inProgress) {
      setTimeout(function() {
        if (this.inProgress) {
          that.addSquare();
          that.generateSquares();
        }
      }.bind(this), xrandom(that.minTimeout, that.maxTimeout));
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
  return Math.floor(Math.random() * (min - max) + max);
}

function randomColor() {
  return 'rgb(' + (
  Math.floor(Math.random() * 256)) + ',' + (
  Math.floor(Math.random() * 256)) + ',' + (
  Math.floor(Math.random() * 256)) + ')';
}
