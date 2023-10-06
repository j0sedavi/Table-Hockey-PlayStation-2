// {"name": "Table Hockey", "author": "Alex Dev", "version": "04012023", "icon": "app_icon.png", "file": "main.js"}
var font = new Font("fonts/LEMONMILK-Regular.otf");
let canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;
Screen.setMode(canvas);

const imagepath = "Image/";

const colors = {
  Black: Color.new(0, 0, 0),
  White: Color.new(255, 255, 255),
  BlueDark: Color.new(23, 27, 255),
  Blue: Color.new(48, 92, 255)
};

const MenuImage = {
  menu: new Image(imagepath + "Menu.png"),
  play: new Image(imagepath + "play.png"),
  settings: new Image(imagepath + "settings.png"),
  credits: new Image(imagepath + "credits.png"),
  seta: new Image(imagepath + "seta.png")
};

const GameImage = {
  bg: new Image(imagepath + "bg.png"),
  ball: new Image(imagepath + "ball.png"),
  red: new Image(imagepath + "red.png"),
  blue: new Image(imagepath + "blue.png")
};

const Black = Color.new(0, 0, 0);
font.color = Black;

var screen = 0;

var Players = {
  Player1: [{ X: 569, Y: 195, gols : 0}],
  Player2: [{ X: 13, Y: 195, gols : 0 }]
};
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
  slot1: [{ x: 414, y: 321 }],
  slot2: [{ x: 401, y: 377 }]
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
    if ((Ball.X <= 1) && (Ball.Y + 32 >= 160 && Ball.Y <= 287)) {
      Players.Player2[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
    }
  }
  Check_gol_player2() {
    if ((Ball.X + 32 >= 639) && (Ball.Y + 32 >= 160 && Ball.Y <= 287)) {
      Players.Player1[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
    }
  }
  DesacelateBall() {
    //desacelacao do vetores positos
    if (ballSpeedX > 8) {
      ballSpeedX--;
    }
    if (ballSpeedY > 8) {
      ballSpeedY--;
    }
    // desacelaracao dos vetores negativos
    if (ballSpeedX < -8) {
      ballSpeedX++;
    }
    if (ballSpeedY < -8) {
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
    for(let c =0; c < 300; c++){
      font.print(200,c, "Table Hockey \n Alex-DevGamer \n Athena Env \n Daniel Santos");
      os.sleep(1000);
    }
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
    MenuImage.play.draw(259, 254);
    MenuImage.settings.draw(234, 310);
    MenuImage.credits.draw(243, 367);
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
  }

  draw() {
    GameImage.bg.draw(0, 0);
    GameImage.ball.draw(Ball.X, Ball.Y);
    GameImage.red.draw(Players.Player1[0].X, Players.Player1[0].Y);
    GameImage.blue.draw(Players.Player2[0].X, Players.Player2[0].Y);
    font.print(210, 10, "Blue " + Players.Player1[0].gols + " x " + Players.Player2[0].gols + " Red");
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
      this.ResetPlayers(), 3000;
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
    if (Ball.X + 32 >= canvas.width || Ball.X <= 0) {
      ballSpeedX = -ballSpeedX; // Inverter a direção no eixo X
    }
    if (Ball.Y + 32 >= canvas.height || Ball.Y <= 0) {
      ballSpeedY = -ballSpeedY; // Inverter a direçãeixo Yo no 
    }

    // Verificar colisão com os jogadores (paddles)
    if (// paddle right
    Ball.X + 32 >= Players.Player2[0].X && Ball.X <= Players.Player2[0].X + 64 && Ball.Y + 32 >= Players.Player2[0].Y && Ball.Y <= Players.Player2[0].Y + 64
    ) {
      ballSpeedY = this.normalizeValue(pd.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd.rx, minOriginal, maxOriginal);
    }
    if (Ball.X <= Players.Player1[0].X + 64 && Ball.X + 32 >= Players.Player1[0].X && Ball.Y + 32 >= Players.Player1[0].Y && Ball.Y <= Players.Player1[0].Y + 64) {
      ballSpeedY = this.normalizeValue(pd2.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd2.rx, minOriginal, maxOriginal);
      if(selected == 1){
        ballSpeedY = this.normalizeValue(Players.Player1[0].Y, minOriginal, maxOriginal);
        ballSpeedX = -this.normalizeValue(Players.Player1[0].X, minOriginal, maxOriginal);
      }
    }
    if (Ball.X + 20 > canvas.width || Ball.X + 15 < 0) {
      ballSpeedX = -25;
    }
    if (Ball.Y + 20 > canvas.height || Ball.Y + 15 < 0) {
      ballSpeedY = -25;
    }
    if(selected == 1){
      if (Players.Player1[0].Y + 64 / 2 < Ball.Y) {
        Players.Player1[0].Y += 10;  // Ajuste a velocidade da CPU aqui (atualmente 3 pixels por frame)
      } else {
        Players.Player1[0].Y -= 10;  // Ajuste a velocidade da CPU aqui (atualmente 3 pixels por frame)
      }
      if (Players.Player1[0].X + 64 / 2 < Ball.Y) {
        Players.Player1[0].X += 10;  // Ajuste a velocidade da CPU aqui (atualmente 3 pixels por frame)
      } else {
        Players.Player1[0].X -= 10;  // Ajuste a velocidade da CPU aqui (atualmente 3 pixels por frame)
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
