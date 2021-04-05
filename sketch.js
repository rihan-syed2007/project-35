//Create variables here
var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS,foodStock;
var fed=19;

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

	createCanvas(500,500);
  
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.3;
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  fed=fed-1
  dog.addImage(happyDogImg);
 }
if(fed<=0){
  dog.addImage(dogImg);
  fed=0;
}

 drawSprites();

 textSize(15);
 fill("white");
 text("Note: Press UP_ARROW key to feed Drago Milk",100,20);
 text("Food Remaining: "+fed,170,100);
}

function readStock(data){
 foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
 else {
  x=x-1;
  }
 database.ref('/').update({
    food:x
  })
}