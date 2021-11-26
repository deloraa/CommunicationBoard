import DeviceDetector from "https://cdn.skypack.dev/device-detector-js@2.2.10";
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os
testSupport([
    { client: 'Chrome' },
]);
function testSupport(supportedDevices) {
    const deviceDetector = new DeviceDetector();
    const detectedDevice = deviceDetector.parse(navigator.userAgent);
    let isSupported = false;
    for (const device of supportedDevices) {
        if (device.client !== undefined) {
            const re = new RegExp(`^${device.client}$`);
            if (!re.test(detectedDevice.client.name)) {
                continue;
            }
        }
        if (device.os !== undefined) {
            const re = new RegExp(`^${device.os}$`);
            if (!re.test(detectedDevice.os.name)) {
                continue;
            }
        }
        isSupported = true;
        break;
    }
    if (!isSupported) {
        alert(`This demo, running on ${detectedDevice.client.name}/${detectedDevice.os.name}, ` +
            `is not well supported at this time, continue at your own risk.`);
    }
}
const controls = window;
const drawingUtils = window;
const mpFaceMesh = window;
const config = { locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
            `${mpFaceMesh.VERSION}/${file}`;
    } };

const videoElement = document.getElementsByClassName('input_video')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];

/**
 * Solution options.
 */
const solutionOptions = {
    selfieMode: false,
    enableFaceGeometry: false,
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    lookDelay: 500,
    lookWidthThreshold: 0.08
};
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();

var imagelinks = ["images/amafraid.jpg", "images/amfeelingsick.jpg", "images/aminpain.jpg","images/amangry.jpg","images/amfrustrated.jpg","images/amsad.jpg","images/amchoking.jpg","images/amhotcold.jpg","images/amshortofbreath.jpg","images/amdizzy.jpg","images/amhungrythirsty.jpg","images/amtired.jpg","images/wanthobupdown.jpg","images/wanttvvideo.jpg","images/wanttobecomforted.jpg","images/wantliedown.jpg","images/wantquiet.jpg","images/wanttobesucctioned.jpg","images/wantlightsoffon.jpg","images/wantremote.jpg","images/wanttogohome.jpg","images/wantwater.jpg","images/wantsitup.jpg","images/wanttosleep.jpg"];

var imagesswapL = [document.getElementById("img000"),document.getElementById("img001"),document.getElementById("img002"),document.getElementById("img010"),document.getElementById("img011"),document.getElementById("img012"),document.getElementById("img020"),document.getElementById("img021"),document.getElementById("img022"),document.getElementById("img030"),document.getElementById("img031"),document.getElementById("img032")];
var imagesswapR = [document.getElementById("img100"),document.getElementById("img101"),document.getElementById("img102"),document.getElementById("img110"),document.getElementById("img111"),document.getElementById("img112"),document.getElementById("img120"),document.getElementById("img121"),document.getElementById("img122"),document.getElementById("img130"),document.getElementById("img131"),document.getElementById("img132")];

function resetImages(){
  leftImages = imagelinks.slice(0,Math.ceil(imagelinks.length/2));
  rightImages = imagelinks.slice(Math.ceil(imagelinks.length/2),imagelinks.length);
  for (let i = 0; i < leftImages.length; i++) {
      imagesswapL[i].src = leftImages[i];
      imagesswapL[i].style.visibility = "visible";
  }
  for (let i = 0; i < rightImages.length; i++) {
      imagesswapR[i].src = rightImages[i];
      imagesswapR[i].style.visibility = "visible";
  }
}

const LEFT_IRIS = [474,475,476,477];
const LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398];

const RIGHT_IRIS = [469,470,471,472];
const RIGHT_EYE= [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161 , 246] ;

var lefteyepts = new Array(LEFT_EYE.length);
var leftirispts = new Array(LEFT_IRIS.length);
var righteyepts = new Array(RIGHT_EYE.length);
var rightirispts = new Array(RIGHT_IRIS.length);

function euclideanDistance(x1,y1,x2,y2){
    return Math.sqrt( (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2) );
}

function blinkRatio(landmarks):
    //Horizontal line right eyes
    var rh_right = landmarks[right_indices[0]]
    var rh_left = landmarks[right_indices[8]]
    //vertical line 
    var rv_top = landmarks[right_indices[12]]
    var rv_bottom = landmarks[right_indices[4]]

    //LEFT_EYE 
    //horizontal line 
    var lh_right = landmarks[left_indices[0]]
    var lh_left = landmarks[left_indices[8]]

    //vertical line 
    var lv_top = landmarks[left_indices[12]]
    var lv_bottom = landmarks[left_indices[4]]

    var rhDistance = euclaideanDistance(rh_right, rh_left)
    var rvDistance = euclaideanDistance(rv_top, rv_bottom)

    var lvDistance = euclaideanDistance(lv_top, lv_bottom)
    var lhDistance = euclaideanDistance(lh_right, lh_left)

    var reRatio = rhDistance/rvDistance
    var leRatio = lhDistance/lvDistance

    var ratio = (reRatio+leRatio)/2
    return ratio 

function getEyeMarkers(eyepts, eyeindicies, irisindicies){
  var maxEyeX = eyepts[0][eyeindicies[0]].x;
  var minEyeX = eyepts[0][eyeindicies[0]].x;

    for (let i = 0; i < eyeindicies.length; i++) {
        if (eyepts[0][eyeindicies[i]].x > maxEyeX){
           maxEyeX = eyepts[0][eyeindicies[i]].x;
        }
        if (eyepts[0][eyeindicies[i]].x < minEyeX){
           minEyeX = eyepts[0][eyeindicies[i]].x;
        }
    }
    var avgIrisX=0;
    for (let i = 0; i < irisindicies.length; i++) {
        avgIrisX = avgIrisX + eyepts[0][irisindicies[i]].x;
    }
    avgIrisX = avgIrisX/irisindicies.length;
    return [minEyeX,maxEyeX,avgIrisX];
}

//between 0.00-0.5
var widthThreshold = 0.08;

var LOOK_DELAY = 400; // 0.3 second


var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modalImgID");

var leftarrowelement = document.getElementById("leftarrow");
var rightarrowelement = document.getElementById("rightarrow");

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

var leftImages = imagelinks.slice(0,imagelinks.length/2);
var rightImages = imagelinks.slice(imagelinks.length/2,imagelinks.length);

var loaderelement = document.getElementById("loader");
var loadingtext = document.getElementById("loadingtext");

var iamelement = document.getElementById("iamtag");
var iwantelement = document.getElementById("iwanttag");

var depthOfSelection=0;

function onResults(results) {
    var minThreshold = 0.5-widthThreshold;
    var maxThreshold = 0.5+widthThreshold;
    fpsControl.tick();
    loaderelement.style.display = 'none';
    loadingtext.style.display = 'none';

    var minLeftEye = 0;
    var maxLeftEye = 0;
    var avgLIris = 0;
    var minRightEye = 0;
    var maxRightEye = 0;
    var avgRIris = 0;
    var timestamp = + new Date();

    if (results.multiFaceLandmarks.length !== 1 || lookDirection === "STOP") return
    [minLeftEye,maxLeftEye,avgLIris] = getEyeMarkers(results.multiFaceLandmarks, LEFT_EYE, LEFT_IRIS);
    [minRightEye,maxRightEye,avgRIris] = getEyeMarkers(results.multiFaceLandmarks, RIGHT_EYE, RIGHT_IRIS);

    var ratio = (avgLIris-minLeftEye)/(maxLeftEye-minLeftEye);

    if (
        ratio > maxThreshold &&
        lookDirection !== "LEFT" &&
        lookDirection !== "RESET"
        ) {
        startLookTime = timestamp;
        lookDirection = "LEFT";
        leftarrowelement.style.backgroundColor="#0b5ed7";
    } else if (
      ratio < minThreshold &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
      ) {
      startLookTime = timestamp;
      lookDirection = "RIGHT";
      rightarrowelement.style.backgroundColor="#0b5ed7"
    } else if (ratio <= maxThreshold && ratio >= minThreshold) {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
      leftarrowelement.style.backgroundColor="transparent";
      rightarrowelement.style.backgroundColor="transparent";
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
        if(leftImages.length == 1){
          // Get the modal
          modal.style.display = "block";
          modalImg.src = leftImages[0];
          //pause for 5000 ms on selection
          setTimeout(() => {
            startLookTime = Number.POSITIVE_INFINITY;
            lookDirection = null;
            resetImages();
            modal.style.display = "none";
            iwantelement.innerText = "I want...";
            iamelement.innerText = "I am..."
            depthOfSelection = 0;
          }, 5000);

          //do something with last image
        }else {
          if(depthOfSelection === 0){
              iwantelement.innerText = "I am..."
          }
          depthOfSelection = depthOfSelection + 1;

          rightImages = leftImages.slice(Math.ceil(leftImages.length/2),leftImages.length);
          leftImages = leftImages.slice(0,Math.ceil(leftImages.length/2));
            //set images here
            for (let i = 0; i < leftImages.length; i++) {
                imagesswapL[i].src = leftImages[i];
            }
            for (let i = leftImages.length; i < imagesswapL.length; i++) {
                imagesswapL[i].style.visibility = "hidden";
            }
            for (let i = 0; i < rightImages.length; i++) {
                imagesswapR[i].src = rightImages[i];
            }
            for (let i = rightImages.length; i < imagesswapR.length; i++) {
                imagesswapR[i].style.visibility = "hidden";
            }
            lookDirection = "STOP"
            startLookTime = Number.POSITIVE_INFINITY;
        }

      } else if(lookDirection === "RIGHT"){
        if(rightImages.length == 1){

          modal.style.display = "block";
          modalImg.src = rightImages[0];
          setTimeout(() => {
            startLookTime = Number.POSITIVE_INFINITY;
            lookDirection = null;
            resetImages();
            modal.style.display = "none";
            modal.style.display = "none";
            iwantelement.innerText = "I want...";
            iamelement.innerText = "I am..."
            depthOfSelection = 0;
          }, 5000);
          //do something with last image
        }else{
          if(depthOfSelection === 0){
              iamelement.innerText = "I want..."
          }
          depthOfSelection = depthOfSelection + 1;
          leftImages = rightImages.slice(0,Math.ceil(rightImages.length/2));
          rightImages = rightImages.slice(Math.ceil(rightImages.length/2),rightImages.length);
          //set images here - should make this a function.
          for (let i = 0; i < leftImages.length; i++) {
              imagesswapL[i].src = leftImages[i];
          }
          for (let i = leftImages.length; i < imagesswapL.length; i++) {
              imagesswapL[i].style.visibility = "hidden";
          }
          for (let i = 0; i < rightImages.length; i++) {
              imagesswapR[i].src = rightImages[i];
          }
          for (let i = rightImages.length; i < imagesswapR.length; i++) {
              imagesswapR[i].style.visibility = "hidden";
          }
        }
        lookDirection = "STOP"
        startLookTime = Number.POSITIVE_INFINITY;
      }

      lookDirection = "RESET";
    }


}

const faceMesh = new mpFaceMesh.FaceMesh(config);
faceMesh.setOptions(solutionOptions);
faceMesh.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, solutionOptions)
    .add([
    new controls.StaticText({ title: 'Settings' }),
    fpsControl,
    new controls.SourcePicker({
        onFrame: async (input, size) => {
            await faceMesh.send({ image: input });
        },
    }),
    new controls.Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
      title: 'Look Delay Threshold in milliseconds',
      field: 'lookDelay',
      range: [200, 3000],
      step: 100
    }),
    new controls.Slider({
      title: 'Look Width Threshold',
      field: 'lookWidthThreshold',
      range: [0.02, 0.3],
      step: 0.01
    }),
])
    .on(x => {
    const options = x;
    LOOK_DELAY = options.lookDelay;
    widthThreshold = options.lookWidthThreshold;
    faceMesh.setOptions(options);
});



