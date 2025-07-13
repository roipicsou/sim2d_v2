/*

fonctionalitéer a ajouter :
  - deplacement
  - cycle jour/nuit
  - création de desandace
  - modification a la nécance

*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Creature {
    constructor(){
        this.x = 10;
        this.y = 50;
        this.radius = 5;
        this.color = 'red';
    }

    draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Food {
  constructor() {
    this.x = 20;
    this.y = 50;
    this.radius = 5;
    this.color = 'purple';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

ctx.clearRect(0, 0, canvas.width, canvas.height);

var test = new Creature();
test.draw(ctx);

var test_food = new Food();
test_food.draw(ctx);