

let HEIGHT = 500;
let xoffset = 0;
let yoffset = 0;
let baseZoom = 0;
let canvas_center;

let h_slider;
let MAX_ANGLE=90;
let MAX_LENGTH=250;
let MAX_DEPTH=11;
let length;
let initial_length;
let angle;


function setup() {
  
  var canvas = createCanvas(windowWidth, HEIGHT);
  canvas.parent('sketch-holder');
  

  gui = createGui();
  h_slider = createSlider("myButton", 10, HEIGHT-50);
  v_slider = createSliderV("Vertical", 10, HEIGHT/2 - 75);

  background(20);
  stroke('green');
  strokeWeight(10);
  colorMode(HSB, 100);


}
// https://github.com/L05/p5.touchgui
function draw() {

  background(20);
  canvas_center = createVector(windowWidth/2.,HEIGHT/2.);
  origin = canvas_center;
  origin.y = HEIGHT;
  destiny = canvas_center.copy();
  
  angle = h_slider.val/100 * MAX_ANGLE;
  initial_length = v_slider.val * MAX_LENGTH;
  destiny.y -= initial_length ;

  //tree(origin, destiny, initial_length);
  push();
  translate(windowWidth/2., height);
  tree(initial_length);
  pop();

  stroke('white');
  // textSize(20);
  
  //text("Angle", 160, HEIGHT-28);
  fill(30);

  drawGui();
}


function tree(len, depth=0) {
  let c = lerpColor( color('Maroon'), color('GreenYellow'), (depth/MAX_DEPTH));
  stroke(c);
  line(0,0,0,-len);
  translate(0, -len);
  depth++;
  let proportion = 0.75;
  
  strokeWeight(lerp(10,0, depth/MAX_DEPTH));

  
  if (depth < MAX_DEPTH) {
    push();
    rotate(angle);
    tree(len*proportion, depth);
    pop();
    push();
    rotate(-angle);
    tree(len*proportion, depth);
    pop();

  }

}

function windowResized() {
  resizeCanvas(windowWidth, HEIGHT);
}


function touchMoved(event) {

  xoffset += (pmouseX - mouseX);
  yoffset += (pmouseY - mouseY);
  return false;

}

function mouseWheel(event) {
  
  baseZoom += event.deltaY/1000;
  baseZoom = constrain(baseZoom, -0.2, 0.8);

}