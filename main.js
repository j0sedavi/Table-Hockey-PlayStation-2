// {"name": "Air Hockey Challenger", "author": "Alex Dev", "version": "04012023", "icon": "app_icon.png", "file": "main.js"}
var font = new Font("fonts/LEMONMILK-Regular.otf");
let canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;
Screen.setMode(canvas);

Sound.setVolume(100);
Sound.setVolume(100,0);

/*let sounds={
  ball_audio: Sound.load("assets/sound/ball_to_wall.wav"),
  paddle_audio: Sound.load("assets/sound/ball_paddle.wav"),
  thema: Sound.load("assets/sound/theme.wav"),
  youlose: Sound.load("assets/sound/you loser.wav"),
  winner: Sound.load("assets/sound/you win.wav"),
  trobeta: Sound.load("assets/sound/snd09.wav")
}*/


const colors = {
  Black: Color.new(0, 0, 0),
  White: Color.new(255, 255, 255),
  BlueDark: Color.new(23, 27, 255),
  Blue: Color.new(48, 92, 255)
};


const MenuImage = {
  menu: new Image("assets/mainmenu/mainmenu_img_topbg.png"),
  play: new Image("assets/mainmenu/mainmenu_btn_2player.png"),
  settings: new Image("assets/mainmenu/mainmenu_btn_vscpu.png"),
  credits: new Image("assets/mainmenu/option_btn_gdpr.png"),
  seta: new Image("assets/mainmenu/Check.png")
};
var Players = {
  Player1: [{ X: 569, Y: 195, gols : 0}],
  Player2: [{ X: 13, Y: 195, gols : 0 }]
};

const GameImage = {
  bg: new Image("assets/game/campo.png"),
  ball: new Image("assets/game/ball.png"),
  red: new Image("assets/game/red_paddle.png"),
  blue: new Image("assets/game/blue_paddle.png"),
  winner: new Image("assets/game/result/result_text_youwin.png"),
  loser: new Image("assets/game/result/result_text_youlose.png"),
  nums_red: new Image(`assets/num/num_airhockey_${Players.Player2[0].gols}.png`),
  nums_blue: new Image(`assets/num/num_blue_${Players.Player1[0].gols}.png`)
};

const Black = Color.new(255, 255, 255);
font.color = Black;

var screen = 0;


// variaveis do jogo
var Ball = { X: 304, Y: 208};
// eixo anolosico da maxinha
var minOriginal = -127;
var maxOriginal = 128;
let new_pad = Pads.get();
let old_pad = new_pad;
let pd = Pads.get();
let pd2 = Pads.get();
var velocidade = 10;
var ballSpeedX = 5;
var ballSpeedY = 5;

var seta = {
  x: 388,
  y: 266,
  slot0: [{ x: 388, y: 266 }],
  slot1: [{ x: 388, y: 321 }],
  slot2: [{ x: 388, y: 377 }]
};

var Count = 3;
var selected = 0;



class main {
  
  SetScreen() {
    if (screen == 0) {
      this.Menu();
    }
    if (screen == 1) {
      this.Play();
    }
    if (screen == 2){
      this.Credits();
    }
  }
  ResetPlayers(){
    Players.Player1[0].X = 569;
    Players.Player1[0].Y = 195;
    Players.Player2[0].X = 13;
    Players.Player2[0].Y = 195;
  }
  MoveSetaUp() {
    if (selected == 0) {
      selected = 2;
      seta.x = seta.slot2[0].x;
      seta.y = seta.slot2[0].y;
    } else if (selected == 1) {
      selected = 0;
      seta.x = seta.slot0[0].x;
      seta.y = seta.slot0[0].y;
    } else if (selected == 2) {
      selected = 1;
      seta.x = seta.slot1[0].x;
      seta.y = seta.slot1[0].y;
    }
  }

  MoveSetaDown() {
    if (selected == 0) {
      selected = 1;
      seta.x = seta.slot1[0].x;
      seta.y = seta.slot1[0].y;
    } else if (selected == 1) {
      selected = 2;
      seta.x = seta.slot2[0].x;
      seta.y = seta.slot2[0].y;
    } else if (selected == 2) {
      selected = 0;
      seta.x = seta.slot0[0].x;
      seta.y = seta.slot0[0].y;
    }
  }
  Check_gol_player1() {
    if ((Ball.X <= 1) && (Ball.Y + 64 >= 160 && Ball.Y <= 287)) {
      Players.Player2[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
    }
  }
  Check_gol_player2() {
    if ((Ball.X + 64 >= 639) && (Ball.Y + 64 >= 160 && Ball.Y <= 287)) {
      Players.Player1[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
    }
  }
  DesacelateBall() {
    //desacelacao do vetores positos
    if (ballSpeedX > 20) {
      ballSpeedX--;
    }
    if (ballSpeedY > 20) {
      ballSpeedY--;
    }
    // desacelaracao dos vetores negativos
    if (ballSpeedX < -20) {
      ballSpeedX++;
    }
    if (ballSpeedY < -20) {
      ballSpeedY++;
    }
  }

  
  ResetBall(){
    ballSpeedX = 0;
    ballSpeedY = 0;
    Ball.X = 304;
    Ball.Y = 208;
  }
  normalizeValue(rx, minOriginal, maxOriginal, minNew = 1, maxNew = 8) {
    if (rx < 0) {
      return -(minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal));
    } else if(rx > 0){
      return minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal);
    }else{
      return 0;
    }
  }
  Credits(){
    for ( var c = 448; c > 0; c--){
    
    font.print(200,200, "Table Hockey Alex-DevGamer Athena Env Daniel Santos");
    };
    screen = 0;
    
  }
  Menu() {
    old_pad = new_pad;
    new_pad = Pads.get();

    if (Pads.check(new_pad, Pads.UP) && !Pads.check(old_pad, Pads.UP)) {
      this.MoveSetaUp();
    }
    if (Pads.check(new_pad, Pads.DOWN) && !Pads.check(old_pad, Pads.DOWN)) {
      this.MoveSetaDown();
    }

    if (Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 0) {
      screen = 1;
      this.ResetBall();
    }
    if (Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 1) {
      screen = 1;
    }
    if (Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 2) {
      screen = 2;
      
    }
    if (Pads.check(new_pad, Pads.TRIANGLE) && !Pads.check(old_pad, Pads.TRIANGLE)){
      screen = 0;
    }

    MenuImage.menu.draw(0, 0);
    MenuImage.play.draw(224, 254);
    MenuImage.settings.draw(224, 310);
    MenuImage.credits.draw(224, 367);
    MenuImage.seta.draw(seta.x, seta.y);
  }

  Movep1() {
    pd = Pads.get(0);
    if (pd.rx < -25) {
      Players.Player1[0].X = Players.Player1[0].X - velocidade;
    }
    if (pd.rx > 25) {
      Players.Player1[0].X = Players.Player1[0].X + velocidade;
    }
    if (pd.ry > 25) {
      Players.Player1[0].Y = Players.Player1[0].Y + velocidade;
    }
    if (pd.ry < -25) {
      Players.Player1[0].Y = Players.Player1[0].Y - velocidade;
    }
  }

  Movep2() {
    pd2 = Pads.get();
    if (pd2.lx < -25) {
      Players.Player2[0].X = Players.Player2[0].X - velocidade;
    }
    if (pd2.lx > 25) {
      Players.Player2[0].X = Players.Player2[0].X + velocidade;
    }
    if (pd2.ly > 25) {
      Players.Player2[0].Y = Players.Player2[0].Y + velocidade;
    }
    if (pd2.ly < -25) {
      Players.Player2[0].Y = Players.Player2[0].Y - velocidade;
    }
  }

  ColisionWall() {
    //player1
    if (Players.Player1[0].X < 320) {
      //meio
      Players.Player1[0].X = 320;
    }
    if (Players.Player1[0].Y > 384) {
      //baixo
      Players.Player1[0].Y = 384;
    }
    if (Players.Player1[0].Y < 0) {
      //cima
      Players.Player1[0].Y = 0;
    }
    if (Players.Player1[0].X > 576) {
      //fim direita
      Players.Player1[0].X = 576;
    }

    //player 2
    if (Players.Player2[0].X > 256) {
      //meio
      Players.Player2[0].X = 256;
    }
    if (Players.Player2[0].Y > 384) {
      //baixo
      Players.Player2[0].Y = 384;
    }
    if (Players.Player2[0].Y < 0) {
      //cima
      Players.Player2[0].Y = 0;
    }
    if (Players.Player2[0].X < 0) {
      //fim esquerda
      Players.Player2[0].X = 0;
    }
    //Bola
    Sound.play(ball_audio);
    Timer.reset(timer);
  }

  draw() {
    GameImage.bg.draw(0, 0);
    GameImage.ball.draw(Ball.X, Ball.Y);
    GameImage.red.draw(Players.Player1[0].X, Players.Player1[0].Y);
    GameImage.blue.draw(Players.Player2[0].X, Players.Player2[0].Y);
    GameImage.nums_blue.draw(250,10);
    GameImage.nums_red.draw(330,10);
    font.print(100,100, Players.Player1[0].gols);
    
  }

  start() {
    old_pad = new_pad;
    new_pad = Pads.get(0);

    if (Pads.check(new_pad, Pads.START) && !Pads.check(old_pad, Pads.START) && selected == 0) {
      screen = 0;
    }
  }
  WinnerPlay1(){
    if(Players.Player1[0].gols == 10){
      font.print(210, 220, "Red WINNER");
      this.ResetPlayers();
      this.ResetBall();
      Players.Player1[0].gols = 0;
  }
  }
  WinnerPlay2(){
    if(Players.Player2[0].gols == 10){
      font.print(210, 220, "Blue WINNER");
      this.ResetPlayers(), 3000;
      this.ResetBall();
      Players.Player2[0].gols = 0;
  }
  }
  CollisionBall() {
    // Verificar colisão com as bordas da tela para a bola
    if (Ball.X + 64 >= canvas.width || Ball.X <= 0) {
      ballSpeedX = -ballSpeedX; // Inverter a direção no eixo X
      sound.play(sounds.ball_audio);
    }
    if (Ball.Y + 64 >= canvas.height || Ball.Y <= 0) {
      ballSpeedY = -ballSpeedY; // Inverter a direçãeixo Yo no
      sound.play(sounds.ball_audio);
    }

    // Verificar colisão com os jogadores (paddles)
    if (// paddle right
    Ball.X + 64 >= Players.Player2[0].X && Ball.X <= Players.Player2[0].X + 100 && Ball.Y + 64 >= Players.Player2[0].Y && Ball.Y <= Players.Player2[0].Y + 100
    ) {
      sound.play(sounds.paddle_audio);
      ballSpeedY = this.normalizeValue(pd.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd.rx, minOriginal, maxOriginal);
    }
    if (Ball.X <= Players.Player1[0].X + 100 && Ball.X + 64 >= Players.Player1[0].X && Ball.Y + 64 >= Players.Player1[0].Y && Ball.Y <= Players.Player1[0].Y + 100) {
      ballSpeedY = this.normalizeValue(pd2.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd2.rx, minOriginal, maxOriginal);
      if(selected == 1){
        sound.play(sounds.paddle_audio);
        ballSpeedY = this.normalizeValue(Players.Player1[0].Y, minOriginal, maxOriginal);
        ballSpeedX = -this.normalizeValue(Players.Player1[0].X, minOriginal, maxOriginal);
      }
    }
    if (Ball.X > canvas.width || Ball.X < 0) {
      ballSpeedX = -25;
    }
    if (Ball.Y > canvas.height || Ball.Y < 0) {
      ballSpeedY = -25;
    }
    if(selected == 1){
      if (Players.Player1[0].Y + 100 / 2 < Ball.Y) {
        Players.Player1[0].Y += 10;  // Ajuste a velocidade da CPU aqui
      } else {
        Players.Player1[0].Y -= 10;  // Ajuste a velocidade da CPU aqui 
      }
      
      if (Players.Player1[0].X + 100 / 2 < Ball.Y){
        Players.Player1[0].X += 10;  // Ajuste a velocidade da CPU aqui 
      } else {
        Players.Player1[0].X -= 10;  // Ajuste a velocidade da CPU aqui 
      }
      
    }
  }

  MoveBall() {
    Ball.X += ballSpeedX;
    Ball.Y += ballSpeedY;

  }

  Play() {
    this.start();
    this.Movep1(); // paddle right
    this.Movep2(); // paddle left
    this.MoveBall();  // Adicionando a movimentação da bola
    this.CollisionBall();
    this.ColisionWall();
    this.draw();
    this.DesacelateBall();
    this.Check_gol_player1();
    this.Check_gol_player2();
    this.WinnerPlay1();
    this.WinnerPlay2();
  }
}

const Game = new main();
os.setInterval(() => {
  Screen.clear();
  Game.SetScreen();
  Screen.waitVblankStart();
  Screen.flip();
  
}, 0);
