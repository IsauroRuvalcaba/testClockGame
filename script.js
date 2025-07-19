const numberHours = document.querySelector(".number-hours");
const barSeconds = document.querySelector(".bar-seconds");
const hourHand = document.querySelector(".hours");
const minuteHand = document.querySelector(".minutes");
const secondHand = document.querySelector(".seconds");
const btnStartGame = document.querySelector(".startGame");
const btnCancelGame = document.querySelector(".cancelGame");
const btnSpinClock = document.querySelector(".spinClock");
const btnVerifyScore = document.querySelector(".verifyScore");
const gradsBtn = document.querySelector(".grads");
const totalScore = document.getElementById("totalScore");
let dClock = document.querySelector(".dDisplay");
const timerEl = document.querySelector(".time-left");
const hRange = document.getElementById("hRange");
const mRange = document.getElementById("mRange");
const sRange = document.getElementById("sRange");
const gradBtnsInput = document.querySelectorAll('input[name="grads-btn"]');

//* modal section
const openBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".close-btn");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");

const radioButtonsStatus = document.querySelectorAll('input[name="status"]');

const descriptions = document.querySelectorAll(".description");
const descriptionContainer = document.querySelector(".description-container"); // Get the container
const numSwitch = document.querySelector("#num-graduation");
const tickSwitch = document.querySelector("#tick-graduation");

// btnSpinClock.disabled = true;
btnVerifyScore.disabled = true;

//* slider
let sliders = document.querySelectorAll(".slider-wrapper");
let value = document.querySelectorAll(".value");

// values.forEach()
let dClockValues = {
  hour: 12,
  minute: 30,
  second: 18,
};

let aClockValues = {
  hour: 0,
  minute: 0,
  second: 0,
};

const CLOCKSTATE = {
  LEARN: "learn",
  TUTORIAL: "tutorial",
  GAME: "game",
};

let gameState = {
  timer: 0,
  timeAmount: 120,
  get timeLeft() {
    return this.timer;
  },
  timerCountDown(n = 1) {
    this.timer -= n;
  },
  timerRefresh() {
    this.timer = this.timeAmount;
  },
  prevClockMode: undefined,
  updatePrevClockMode() {
    this.prevClockMode = this.clockMode;
  },
  clockMode: CLOCKSTATE.GAME,
  updateClockMode(mode) {
    // console.log(mode);
    if (mode === "learnDesc") this.clockMode = CLOCKSTATE.LEARN;
    if (mode === "tutDesc") this.clockMode = CLOCKSTATE.TUTORIAL;
    if (mode === "gameDesc") this.clockMode = CLOCKSTATE.GAME;
  },
  score: 0,
  gameOn: false,
  scoreIncrease(n = 1) {
    this.score += n;
  },
  gameStatus() {
    this.gameOn = !this.gameOn;
  },
  getScore() {
    totalScore.innerText = this.score;
  },
  gameRefresh() {
    this.score = 0;
    this.getScore();
  },
};

function getTime() {
  // console.log(dClockValues);
  dClock.innerHTML = `<span class=dHour>${
    dClockValues.hour
  }</span>:<span class=dMinute>${dClockValues.minute
    .toString()
    .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
    .toString()
    .padStart(2, 0)}</span>`;

  aClockValues.hour = dClockValues.hour;
  aClockValues.minute = dClockValues.minute;
  aClockValues.second = dClockValues.second;

  hRange.value = dClockValues.hour;
  mRange.value = dClockValues.minute;
  sRange.value = dClockValues.second;
}
getTime();

let dHour = document.querySelector(".dHour"); //variable declarations are hoisted or 'lifted up' and not the initializations
let dMinute = document.querySelector(".dMinute");
let dSecond = document.querySelector(".dSecond");

function checkValues() {
  compareObjects();
  // btnSpinClock.disabled = false;
  btnVerifyScore.disabled = true;
  movehand();
}

function idErrorBackground(unitTime) {
  // const unitTimeFunc = (unitTime) => {
  //   const selector = `.${unitTime}`;
  //   const dElement = document.querySelector(selector); //this cant have template literals
  //   console.log(dElement);
  //   return dElement;
  // };

  const unitTimeFunc = () => document.querySelector(`.${unitTime}`);

  const unitTimeElement = unitTimeFunc();

  unitTimeElement.classList.toggle("idErrorBackground");
  // unitTime.style.transition = "background-color 0.25s ease-in-out";
  // console.log(unitTime.classList.toggle("idErrorBackground"));
  // unitTime.style.backgroundColor = "#ffff99";

  setTimeout(() => {
    unitTimeElement.classList.toggle("idErrorBackground");
    // unitTime.style.backgroundColor = "#ffffff";
  }, 1000);
}

function toggleScoreDisplay() {
  // const scoreDisplayStatus = document.querySelectorAll(".indicator");
  // for (const element of scoreDisplayStatus) {
  //   element.classList.toggle("hide-score-display");
  // }
  const scoreDisplayStatus = document.querySelector(".score-display");
  scoreDisplayStatus.classList.toggle("hide-score-display");
}

function cgptHideScoreDisplay(clockState) {
  const body = document.querySelector("body");
  // console.log(clockState);

  if (clockState === undefined) {
    return body.classList.toggle("cgpt-hide-score-display");
  }

  clockState === "gameDesc"
    ? body.classList.remove("cgpt-hide-score-display")
    : body.classList.add("cgpt-hide-score-display");

  // const scoreDisplayStatus = document.querySelector(".score-display");
  // scoreDisplayStatus.classList.toggle("hide-score-display");
}

function compareObjects() {
  const Hour = dClockValues.hour - aClockValues.hour;
  const Minute = dClockValues.minute - aClockValues.minute;
  const Second = dClockValues.second - aClockValues.second;

  if (Hour !== 0) idErrorBackground("dHour");
  if (Minute !== 0) idErrorBackground("dMinute");
  if (Second !== 0) idErrorBackground("dSecond");
  // console.log(Hour, Minute, Second);

  if (Hour === 0 && Minute === 0 && Second === 0) {
    gameState.scoreIncrease();
    gameState.getScore();
  }
}

function postTimeLeft() {
  // const timerEl = document.querySelector(".time-left");
  let timeLeft = gameState.timeLeft;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  // console.log("getter: ", gameState.timeLeft);
  // console.log(gameState.timer);
}

function flash() {
  timerEl.classList.toggle("backgroundRed");
}

let timeLeftCountDown;
let flashInterval;
// let timeLeft = 20;

function countDown() {
  let timeLeft = gameState.timeLeft;
  // console.log("timeLeft: ", timeLeft);

  flashInterval = setInterval(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      flash();
    }
    if (timeLeft <= 0) {
      clearInterval(flashInterval);
    }
  }, 500);

  timeLeftCountDown = setInterval(() => {
    // const timerEl = document.querySelector(".time-left");
    //! timeLeft -= 1;
    // const mins = Math.floor(timeLeft / 60);
    // const secs = timeLeft % 60;

    gameState.timerCountDown();
    timeLeft = gameState.timeLeft;
    // timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
    postTimeLeft();

    if (timeLeft <= 0) {
      // console.log("Game Over: ", timeLeft);
      clearInterval(timeLeftCountDown);
      clearInterval(flashInterval);
      btnStartGame.disabled = false;
      btnVerifyScore.disabled = true;
      btnSpinClock.disabled = true;
    }
  }, 1000);
}
gameState.timerRefresh();
postTimeLeft();

const cancelTimeGame = () => {
  console.log("cancel btn pressed");
  btnStartGame.disabled = false;
  btnVerifyScore.disabled = true;
  btnSpinClock.disabled = true;
  clearInterval(timeLeftCountDown);
  clearInterval(flashInterval);

  // timeLeft = 20;
  postTimeLeft();
};

const startGame = () => {
  // add a time reset before countdown starts
  // timeLeft = 20;
  gameState.gameRefresh();
  gameState.timerRefresh();
  postTimeLeft();

  // console.log("start button pressed");
  btnStartGame.disabled = true;
  btnSpinClock.disabled = false;
  // btnStartGame.disabled
  //   ? console.log("start button disabled")
  //   : console.log("start button enabled");
  movehand();
  countDown();
};

// const rangeInput = document.getElementById("mRange");
// rangeInput.addEventListener("input", function () {
//   console.log("Input: ", this.value);
// });
// rangeInput.addEventListener("change", function () {
//   console.log("Change: ", this.value);
// });

function selectDigitalTimeUnit(timeUnit) {
  let dTimeDivSel;

  if (timeUnit === "sRange") dTimeDivSel = document.querySelector(".dSecond");
  if (timeUnit === "mRange") dTimeDivSel = document.querySelector(".dMinute");
  if (timeUnit === "hRange") dTimeDivSel = document.querySelector(".dHour");

  // console.log(dTimeDivSel);
  return dTimeDivSel;
}

const dTimeUnitHighlight = (timeUnit) => {
  let dSecond = document.querySelector(".dSecond");

  // dSecond.offsetHeight;
  let dUnitTime = selectDigitalTimeUnit(timeUnit);
  // console.log(timeUnit);
  // console.log(dUnitTime);

  // dSecond.classList.add("fishEye");
  dUnitTime.classList.add("fishEye");

  setTimeout(() => {
    // dSecond.classList.remove("fishEye");
    dUnitTime.classList.remove("fishEye");
    // dSecond.offsetHeight;
    // dUnitTime.offsetHeight;
  }, 750);
};

// ! change this on a button
// let learningMode = false;
sliders.forEach((slider, index) => {
  // console.log(slider.querySelector(".value").innerHTML);
  // let tValue = slider.querySelector("input").dataset.time;
  // slider.querySelector(".slider").value = dClockValues[tValue];

  let sliderScroll = slider.querySelector(".slider");

  //* when hovering and using the scroll wheel
  // https://stackoverflow.com/questions/67651894/how-do-i-change-the-value-of-a-range-input-by-user-scroll

  let lastScrollTime = 0;

  sliderScroll.addEventListener("wheel", function (e) {
    // let event = new Event("change", { bubbles: true, cancelable: true });
    // sliderScroll.dispatchEvent(event);
    // console.log("Hover and wheel: ", this.id);

    const now = Date.now();
    const timeDiff = now - lastScrollTime;

    let step = 1;
    if (timeDiff < 100) {
      // step = 5;
      step = sliderScroll.dataset.time === "hour" ? 1 : 5;
    }

    if (e.deltaY < 0) {
      // sliderScroll.valueAsNumber += 1;
      sliderScroll.stepUp(step);
    } else {
      // sliderScroll.value -= 1;
      sliderScroll.stepDown(step);
    }

    lastScrollTime = now;
    e.preventDefault();
    e.stopPropagation();

    // slider.lastElementChild.innerHTML = slider.firstElementChild.value;
    // console.log(slider.querySelector(".slider").value);
    let tValue = slider.querySelector("input").dataset.time;
    dClockValues[tValue] = +slider.querySelector(".slider").value;
    // console.log(tValue, +slider.querySelector(".slider").value);

    // if (learningMode) sliderHandMove();
    if (gameState.clockMode === "learn") sliderHandMove();

    dClock.innerHTML = `<span class=dHour>${
      dClockValues.hour
    }</span>:<span class=dMinute>${dClockValues.minute
      .toString()
      .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
      .toString()
      .padStart(2, 0)}</span>`;

    dTimeUnitHighlight(this.id);
  });

  // * when dragging the input button
  sliderScroll.addEventListener("input", function () {
    // console.log("drag: ", this.id);

    let tValue = slider.querySelector("input").dataset.time;
    dClockValues[tValue] = +slider.querySelector(".slider").value;

    // if (learningMode) sliderHandMove();
    if (gameState.clockMode === "learn") sliderHandMove();

    dClock.innerHTML = `<span class=dHour>${
      dClockValues.hour
    }</span>:<span class=dMinute>${dClockValues.minute
      .toString()
      .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
      .toString()
      .padStart(2, 0)}</span>`;

    dTimeUnitHighlight(this.id);
  });
  slider.addEventListener("input", function () {
    // let tValue = slider.querySelector("input").dataset.time;
    // dClockValues[tValue] = +slider.querySelector(".slider").value;
    // if (learningMode) sliderHandMove();
    // dClock.innerHTML = `<span class=dHour>${
    //   dClockValues.hour
    // }</span>:<span class=dMinute>${dClockValues.minute
    //   .toString()
    //   .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
    //   .toString()
    //   .padStart(2, 0)}</span>`;
    // dTimeUnitHighlight(this.id);
  });
});

//* slider end

const overlay = document.querySelector(".overlay");
const overlayCloseNav = () => {
  console.log("Clicked Overlay");
  nav.classList.toggle("nav-active");
  overlay.classList.toggle("overlayNav");
  burger.classList.toggle("toggle");
};

// ! DevEd navigation
const navSlide = () => {
  const navLinks = document.querySelectorAll(".nav-links li");
  const nav = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");
  // TODO: to have navbar close when clicking outside of it https://youtu.be/m7YDWNz65iI?t=492
  //Toggle nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    // overlay.classList.toggle("overlayNav");
    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.2s ease-in-out forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    //Burger animation
    burger.classList.toggle("toggle");
  });
};
navSlide();

// ! DevEd navigation END

const numberElement = [];
let barElement = [];

// create number hours
for (let i = 1; i <= 12; i++) {
  numberElement.push(`<span style="--index:${i};"><p>${i}</p></span>`);
}
numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));

// create bar seconds
let minuteNumberStatus = false;

for (let i = 1; i <= 60; i++) {
  barElement.push(`<span style="--index:${i};"><p></p></span>`);
}

function createMinuteTicksOrNumbers() {
  for (let i = 1; i <= 60; i++) {
    if (!minuteNumberStatus) {
      barElement.push(
        `<span style="--index:${i};"><p class="tickColor">${""}</p></span>`
      );
    } else {
      if (i % 5 === 0) {
        barElement.push(
          `<span  style="--index:${i};"><p class="tickColor">${" "}</p></span>`
        );
      } else {
        barElement.push(
          `<span  style="--index:${i};"><p class="tickColor">${i}</p></span>`
        );
      }
    }
  }
}
createMinuteTicksOrNumbers();

// this is to maintain and pass the state to the number/tick switch status to all switches
const numSwitchSwitcher = () => {
  const inputNumSwitch = document.querySelector("#num-grad-btn");
  const inputTickSwitch = document.querySelector("#tick-grad-btn");

  numSwitch.checked = minuteNumberStatus;
  inputNumSwitch.checked = minuteNumberStatus;

  //! this is needed to make sure the input psuedo checked class + label changes
  tickSwitch.checked = !minuteNumberStatus;
  inputTickSwitch.checked = !minuteNumberStatus;
};

function toggleMinuteNumberTicks2(graduationTick) {
  if (graduationTick === undefined) {
    minuteNumberStatus = !minuteNumberStatus;
  } else {
    minuteNumberStatus = graduationTick;
  }

  const numTickMinuteSecond = document.querySelectorAll(".bar-seconds span");

  for (let element of numTickMinuteSecond) {
    const tickNumber = element.style.getPropertyValue("--index");
    const pElement = element.querySelector("p");
    const tickValue = tickNumber % 5 === 0 ? "" : tickNumber;
    pElement.textContent = minuteNumberStatus ? tickValue : "";
  }

  const clockMTicks = document.querySelectorAll(".bar-seconds span p");
  const insetTickStyle = document.querySelectorAll(".bar-seconds span");

  clockMTicks.forEach((tick, index) => {
    if (minuteNumberStatus) {
      tick.classList.add("clockMNums");
    } else {
      tick.classList.remove("clockMNums");
    }
  });

  insetTickStyle.forEach((tick) => {
    tick.style.inset = minuteNumberStatus ? "30px" : "35px";
  });

  numSwitchSwitcher();
  // numSwitch.checked = minuteNumberStatus;
  // //! this is needed to make sure the input psuedo checked class + label changes
  // tickSwitch.checked = !minuteNumberStatus;
}

//* this is on the button
function toggleMinuteNumberTicks() {
  const removeMinuteElements = document.querySelectorAll(".bar-seconds span");
  for (let element of removeMinuteElements) {
    console.log(element.style.getPropertyValue("--index"));
    console.log(element.querySelector("p"));
    element.remove();
  }
  minuteNumberStatus = !minuteNumberStatus;
  barElement = [];

  createMinuteTicksOrNumbers();
  barSeconds.insertAdjacentHTML("afterbegin", barElement.join(""));

  const clockMTicks = document.querySelectorAll(".bar-seconds span p");
  const insetTickStyle = document.querySelectorAll(".bar-seconds span");

  clockMTicks.forEach((tick, index) => {
    if (minuteNumberStatus) {
      tick.classList.add("clockMNums");
    } else {
      tick.classList.remove("clockMNums");
    }
  });

  insetTickStyle.forEach((tick) => {
    tick.style.inset = minuteNumberStatus ? "30px" : "35px";
  });
  console.log(minuteNumberStatus);
}

// insertAdjacentHTML(position, text) method parses the specified text as HTMLand inserts the resulting nodes into the DOM tree at a specified position.  -- afterbegin - inside element before first child
barSeconds.insertAdjacentHTML("afterbegin", barElement.join(""));

function getRandomRotation() {
  return Math.floor(Math.random() * 361);
}

let currentHRotation = 15;
let currentMRotation = 180;
let currentSRotation = 108;

function setHandRotaion(currentHandRotation, randomHandRotaion, handStep) {
  // handstep: 6 for minutes and seconds 360 / 6 = 60
  // handstep: 30 for hour hand 360 / 30 = 12
  return (
    Math.floor(((currentHandRotation + randomHandRotaion) % 360) / handStep) *
    handStep
  );
}

function preMovementStyleEffect(hand, rotationDegrees) {
  hand.style.transition = "none"; //*this is necessary. For some reason, if this not here it moves using closest path. Could go counter clockwise and not give the 1440deg added to ration.
  hand.style.transform = `rotate(${rotationDegrees}deg)`;
}

function initiateHandStyleEffect(hand, newRotation, duration, delay) {
  hand.style.transition = `transform ${duration}s cubic-bezier(0.25, -0.1, 0.25, 1.1) ${delay}s `;
  hand.style.transform = `rotate(${newRotation + 1440}deg)`;
}

function movehand() {
  const sRandomRotation = getRandomRotation();
  const mRandomRotation = getRandomRotation();
  const hRandomRotation = getRandomRotation();

  const newMRotation = setHandRotaion(currentMRotation, mRandomRotation, 6);

  //* mRatio is the amount of hour hand movement in degrees past the hour depending on minutes. Every hour is 30 degrees
  let mRatio = Math.floor(((currentMRotation + mRandomRotation) % 360) / 12);

  const newSRotation = setHandRotaion(currentSRotation, sRandomRotation, 6);

  const newHRotation =
    setHandRotaion(currentHRotation, hRandomRotation, 30) + mRatio;

  preMovementStyleEffect(hourHand, currentHRotation);
  preMovementStyleEffect(minuteHand, currentMRotation);
  preMovementStyleEffect(secondHand, currentSRotation);

  // ! Game disabled Indicator
  if (gameState.clockMode === "gameDesc") {
    btnStartGame.disabled = true;
    console.log(gameState.clockMode, "btn StartGame disabled");
  }

  btnVerifyScore.disabled = false;

  hourHand.offsetHeight; //*this is necessary. offsetHeight property - This has to do with Browser Rendering Pipeline - claude ai has a really good expanation on this.  offsetHeight is only needed on one element for Reflow and force the browser to calculate layout immediately. the below two aren't needed
  minuteHand.offsetHeight; //this is necessary
  secondHand.offsetHeight; //this is necessary

  initiateHandStyleEffect(hourHand, newHRotation, 4, 0);
  initiateHandStyleEffect(minuteHand, newMRotation, 3, 0.25);
  initiateHandStyleEffect(secondHand, newSRotation, 3.5, 0.5);

  currentHRotation = (newHRotation + 1440) % 360;
  // console.log(currentHRotation);

  currentMRotation = newMRotation % 360;
  currentSRotation = newSRotation % 360;

  let currentHour =
    Math.floor(currentHRotation / 30) == 0
      ? 12
      : Math.floor(currentHRotation / 30);

  aClockValues.hour = currentHour;
  aClockValues.minute = newMRotation / 6;
  aClockValues.second = newSRotation / 6;

  console.log(currentHRotation, currentMRotation, currentSRotation);
  console.log(aClockValues);

  btnVerifyScore.disabled = true;
  setTimeout(() => {
    // hourHand.style.transition = "";
    // btnSpinClock.disabled = true;
    btnVerifyScore.disabled = false;
  }, 3000);
}

// *This resets the analog clock hands to match the digital clock time initially when changing to learning mode
function handsMoveForLearningMode() {
  secondHand.style.transition = "transform 1s ease-in-out";
  minuteHand.style.transition = "transform 1s ease-in-out";
  hourHand.style.transition = "transform 1s ease-in-out";

  const slideSecondHand = dClockValues.second * 6;
  const slideMinuteHand = dClockValues.minute * 6;
  const slideHourHand =
    dClockValues.hour * 30 + Math.floor((slideMinuteHand / 425) * 30);
  // console.log(slideSecondHand, slideMinuteHand, slideHourHand);

  //* made it 400 because 360 had the hour to close to following hour when minute was at 59. Could cause confusing on the little ones' learning
  // const minuteRatioAddOn = Math.floor((slideMinuteHand / 425) * 30);
  secondHand.style.transform = `rotate(${slideSecondHand}deg)`;
  minuteHand.style.transform = `rotate(${slideMinuteHand}deg)`;
  hourHand.style.transform = `rotate(${slideHourHand}deg)`;
}

// analog clock movement when sliding the input range when in learning mode
function sliderHandMove() {
  // trouble with below. have to remove any transitions that might have stayed from that states of game.
  secondHand.style.transition = "none";
  minuteHand.style.transition = "none";
  hourHand.style.transition = "none";

  const slideSecondHand = dClockValues.second * 6;
  const slideMinuteHand = dClockValues.minute * 6;
  const slideHourHand =
    dClockValues.hour * 30 + Math.floor((slideMinuteHand / 425) * 30);

  //* made it 400 because 360 had the hour to close to following hour when minute was at 59. Could cause confusing on the little ones' learning
  // const minuteRatioAddOn = Math.floor((slideMinuteHand / 425) * 30);
  secondHand.style.transform = `rotate(${slideSecondHand}deg)`;
  minuteHand.style.transform = `rotate(${slideMinuteHand}deg)`;
  hourHand.style.transform = `rotate(${slideHourHand}deg)`;
  console.log(slideSecondHand, slideMinuteHand, slideHourHand);

  currentHRotation = slideHourHand;
  currentMRotation = slideMinuteHand;
  currentSRotation = slideSecondHand;
}

// Open Modal function
function openModal() {
  //Todo: because in css oneClass.open and twoClass.open can be referenced and the classess can do different things. Just learned this

  // console.log("open modal, preClockMode: ", gameState.prevClockMode);
  gameState.updatePrevClockMode();

  // console.log("open modal, clockMode: ", gameState.clockMode);

  modalBg.classList.add("open");
  modal.classList.add("open");
}

function setRotationStartForGameAndTut() {
  preMovementStyleEffect(hourHand, currentHRotation);
  preMovementStyleEffect(minuteHand, currentMRotation);
  preMovementStyleEffect(secondHand, currentSRotation);
  console.log(currentHRotation, currentMRotation, currentSRotation);
}

function removeClassStatus() {
  const strtBtns = document.querySelectorAll(".start-btn");
  // const gradsBtn = document.querySelector(".grads");
  strtBtns.forEach((button) => {
    button.classList.remove("appear");
  });
  gradsBtn.classList.remove("appear");
}

function setGameClasses() {
  btnStartGame.classList.add("appear");
  btnCancelGame.classList.add("appear");
  btnSpinClock.classList.add("appear");
  btnVerifyScore.classList.add("appear");
  btnSpinClock.disabled = true;
}
function setTutorialClasses() {
  btnSpinClock.classList.add("appear");
  btnVerifyScore.classList.add("appear");
  gradsBtn.classList.add("appear");
  btnSpinClock.disabled = false;
}

function showButtons(checkedSelectStatus) {
  switch (checkedSelectStatus) {
    case "learnDesc":
      learningMode = true;
      // gameState.updateClockMode(checkedSelectStatus);
      // console.log("Time to learn");
      removeClassStatus();
      setTimeout(() => {
        gradsBtn.classList.add("appear");
        handsMoveForLearningMode();
      }, 500);
      break;
    case "tutDesc":
      learningMode = false;
      // gameState.updateClockMode(checkedSelectStatus);
      setRotationStartForGameAndTut();

      // console.log("Tutorial time");
      removeClassStatus();
      setTimeout(() => {
        setTutorialClasses();
      }, 500);
      break;
    case "gameDesc":
      learningMode = false;
      // gameState.updateClockMode(checkedSelectStatus);
      setRotationStartForGameAndTut();
      // console.log("Game Time");
      removeClassStatus();
      setTimeout(() => {
        setGameClasses();
      }, 500);
      break;
    default:
      learningMode = false;
      gameState.updateClockMode("gameDesc");

      console.log("Something is wrong");
  }
}

//* to initially set all the game buttons
setGameClasses();

const statusSelection = () => {
  //remember, this reference needs to update here and not put outside function because it needs the query to run fresh.
  const checkedSelectStatus = document.querySelector(
    'input[name="status"]:checked'
  ).value;
  // console.log(checkedSelectStatus);
  gameState.updateClockMode(checkedSelectStatus);

  if (gameState.prevClockMode != gameState.clockMode) {
    showButtons(checkedSelectStatus);
  }
  cgptHideScoreDisplay(checkedSelectStatus);
};

openBtn.addEventListener("click", openModal);

// Close Modal function
function closeModal() {
  modalBg.classList.remove("open");
  modal.classList.remove("open");

  statusSelection();

  setTimeout(() => {
    toggleMinuteNumberTicks2(numSwitch.checked);
  }, 500);
}

gradBtnsInput.forEach((gradBtn) => {
  gradBtn.addEventListener("change", function () {
    const checkGradBtnSelect = document.querySelector("#num-grad-btn").checked;

    toggleMinuteNumberTicks2(checkGradBtnSelect);
  });
});

closeBtn.addEventListener("click", closeModal);

// outside Click close
modalBg.addEventListener("click", closeModal);

radioButtonsStatus.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedOption = radio.value;
    let activeDescriptionHeight = 0; // Initialize

    descriptions.forEach((description) => {
      if (description.dataset.option === selectedOption) {
        description.classList.add("active");
        // Force layout (crucial!)
        // window.getComputedStyle(description).opacity;
        activeDescriptionHeight = description.offsetHeight; // Get the height
      } else {
        description.classList.remove("active");
      }
    });
    descriptionContainer.style.height = activeDescriptionHeight + "px"; // Set container height
  });
});

//*  ensuring that the JavaScript code to calculate the height is executed after the modal animations have completed
// modal.addEventListener("transitionend", (event) => {
//   // Check if the transition that ended was the one you care about
//   if (
//     event.propertyName === "transform" ||
//     event.propertyName === "opacity" ||
//     event.propertyName === "visibility"
//   ) {
//     const initialActiveDescription = document.querySelector(
//       ".description.active"
//     );
//     const pSelect = document.querySelector(".game-desc").querySelector("p");
//     const inputSelect = document
//       .querySelector(".game-desc")
//       .querySelector("div");
//     console.log(pSelect.offsetHeight, inputSelect.offsetHeight);
//     console.log(initialActiveDescription.offsetHeight);
//     if (initialActiveDescription) {
//       requestAnimationFrame(() => {
//         window.getComputedStyle(initialActiveDescription).opacity;
//         descriptionContainer.style.height =
//           initialActiveDescription.offsetHeight + "px";
//       });
//     }
//   }
// });

const initialActiveDescription = document.querySelector(".description.active");
// if (initialActiveDescription) {
//   // console.log(initialActiveDescription);
//   // initialActiveDescription.checked = true;
//   // const pSelect = document.querySelector(".game-desc").querySelector("p");
//   // const inputSelect = document.querySelector(".game-desc").querySelector("div");
//   // console.log(pSelect.offsetHeight, inputSelect.offsetHeight);
//   // console.log(initialActiveDescription.offsetHeight);

//   if (initialActiveDescription) {
//     requestAnimationFrame(() => {
//       window.getComputedStyle(initialActiveDescription).opacity;
//       descriptionContainer.style.height =
//         initialActiveDescription.offsetHeight + "px";
//     });
//   }

// initialActiveDescription.dispatchEvent(new Event("change"));
setTimeout(() => {
  if (initialActiveDescription) {
    requestAnimationFrame(() => {
      window.getComputedStyle(initialActiveDescription).opacity;
      descriptionContainer.style.height =
        initialActiveDescription.offsetHeight + "px";
    });
  }
}, 500);
