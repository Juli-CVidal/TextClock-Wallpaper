let palette;
const img = new Image();
img.src = "../bg/Background.png";

function rgbToHex(palette) {
  return palette.map((color) => {
    return tinycolor({ r: color[0], g: color[1], b: color[2] }).toHexString();
  });
}

function hexToRgb(palette) {
  return palette.map((color) => {
    color = tinycolor(color).toRgb();
    return [color.r, color.g, color.b];
  });
}

function sortToBrightest(palette) {
  const tinycolor = window.tinycolor;
  const sortedPalette = palette.sort(function (color1, color2) {
    const isDark1 = tinycolor(color1).isDark();
    const isDark2 = tinycolor(color2).isDark();
    if (isDark1 === isDark2) {
      return 0;
    }
    return isDark1 ? 1 : -1;
  });
  return sortedPalette;
}

function setPalette() {
  const colorThief = new ColorThief();
  palette = colorThief.getPalette(img, 8);
  console.log(palette);
  palette = sortToBrightest(rgbToHex(palette));
}

function changeColors() {
  if (palette) {
    palette = hexToRgb(palette);
    console.log(palette);
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

function init() {
  fetchBackground();
}

window.onload = init;
