let palette;
const img = new Image();
img.src = "../bg/Background.png";

function setPalette() {
  const colorThief = new ColorThief();
  const dominantColors = colorThief.getPalette(img, 8);
  palette = dominantColors.map((color) => {
    return {
      color: tinycolor
        .fromRatio({ r: color[0], g: color[1], b: color[2] })
        .toHexString(),
      contrast: tinycolor
        .fromRatio({ r: color[0], g: color[1], b: color[2] })
        .getLuminance(),
    };
  });
  palette.sort((a, b) => b.contrast - a.contrast);
}

function changeColors() {
  if (palette) {
    document.documentElement.style.setProperty(
      "--main-color",
      palette[0].color
    );
    document.documentElement.style.setProperty(
      "--glow-color",
      palette[1].color
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

function init() {
  fetchBackground();
}

window.onload = init;
