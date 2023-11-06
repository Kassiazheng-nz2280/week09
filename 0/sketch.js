let img;
let video;
let predictions = [];
let facemesh;
let leftEyePosition = {
  x: 0,
  y: 0,
}
let rightEyePosition = {
  x: 0,
  y: 0,
}
let leftEyePosition1 = {
  x: 0,
  y: 0,
}
let rightEyePosition1 = {
  x: 0,
  y: 0,
}
function preload() {
  img = loadImage('image.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create capture
  video = createCapture(VIDEO);
  video.hide();

  // initialize model
  facemesh = ml5.facemesh(video);

  // add detection callback
  facemesh.on("face", (results) => {
    console.log(results)
    leftEyePosition.x = results[0].annotations.leftEyeLower2[4][0];
    leftEyePosition.y = results[0].annotations.leftEyeLower2[4][1];
    rightEyePosition.x = results[0].annotations.rightEyeLower2[4][0];
    rightEyePosition.y = results[0].annotations.rightEyeLower2[4][1];

    leftEyePosition1.x = results[0].annotations.leftEyeLower3[8][0];
    leftEyePosition1.y = results[0].annotations.leftEyeLower3[8][1];
    rightEyePosition1.x = results[0].annotations.rightEyeLower3[8][0];
    rightEyePosition1.y = results[0].annotations.rightEyeLower3[8][1];
  
    predictions = results;
  });
  noStroke();
}

function drawBoundingBox(bbox) {
  let x = bbox.topLeft[0][0];
  let y = bbox.topLeft[0][1];
  let w = bbox.bottomRight[0][0] - x;
  let h = bbox.bottomRight[0][1] - y;

  push();
  
  // stroke(0, 200, 0);
  noFill();
  rect(x, y, w, h);
  pop();
}

function draw() {
  background(0);
  image(video, 0, 0);
  ellipse(leftEyePosition.x, leftEyePosition.y+10, 8);
  image(img,leftEyePosition.x - img.width/4, leftEyePosition.y, img.width/2, img.height/2);
  ellipse(rightEyePosition.x, rightEyePosition.y+10, 8);
  image(img,rightEyePosition.x - img.width/4, rightEyePosition.y, img.width/2, img.height/2);
  ellipse(leftEyePosition1.x, leftEyePosition1.y, 6);
  ellipse(rightEyePosition1.x, rightEyePosition1.y, 6);
  ellipse(leftEyePosition.x, leftEyePosition.y-4, 6);
  ellipse(rightEyePosition.x, rightEyePosition.y-4, 6);
  // if detected, draw mesh and bounding box
  for (let pi = 0; pi < predictions.length; pi++) {
    let mesh = predictions[pi].scaledMesh;
    for (let mi = 0; mi < mesh.length; mi++) {
      let vPos = mesh[mi];
      // ellipse(vPos[0], vPos[1], 4, 4);
    }
    drawBoundingBox(predictions[pi].boundingBox);
  }
}
