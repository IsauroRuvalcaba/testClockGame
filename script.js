const numberHours = document.querySelector(".number-hours");
const barSeconds = document.querySelector(".bar-seconds");
const hourHand = document.querySelector(".hours");
const minuteHand = document.querySelector(".minutes");
const secondHand = document.querySelector(".seconds");
const btnStartGame = document.querySelector(".startGame");
const btnCancelGame = document.querySelector(".cancelGame");
// const btnSpinClock = document.querySelector(".spinClock");
const btnVerifyScore = document.querySelector(".verifyScore");
const totalScore = document.getElementById("totalScore");
let dClock = document.querySelector(".dDisplay");

// btnSpinClock.disabled = true;
btnVerifyScore.disabled = true;

//* slider
let sliders = document.querySelectorAll(".slider-wrapper");
let value = document.querySelectorAll(".value");

// values.forEach()
let dClockValues = {
  hour: 12,
  minute: 30,
  second: 28,
};

let aClockValues = {
  hour: 0,
  minute: 0,
  second: 0,
};

let gameState = {
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
  }, 500);
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

let timeLeftCountDown;

function countDown() {
  let timeLeft = 120;
  // console.log(timeLeft);

  timeLeftCountDown = setInterval(() => {
    const timerEl = document.querySelector(".time-left");
    timeLeft -= 1;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timeLeftCountDown);
      btnStartGame.disabled = false;
      btnVerifyScore.disabled = true;
    }
  }, 1000);
}

const cancelTimeGame = () => {
  console.log("cancel btn pressed");
  btnStartGame.disabled = false;
  btnVerifyScore.disabled = true;
  clearInterval(timeLeftCountDown);
};

const startGame = () => {
  console.log("start button pressed");
  gameState.gameRefresh();
  btnStartGame.disabled = true;
  btnStartGame.disabled
    ? console.log("start button disabled")
    : console.log("start button enabled");
  movehand();
  countDown();
};

sliders.forEach((slider, index) => {
  // console.log(slider.querySelector(".value").innerHTML);
  let tValue = slider.querySelector("input").dataset.time;
  slider.querySelector(".slider").value = dClockValues[tValue];

  //* when hovering and using the scroll wheel
  // https://stackoverflow.com/questions/67651894/how-do-i-change-the-value-of-a-range-input-by-user-scroll
  let sliderScroll = slider.querySelector(".slider");

  let lastScrollTime = 0;

  sliderScroll.addEventListener("wheel", function (e) {
    // let event = new Event("change", { bubbles: true, cancelable: true });
    // sliderScroll.dispatchEvent(event);

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

    dClock.innerHTML = `<span class=dHour>${
      dClockValues.hour
    }</span>:<span class=dMinute>${dClockValues.minute
      .toString()
      .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
      .toString()
      .padStart(2, 0)}</span>`;
  });

  // * when dragging the input button
  slider.addEventListener("input", function () {
    // console.log(slider.querySelector(".slider").value);
    let tValue = slider.querySelector("input").dataset.time;
    dClockValues[tValue] = +slider.querySelector(".slider").value;

    dClock.innerHTML = `<span class=dHour>${
      dClockValues.hour
    }</span>:<span class=dMinute>${dClockValues.minute
      .toString()
      .padStart(2, 0)}</span>:<span class=dSecond>${dClockValues.second
      .toString()
      .padStart(2, 0)}</span>`;
    // console.log(dClock);
    // getTime();
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
const barElement = [];

// create number hours
for (let i = 1; i <= 12; i++) {
  numberElement.push(`<span style="--index:${i};"><p>${i}</p></span>`);
}
numberHours.insertAdjacentHTML("afterbegin", numberElement.join(""));

// create bar seconds
for (let i = 1; i <= 60; i++) {
  barElement.push(`<span style="--index:${i};"><p></p></span>`);
}

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

  btnStartGame.disabled = true;
  btnVerifyScore.disabled = false;

  hourHand.offsetHeight; //*this is necessary. offsetHeight property - This has to do with Browser Rendering Pipeline - claude ai has a really good expanation on this.  offsetHeight is only needed on one element for Reflow and force the browser to calculate layout immediately. the below two aren't needed
  minuteHand.offsetHeight; //this is necessary
  secondHand.offsetHeight; //this is necessary

  initiateHandStyleEffect(hourHand, newHRotation, 4, 0);
  initiateHandStyleEffect(minuteHand, newMRotation, 3, 0.25);
  initiateHandStyleEffect(secondHand, newSRotation, 3.5, 0.5);

  currentHRotation = (newHRotation + 1440) % 360;
  console.log(currentHRotation);

  currentMRotation = newMRotation % 360;
  currentSRotation = newSRotation % 360;

  let currentHour =
    Math.floor(currentHRotation / 30) == 0
      ? 12
      : Math.floor(currentHRotation / 30);

  aClockValues.hour = currentHour;
  aClockValues.minute = newMRotation / 6;
  aClockValues.second = newSRotation / 6;

  btnVerifyScore.disabled = true;
  setTimeout(() => {
    // hourHand.style.transition = "";
    // btnSpinClock.disabled = true;
    btnVerifyScore.disabled = false;
  }, 3000);
}
