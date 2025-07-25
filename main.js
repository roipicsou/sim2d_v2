/*

fonctionalitéer a ajouter :
  - cycle jour/nuit
  - création de desandace
  - modification a la nécance.

*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Creature {
  constructor(x, y, speed = 2) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.color = 'red';
    this.speed = speed;
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
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

// Initial population
for (let i = 0; i < 20; i++) {
  Creatures.push(new Creature(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Initial food
for (let i = 0; i < 200; i++) {
  Foods.push(new Food(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Main loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let food of Foods) {
    food.draw(ctx);
  }

  for (let i = Creatures.length - 1; i >= 0; i--) {
    const creature = Creatures[i];
    creature.move(Foods);

    // Collision avec la nourriture
    for (let j = Foods.length - 1; j >= 0; j--) {
      const food = Foods[j];
      const dx = food.x - creature.x;
      const dy = food.y - creature.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < creature.radius + food.radius) {
        Foods.splice(j, 1); // Retire la nourriture mangée
        break; // Une seule nourriture par tour
      }
    }

    creature.draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();