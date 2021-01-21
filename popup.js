let canvas = document.getElementById("screen");
if (canvas != null)
{
  let ctx = canvas.getContext("2d");

  let score_display = document.getElementById("score");

  ctx.fillStyle = "#fff";

  const HEIGHT = 100;
  const WIDTH = 400;

  const ground_h = 10;
  const ground_w = WIDTH;

  let score = 0;

  let player = {};
  player.h = 20;
  player.w = 10;
  player.x = 45;
  player.y = HEIGHT - ground_h - player.h ;
  player.jump_peak = false;

  let obstacle = {};
  obstacle.speed = 4;
  obstacle.h = 10;
  obstacle.w = 10;
  obstacle.x = WIDTH - obstacle.w;
  obstacle.y = HEIGHT - ground_h - obstacle.h;

  let moon = {};
  moon.speed = 1; //0.03
  moon.w = 30; //50
  moon.h = 50; //50
  moon.x = WIDTH + 0.0;
  moon.y = HEIGHT - ground_h - moon.h; //moon.h + 20.0;

  let game_over = false;

  let w_inc = 0.0;
  let h_inc = 0.0;

  function update(ctx)
  {
      obstacle.x -= obstacle.speed;

      moon.x -= moon.speed;
      if (moon.x < 0 - moon.w)
      {
        moon.x = WIDTH + 0.0;
      }

      if (obstacle.x < 0)
      {
          score++;

          obstacle.h = 10;
          obstacle.w = 10;

          w_inc = Math.random() * 10;
          h_inc = Math.random() * 10;

          obstacle.w += w_inc;
          obstacle.h += h_inc;

          let setback = Math.random() * 100;

          obstacle.x = WIDTH - obstacle.w + setback;
          obstacle.y = HEIGHT - ground_h - obstacle.h;
      }
      if (((obstacle.x < player.x && obstacle.x + obstacle.w > player.x) || (obstacle.x < player.x + player.w && obstacle.x > player.x)) && obstacle.y < player.y + player.h)
      {
          game_over = true;
      }
  }

  let flag_jump = false;

  function jump()
  {

      if (!player.jump_peak)
      {
          player.y -= 10;
      }
      else if (player.jump_peak)
      {
          player.y += 10;
      }
      if (player.y === HEIGHT - ground_h - player.h - 80)
      {
          player.jump_peak = true;
      }
      else if (player.jump_peak && player.y === HEIGHT - ground_h - player.h)
      {
          player.jump_peak = false;
          flag_jump = false;
      }
  }

  let lastTime = 0;
  let pause = 1;

  function gameLoop(timestamp)
  {
      if (pause === 1)
      {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          update(ctx);

          if (game_over)
          {
              //alert("GAME OVER!\nScore: " + score.toString());
              canvas.height = 41;
              let display = document.getElementById("endMessage");
              display.innerHTML = "GAME OVER. Have a nice day :)";
              return;
          }

          document.addEventListener("keydown", event => {
              if (event.keyCode == 80)
              {
                  pause = -1;
              }

              else
              {
                  flag_jump = true;
              }
          });

          if (flag_jump)
          {jump();}

          ctx.fillStyle = "#ddd";
          ctx.fillRect(moon.x, moon.y, moon.w, moon.h);

          ctx.fillStyle = "#000";
          ctx.fillRect(0, HEIGHT - ground_h, ground_w, ground_h);
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
          ctx.fillStyle = "#0f0";
          ctx.fillRect(player.x, player.y, player.w, player.h);

          score_display.innerHTML = "Score: " + score.toString();
      }

      else
      {
          document.addEventListener("keydown", event => {
              if (event.keyCode == 80)
              {
                  pause = 1;
              }
          });
      }
      requestAnimationFrame(gameLoop);
  }

  gameLoop(0);

}
