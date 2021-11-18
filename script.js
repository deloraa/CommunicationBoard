var imagelinks = ["images/amafraid.jpg", "images/amfeelingsick.jpg", "images/aminpain.jpg","images/amangry.jpg","images/amfrustrated.jpg","images/amsad.jpg","images/amchoking.jpg","images/amhotcold.jpg","images/amshortofbreath.jpg","images/amdizzy.jpg","images/amhungrythirsty.jpg","images/amtired.jpg","images/wanthobupdown.jpg","images/wanttvvideo.jpg","images/wanttobecomforted.jpg","images/wantliedown.jpg","images/wantquiet.jpg","images/wanttobesucctioned.jpg","images/wantlightsoffon.jpg","images/wantremote.jpg","images/wanttogohome.jpg","images/wantwater.jpg","images/wantsitup.jpg","images/wanttosleep.jpg"];

var imagesswap = [document.getElementById("img000"),document.getElementById("img001"),document.getElementById("img002"),document.getElementById("img010"),document.getElementById("img011"),document.getElementById("img012"),document.getElementById("img020"),document.getElementById("img021"),document.getElementById("img022"),document.getElementById("img030"),document.getElementById("img031"),document.getElementById("img032"),document.getElementById("img100"),document.getElementById("img101"),document.getElementById("img102"),document.getElementById("img110"),document.getElementById("img111"),document.getElementById("img112"),document.getElementById("img120"),document.getElementById("img121"),document.getElementById("img122"),document.getElementById("img130"),document.getElementById("img131"),document.getElementById("img132")];

var calibrationMode=true;
document.getElementById("calibrationbutton").addEventListener("click", function(){ alert("Hello World!"); });

/*

window.saveDataAcrossSessions = true

const LOOK_DELAY = 1000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)

webgazer
  .setGazeListener((data, timestamp) => {
    if (data == null || lookDirection === "STOP") return

    if (
      data.x < LEFT_CUTOFF &&
      lookDirection !== "LEFT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "LEFT"
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "RIGHT"
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = null
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
        imageElement.classList.add("left")
      } else {
        imageElement.classList.add("right")
      }

      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = "STOP"
      setTimeout(() => {
        imageElement.remove()
        nextImageElement.classList.remove("next")
        imageElement = nextImageElement
        nextImageElement = getNewImage(true)
        lookDirection = "RESET"
      }, 200)
    }
  })
  .begin()

webgazer.showVideoPreview(false).showPredictionPoints(false)

function getNewImage(next = false) {
  const img = document.createElement("img")
  img.src = "https://picsum.photos/1000?" + Math.random()
  if (next) img.classList.add("next")
  document.body.append(img)
  return img
}
*/
