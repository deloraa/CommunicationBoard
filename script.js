//between 0.00-0.5
var widthThreshold = 0.08;
var LOOK_DELAY = 300; // 0.5 second
var verticalThreshold = -0.11;
var LOOK_UP_DELAY = 200;
var upperBlinkCutoff = 5.5;
var lowerBlinkCutoff = 4;

var lookleftrightsensslider = document.getElementById("lookleftrightsensslider");
var lookleftrightsens = document.getElementById("lookleftrightsens");
lookleftrightsens.innerHTML = lookleftrightsensslider.value; // Display the default slider value
lookleftrightsensslider.oninput = function() {
    lookleftrightsens.innerHTML = this.value;
    widthThreshold = parseFloat(this.value);
}

var lookupsensslider = document.getElementById("lookupsensslider");
var lookupsens = document.getElementById("lookupsens");
lookupsens.innerHTML = lookupsensslider.value; // Display the default slider value
lookupsensslider.oninput = function() {
    lookupsens.innerHTML = this.value;
    verticalThreshold = -1 * parseFloat(this.value);
}

var timetoactivateslider = document.getElementById("timetoactivateslider");
var timetoactivate = document.getElementById("timetoactivate");
timetoactivate.innerHTML = timetoactivateslider.value; // Display the default slider value
timetoactivateslider.oninput = function() {
    timetoactivate.innerHTML = this.value;
    LOOK_DELAY = parseInt(this.value);
}

var timetoactivatelookupslider = document.getElementById("timetoactivatelookupslider");
var timetoactivatelookup = document.getElementById("timetoactivatelookup");
timetoactivatelookup.innerHTML = timetoactivatelookupslider.value; // Display the default slider value
timetoactivatelookupslider.oninput = function() {
    timetoactivatelookup.innerHTML = this.value;
    LOOK_UP_DELAY = parseInt(this.value);
}


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
const config = {
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
            `${mpFaceMesh.VERSION}/${file}`;
    }
};

const videoElement = document.getElementsByClassName('input_video')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];

var soundButton = document.getElementById('soundButton');
var soundOnOff = false;
soundButton.onclick = () => {
        if (soundOnOff) {
            soundOnOff = false;
            soundButton.className = "btn btn-outline-secondary"
            soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
        } else {
            soundOnOff = true;
            soundButton.className = "btn btn-outline-primary"
            soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'

       }
}

var bluetooth = document.getElementById('bluetooth');
var bluetoothbutton = document.getElementById('bluetoothButton');
let toggleLightCharacteristic;
let bluetoothDevice;
const DEVICE_NAME = 'DSD TECH';
const SEND_SERVICE = 0xFFE0;
const SEND_SERVICE_CHARACTERISTIC = 0xFFE1;
var bluetoothConnected = false;
bluetoothbutton.onclick = () => {
    if(bluetoothConnected === false){
    if (!navigator.bluetooth) {
        alert('Sorry, your browser doesn\'t support Bluetooth API');
        return;
    }
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SEND_SERVICE]
      })
        .then(device => {
          bluetoothDevice = device;
    
          return device.gatt.connect();
        })
        .then(server => server.getPrimaryService(SEND_SERVICE))
        .then(service => service.getCharacteristic(SEND_SERVICE_CHARACTERISTIC))
        .then(characteristic => {
          toggleLightCharacteristic = characteristic;
          bluetoothConnected = true;
          bluetoothbutton.className = "btn btn-outline-primary"
          bluetoothbutton.innerHTML = '<img src="images/bluetoothOn.svg" width="16" height="16" viewBox="0 0 16 16"></img>Bluetooth Connected';
          //toggleLightCharacteristic.writeValue(Uint8Array.of(1));
        })
        .catch(error => {
          console.error(error);
          bluetoothConnected = false;
          bluetoothbutton.className = "btn btn-outline-secondary"
          bluetoothbutton.innerHTML = '<img src="images/bluetoothOff.svg" width="16" height="16" viewBox="0 0 16 16"></img>Bluetooth Connected';
        });
    }

}


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


var imagelinks = ["images/amafraid.jpg", "images/amfeelingsick.jpg", "images/aminpain.jpg", "images/amangry.jpg", "images/amfrustrated.jpg", "images/amsad.jpg", "images/amchoking.jpg", "images/amhotcold.jpg", "images/amshortofbreath.jpg", "images/amdizzy.jpg", "images/amhungrythirsty.jpg", "images/amtired.jpg", "images/wanthobupdown.jpg", "images/wanttvvideo.jpg", "images/wanttobecomforted.jpg", "images/wantliedown.jpg", "images/wantquiet.jpg", "images/wanttobesucctioned.jpg", "images/wantlightsoffon.jpg", "images/wantremote.jpg", "images/wanttogohome.jpg", "images/wantwater.jpg", "images/wantsitup.jpg", "images/wanttosleep.jpg"];

//var imagesswapL = [document.getElementById("img000"), document.getElementById("img001"), document.getElementById("img002"), document.getElementById("img010"), document.getElementById("img011"), document.getElementById("img012"), document.getElementById("img020"), document.getElementById("img021"), document.getElementById("img022"), document.getElementById("img030"), document.getElementById("img031"), document.getElementById("img032")];
//var imagesswapR = [document.getElementById("img100"), document.getElementById("img101"), document.getElementById("img102"), document.getElementById("img110"), document.getElementById("img111"), document.getElementById("img112"), document.getElementById("img120"), document.getElementById("img121"), document.getElementById("img122"), document.getElementById("img130"), document.getElementById("img131"), document.getElementById("img132")];

var imagesswapIdReset = ["#img000", "#img001", "#img002", "#img010", "#img011", "#img012", "#img020", "#img021", "#img022", "#img030", "#img031", "#img032","#img100", "#img101", "#img102", "#img110", "#img111", "#img112", "#img120", "#img121", "#img122", "#img130", "#img131", "#img132"];

const leftImagesGlobal = ["#img000", "#img001", "#img002", "#img010", "#img011", "#img012", "#img020", "#img021", "#img022", "#img030", "#img031", "#img032"];
const rightImagesGlobal = ["#img100", "#img101", "#img102", "#img110", "#img111", "#img112", "#img120", "#img121", "#img122", "#img130", "#img131", "#img132"];
var leftImages = leftImagesGlobal;
var rightImages = rightImagesGlobal;
const imageSoundMap = new Map();
imageSoundMap.set("images/amafraid.jpg", "sounds/IamAfraid.mp3");
imageSoundMap.set("images/amfeelingsick.jpg", "sounds/IamFeelingSick.mp3");
imageSoundMap.set("images/aminpain.jpg", "sounds/IaminPain.mp3");
imageSoundMap.set("images/amangry.jpg", "sounds/IamAngry.mp3");
imageSoundMap.set("images/amfrustrated.jpg", "sounds/IamFrustrated.mp3");
imageSoundMap.set("images/amsad.jpg", "sounds/IamSad.mp3");
imageSoundMap.set("images/amchoking.jpg", "sounds/IamChoking.mp3");
imageSoundMap.set("images/amhotcold.jpg", "sounds/IamColdorHot.mp3");
imageSoundMap.set("images/amshortofbreath.jpg", "sounds/IamShortofBreath.mp3");
imageSoundMap.set("images/amdizzy.jpg", "sounds/IamDizzy.mp3");
imageSoundMap.set("images/amhungrythirsty.jpg", "sounds/IamHungryorThirsty.mp3");
imageSoundMap.set("images/amtired.jpg", "sounds/Iamtired.mp3");
imageSoundMap.set("images/wanthobupdown.jpg", "sounds/IWantHeadofbeduporDown.mp3");
imageSoundMap.set("images/wanttvvideo.jpg", "sounds/IwanttheTVorVideo.mp3");
imageSoundMap.set("images/wanttobecomforted.jpg", "sounds/Iwanttobecomforted.mp3");
imageSoundMap.set("images/wantliedown.jpg", "sounds/IwanttoLieDown.mp3");
imageSoundMap.set("images/wantquiet.jpg", "sounds/IwantitQuieter.mp3");
imageSoundMap.set("images/wanttobesucctioned.jpg", "sounds/IwanttobeSuctioned.mp3");
imageSoundMap.set("images/wantlightsoffon.jpg", "sounds/IwantTheLightsOnorOffPlease.mp3");
imageSoundMap.set("images/wantremote.jpg", "sounds/IwanttheCalllightOrtheRemote.mp3");
imageSoundMap.set("images/wanttogohome.jpg", "sounds/IwanttoGoHome.mp3");
imageSoundMap.set("images/wantwater.jpg", "sounds/IwantWater.mp3");
imageSoundMap.set("images/wantsitup.jpg", "sounds/IwanttoSitUp.mp3");
imageSoundMap.set("images/wanttosleep.jpg", "sounds/IwanttoSleep.mp3");



function resetImages() {
    leftImages = imagesswapIdReset.slice(0, Math.ceil(imagelinks.length / 2));
    rightImages = imagesswapIdReset.slice(Math.ceil(imagelinks.length / 2), imagelinks.length);
    var leftImageLinks = imagelinks.slice(0, Math.ceil(imagelinks.length / 2));
    var rightImageLinks = imagelinks.slice(Math.ceil(imagelinks.length / 2), imagelinks.length);
    $(rightImages).each(function(i){
        $(this).css({'position':'','width':'','height':'','top':'','left':'','visibility':'visible'});
        $(this).attr("src", rightImageLinks[i]);
    });
    $(leftImages).each(function(i){
        $(this).css({'position':'','width':'','height':'','top':'','left':'','visibility':'visible'});
        $(this).attr("src", leftImageLinks[i]);
    });
    console.log("complete reset")
}

const LEFT_IRIS = [474, 475, 476, 477];
const LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398];

const RIGHT_IRIS = [469, 470, 471, 472];
const RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246];

function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}



function blinkRatio(landmarks) {

    var rhDistance = euclideanDistance(landmarks[0][RIGHT_EYE[0]].x, landmarks[0][RIGHT_EYE[0]].y, landmarks[0][RIGHT_EYE[8]].x, landmarks[0][RIGHT_EYE[8]].y);
    var rvDistance = euclideanDistance(landmarks[0][RIGHT_EYE[12]].x, landmarks[0][RIGHT_EYE[12]].y, landmarks[0][RIGHT_EYE[4]].x, landmarks[0][RIGHT_EYE[4]].y);

    var lhDistance = euclideanDistance(landmarks[0][LEFT_EYE[0]].x, landmarks[0][LEFT_EYE[0]].y, landmarks[0][LEFT_EYE[8]].x, landmarks[0][LEFT_EYE[8]].y);
    var lvDistance = euclideanDistance(landmarks[0][LEFT_EYE[12]].x, landmarks[0][LEFT_EYE[12]].y, landmarks[0][LEFT_EYE[4]].x, landmarks[0][LEFT_EYE[4]].y);


    var reRatio = rhDistance / rvDistance
    var leRatio = lhDistance / lvDistance

    //var ratio = (reRatio + leRatio) / 2
    return [leRatio, reRatio];
}

function getEyeMarkers(eyepts, eyeindicies, irisindicies) {
    var maxEyeX = eyepts[0][eyeindicies[0]].x;
    var minEyeX = eyepts[0][eyeindicies[0]].x;

    for (let i = 0; i < eyeindicies.length; i++) {
        if (eyepts[0][eyeindicies[i]].x > maxEyeX) {
            maxEyeX = eyepts[0][eyeindicies[i]].x;
        }
        if (eyepts[0][eyeindicies[i]].x < minEyeX) {
            minEyeX = eyepts[0][eyeindicies[i]].x;
        }
    }
    var avgIrisX = 0;
    for (let i = 0; i < irisindicies.length; i++) {
        avgIrisX = avgIrisX + eyepts[0][irisindicies[i]].x;
    }
    avgIrisX = avgIrisX / irisindicies.length;
    return [minEyeX, maxEyeX, avgIrisX];
}


function leftRightUpDownRatio(landmarks) {
    var rhDistance = euclideanDistance(landmarks[0][RIGHT_EYE[0]].x, landmarks[0][RIGHT_EYE[0]].y, landmarks[0][RIGHT_EYE[8]].x, landmarks[0][RIGHT_EYE[8]].y);
    var rvDistance = euclideanDistance(landmarks[0][RIGHT_EYE[12]].x, landmarks[0][RIGHT_EYE[12]].y, landmarks[0][RIGHT_EYE[4]].x, landmarks[0][RIGHT_EYE[4]].y);

    var lhDistance = euclideanDistance(landmarks[0][LEFT_EYE[0]].x, landmarks[0][LEFT_EYE[0]].y, landmarks[0][LEFT_EYE[8]].x, landmarks[0][LEFT_EYE[8]].y);
    var lvDistance = euclideanDistance(landmarks[0][LEFT_EYE[12]].x, landmarks[0][LEFT_EYE[12]].y, landmarks[0][LEFT_EYE[4]].x, landmarks[0][LEFT_EYE[4]].y);
    var avgIrisXLeft = 0;
    var avgIrisYLeft = 0;
    var avgIrisXRight = 0;
    var avgIrisYRight = 0;
    for (let i = 0; i < LEFT_IRIS.length; i++) {
        avgIrisXLeft = avgIrisXLeft + landmarks[0][LEFT_IRIS[i]].x;
        avgIrisYLeft = avgIrisYLeft + landmarks[0][LEFT_IRIS[i]].y;
        avgIrisXRight = avgIrisXRight + landmarks[0][RIGHT_IRIS[i]].x;
        avgIrisYRight = avgIrisYRight + landmarks[0][RIGHT_IRIS[i]].y;
    }
    avgIrisXLeft = avgIrisXLeft / LEFT_IRIS.length;
    avgIrisYLeft = avgIrisYLeft / LEFT_IRIS.length;
    avgIrisXRight = avgIrisXRight / RIGHT_IRIS.length;
    avgIrisYRight = avgIrisYRight / RIGHT_IRIS.length;

    var rhIrisDistance = euclideanDistance(landmarks[0][RIGHT_EYE[0]].x, landmarks[0][RIGHT_EYE[0]].y, avgIrisXRight, avgIrisYRight);
    var lhIrisDistance = euclideanDistance(landmarks[0][LEFT_EYE[0]].x, landmarks[0][LEFT_EYE[0]].y, avgIrisXLeft, avgIrisYLeft);

    var horizontalLookRatio = (rhIrisDistance / rhDistance + lhIrisDistance / lhDistance) / 2;

    //    var averageXHorizontalRight = (landmarks[0][RIGHT_EYE[0]].x + landmarks[0][RIGHT_EYE[8]].x) / 2;
    //    var averageYHorizontalRight = (landmarks[0][RIGHT_EYE[0]].y + landmarks[0][RIGHT_EYE[8]].y) / 2;
    //    var averageXHorizontalLeft = (landmarks[0][LEFT_EYE[0]].x + landmarks[0][LEFT_EYE[8]].x) / 2;
    //    var averageYHorizontalLeft = (landmarks[0][LEFT_EYE[0]].y + landmarks[0][LEFT_EYE[8]].y) / 2;

    //    var distanceRIristoMidpoint = euclideanDistance(averageXHorizontalRight, averageYHorizontalRight, avgIrisXRight, avgIrisYRight);
    //    var distanceLIristoMidpoint = euclideanDistance(averageXHorizontalLeft, averageYHorizontalLeft, avgIrisXLeft, avgIrisYLeft);
    var leftIrisToEyebrow = euclideanDistance(landmarks[0][296].x, landmarks[0][296].y, avgIrisXLeft, avgIrisYLeft);
    var rightIrisToEyebrow = euclideanDistance(landmarks[0][65].x, landmarks[0][65].y, avgIrisXRight, avgIrisYRight);
    var verticalLookRatio = (rightIrisToEyebrow / rhDistance + leftIrisToEyebrow / lhDistance) / 2;

    return [horizontalLookRatio, verticalLookRatio];
}

var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modalImgID");

var leftarrowelement = document.getElementById("leftarrow");
var rightarrowelement = document.getElementById("rightarrow");

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

//var leftImages = imagelinks.slice(0, imagelinks.length / 2);
//var rightImages = imagelinks.slice(imagelinks.length / 2, imagelinks.length);


var loaderelement = document.getElementById("loader");
var loadingtext = document.getElementById("loadingtext");

//var iamelement = document.getElementById("iamtag");
//var iwantelement = document.getElementById("iwanttag");

var depthOfSelection = 0;


var blinkStartTime = Number.POSITIVE_INFINITY;
var blinkVal = null;
var blinkRun = true;


//TODO: Left blink to pause
//TODO: Bluetooth light

function backgroundColorChange(opacity) {
    return "rgba(11, 94, 215," + opacity + ")";
}

var verticalLookMovingAverage = 0.8;
var movingAverageN = 0;

var lookUpStartTime = Number.POSITIVE_INFINITY;
var lookUpVal = null;
var lookUpRun = false;
var verticalLookRatioPercent = 0;

function buildMap(keys, values){
    const map = new Map();
    for(let i = 0; i < keys.length; i++){
       map.set(keys[i], values[i]);
    };
    return map;
 };

async function onResults(results) {
/*    
    var offset = $("#img102").offset();
    var width = $("#img102").width();
    var height = $("#img102").height();
    $('#img000').css('width', width);
    $('#img000').css('height', height);
    $('#img000').css('position', 'absolute');
    $('#img000').animate({
        top: offset.top,
        left: offset.left
     },{duration:5000,complete: function () {
        $("#img102").attr("src", "images/amafraid.jpg");
        $('#img000').css('visibility', 'hidden');
        $('#img000').css('width', 'auto');
        $('#img000').css('height', 'auto');
        $('#img000').css('top', 'auto');
        $('#img000').css('left', 'auto');
     }
     });
*/
    
    var minThreshold = 0.5 - widthThreshold;
    var maxThreshold = 0.5 + widthThreshold;

    loaderelement.style.display = 'none';
    //loadingtext.style.display = 'none';
    if (blinkRun) {
        loadingtext.innerText = 'Running. Blink left or right eye to pause';
    } else {
        loadingtext.innerText = 'Paused. Blink left or right eye to start';
    }

    var timestamp = +new Date();

    if (results.multiFaceLandmarks.length !== 1 || lookDirection === "STOP") return

    var [horizontalLookRatio, verticalLookRatio] = leftRightUpDownRatio(results.multiFaceLandmarks);
    (verticalLookRatio + movingAverageN * verticalLookMovingAverage) / (movingAverageN + 1);

    var [leyeblinkratio, reyeblinkratio] = blinkRatio(results.multiFaceLandmarks);


    if (((leyeblinkratio > upperBlinkCutoff && reyeblinkratio < lowerBlinkCutoff) || (leyeblinkratio < upperBlinkCutoff && reyeblinkratio > lowerBlinkCutoff)) && blinkVal !== "RESET" && blinkVal !== "BLINK") {
        blinkVal = "BLINK";
        blinkStartTime = timestamp;
    } else if (leyeblinkratio <= lowerBlinkCutoff && reyeblinkratio <= lowerBlinkCutoff) {
        blinkVal = null;
        blinkStartTime = Number.POSITIVE_INFINITY;
    }

    if (blinkStartTime + LOOK_DELAY < timestamp) {
        if (blinkVal === "BLINK") {
            if (blinkRun) {
                blinkRun = false;
            } else {
                blinkRun = true;
            }
            blinkStartTime = Number.POSITIVE_INFINITY;
            blinkVal = "STOP";
        }
        blinkVal = "RESET";
    }

    if (!blinkRun) return;



    if (
        horizontalLookRatio > maxThreshold &&
        lookDirection !== "LEFT" &&
        lookDirection !== "RESET"
    ) {
        startLookTime = timestamp;
        lookDirection = "LEFT";
        rightarrowelement.style.backgroundColor = backgroundColorChange(0);

    } else if (
        horizontalLookRatio < minThreshold &&
        lookDirection !== "RIGHT" &&
        lookDirection !== "RESET"
    ) {
        startLookTime = timestamp;
        lookDirection = "RIGHT";
        leftarrowelement.style.backgroundColor = backgroundColorChange(0);
    } else if (horizontalLookRatio <= maxThreshold && horizontalLookRatio >= minThreshold) {
        startLookTime = Number.POSITIVE_INFINITY;
        lookDirection = null;
        leftarrowelement.style.backgroundColor = "transparent";
        rightarrowelement.style.backgroundColor = "transparent";
        rightarrowelement.style.backgroundColor = backgroundColorChange(0);
        leftarrowelement.style.backgroundColor = backgroundColorChange(0);
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
        if (lookDirection === "LEFT") {
            if (leftImages.length == 1) {
                // Get the modal
                modal.style.display = "block";
                modalImg.src=$(leftImages[0]).attr('src');
                if (soundOnOff) {
                    var audio = new Audio(imageSoundMap.get(leftImages[0]));
                    audio.play();
                }
                if(leftImages[0]==="images/wantlightsoffon.jpg" && bluetoothConnected){
                    toggleLightCharacteristic.writeValue(Uint8Array.of(3));
                }
                //pause for 5000 ms on selection
                setTimeout(() => {
                    startLookTime = Number.POSITIVE_INFINITY;
                    lookDirection = null;
                    resetImages();
                    modal.style.display = "none";

                }, 5000);

                //do something with last image
            } else {


            var mapRightToLeft = buildMap(rightImages.slice(0,Math.floor(leftImages.length / 2)), leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length))
            var mapLeftToRight = buildMap(leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length),rightImages.slice(0,Math.floor(leftImages.length / 2)))
            var top = new Array(Math.ceil(leftImages.length / 2))
            var left = new Array(Math.ceil(leftImages.length / 2))
            var promises = new Array(Math.ceil(leftImages.length / 2))
            var slidepromises = new Array(Math.ceil(leftImages.length / 2))

            $(rightImages).each(function(i){
                //$(this).css({'position':'absolute'});
                top[i] = $(this)[0].getBoundingClientRect().top
                left[i] = $(this)[0].getBoundingClientRect().left
                $(this).css({'width':$(this).width(),'height':$(this).height()});
            })
            $(rightImages).each(function(i){
                $(this).css({'position':'absolute'});
            })

            $(rightImages).each(function(i){
               
                $(this).css({'width':$(this).width(),'height':$(this).height(),'top':top[i],'left':left[i]});
                //console.log(`i value: ${i}`)
                promises[i]=$(this).animate({
                    width: 0,
                    height: 0
                 },{duration:400,queue: true,complete: function () {
                    $(this).css({'position':'','width':'','height':'','top':'','left':''});
                    $(this).css('visibility', 'hidden');
 
                    if(i<Math.ceil(leftImages.length / 2)){
                        console.log(i);
                        var atrID = '#' + $(this).attr('id')
                        $(mapRightToLeft.get(atrID)).css({'width': $(this).width(),'height': $(this).height(),'position': 'absolute'});
                        slidepromises[i] = $(mapRightToLeft.get(atrID)).animate({
                            top: top[i],
                            left: left[i]
                         },{duration:700,complete: function () {
                            atrID = '#' + $(this).attr('id')
                            var leftImgSrc = $(this).attr('src')
                            $(mapLeftToRight.get(atrID)).attr("src", leftImgSrc);
                            $(mapLeftToRight.get(atrID)).css({'visibility': 'visible'});
                            $(this).css({'position':'','width':'','height':'','top':'','left':''});
                            $(this).css('visibility', 'hidden');
        
                         }
                         }).promise();
                    }
                 }}).promise();
                
            })
            var results = await Promise.allSettled(promises);
            var slideresults = await Promise.allSettled(slidepromises);
            console.log("completed")

            var initsize = leftImages.length
            rightImages = rightImagesGlobal.slice(0, Math.floor(initsize/ 2));
            leftImages = leftImagesGlobal.slice(0, Math.ceil(initsize / 2));

            lookDirection = "STOP"
            startLookTime = Number.POSITIVE_INFINITY;
            }


        } else if (lookDirection === "RIGHT") {
            if (rightImages.length === 1) {
                modal.style.display = "block";
                modalImg.src=$(rightImages[0]).attr('src');
                if (soundOnOff) {
                    var audio = new Audio(imageSoundMap.get(rightImages[0]));
                    audio.play();
                }
                if(leftImages[0]==="images/wantlightsoffon.jpg" && bluetoothConnected){
                    toggleLightCharacteristic.writeValue(Uint8Array.of(3));
                }
                setTimeout(() => {
                    startLookTime = Number.POSITIVE_INFINITY;
                    lookDirection = null;
                    resetImages();
                    modal.style.display = "none";
                }, 5000);
                //do something with last image
            } else {

                var mapLeftToRight = buildMap(leftImages.slice(0,Math.floor(rightImages.length / 2)), rightImages.slice(Math.ceil(rightImages.length / 2), rightImages.length))
                var mapRightToLeft = buildMap(rightImages.slice(Math.ceil(rightImages.length / 2), rightImages.length),leftImages.slice(0,Math.floor(rightImages.length / 2)))
                
                var top = new Array(Math.ceil(rightImages.length / 2))
                var left = new Array(Math.ceil(rightImages.length / 2))
                var promises = new Array(Math.ceil(rightImages.length / 2))
                var slidepromises = new Array(Math.ceil(rightImages.length / 2))
                
                $(leftImages).each(function(i){
                    //$(this).css({'position':'absolute'});
                    top[i] = $(this)[0].getBoundingClientRect().top
                    left[i] = $(this)[0].getBoundingClientRect().left
                    $(this).css({'width':$(this).width(),'height':$(this).height()});
                })
                $(leftImages).each(function(i){
                    $(this).css({'position':'absolute'});
                })
                
                $(leftImages).each(function(i){
                   
                    $(this).css({'width':$(this).width(),'height':$(this).height(),'top':top[i],'left':left[i]});
                    //console.log(`i value: ${i}`)
                    promises[i]=$(this).animate({
                        width: 0,
                        height: 0
                     },{duration:400,queue: true,complete: function () {
                        $(this).css({'position':'','width':'','height':'','top':'','left':''});
                        $(this).css('visibility', 'hidden');
                
                        if(i<Math.ceil(rightImages.length / 2)){
                            console.log(i);
                            var atrID = '#' + $(this).attr('id')
                            $(mapLeftToRight.get(atrID)).css({'width': $(this).width(),'height': $(this).height(),'position': 'absolute'});
                            slidepromises[i] = $(mapLeftToRight.get(atrID)).animate({
                                top: top[i],
                                left: left[i]
                             },{duration:700,complete: function () {
                                atrID = '#' + $(this).attr('id')
                                var leftImgSrc = $(this).attr('src')
                                $(mapRightToLeft.get(atrID)).attr("src", leftImgSrc);
                                $(mapRightToLeft.get(atrID)).css({'visibility': 'visible'});
                                $(this).css({'position':'','width':'','height':'','top':'','left':''});
                                $(this).css('visibility', 'hidden');
                
                             }
                             }).promise();
                        }
                     }}).promise();
                    
                })
                var results = await Promise.allSettled(promises);
                var slideresults = await Promise.allSettled(slidepromises);
                console.log("completed")
                
                var initsize = rightImages.length

                rightImages = rightImagesGlobal.slice(0, Math.ceil(initsize / 2));
                leftImages = leftImagesGlobal.slice(0, Math.floor(initsize / 2));

                lookDirection = "STOP"
                startLookTime = Number.POSITIVE_INFINITY;
            }

        }
        lookDirection = "RESET";
    } else {

        if (lookDirection === "LEFT" && LOOK_DELAY / 2 > timestamp - startLookTime) {
            var timestampdiff = (timestamp - startLookTime) / (LOOK_DELAY / 2);
            leftarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
        } else if (lookDirection === "RIGHT" && LOOK_DELAY / 2 > timestamp - startLookTime) {
            var timestampdiff = (timestamp - startLookTime) / (LOOK_DELAY / 2);
            rightarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
        }
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
        new controls.SourcePicker({
            onFrame: async(input, size) => {
                await faceMesh.send({ image: input });
            },
        }),
    ])
    .on(x => {
        const options = x;
        LOOK_DELAY = options.lookDelay;
        widthThreshold = options.lookWidthThreshold;
        faceMesh.setOptions(options);
    });
