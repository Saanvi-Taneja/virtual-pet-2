//Create variables here
var dog,happyDog;
var database,foodS,foodStock;
var addFood,feed;
var fedTime,lastFed;
var foodObj;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj=new Food()

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood.createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(49,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
    
  }
  fedTime=database.ref('FeedTime');
        fedTime.on("value",function(data){
            lastFed=data,val();
        });
        foodObj.display();

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
          text("Last Feed :" + lastFed%12+ "PM",350,30);
        }else if(lastFed==0){
          text("Last Feed: 12 AM",350,30);
        } else{
          text("Last Feed:"+ lastFed +"AM",350,30);
        }
        function feedDog(){
          dog.addImage(happyDog);

          foodObj.updateFoodStock(foodObj.getFoodStock()-1);
          database.ref('/').update({
            Food:foodObj.getFoodStock(),
            feedTime:hour()
          })
        }
        function addFoods(){
          foodS++;
          database.ref('/').update({
            Food:foodS
          })
        }
        
      






        drawSprites();
    }

 
  




function readStock(data) {
  foodS=data.val();
}


function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x-1;
}

  database.ref('/').update({
Food:x
  })
}  


