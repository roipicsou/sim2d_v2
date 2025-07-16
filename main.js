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
        this.speed = 2;
    }

    draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    }

    find_food(Foods) {
      let food = null;

      for (let item of Foods) {
        const dx = item.x - this.x;
        const dy = item.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        console.log(distance);

        if (!food || distance < Math.sqrt((food.x - this.x) ** 2 + (food.y - this.y) ** 2)) {
          food = item;
        }
      }
      return food;
    }

    move(Foods) {
    const closest = this.find_food(Foods)

    if (closest) {
      const dx = closest.x - this.x;
      const dy = closest.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const directionX = dx / dist;
      const directionY = dy / dist;

      this.x += directionX * this.speed;
      this.y += directionY * this.speed;
    } else {
      this.x += (Math.random() - 0.5) * this.speed * 2;
      this.y += (Math.random() - 0.5) * this.speed * 2;
    }

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

const Creatures = [];
const Foods = [];

ctx.clearRect(0, 0, canvas.width, canvas.height);

Creatures.push(new Creature());
Foods.push(new Food());

const test1 = Creatures[0];
test1.draw(ctx);

const test2 = Foods[0];
test2.draw(ctx);