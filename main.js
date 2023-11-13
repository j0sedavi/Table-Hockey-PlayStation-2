// {"name": "Air Hockey Challenger", "author": "Alex Dev", "version": "04012023", "icon": "app_icon.png", "file": "main.js"}
var font = new Font("fonts/LEMONMILK-Regular.otf");
let canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;
Screen.setMode(canvas);

Sound.setVolume(100);
Sound.setVolume(100,0);

let sounds={
  ball_audio: Sound.load("assets/sound/snd13.wav")
};

  
const colors = {
  Black: Color.new(0, 0, 0),
  White: Color.new(255, 255, 255),
  BlueDark: Color.new(23, 27, 255),
  Blue: Color.new(48, 92, 255)
};

let particles = [];
let imagePart = new Image("assets/effect/light_obstacle.png");
const MenuImage = {
  menu: new Image("assets/mainmenu/mainmenu.png"),
  menu_pause: new Image("assets/mainmenu/menu_pause.png"),
  menu_opçoes: new Image("assets/mainmenu/menu_opcões.png"),
  hand_difficulty: new Image("assets/mainmenu/difficulty.png"),
  seta: new Image("assets/mainmenu/Check.png")
};
var Players = {
  Player1: [{ X: 569, Y: 195, gols : 0}],
  Player2: [{ X: 13, Y: 195, gols : 0 }]
};

const GameImage = {
  bg: new Image("assets/game/arena.png"),
  ball: new Image("assets/game/ball.png"),
  red: new Image("assets/game/red_paddle.png"),
  blue: new Image("assets/game/blue_paddle.png"),
  winner: new Image("assets/game/result/result_text_youwin.png"),
  loser: new Image("assets/game/result/result_text_youlose.png")
};

const Black = Color.new(255, 255, 255);
font.color = Black;

var screen = 0;


// variaveis do jogo
var Ball = { X: 285, Y: 190};
// eixo anolosico da maxinha
var minOriginal = 0;
var maxOriginal = 640;
let new_pad = Pads.get();
let old_pad = new_pad;
let pd = Pads.get();
let pd2 = Pads.get();
var velocidade = 8;
var ballSpeedX = 2;
var ballSpeedY = 2;
let Nums = {
  nums_red : new Image("assets/num/num_blue_"+Players.Player2[0].gols+".png"),
  nums_blue : new Image( "assets/num/num_blue_"+Players.Player1[0].gols+".png")
}
var op_seta = 
  [{ x: 388, y: 317 },
  { x: 388, y: 357 },
  { x: 388, y: 397 },
  { x: 388, y: 397 },
  { x: 388, y: 397 }]
var seta = 
  [{ x: 388, y: 317 },
  { x: 388, y: 357 },
  { x: 388, y: 397 }];

let seta_pos = seta[0] 
var Count = 0;
var selected = 0;
var difficulty = 0;


class main {
  
  SetScreen() {
    if (screen == 0) {
      this.Menu();
    }
    if (screen == 1) {
      this.Play();
    }
    if (screen == 2){
      this.menu_opçoes();
    }
    if (screen == 3){
      this.menu_pause();
    }
  }
  createParticle(x, y, dx, dy, imagePart) {
    particles.push({ x, y, dx, dy, imagePart });
  }
  updateParticles() {
    for (let i = 0; i < particles.length; i++) {
      particles[i].x += particles[i].dx;
      particles[i].y += particles[i].dy;
    }
  }
  drawParticles() {
    for (let i = 0; i < particles.length; i++) {
      const { x, y, imagePart } = particles[i];
      imagePart.draw(x,y);
    }
  }
  ResetPlayers(){
    Players.Player1[0].X = 569;
    Players.Player1[0].Y = 195;
    Players.Player2[0].X = 13;
    Players.Player2[0].Y = 195;
  }

  MoveSetaUp() {
    if (Count > 0){
    seta_pos = seta[Count -= 1];
    selected -= 1;
    }else{
      seta_pos = seta[2]
      Count = 3;
      selected = 2;
    }
  }
  MoveSetaDown() {
    if (Count < 4){
      seta_pos = seta[Count += 1]
      selected += 1;
    }else{
    seta_pos = seta[0]
    Count = 0;
    selected = 0;
    }
  }

  Check_gol() {
    if ((Ball.X <= 1) && (Ball.Y + 64 >= 160 && Ball.Y <= 287)) {
      Sound.play(sounds.trobeta);
      Players.Player2[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
      Nums.nums_red = new Image("assets/num/num_blue_"+Players.Player2[0].gols+".png");
      Nums.nums_blue = new Image( "assets/num/num_blue_"+Players.Player1[0].gols+".png");
      
      
    }
    if ((Ball.X + 64 >= 639) && (Ball.Y + 64 >= 160 && Ball.Y <= 287)) {
      Sound.play(sounds.trobeta);
      Players.Player1[0].gols += 1;
      this.ResetBall();
      this.ResetPlayers();
      Nums.nums_red = new Image("assets/num/num_blue_"+Players.Player2[0].gols+".png");
      Nums.nums_blue = new Image( "assets/num/num_blue_"+Players.Player1[0].gols+".png");
    
  }
  }
  
  DesacelateBall() {
    //desacelacao do vetores positivos
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
    Ball.X = 285;
    Ball.Y = 190;
  }
  normalizeValue(rx, minOriginal, maxOriginal, minNew = 1, maxNew = 20) {
    if (rx < 0) {
      return -(minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal));
    } else if(rx > 0){
      return minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal);
    }else{
      return 0;
    }
  }
  Opcoes(){
    screen = 2;
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
    Sound.play(sounds.thema);
    MenuImage.menu.draw(0, 0);
    MenuImage.seta.draw(seta_pos.x, seta_pos.y);
  }

  menu_pause(){
    MenuImage.menu_pause.draw(0,0);
    MenuImage.seta.draw(seta_pos.x,seta_pos.y);
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
      this.ResetPlayers();
    }
    if (Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 1) {
      screen = 1;
      this.ResetBall();
      this.ResetPlayers();
      Players.Player1[0].gols = 0;
      Players.Player2[0].gols = 0;
    }
    if (Pads.check(new_pad, Pads.CROSS) && !Pads.check(old_pad, Pads.CROSS) && selected == 2) {
      screen = 0;
      
    }

    
  }

  menu_opçoes(){
    atual = 0;
    MenuImage.menu_opçoes.draw(0,0);
    MenuImage.hand_difficulty.draw(200,200);
    difficulty = 0;
    let pos_seta = op_seta[0];
    MenuImage.seta.draw(pos_seta.x,pos_seta.y);
    old_pad = new_pad;
    new_pad = Pads.get();

    if (Pads.check(new_pad, Pads.UP) && !Pads.check(old_pad, Pads.UP)) {
      if (atual > 0){
        pos_seta = op_seta[atual -= 1];
      }else{
        pos_seta = op_seta[4];
        difficulty = 4;
        atual =0;
      }
    }
    if (Pads.check(new_pad, Pads.DOWN) && !Pads.check(old_pad, Pads.DOWN)) {
      if (atual < 5){
        pos_seta = op_seta[atual += 1];
      }else{
        pos_seta = op_seta[0];
        difficulty = 0;
        atual
      }
    }
    
  }

  Move_paddles() {
    pd = Pads.get(0);
    if (pd.rx < -10) {
      Players.Player1[0].X = Players.Player1[0].X - velocidade;
    }
    if (pd.rx > 10) {
      Players.Player1[0].X = Players.Player1[0].X + velocidade;
    }
    if (pd.ry > 50) {
      Players.Player1[0].Y = Players.Player1[0].Y + velocidade;
    }
    if (pd.ry < -50) {
      Players.Player1[0].Y = Players.Player1[0].Y - velocidade;
    }
    // move paddle 1
    pd2 = Pads.get();
    if (pd2.lx < -10) {
      Players.Player2[0].X = Players.Player2[0].X - velocidade;
    }
    if (pd2.lx > 10) {
      Players.Player2[0].X = Players.Player2[0].X + velocidade;
    }
    if (pd2.ly > 50) {
      Players.Player2[0].Y = Players.Player2[0].Y + velocidade;
    }
    if (pd2.ly < -50) {
      Players.Player2[0].Y = Players.Player2[0].Y - velocidade;
    }
    
  }
  draw() {
    GameImage.bg.draw(0, 0);
    GameImage.ball.draw(Ball.X, Ball.Y);
    GameImage.red.draw(Players.Player1[0].X, Players.Player1[0].Y);
    GameImage.blue.draw(Players.Player2[0].X, Players.Player2[0].Y);
    Nums.nums_blue.draw(272,25);
    Nums.nums_red.draw(330,25);
    
  }

  start() {
    old_pad = new_pad;
    new_pad = Pads.get(0);

    if (Pads.check(new_pad, Pads.START) && !Pads.check(old_pad, Pads.START) && selected == 0) {
     screen = 3;
    }
    if (Pads.check(new_pad, Pads.START) && !Pads.check(old_pad, Pads.START) && selected == 1) {
      screen = 3;
     }
  }
  WinnerPlayer(){
    if(Players.Player1[0].gols == 10){
      GameImage.loser.draw(210, 220);
      Sound.play(sounds.winner);
      Players.Player1[0].gols = 0;
      Players.Player2[0].gols = 0;
      screen = 0;
    }else if(Players.Player2[0].gols == 10){
      GameImage.winner.draw(210, 220);
      Sound.play(sounds.winner);
      Players.Player2[0].gols = 0;
      Players.Player1[0].gols = 0;
      screen = 0;
    }
  }
  CollisionBall() {
    if (Ball.X + 70 > canvas.width || Ball.X < -2) {
      this.ResetBall();
    }
    if (Ball.Y + 70 > canvas.height || Ball.Y < -2) {
      this.ResetBall();
    }
    // Verificar colisão com as bordas da tela para a bola
    if (Ball.X + 64 >= canvas.width || Ball.X <= 0) {
      ballSpeedX = -ballSpeedX; // Inverter a direção no eixo X
      createParticle(100, 100, 2, 2);
      createParticle(200, 200, -1, 1);
      
    }
    if (Ball.Y + 64 >= canvas.height || Ball.Y <= 0) {
      ballSpeedY = -ballSpeedY; // Inverter a direçãeixo Yo no
      createParticle(100, 100, 2, 2);
      createParticle(200, 200, -1, 1);
    }
    //Colisão dos paddle com a parede
    if (Players.Player1[0].X < 320) {
      //meio
      Players.Player1[0].X = 320;
    }
    if (Players.Player1[0].Y > 348) {
      //baixo
      Players.Player1[0].Y = 348;
    }
    if (Players.Player1[0].Y < 0) {
      //cima
      Players.Player1[0].Y = 0;
    }
    if (Players.Player1[0].X > 540) {
      //fim direita
      Players.Player1[0].X = 540;
    }

    //player 2
    if (Players.Player2[0].X > 220) {
      //meio
      Players.Player2[0].X = 220;
    }
    if (Players.Player2[0].Y > 348) {
      //baixo
      Players.Player2[0].Y = 348;
    }
    if (Players.Player2[0].Y < 0) {
      //cima
      Players.Player2[0].Y = 0;
    }
    if (Players.Player2[0].X < 0) {
      //fim esquerda
      Players.Player2[0].X = 0;
    }
    // Verificar colisão com os jogadores (paddles)
    if (// paddle esq
    Ball.X + 64 >= Players.Player2[0].X && Ball.X <= Players.Player2[0].X + 100 && Ball.Y + 64 >= Players.Player2[0].Y && Ball.Y <= Players.Player2[0].Y + 100
    ) {
      ballSpeedY = this.normalizeValue(pd.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd.rx, minOriginal, maxOriginal);
    }
    if (Ball.X <= Players.Player1[0].X + 100 && Ball.X + 64 >= Players.Player1[0].X && Ball.Y + 64 >= Players.Player1[0].Y && Ball.Y <= Players.Player1[0].Y + 100) {
      ballSpeedY = this.normalizeValue(pd2.ry, minOriginal, maxOriginal);
      ballSpeedX = this.normalizeValue(pd2.ry, minOriginal, maxOriginal);
      if(selected == 1){
        ballSpeedY = this.normalizeValue(Players.Player1[0].Y, minOriginal, maxOriginal);
        ballSpeedX = this.normalizeValue(Players.Player1[0].X, minOriginal, maxOriginal);
      }
    }
    if(selected == 1){
      if (Players.Player1[0].Y + 100 / 2 < Ball.Y) {
        Players.Player1[0].Y += 10;  // Ajuste a velocidade da CPU aqui
      } else {
        Players.Player1[0].Y -= 10;  // Ajuste a velocidade da CPU aqui 
      }
      
      if (Players.Player2[0].X / 2 < Ball.Y){
        Players.Player1[0].X += 10;  // Ajuste a velocidade da CPU aqui 
      } else {
        Players.Player1[0].X -= 10;  // Ajuste a velocidade da CPU aqui 
      }
      
    }
    
  }

  MoveBall() {
    Ball.X -= ballSpeedX;
    Ball.Y -= ballSpeedY;

  }

  Play() {
    this.Move_paddles();
    this.MoveBall();  // Adicionando a movimentação da bola
    this.CollisionBall();
    this.draw();
    this.DesacelateBall();
    this.Check_gol();
    this.WinnerPlayer();
    this.updateParticles();
    this.drawParticles();
    
    
  }
}

const Game = new main();
os.setInterval(() => {
  Screen.clear();
  Game.SetScreen();
  Screen.waitVblankStart();
  Screen.flip();
  
}, 0);
