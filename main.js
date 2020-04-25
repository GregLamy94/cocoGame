let player;
let couloir;
let obstacles;
let didis;
let helpers;
let gameover;
let nblife = 0;
let points;
let vitesseV = 7;
let vaccin;
let saveVirusFrame;
let saveVirusSpeed;
let isVaccined = false;

var lastHighestScore = document.cookie.replace(
  /(?:(?:^|.*;\s*)highscore\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

const ctx = document.querySelector("#game-board canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

let virusFrame = 150;
let vaccinTime = 0;

function draw() {
  ctx.clearRect(0, 0, W, H); // 🧽

  couloir.draw();

  player.draw();

  if (frames % virusFrame === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  if (points % 600 === 0) {
    virusFrame = Math.max(10, virusFrame - 15);
  }

  obstacles.forEach(function (obstacle) {
    obstacle.y += vitesseV;
    obstacle.draw();
  });

  if (frames % 500 === 0) {
    var helper = new Helper();
    helpers.push(helper);
  }

  helpers.forEach(function (helper) {
    helper.y += 5;
    helper.draw();
  });

  if (frames % 700 === 0) {
    var didi = new Didi();
    didis.push(didi);
  }

  didis.forEach(function (didi) {
    didi.y += 4;
    didi.draw();
  });

  if (frames % 400 === 0) {
    var vaccin = new Vaccin();
    vaccinTime = 0;
    vaccins.push(vaccin);
  }

  vaccins.forEach(function (vaccin) {
    vaccin.draw();
  });

  if (frames % 500 === 0) {
    var pango = new Pango();
    pangos.push(pango);
  }

  pangos.forEach(function (pango) {
    pango.y += 6;
    pango.draw();
  });

  for (obstacle of obstacles) {
    if (obstacle.hitsVirus(player)) {
      console.log(nblife);
      if (nblife === 0) {
        console.log("crashed");
        vitesseV = 0;
        gameover = true;

        if (points > lastHighestScore) {
          document.cookie = "highscore=" + points;
          alert(
            `Congrats! You have the new highest score ${points}🔥\nPrevious one was ${lastHighestScore} 👊`
          );
        } else {
          alert(
            `You've lost 💀 \nYour score is : ${points} \nThis is far from the best score of the week ${lastHighestScore} 💩 \nTry again! `
          );
        }
      } else {
        console.log("you've been saved");
        nblife = 0;
        player.removeMask();
      }
    }
  }

  for (helper of helpers) {
    if (helper.hits(player)) {
      console.log("gainLife");
      nblife = 1;
      helper.y += 5000;
      player.gotMask();
    }
  }

  for (didi of didis) {
    if (didi.hits(player)) {
      didi.y += 5000;
      let resultDidi = Math.random();
      console.log(`result didi =` + resultDidi);
      if (resultDidi > 0.5) {
        nblife = 1;
        player.gotMask();
      } else {
        nblife = 0;
        player.removeMask();
      }
    }
  }

  for (pango of pangos) {
    if (pango.hits(player)) {
      vitesseV += 5;
      pango.y += 5000;
    }
  }

  for (vaccin of vaccins) {
    if (vaccinTime > 100) {
      vaccin.y += 5000;
    }

    if (vaccinTime > 200 && isVaccined) {
      virusFrame = saveVirusFrame;
      vitesseV = saveVirusSpeed;
      isVaccined = false;
    }

    if (vaccin.hits(player)) {
      isVaccined = true;
      saveVirusFrame = virusFrame;
      saveVirusSpeed = vitesseV;
      virusFrame = 700;
      vitesseV = 2;
      vaccin.y += 5000;
    }
  }

  vitesseV += 0.003;
  vaccinTime += 1;

  ctx.font = "35px Arial";
  ctx.textAlign = "right";
  ctx.fillStyle = "white";
  ctx.fillText(`${points} pts `, W - 40, 130);
  ctx.fillText(`highest score ${lastHighestScore}`, W - 40, 60);
  points++;
}

document.onkeydown = function (e) {
  if (!player) return;

  console.log("keydown");
  switch (e.keyCode) {
    case 37:
      // left
      player.moveLeft();
      break;
    case 39:
      //right
      player.moveRight();
      break;
    case 40:
      player.moveUp();
      break;
    case 38:
      player.moveDown();
      break;
  }
};

let raf;
let frames = 0;
function animLoop() {
  frames++;

  draw();

  if (!gameover) {
    raf = requestAnimationFrame(animLoop);
  }
}

function startGame() {
  if (raf) {
    cancelAnimationFrame(raf);
  }

  gameover = false;
  points = 0;
  nblive = 0;
  vitesseV = 7;
  virusFrame = 150;
  player = new Player();
  couloir = new Couloir();
  obstacles = [];
  helpers = [];
  didis = [];
  pangos = [];
  vaccins = [];

  raf = requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function () {
  startGame();
};

startGame();
