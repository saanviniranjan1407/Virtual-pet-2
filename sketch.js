var dog, dogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500); 
  
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.16;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock,writeStock);
}

function draw() {  
  background(46,139,87);
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  textSize(15);
  fill("white");
  stroke("black");
  text("Note: Press UP_ARROW Key To feed Drago Milk!",90,30);

  textSize(15);
  text("Food Remaining: " + foodS, 180, 200);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
  
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
}