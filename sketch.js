var dog, dogimg, dogimg2;
var database;
var FoodStk;
var addFood, feeddog;
var foodObj, foodS;
var lastFed;
function preload()
{
dogimg=loadImage("images/dogImg.png")
dogimg2=loadImage("images/dogImg1.png")

}

function setup() {
  database=firebase.database()
	createCanvas(1000, 700);
  foodObj=new Food()
dog=createSprite(800, 200, 20, 20)
 dog.addImage(dogimg) 
dog.scale=0.2;

FoodStk=database.ref('FoodStock')
FoodStk.on("value", readStk)

addFood=createButton("ADD THE FOOD")
addFood.position(400, 100);
addFood.mousePressed(addFoods)

feedDog=createButton("CLICK TO FEED")
feedDog.position(600, 100);
feedDog.mousePressed(eat)

}


function draw() {  
  background("Orange")
  foodObj.display()
fedTime=database.ref('LastFed')
fedTime.on("value", function (data){
  lastFed=data.val()
})
fill ("red")
/*textSize(15)
text("REMAINING FOOD---"+ fs, 200, 200)
text("Please press the up arrow key to feed the dog", 200, 50)*/

fill(255, 255, 254);
textSize(15);
if(lastFed>=12)
{

text("last feed: "+lastFed%12+ " PM", 350, 30);


}else if(lastFed===0){
  text("Last Feed:12 AM", 350, 30);

}else{
  text("lastFeed : "+ lastFed + " AM", 350, 30)
}

  drawSprites();
  }
function readStk(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
  
}


function addFoods(){
foodS++
database.ref('/').update({
  FoodStock:foodS

})



}
function eat(){
  dog.addImage(dogimg2);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  } 

database.ref('/').update({
 FoodStock :foodObj.getFoodStock(),
  LastFed:hour()
})


}




