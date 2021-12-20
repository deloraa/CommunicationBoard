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

var soundButton = document.getElementById('soundButton');
var soundOnOff = false;
soundButton.onclick = () => {
    if (soundOnOff) {
        soundOnOff = false;
        imagelinks[31] = "Icons/32-SoundOff.jpeg"
        soundButton.className = "btn btn-outline-secondary"
        soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
        $(rightImages).each(function(i) {
            if ($(this).attr("src") === "Icons/32-SoundOn.jpeg") {
                $(this).attr("src", "Icons/32-SoundOff.jpeg")
            }
        });
        $(leftImages).each(function(i) {
            if ($(this).attr("src") === "Icons/32-SoundOn.jpeg") {
                $(this).attr("src", "Icons/32-SoundOff.jpeg")
            }
        });

    } else {
        soundOnOff = true;
        imagelinks[31] = "Icons/32-SoundOn.jpeg"
        soundButton.className = "btn btn-outline-primary"
        soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'
        $(rightImages).each(function(i) {
            if ($(this).attr("src") === "Icons/32-SoundOff.jpeg") {
                $(this).attr("src", "Icons/32-SoundOn.jpeg")
            }
        });
        $(leftImages).each(function(i) {
            if ($(this).attr("src") === "Icons/32-SoundOff.jpeg") {
                $(this).attr("src", "Icons/32-SoundOn.jpeg")
            }
        });
    }
}

var bluetooth = document.getElementById('bluetooth');
var bluetoothbutton = document.getElementById('bluetoothButton');
let toggleLightCharacteristic;
let bluetoothDevice;
const DEVICE_NAME = 'ESP32_Bluetooth';
const SEND_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const SEND_SERVICE_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
var bluetoothConnected = false;
bluetoothbutton.onclick = () => {
    if (bluetoothConnected === false) {
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

var imagelinks = ["Icons/1-Afraid.jpeg", "Icons/2-Pain.jpeg", "Icons/3-Yes.jpeg", "Icons/4-No.jpeg", "Icons/5-Sad.jpeg", "Icons/6-Frustrated.jpeg", "Icons/7-Nurse.jpeg", "Icons/8-Doctor.jpeg", "Icons/9-Tired.jpeg", "Icons/10-FeelSick.jpeg", "Icons/11-Cold_hot.jpeg", "Icons/12-ShortofBreath.jpeg", "Icons/13-Angry.jpeg", "Icons/14-Dizzy.jpeg", "Icons/15-Choking.jpeg", "Icons/16-Hungry.jpeg", "Icons/17-HowamI.jpeg", "Icons/18-WhatTime.jpeg", "Icons/19-WhatsHappening.jpeg", "Icons/20-Comeback.jpeg", "Icons/21-Situp.jpeg", "Icons/22-LieDown.jpeg", "Icons/23-Home.jpeg", "Icons/24-TV_Video.jpeg", "Icons/25-Light.jpeg", "Icons/26-CallLight.jpeg", "Icons/27-Water.jpeg", "Icons/28-Glasses.jpeg", "Icons/29-Suction.jpeg", "Icons/30-LipsMoistened.jpeg", "Icons/31-Sleep.jpeg", "Icons/32-SoundOff.jpeg"];

var imagesswapIdReset = ["#img000", "#img001", "#img002", "#img003", "#img010", "#img011", "#img012", "#img013", "#img020", "#img021", "#img022", "#img023", "#img030", "#img031", "#img032", "#img033", "#img100", "#img101", "#img102", "#img103", "#img110", "#img111", "#img112", "#img113", "#img120", "#img121", "#img122", "#img123", "#img130", "#img131", "#img132", "#img133"];

const leftImagesGlobal = ["#img000", "#img001", "#img002", "#img003", "#img010", "#img011", "#img012", "#img013", "#img020", "#img021", "#img022", "#img023", "#img030", "#img031", "#img032", "#img033"]
const rightImagesGlobal = ["#img100", "#img101", "#img102", "#img103", "#img110", "#img111", "#img112", "#img113", "#img120", "#img121", "#img122", "#img123", "#img130", "#img131", "#img132", "#img133"];
var leftImages = leftImagesGlobal;
var rightImages = rightImagesGlobal;
const imageSoundMap = new Map();
imageSoundMap.set("Icons/1-Afraid.jpeg", "Audio/1-IamAfraid.mp3");
imageSoundMap.set("Icons/2-Pain.jpeg", "Audio/2-IaminPain.mp3");
imageSoundMap.set("Icons/3-Yes.jpeg", "Audio/3-Yes.mp3");
imageSoundMap.set("Icons/4-No.jpeg", "Audio/4-No.mp3");
imageSoundMap.set("Icons/5-Sad.jpeg", "Audio/5-IamSad.mp3");
imageSoundMap.set("Icons/6-Frustrated.jpeg", "Audio/6-IamFrustrated.mp3");
imageSoundMap.set("Icons/7-Nurse.jpeg", "Audio/7-Nurse.mp3");
imageSoundMap.set("Icons/8-Doctor.jpeg", "Audio/8-Doctor.mp3");
imageSoundMap.set("Icons/9-Tired.jpeg", "Audio/9-Iamtired.mp3");
imageSoundMap.set("Icons/10-FeelSick.jpeg", "Audio/10-IamFeelingSick.mp3");
imageSoundMap.set("Icons/11-Cold_hot.jpeg", "Audio/11-IamColdHot.mp3");
imageSoundMap.set("Icons/12-ShortofBreath.jpeg", "Audio/12-IamShortofBreath.mp3");
imageSoundMap.set("Icons/13-Angry.jpeg", "Audio/13-IamAngry.mp3");
imageSoundMap.set("Icons/14-Dizzy.jpeg", "Audio/14-IamDizzy.mp3");
imageSoundMap.set("Icons/15-Choking.jpeg", "Audio/15-IamChoking.mp3");
imageSoundMap.set("Icons/16-Hungry.jpeg", "Audio/16-IamHungryorThirsty.mp3");
imageSoundMap.set("Icons/17-HowamI.jpeg", "Audio/17-HowamIDoing.mp3");
imageSoundMap.set("Icons/18-WhatTime.jpeg", "Audio/18-WhatTime.mp3");
imageSoundMap.set("Icons/19-WhatsHappening.jpeg", "Audio/19-WhatisHappening.mp3");
imageSoundMap.set("Icons/20-Comeback.jpeg", "Audio/20-ComeBack.mp3");
imageSoundMap.set("Icons/21-Situp.jpeg", "Audio/21-IWantHeadofbeduporDown.mp3");
imageSoundMap.set("Icons/22-LieDown.jpeg", "Audio/22-IwanttoLieDown.mp3");
imageSoundMap.set("Icons/23-Home.jpeg", "Audio/23-IwanttoGoHome.mp3");
imageSoundMap.set("Icons/24-TV_Video.jpeg", "Audio/24-IwanttheTVorVideo.mp3");
imageSoundMap.set("Icons/25-Light.jpeg", "Audio/25-IwantTheLightsOnorOffPlease.mp3");
imageSoundMap.set("Icons/26-CallLight.jpeg", "Audio/26-IwanttheCalllightOrtheRemote.mp3");
imageSoundMap.set("Icons/27-Water.jpeg", "Audio/27-IwantWater.mp3");
imageSoundMap.set("Icons/28-Glasses.jpeg", "Audio/28-Glasses.mp3");
imageSoundMap.set("Icons/29-Suction.jpeg", "Audio/29-IwanttobeSuctioned.mp3");
imageSoundMap.set("Icons/30-LipsMoistened.jpeg", "Audio/30-LipsMoistened.mp3");
imageSoundMap.set("Icons/31-Sleep.jpeg", "Audio/31-Sleep.mp3");
imageSoundMap.set("Icons/32-SoundOff.jpeg", "Audio/32-SoundOff.mp3");
imageSoundMap.set("Icons/32-SoundOn.jpeg", "Audio/32-SoundOn.mp3");

function resetImages() {
    leftImages = imagesswapIdReset.slice(0, Math.ceil(imagelinks.length / 2));
    rightImages = imagesswapIdReset.slice(Math.ceil(imagelinks.length / 2), imagelinks.length);
    var leftImageLinks = imagelinks.slice(0, Math.ceil(imagelinks.length / 2));
    var rightImageLinks = imagelinks.slice(Math.ceil(imagelinks.length / 2), imagelinks.length);
    $(rightImages).each(function(i) {
        $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '', 'visibility': 'visible' });
        $(this).attr("src", rightImageLinks[i]);
    });
    $(leftImages).each(function(i) {
        $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '', 'visibility': 'visible' });
        $(this).attr("src", leftImageLinks[i]);
    });
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

    var lhDistance = euclideanDistance(landmarks[0][LEFT_EYE[0]].x, landmarks[0][LEFT_EYE[0]].y, landmarks[0][LEFT_EYE[8]].x, landmarks[0][LEFT_EYE[8]].y);
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


var loaderelement = document.getElementById("loader");
var loadingtext = document.getElementById("loadingtext");


var blinkStartTime = Number.POSITIVE_INFINITY;
var blinkVal = null;
var blinkRun = true;


function backgroundColorChange(opacity) {
    return "rgba(11, 94, 215," + opacity + ")";
}

var verticalLookMovingAverage = 0.8;
var movingAverageN = 0;

var lookUpStartTime = Number.POSITIVE_INFINITY;
var lookUpVal = null;
var lookUpRun = false;
var verticalLookRatioPercent = 0;

function buildMap(keys, values) {
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
        map.set(keys[i], values[i]);
    };
    return map;
};

const controls = window;
const drawingUtils = window;
const mpFaceMesh = window;
const config = { locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
            `${mpFaceMesh.VERSION}/${file}`;
    } };
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');
/**
 * Solution options.
 */
const solutionOptions = {
    selfieMode: true,
    enableFaceGeometry: false,
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    accuracy: 0.5
};
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};
async function onResults(results) {
      // if (!results.multiFaceLandmarks) return
    //  if(typeof results === "undefined") return
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
    var minThreshold = 0.5 - widthThreshold;
    var maxThreshold = 0.5 + widthThreshold;
    if (blinkRun) {
        loadingtext.innerText = 'Running. Blink either eye to pause';
    } else {
        loadingtext.innerText = 'Paused. Blink either eye to start';
    }

    var currentTime = +new Date();
    
    if (results.multiFaceLandmarks.length !== 1 || lookDirection === "STOP") return

    var [horizontalLookRatio, verticalLookRatio] = leftRightUpDownRatio(results.multiFaceLandmarks);
    var [leyeblinkratio, reyeblinkratio] = blinkRatio(results.multiFaceLandmarks);
    if (((leyeblinkratio > upperBlinkCutoff && reyeblinkratio < lowerBlinkCutoff) || (leyeblinkratio < upperBlinkCutoff && reyeblinkratio > lowerBlinkCutoff)) && blinkVal !== "RESET" && blinkVal !== "BLINK") {
        blinkVal = "BLINK";
        blinkStartTime = currentTime;
    } else if (leyeblinkratio <= lowerBlinkCutoff && reyeblinkratio <= lowerBlinkCutoff) {
        blinkVal = null;
        blinkStartTime = Number.POSITIVE_INFINITY;
    }

    if (blinkStartTime + LOOK_DELAY < currentTime) {
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
        horizontalLookRatio < minThreshold &&
        lookDirection !== "LEFT" &&
        lookDirection !== "RESET"
    ) {
        startLookTime = currentTime;
        lookDirection = "LEFT";
        rightarrowelement.style.backgroundColor = backgroundColorChange(0);

    } else if (
        horizontalLookRatio > maxThreshold &&
        lookDirection !== "RIGHT" &&
        lookDirection !== "RESET"
    ) {
        startLookTime = currentTime;
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

    if (startLookTime + LOOK_DELAY < currentTime) {
        if (lookDirection === "LEFT") {

        if (leftImages.length == 1) {
            modal.style.display = "block";
            if ($(leftImages[0]).attr('src') === "Icons/32-SoundOff.jpeg") {
                $(leftImages[0]).attr('src', "Icons/32-SoundOn.jpeg");
                imagelinks[31] = "Icons/32-SoundOn.jpeg"
                soundOnOff = true
            } else if ($(leftImages[0]).attr('src') === "Icons/32-SoundOn.jpeg") {
                $(leftImages[0]).attr('src', "Icons/32-SoundOff.jpeg");
                imagelinks[31] = "Icons/32-SoundOff.jpeg"
                soundOnOff = false
            }
            modalImg.src = $(leftImages[0]).attr('src');
            if (soundOnOff) {
                var audio = new Audio(imageSoundMap.get($(leftImages[0]).attr('src')));
                audio.play();
            }
            if (soundOnOff) {
                soundButton.className = "btn btn-outline-primary"
                soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'
            } else {
                soundButton.className = "btn btn-outline-secondary"
                soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
            }
            if ($(leftImages[0]).attr('src') === "Icons/25-Light.jpeg" && bluetoothConnected) {
                toggleLightCharacteristic.writeValue(Uint8Array.of(3));
            }
            //pause for 5000 ms on selection
            setTimeout(() => {
                startLookTime = Number.POSITIVE_INFINITY;
                lookDirection = null;
                resetImages();
                modal.style.display = "none";

            }, 5000);
        }else{
            var mapRightToLeft = buildMap(rightImages.slice(0, Math.floor(leftImages.length / 2)), leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length))
            var mapLeftToRight = buildMap(leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length), rightImages.slice(0, Math.floor(leftImages.length / 2)))
            var top = new Array(Math.ceil(leftImages.length / 2))
            var left = new Array(Math.ceil(leftImages.length / 2))
            var promises = new Array(Math.ceil(leftImages.length / 2))
            var slidepromises = new Array(Math.ceil(leftImages.length / 2))

            $(rightImages).each(function(i) {
                //$(this).css({'position':'absolute'});
                top[i] = $(this)[0].getBoundingClientRect().top
                left[i] = $(this)[0].getBoundingClientRect().left
                $(this).css({ 'width': $(this).width(), 'height': $(this).height() });
            })
            $(rightImages).each(function(i) {
                $(this).css({ 'position': 'absolute' });
            })

            $(rightImages).each(function(i) {

                $(this).css({ 'width': $(this).width(), 'height': $(this).height(), 'top': top[i], 'left': left[i] });
        
                promises[i] = $(this).animate({
                    width: 0,
                    height: 0
                }, {
                    duration: 400,
                    queue: true,
                    complete: function() {
                        $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                        $(this).css('visibility', 'hidden');

                        if (i < Math.ceil(leftImages.length / 2)) {
                            
                            var atrID = '#' + $(this).attr('id')
                            $(mapRightToLeft.get(atrID)).css({ 'width': $(this).width(), 'height': $(this).height(), 'position': 'absolute' });
                            slidepromises[i] = $(mapRightToLeft.get(atrID)).animate({
                                top: top[i],
                                left: left[i]
                            }, {
                                duration: 700,
                                complete: function() {
                                    atrID = '#' + $(this).attr('id')
                                    var leftImgSrc = $(this).attr('src')
                                    $(mapLeftToRight.get(atrID)).attr("src", leftImgSrc);
                                    $(mapLeftToRight.get(atrID)).css({ 'visibility': 'visible' });
                                    $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                                    $(this).css('visibility', 'hidden');

                                }
                            }).promise();
                        }
                    }
                }).promise();

            })
            var results = await Promise.allSettled(promises);
            var slideresults = await Promise.allSettled(slidepromises);
            var initsize = leftImages.length
            rightImages = rightImagesGlobal.slice(0, Math.floor(initsize / 2));
            leftImages = leftImagesGlobal.slice(0, Math.ceil(initsize / 2));
            lookDirection = "STOP"
            startLookTime = Number.POSITIVE_INFINITY;
        }
        } else if (lookDirection === "RIGHT") {
            if (rightImages.length == 1) {
                modal.style.display = "block";
                if ($(rightImages[0]).attr('src') === "Icons/32-SoundOff.jpeg") {
                    $(rightImages[0]).attr('src', "Icons/32-SoundOn.jpeg");
                    imagelinks[31] = "Icons/32-SoundOn.jpeg"
                    soundOnOff = true
                } else if ($(rightImages[0]).attr('src') === "Icons/32-SoundOn.jpeg") {
                    $(rightImages[0]).attr('src', "Icons/32-SoundOff.jpeg");
                    imagelinks[31] = "Icons/32-SoundOff.jpeg"
                    soundOnOff = false
                }
                modalImg.src = $(rightImages[0]).attr('src');
                if (soundOnOff) {
                    var audio = new Audio(imageSoundMap.get($(rightImages[0]).attr('src')));
                    audio.play();
                }
                if (soundOnOff) {
                    soundButton.className = "btn btn-outline-primary"
                    soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'
                } else {
                    soundButton.className = "btn btn-outline-secondary"
                    soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
                }
                if ($(rightImages[0]).attr('src') === "Icons/25-Light.jpeg" && bluetoothConnected) {
                    toggleLightCharacteristic.writeValue(Uint8Array.of(3));
                }
                setTimeout(() => {
                    startLookTime = Number.POSITIVE_INFINITY;
                    lookDirection = null;
                    resetImages();
                    modal.style.display = "none";
                }, 5000);
            }else{
            for (let i = rightImages.length/2; i < rightImages.length; i++) {
                document.getElementById(rightImages[i].substring(1)).style.visibility = "hidden";
            }
            for (let i = rightImages.length/2; i < rightImages.length; i++) {
                document.getElementById(leftImages[i-rightImages.length/2].substring(1)).src = document.getElementById(rightImages[i].substring(1)).src;
            }
            for (let i = rightImages.length/2; i < rightImages.length; i++) {
                document.getElementById(leftImages[i].substring(1)).style.visibility = "hidden";
            }
            var initsize = rightImages.length
            rightImages = rightImagesGlobal.slice(0, Math.ceil(initsize / 2));
            leftImages = leftImagesGlobal.slice(0, Math.floor(initsize / 2));
            lookDirection = "STOP"
            startLookTime = Number.POSITIVE_INFINITY;
        }
        }
        lookDirection = "RESET";
    } else {

    if (lookDirection === "LEFT" && LOOK_DELAY / 2 > currentTime - startLookTime) {
        var timestampdiff = (currentTime - startLookTime) / (LOOK_DELAY / 2);
        leftarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
    } else if (lookDirection === "RIGHT" && LOOK_DELAY / 2 > currentTime - startLookTime) {
        var timestampdiff = (currentTime - startLookTime) / (LOOK_DELAY / 2);
        rightarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
    }
}
/*
    if (startLookTime + LOOK_DELAY < currentTime) {
        if (lookDirection === "LEFT") {
            if (leftImages.length == 1) {
                // Get the modal
                modal.style.display = "block";
                if ($(leftImages[0]).attr('src') === "Icons/32-SoundOff.jpeg") {
                    $(leftImages[0]).attr('src', "Icons/32-SoundOn.jpeg");
                    imagelinks[31] = "Icons/32-SoundOn.jpeg"
                    soundOnOff = true
                } else if ($(leftImages[0]).attr('src') === "Icons/32-SoundOn.jpeg") {
                    $(leftImages[0]).attr('src', "Icons/32-SoundOff.jpeg");
                    imagelinks[31] = "Icons/32-SoundOff.jpeg"
                    soundOnOff = false
                }
                modalImg.src = $(leftImages[0]).attr('src');
                if (soundOnOff) {
                    var audio = new Audio(imageSoundMap.get($(leftImages[0]).attr('src')));
                    audio.play();
                }
                if (soundOnOff) {
                    soundButton.className = "btn btn-outline-primary"
                    soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'
                } else {
                    soundButton.className = "btn btn-outline-secondary"
                    soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
                }
                if ($(leftImages[0]).attr('src') === "Icons/25-Light.jpeg" && bluetoothConnected) {
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


                var mapRightToLeft = buildMap(rightImages.slice(0, Math.floor(leftImages.length / 2)), leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length))
                var mapLeftToRight = buildMap(leftImages.slice(Math.ceil(leftImages.length / 2), leftImages.length), rightImages.slice(0, Math.floor(leftImages.length / 2)))
                var top = new Array(Math.ceil(leftImages.length / 2))
                var left = new Array(Math.ceil(leftImages.length / 2))
                var promises = new Array(Math.ceil(leftImages.length / 2))
                var slidepromises = new Array(Math.ceil(leftImages.length / 2))

                $(rightImages).each(function(i) {
                    //$(this).css({'position':'absolute'});
                    top[i] = $(this)[0].getBoundingClientRect().top
                    left[i] = $(this)[0].getBoundingClientRect().left
                    $(this).css({ 'width': $(this).width(), 'height': $(this).height() });
                })
                $(rightImages).each(function(i) {
                    $(this).css({ 'position': 'absolute' });
                })

                $(rightImages).each(function(i) {

                    $(this).css({ 'width': $(this).width(), 'height': $(this).height(), 'top': top[i], 'left': left[i] });
            
                    promises[i] = $(this).animate({
                        width: 0,
                        height: 0
                    }, {
                        duration: 400,
                        queue: true,
                        complete: function() {
                            $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                            $(this).css('visibility', 'hidden');

                            if (i < Math.ceil(leftImages.length / 2)) {
                                
                                var atrID = '#' + $(this).attr('id')
                                $(mapRightToLeft.get(atrID)).css({ 'width': $(this).width(), 'height': $(this).height(), 'position': 'absolute' });
                                slidepromises[i] = $(mapRightToLeft.get(atrID)).animate({
                                    top: top[i],
                                    left: left[i]
                                }, {
                                    duration: 700,
                                    complete: function() {
                                        atrID = '#' + $(this).attr('id')
                                        var leftImgSrc = $(this).attr('src')
                                        $(mapLeftToRight.get(atrID)).attr("src", leftImgSrc);
                                        $(mapLeftToRight.get(atrID)).css({ 'visibility': 'visible' });
                                        $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                                        $(this).css('visibility', 'hidden');

                                    }
                                }).promise();
                            }
                        }
                    }).promise();

                })
                var results = await Promise.allSettled(promises);
                var slideresults = await Promise.allSettled(slidepromises);

                var initsize = leftImages.length
                rightImages = rightImagesGlobal.slice(0, Math.floor(initsize / 2));
                leftImages = leftImagesGlobal.slice(0, Math.ceil(initsize / 2));

                lookDirection = "STOP"
                startLookTime = Number.POSITIVE_INFINITY;
            }


        } else if (lookDirection === "RIGHT") {
            if (rightImages.length === 1) {
                modal.style.display = "block";
                if ($(rightImages[0]).attr('src') === "Icons/32-SoundOff.jpeg") {
                    $(rightImages[0]).attr('src', "Icons/32-SoundOn.jpeg");
                    imagelinks[31] = "Icons/32-SoundOn.jpeg"
                    soundOnOff = true
                } else if ($(rightImages[0]).attr('src') === "Icons/32-SoundOn.jpeg") {
                    $(rightImages[0]).attr('src', "Icons/32-SoundOff.jpeg");
                    imagelinks[31] = "Icons/32-SoundOff.jpeg"
                    soundOnOff = false
                }
                modalImg.src = $(rightImages[0]).attr('src');
                if (soundOnOff) {
                    var audio = new Audio(imageSoundMap.get($(rightImages[0]).attr('src')));
                    audio.play();
                }
                if (soundOnOff) {
                    soundButton.className = "btn btn-outline-primary"
                    soundButton.innerHTML = '<img src="images/volume-up-fill.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound On'
                } else {
                    soundButton.className = "btn btn-outline-secondary"
                    soundButton.innerHTML = '<img src="images/volume-mute.svg" width="16" height="16" class="bi bi-volume-mute" viewBox="0 0 16 16"></img>Sound Off'
                }
                if ($(rightImages[0]).attr('src') === "Icons/25-Light.jpeg" && bluetoothConnected) {
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

                var mapLeftToRight = buildMap(leftImages.slice(0, Math.floor(rightImages.length / 2)), rightImages.slice(Math.ceil(rightImages.length / 2), rightImages.length))
                var mapRightToLeft = buildMap(rightImages.slice(Math.ceil(rightImages.length / 2), rightImages.length), leftImages.slice(0, Math.floor(rightImages.length / 2)))

                var top = new Array(Math.ceil(rightImages.length / 2))
                var left = new Array(Math.ceil(rightImages.length / 2))
                var promises = new Array(Math.ceil(rightImages.length / 2))
                var slidepromises = new Array(Math.ceil(rightImages.length / 2))

                $(leftImages).each(function(i) {
                    //$(this).css({'position':'absolute'});
                    top[i] = $(this)[0].getBoundingClientRect().top
                    left[i] = $(this)[0].getBoundingClientRect().left
                    $(this).css({ 'width': $(this).width(), 'height': $(this).height() });
                })
                $(leftImages).each(function(i) {
                    $(this).css({ 'position': 'absolute' });
                })

                $(leftImages).each(function(i) {

                    $(this).css({ 'width': $(this).width(), 'height': $(this).height(), 'top': top[i], 'left': left[i] });
                    promises[i] = $(this).animate({
                        width: 0,
                        height: 0
                    }, {
                        duration: 400,
                        queue: true,
                        complete: function() {
                            $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                            $(this).css('visibility', 'hidden');

                            if (i < Math.ceil(rightImages.length / 2)) {
                                
                                var atrID = '#' + $(this).attr('id')
                                $(mapLeftToRight.get(atrID)).css({ 'width': $(this).width(), 'height': $(this).height(), 'position': 'absolute' });
                                slidepromises[i] = $(mapLeftToRight.get(atrID)).animate({
                                    top: top[i],
                                    left: left[i]
                                }, {
                                    duration: 700,
                                    complete: function() {
                                        atrID = '#' + $(this).attr('id')
                                        var leftImgSrc = $(this).attr('src')
                                        $(mapRightToLeft.get(atrID)).attr("src", leftImgSrc);
                                        $(mapRightToLeft.get(atrID)).css({ 'visibility': 'visible' });
                                        $(this).css({ 'position': '', 'width': '', 'height': '', 'top': '', 'left': '' });
                                        $(this).css('visibility', 'hidden');

                                    }
                                }).promise();
                            }
                        }
                    }).promise();

                })
                var results = await Promise.allSettled(promises);
                var slideresults = await Promise.allSettled(slidepromises);
               

                var initsize = rightImages.length

                rightImages = rightImagesGlobal.slice(0, Math.ceil(initsize / 2));
                leftImages = leftImagesGlobal.slice(0, Math.floor(initsize / 2));

                lookDirection = "STOP"
                startLookTime = Number.POSITIVE_INFINITY;
            }

        }
        lookDirection = "RESET";


    } else {

        if (lookDirection === "LEFT" && LOOK_DELAY / 2 > currentTime - startLookTime) {
            var timestampdiff = (currentTime - startLookTime) / (LOOK_DELAY / 2);
            leftarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
        } else if (lookDirection === "RIGHT" && LOOK_DELAY / 2 > currentTime - startLookTime) {
            var timestampdiff = (currentTime - startLookTime) / (LOOK_DELAY / 2);
            rightarrowelement.style.backgroundColor = backgroundColorChange(timestampdiff);
        }
    }
*/


}
const faceMesh = new mpFaceMesh.FaceMesh(config);
faceMesh.setOptions(solutionOptions);
faceMesh.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, solutionOptions)
    .add([
    new controls.StaticText({ title: 'MediaPipe Face Mesh' }),
    fpsControl,
    new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new controls.SourcePicker({
        onFrame: async (input, size) => {
            const aspect = size.height / size.width;
            let width, height;
            if (window.innerWidth > window.innerHeight) {
                height = window.innerHeight;
                width = height / aspect;
            }
            else {
                width = window.innerWidth;
                height = width * aspect;
            }
            canvasElement.width = width;
            canvasElement.height = height;
            await faceMesh.send({ image: input });
        },
    }),
    new controls.Slider({
        title: 'Max Number of Faces',
        field: 'maxNumFaces',
        range: [1, 4],
        step: 1
    }),
    new controls.Toggle({ title: 'Refine Landmarks', field: 'refineLandmarks' }),
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
        title: 'Accuracy',
        field: 'accuracy',
        range: [0, 1],
        step: 0.01
    })
])
    .on(x => {
    const options = x;
    console.log("Slider value" + options.accuracy);
    videoElement.classList.toggle('selfie', options.selfieMode);
    faceMesh.setOptions(options);
});