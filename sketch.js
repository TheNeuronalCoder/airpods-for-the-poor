let video;
let poseNet;
let pose;

let airpodsLeft;
let airpodsRight;

function preload() {
  airpodsLeft = loadImage('airpods-left.png');
  airpodsRight = loadImage('airpods-right.png');
  
  console.log(airpodsLeft.width);
  console.log(airpodsRight.height);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', getPoses);
  
  airpodsLeft.resize(27, 60);
  airpodsRight.resize(27, 60);
}

function getPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(width,0);
  scale(-1, 1);

  image(video, 0, 0);
  if (pose) {
    imageMode(CENTER);
    image(airpodsRight, pose.rightEar.x, pose.rightEar.y, 60, 60);
    image(airpodsLeft, pose.leftEar.x, pose.leftEar.y, 60, 60);
  }
  
  pop();
}
