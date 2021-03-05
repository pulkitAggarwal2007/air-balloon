var airballon,airballonimage;
var ground;
var height,database;
function preload(){
airballonimage = loadImage("images/ballon.png");
ground = loadImage("images/background.png");
}
function setup() {
  createCanvas(800,500);
  database = firebase.database();

  airballon = createSprite(400, 200, 50, 50);
  airballon.addImage("flying",airballonimage);
  airballon.scale = 0.5

  var airballonref = database.ref("airballon/height");
airballonref.on("value",readHeight,showerror);
}


function draw() {
  background(ground);  
if(height!== undefined){
  if(keyDown(LEFT_ARROW)){
    //airballon.x = airballon.x-10;
    changeHeight(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
   // airballon.x = airballon.x+10;
   changeHeight(10,0);
}
else if(keyDown(UP_ARROW)){
   // airballon.y = airballon.y-10;
   changeHeight(0,-10);
}
else if(keyDown(DOWN_ARROW)){
  // airballon.y = airballon.y+10;
  changeHeight(0,10);
}

}

  drawSprites();
}
function changeHeight(x,y){
  database.ref("airballon/height").set({
      x:airballon.x+x,
      y:airballon.y+y
  })
}
function readHeight(data){
height = data.val();
airballon.x = height.x;
airballon.y = height.y;
}
function showerror(){
console.log("error in your database");
}