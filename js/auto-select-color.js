let palette;
const img = new Image();
img.src = "../bg/Background.png";

function setPalette() {
  const colorThief = new ColorThief();
  palette = colorThief.getPalette(img, 4);
  console.log(palette);
}

function changeColors() {
  if (palette) {
    document.documentElement.style.setProperty(
      "--main-color",
      `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`
    );
    document.documentElement.style.setProperty(
      "--glow-color",
      `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`
    );
  }
}

function fetchBackground() {
  fetch("../bg/Background.png")
    .then((response) => response.blob())
    .then((blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      img.onload = () => {
        setPalette(img);
        changeColors();
        URL.revokeObjectURL(img.src);
      };
    });
}

fetchBackground();
