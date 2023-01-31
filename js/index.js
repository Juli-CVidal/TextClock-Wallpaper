let hours, minutes, seconds, time;
let clockInterval, currentDescription;
const FIVE_MINUTES = 300_000;

const HOURS_OBJ = {
  1: "#one",
  2: "#two",
  3: "#three",
  4: "#four",
  5: "#five-hr",
  6: "#six",
  7: "#seven",
  8: "#eight",
  9: "#nine",
  10: "#ten-hr",
  11: "#eleven",
  12: "#twelve",
  13: "#one",
  23: "#eleven",
  24: "#midnight",
  0: "#midnight",
};
// const MINUTE_DESCRIPTIONS = [
//   { from: "0:00", to: "5:00", description: "oclock" },
//   { from: "5:00", to: "10:00", description: "five past" },
//   { from: "10:00", to: "15:00", description: "ten past" },
//   { from: "15:00", to: "20:00", description: "quarter past" },
//   { from: "20:00", to: "25:00", description: "twenty past" },
//   { from: "25:00", to: "30:00", description: "twenty five past" },
//   { from: "30:00", to: "35:00", description: "half past" },
//   { from: "35:00", to: "40:00", description: "twenty five to" },
//   { from: "40:00", to: "45:00", description: "twenty to" },
//   { from: "45:00", to: "50:00", description: "quarter to" },
//   { from: "50:00", to: "55:00", description: "ten to" },
//   { from: "55:00", to: "60:00", description: "five to" },
// ];

const MINUTE_DESCRIPTIONS = [
  { from: "02:30", to: "07:30", description: "five past" },
  { from: "07:30", to: "12:30", description: "ten past" },
  { from: "12:30", to: "17:30", description: "quarter past" },
  { from: "17:30", to: "22:30", description: "twenty past" },
  { from: "22:30", to: "27:30", description: "twenty five past" },
  { from: "27:30", to: "32:30", description: "half past" },
  { from: "32:30", to: "37:30", description: "twenty five to" },
  { from: "37:30", to: "42:30", description: "twenty to" },
  { from: "42:30", to: "47:30", description: "quarter to" },
  { from: "47:30", to: "52:30", description: "ten to" },
  { from: "52:30", to: "57:30", description: "five to" },
];

function updateElements(selector, classes, activeClass) {
  document
    .querySelectorAll(selector)
    .forEach((element) => element.classList.remove(activeClass));
  document
    .querySelectorAll(classes)
    .forEach((element) => element.classList.add(activeClass));
}

function updateDesc(description) {
  const classes = description
    .split(" ")
    .map((desc) => `#${desc}`)
    .join(", ");

  updateElements(".desc", classes, "active");
}

function updateHour(classes) {
  updateElements(".hr", classes, "active");
}

function getDescription() {
  const timeDescription = MINUTE_DESCRIPTIONS.find(({ from, to }) => {
    return time >= from && time < to;
  });
  return timeDescription ? timeDescription.description : "oclock";
}

function setDate() {
  const date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  hours = minutes >= 30 ? hours + 1 : hours;
  hours = hours > 12 ? hours - 12 : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  time = `${minutes}:${seconds}`;
}

function textClock() {
  setDate();
  updateHour(HOURS_OBJ[hours]);
  updateDesc(getDescription());
}

function checkInterval() {
  setDate();
  const newDescription = getDescription();
  if (!currentDescription){
    currentDescription = newDescription;
    textClock();
  }

  if (currentDescription != newDescription) {
    clearInterval(clockInterval);
    clockInterval = setInterval(textClock, FIVE_MINUTES);
  }
}

clockInterval = setInterval(() => {
  checkInterval();
}, 1000);
