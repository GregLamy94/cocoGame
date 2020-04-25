function random(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}

class Obstacle {
  constructor() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth / img.naturalHeight;


      this.w = random(W / 6, (2 / 6) * W); 
      this.h = this.w / imgRatio;

      this.x = random(0, W - this.w);
      this.y = -this.h;
    };
    img.src = "images/virus2.png";
  }

  draw() {
    if (!this.img) return; 

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  removeOb() {
    ctx.drawImage(this.img, -200, -200, 0, 0);
  }

  hitsVirus(player) {
    const has_hit =
      player.x + player.w >= this.x &&
      player.x <= this.x + this.w && 
      player.y <= this.y + this.h &&
      player.y + player.h >= this.y;
    if (has_hit) {
      this.y = -5000;
      ctx.drawImage(this.img, this.x, this.y, 0, 0);
    }

    return has_hit;
  }
}
