const IMG_NUMBER = 5;

const bgImage = document.createElement("img");

function paintImage(imgNumber) {
    const bgImage = new Image();
    bgImage.src = `img/${imgNumber + 1}.jpeg`;
    bgImage.classList.add("bgImage");
    document.body.appendChild(bgImage);
    //   image.addEventListener("loadend", handleimgLoad);
  }
  function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
  }
  
  function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
  }
  init();

