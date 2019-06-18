//           __     /    __              __   __  ___                 __   __  __      O ___  __   __
//          |__  |   | |__| |   /\     |  \ |  | |__      /\    /\  |  | |__ |  | |  | |  |  |  | |__
//          |    |   | |\   |  /_ \    |  | |  |    |    /  \  /  \ |  |    ||  | |  | |  |  |  |    |
//          |    |___| | \  | /    \   |__/ |__|  __|   /    \/    \|__|  __||__| |__| |  |  |__|  __|
//                                                                               \
//Legenda: (#)->índice                             |* -> Informação importante na legenda
//                                                 |    1 - direção(3) = serve para armazenar a direção que está indo   
// ----------------------------------------------------## VARIÁVEIS ##---------------------------------------------------------------------
//Variáveis do Jogador                                   
jogador = [0, 3, 10,70];     // parâmetro = [Origem(0), velocidade(1), diâmetro(2),vida(3)];


//Variáveis para os insetos
foco = [0, 0, 20]             // parâmetro = [Origem(0), velocidade(1), diâmetro(2)]
inseto = [0, 2, 5];           // parâmetro = [Origem(0), velocidade(1), diâmetro(2)]
focos = [];                   // guarda conjunto de foco
enxame = [];                  // guarda conjunto de inseto

//Variaveis para fumaça
fum=[0, 2, 12, 0, 0, 1000];  // parâmetro = [Origem(0), velocidade(1), diâmetro(2), direção(3)*¹, posição inicial(4), distância percorrida(5)]; fum=fumaça.
fumace=[];                   // conjunto de fumaça

//Variáveis Universal
dificuldade = 1;             // Nível
tela=0;                      // Telas do jogo
pontos=0;                    // Pontos do jogador

// ----------------------------------------------------## JOGO ##---------------------------------------------------------------------
//Imagens do jogo
function preload(){
  imgInicial=loadImage('inicio_de_Jogo.jpeg');
  imgCar=loadImage('car_sprite_1.png');
  imgCarW=loadImage('carro_fumaceW.png');
  imgCarD=loadImage('carro_fumaceA.png');
  imgCarS=loadImage('carro_fumaceS.png');
  imgCarA=loadImage('carro_fumaceD.png');
  imgInseto=loadImage("inseto_sprite_1.png");
  imgFumaca=loadImage("veneno_sprite_1.png");
  imgFocos=loadImage("aguaParada_sprite_1.png")
  imgCampo=loadImage("Campo.png");
  imgFim=loadImage('fim_de_jogo.jpeg');

}
//Inicializa
function setup() {
  createCanvas(640, 480); // Dimensão
  iniciarValores();       // Inicializa os vetores de jogador, inseto, foco, fumaça
}

//Chamando as funções
function draw() {
modoOperacional();
}

//Índice do jogo
function modoOperacional(){
  switch(tela){
    case 0:
      background(imgInicial);
    break;
    case 1:
      jogo();
    break;
    case 2:
      gameOver();
    break;
     }
  }

//Inicializa o jogo
function jogo(){
  clear();
  fundo();
  painelDoJogador();
  teclado();
  atualizarElementos();
  jogadorCar();
  gerenciaFoco();


}

//Fim de jogo
function gameOver(){
  imageMode(CORNER);
  background(imgFim);
  pontua();

}

function painelDoJogador(){
  barraDeVida();
  pontua();
}

function barraDeVida(){
  rectMode(CORNER);
  fill("GREEN");
  rect(width*1/17,7,8*jogador[3],15,10);

}

function pontua(){
  fill("White");
  textSize(20);
  text(pontos.toString() + " Pontos ", width*1/17,50);

}
//Incializa a posição em xy dos personagens jogador,inseto,foco e fumaça
function iniciarValores(){
  jogador[0] = createVector(width/2, height/2);  // o índice (0) cria um vetor xy que define a origem
  inseto[0] = createVector(0, 0);                // o índice (0) cria um vetor xy que define a origem
  foco[0] = createVector(0, 0);                  // o índice (0) cria um vetor xy que define a origem
  fum[0] = createVector(0, 0);                   // o índice (0) cria um vetor xy que define a origem
  fum[3] = createVector(0, 0);                   // o índice (3) cria um vetor xy que define o diâmetro
}

//Cria o fundo
function fundo() {
  imageMode(CORNER);
  background(imgCampo);
}


/*--------------------------------------------------------------MOVIMENTO-------------------------------------------------------------*/
function teclado() {                                // #Tecla# | #Estrutura#
  if (keyIsDown(65)) {
    mover(jogador, -jogador[1], 0);//  A      | mover(objeto,x,y)      // parâmetro = [Nome do objeto, velocidade em X, velocidade Y]
    imgCar = imgCarA;
  }
  if (keyIsDown(68)) {
    mover(jogador, jogador[1], 0); //  D      | mover(objeto,x,y)      // parâmetro = [Nome do objeto, velocidade em X, velocidade Y]
    imgCar = imgCarD;
  }
  if (keyIsDown(87)) {
    mover(jogador, 0, -jogador[1]);//  W      | mover(objeto,x,y)      // parâmetro = [Nome do objeto, velocidade em X, velocidade Y]
    imgCar = imgCarW;
  }
  if (keyIsDown(83)) {
    mover(jogador, 0, jogador[1]); //  S      | mover(objeto,x,y)      // parâmetro = [Nome do objeto, velocidade em X, velocidade Y]
    imgCar = imgCarS;
  }
}                                                   

function keyTyped(){ 
  if(key === ' ') esfumacar();    // B.Espaço | função esfumaçar() para liberar fumaça
}

function keyPressed(){
  if(keyCode === ENTER) tela=1;    //ENTER    | Inicia o jogo 
}


//Limitante universal para os personagens jogador,inseto e foco não passarem da tela
function mover(obj, velX, velY) {                   // #Estrutura#  mover(objeto, velocidade em X, velocidade Y)
  obj[0].x += velX;
  obj[0].y += velY;
  if (obj[0].x > width - obj[2]) 
    obj[0].x = width - obj[2];

  if (obj[0].y > height - obj[2]) 
    obj[0].y = height - obj[2];

  if (obj[0].x < obj[2]) 
    obj[0].x = obj[2];

  if (obj[0].y < obj[2])
    obj[0].y = obj[2];
}

/*-----------------------------------------------------------ILUSTRAÇÃO-------------------------------------------------------------*/

function jogadorCar(){
  imageMode(CENTER);
  image(imgCar,jogador[0].x,jogador[0].y);
}
function mosquito(obj){
  image(imgInseto,obj[0].x,obj[0].y);
}
function veneno(ven){
  image(imgFumaca,ven[0].x,ven[0].y);
}
function aguaParadaComMosquito(ag){
  image(imgFocos,ag[0].x,ag[0].y);
}

/*-----------------------------------------------------------ELEMENTOS-------------------------------------------------------------*/
function atualizarElementos(){

    /***********************************************************Disparo*************************************************************/
    //Direção da Fumaça
    if(fumace.length > 0) {                 // Se houver fumaça em jogo
     for(f = 0; f< fumace.length; f++){     // para cada fumaça
       var vel = fumace[f][3];              // examina o vetor direcional da fumaça
       fumace[f][0].add(vel);               // adiciona-o à posição da fumaça
       veneno(fumace[f]);                   // mostra a fumaça

   /*************************************************************Colisão************************************************************/
  //Colisão entre fumaça e foco
       for(b = 0; b<focos.length; b++){      // para cada foco em jogo
         if(colide(fumace[f], focos[b])){    // testa colisão entre a fumaça e o foco
          focos.splice(b, 1);                // elimina o foco
          pontos+=3;
          }
        }  

  //Colisão entre fumaça e mosquito
       for(i = 0; i<enxame.length; i++){       // para cada mosquito em jogo
          if(colide(fumace[f], enxame[i])){    // testa colisão entre a fumaça e o mosquito
           enxame.splice(i, 1);                // elimina o mosquito
           pontos++;
          }
        }

       if(fumace[f][0].dist(fumace[f][4])>fum[5]){
         fumace.splice(f, 1);
        }
      }
    } 
  
    for(var l=0;l<enxame.length;l++){        // Colisão com o mosquito -5 da vida jogador
      if(colide(jogador,enxame[l])){
        jogador[3]-=8;
    }
    
      if(jogador[3]<=0){                     //Tela de Fim de jogo para o jogador
       tela=2;
      }
    }

    for(var s=0;s<focos.length;s++){         // Colisão com o foco -5 da vida jogador
     if(colide(jogador,focos[s])){
       jogador[3]-=10;
      }

     if(jogador[3]<=0){                      //Tela de Fim de jogo para o jogador
       tela=2;
      }
    }


  for (var i = 0; i < focos.length; i++) {                
   aguaParadaComMosquito(focos[i]);
  }

 //Movimento do Inseto
  for (var e = 0; e < enxame.length; e++) {             
   var r = random(-1, 1);
   mover(enxame[e], random(-10, 10), random(-10, 10));
   mosquito(enxame[e]);
 }
}


/*-----------------------------------------------------CRIAÇÃO DE FOCOS E ENXAMES----------------------------------------------------------*/
//Gerência o Foco
function gerenciaFoco() {
  while(focos.length<dificuldade){        // Cria o focos 
    geraFoco();
  }
  if (enxame.length < focos.length){      // se o conjunto de insetos(enxame) for menor que o conjunto de foco(focos)
   for(var i = 0; i< focos.length; i++){  //então gera inseto(n,i). 
     geraInseto(5, i);                    // n é o número de insetos, i focos.
    }
   dificuldade++
  }
}

// Cria focos
function geraFoco() {
  foco[0] = createVector(random(foco[2], width - foco[2]), random(foco[2], height - foco[2])); // Modifico a origem do foco pra um valor aleatório
  var aguaParada = foco.slice();                                                               // linko o vetor foco nessa nova variável aguaParada
  focos.push(aguaParada);                                                                      // adiciono aguaParada ao vetor focos para armazenar
}

//Gera Inseto
function geraInseto(n, f) {                               // gera n insetos a partir da posição de um foco f. 'n' é o núm de insetos e 'f' é o foco
for (var i = 0; i < n; i++) {                             // laço pra criar n insetos
  var pos = createVector(focos[f][0].x, focos[f][0].y);   // a variável pos vai receber o vetor(x,y) para determinar o ponto origem
  inseto = [pos, 1, 5];                                   // Parâmetro[origem(0), velocidade(1), diâmetro(2)] do inseto
  enxame.push(inseto);                                    // adiciona inseto ao vetor enxame
}
}

/*--------------------------------------------------------------FUMAÇA------------------------------------------------------------*/
//Cria fumaça
function esfumacar(){
  var direcao = createVector(mouseX, mouseY);     // Vetor direcional para o mouse
  direcao.sub(jogador[0]);                        // assume o valor de origem do jogador
  direcao.normalize();                            // 
  direcao.setMag(fum[1]);                         //
  var fumo = [];                                  //
  fumo = fum.slice();                             // 
  fumo[3] = direcao;                              //
  fumo[4] = jogador[0].copy();                    //
  criaFumaca(1, fumo);                            //
}

//Cria fumaça
function criaFumaca(numf, f){        //numf é o número de fumaça
  for (var i = 0; i < numf; i++) {
    f[0] = jogador[0].copy();        
    fumace.push(f);                  
  }
}

/*--------------------------------------------------------------COLISÃO------------------------------------------------------------*/
function colide(p1, p2){                                                // recebe 2 objetos e testa a colisão entre eles
 return(dist(p1[0].x, p1[0].y, p2[0].x, p2[0].y) < p1[2]+p2[2]); 
}
/*---------------------------------------------------------------SOM---------------------------------------------------------------*/

