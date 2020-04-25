class Player {
  constructor() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth / img.naturalHeight;

      this.w = 100;
      this.h = this.w / imgRatio;

      this.x = W / 2 - this.w / 2;
      this.y = H - this.h - 100;
    };
    img.src = "images/manu.png";
  }

  gotMask() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth / img.naturalHeight;

      this.w = 100;
      this.h = this.w / imgRatio;
    };
    img.src = "images/tetemasque.png";
  }

  removeMask() {
    const img = document.createElement("img");
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth / img.naturalHeight;

      this.w = 100;
      this.h = this.w / imgRatio;
    };
    img.src = "images/manu.png";
  }

  draw() {
    if (!this.img) return;

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  moveLeft() {
    console.log(this.x);
    if (this.x < 55) {
      console.log(this.x);
      this.x = 55;
    }
    this.x += -50;
  }
  moveRight() {
    if (this.x > 850) {
      this.x = 850;
    }
    this.x += 50;
  }
  moveDown() {
    if (this.y < 80) {
      this.y = 80;
    }
    this.y -= 50;
  }
  moveUp() {
    if (this.y > 1400) {
      this.y = 1400;
    }
    this.y += 50;
  }
}
