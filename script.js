//webgazer.saveDataAcrossSessions = true

var imagelinks = ["images/amafraid.jpg", "images/amfeelingsick.jpg", "images/aminpain.jpg","images/amangry.jpg","images/amfrustrated.jpg","images/amsad.jpg","images/amchoking.jpg","images/amhotcold.jpg","images/amshortofbreath.jpg","images/amdizzy.jpg","images/amhungrythirsty.jpg","images/amtired.jpg","images/wanthobupdown.jpg","images/wanttvvideo.jpg","images/wanttobecomforted.jpg","images/wantliedown.jpg","images/wantquiet.jpg","images/wanttobesucctioned.jpg","images/wantlightsoffon.jpg","images/wantremote.jpg","images/wanttogohome.jpg","images/wantwater.jpg","images/wantsitup.jpg","images/wanttosleep.jpg"];

var imagesswapL = [document.getElementById("img000"),document.getElementById("img001"),document.getElementById("img002"),document.getElementById("img010"),document.getElementById("img011"),document.getElementById("img012"),document.getElementById("img020"),document.getElementById("img021"),document.getElementById("img022"),document.getElementById("img030"),document.getElementById("img031"),document.getElementById("img032")];
var imagesswapR = [document.getElementById("img100"),document.getElementById("img101"),document.getElementById("img102"),document.getElementById("img110"),document.getElementById("img111"),document.getElementById("img112"),document.getElementById("img120"),document.getElementById("img121"),document.getElementById("img122"),document.getElementById("img130"),document.getElementById("img131"),document.getElementById("img132")];

var calibrationMode=true;

const calibratebutton = document.getElementById("calibrationbutton");
const calibrationmessage = document.getElementById("calibrationmessage");
calibratebutton.addEventListener("click", ()=>{
  if(calibrationMode===true){
    calibrationMode=false;
    calibratebutton.innerText = "Start Calibration";
    calibratebutton.className = "btn btn-primary";
    calibrationmessage.innerText = ""
    webgazer.removeMouseEventListeners();
    webgazer.showVideoPreview(false)
  }else{
    calibrationMode=true;
    calibratebutton.innerText= "Stop Calibration";
    calibratebutton.className = "btn btn-danger";
    calibrationmessage.innerText = "You are currently in eye tracking calibration mode. Look at mouse while clicking to calibrate and click the button above to stop calibration."
    webgazer.addMouseEventListeners();
    webgazer.showVideoPreview(true)
  }
});




const LOOK_DELAY = 2000; // 1 second
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

var leftImages = imagelinks.slice(0,imagelinks.length/2);
var rightImages = imagelinks.slice(imagelinks.length/2,imagelinks.length);

webgazer
.setGazeListener((data, timestamp) => {

  if(!calibrationMode){
    if (data == null || lookDirection === "STOP") return
      if (
        data.x < LEFT_CUTOFF &&
        lookDirection !== "LEFT" &&
        lookDirection !== "RESET"
        ) {
        startLookTime = timestamp;
        lookDirection = "LEFT";
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
      ) {
      startLookTime = timestamp;
      lookDirection = "RIGHT";
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
        if(leftImages.length == 1){
          // Get the modal
          var modal = document.getElementById('myModal');

          // Get the image and insert it inside the modal - use its "alt" text as a caption
          var modalImg = document.getElementById("modalImgID");

          modal.style.display = "block";
          modalImg.src = leftImages[0];


          //modal.style.display = "none";

          //do something with last image
        }else {
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
          // Get the modal
          var modal = document.getElementById('myModal');

          // Get the image and insert it inside the modal - use its "alt" text as a caption
          var modalImg = document.getElementById("modalImgID");

          modal.style.display = "block";
          modalImg.src = rightImages[0];
          //do something with last image
        }else{
          leftImages = rightImages.slice(0,Math.ceil(leftImages.length/2));
          rightImages = rightImages.slice(Math.ceil(leftImages.length/2),leftImages.length);
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
  }else{
    startLookTime = Number.POSITIVE_INFINITY;
    lookDirection = null;
  }
})
.begin();
