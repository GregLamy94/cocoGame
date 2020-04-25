function random(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}

class Vaccin {
  constructor() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth / img.naturalHeight;

      this.w = random(W / 8, (2 / 8) * W);
      this.h = this.w / imgRatio;

      this.x = random(0, W - this.w);
      this.y = random(0, H - this.h);
    };
    img.src = "images/pill.png";
  }

  draw() {
    if (!this.img) return;

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  hits(player) {
    return (
      player.x + player.w >= this.x &&
      player.x <= this.x + this.w &&
      player.y <= this.y + this.h &&
      player.y + player.h >= this.y
    );
  }
}
