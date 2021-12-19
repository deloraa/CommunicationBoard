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
    refineLandmarks: false,
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
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiFaceLandmarks) {
        //console.log(results);
    }
    canvasCtx.restore();
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