import "./main.scss";

import p5 from "p5";

import bubbleSort from "./algorithms/bubble";
import insertionSort from "./algorithms/insertion";
import mergeSort from "./algorithms/merge";
import quickSort from "./algorithms/quick";

let p5Canvas = new p5(sketch);

function sketch(p) {
  // p5 setup function
  p.setup = function () {
    p.createCanvas(1000, 500).parent("sketch-holder");
    p.frameRate(60);
    createRandomArray(elementQtySlider.value);
    p.noLoop();
  };

  // p5 draw function
  p.draw = function () {
    stepGraph();
    drawGraph();
  };
}

function stepGraph() {
  if (state.length > 0 && slider.value < state.length) {
    sortedElements = state[slider.value];
    slider.value++;
  }
}

const BAR_SPACING = 1;
function drawGraph() {
  p5Canvas.background(210, 210, 210);
  let barWidth =
    (p5Canvas.width - (BAR_SPACING * sortedElements.length + BAR_SPACING)) /
    sortedElements.length;
  for (let i = 0; i < sortedElements.length; i++) {
    p5Canvas.noStroke();
    switch (sortedElements[i].status) {
      case "UNSORTED":
        p5Canvas.fill(
          `rgba(100, 100, 100, ${p5Canvas.map(
            sortedElements[i].num,
            0,
            1,
            0.25,
            1
          )})`
        );
        break;
      case "SORTED":
        p5Canvas.fill(
          `rgba(51, 102, 255, ${p5Canvas.map(
            sortedElements[i].num,
            0,
            1,
            0.35,
            1
          )})`
        );
        break;
      case "MOVED":
        p5Canvas.fill(255, 204, 0);
        break;
      case "SELECTED":
        p5Canvas.fill(255, 0, 0);
        break;
      default:
        p5Canvas.fill(0, 0, 0);
        break;
    }
    p5Canvas.rect(
      BAR_SPACING + BAR_SPACING * i + barWidth * i,
      p5Canvas.height,
      barWidth,
      -p5Canvas.height * sortedElements[i].num
    );
  }
}

let sortedElements = [];
function createRandomArray(length) {
  sortedElements = [];
  // creates array of objects, each with a random floating-point number and color
  for (let i = 0; i < length; i++) {
    sortedElements.push({ num: Math.random(), status: "UNSORTED" });
  }

  if (elementOrder === "pre-sorted-asc") {
    preSort(true);
  } else if (elementOrder === "pre-sorted-desc") {
    preSort(false);
  }
}
let state = [];
let selectedSort = "bubble-sort";
function startAnimation() {
  switch (selectedSort) {
    case "bubble-sort":
      state = bubbleSort(sortedElements);
      sorting = true;
      break;
    case "merge-sort":
      state = mergeSort(sortedElements);
      sorting = true;
      break;
    case "quick-sort":
      state = quickSort(sortedElements);
      sorting = true;
      break;
    case "insertion-sort":
      state = insertionSort(sortedElements);
      sorting = true;
      break;
    default:
      return;
  }

  slider.max = state.length - 1;
  p5Canvas.loop();
}

let slider = document.getElementById("progress-bar");
slider.addEventListener("click", () => {});
slider.oninput = function () {
  p5Canvas.noLoop();
  sortedElements = state[slider.value];
  drawGraph();
  if (state.length > 0) {
    startPauseButton.innerHTML = "START";
    isPaused = true;
  }
};

let elementQty = document.getElementById("elements");
let elementQtySlider = document.getElementById("qty-slider");
elementQty.innerHTML = elementQtySlider.value;
elementQtySlider.oninput = function () {
  // pause p5 draw loop
  p5Canvas.noLoop();
  // reset state array and slider
  if (state.length > 0) {
    state = [];
    slider.value = 0;
    slider.max = 0;
    sorting = false;
    startPauseButton.innerHTML = "START";
    isPaused = true;
  }
  // create new random array and draw it on canvas
  elementQty.innerHTML = this.value;
  createRandomArray(this.value);
  drawGraph();
};

let sorting = false;
let isPaused = true;
let startPauseButton = document.getElementById("start-button");
startPauseButton.addEventListener("click", () => {
  if (isPaused) {
    if (sorting) {
      p5Canvas.loop();
      isPaused = false;
      startPauseButton.innerHTML = "PAUSE";
    } else if (selectedSort !== "") {
      startAnimation();
      isPaused = false;
      startPauseButton.innerHTML = "PAUSE";
    }
  } else {
    if (sorting) {
      p5Canvas.noLoop();
      startPauseButton.innerHTML = "START";
      isPaused = true;
    }
  }
});

document
  .getElementById("step-backward-button")
  .addEventListener("click", () => {
    if (state.length > 0 && slider.value > 0) {
      p5Canvas.noLoop();
      slider.value--;
      sortedElements = state[slider.value];
      drawGraph();
      startPauseButton.innerHTML = "START";
      isPaused = true;
    }
  });

document.getElementById("step-forward-button").addEventListener("click", () => {
  if (state.length > 0 && slider.value < state.length - 1) {
    p5Canvas.noLoop();
    slider.value++;
    sortedElements = state[slider.value];
    drawGraph();
    startPauseButton.innerHTML = "START";
    isPaused = true;
  }
});

document
  .getElementsByClassName("dropdown-content")[0]
  .addEventListener("click", (event) => {
    document.getElementById("selected-algorithm").innerHTML =
      event.target.innerText;
    if (sorting) {
    }
    selectSortMethod(event.target.id);
  });

let elementOrder = "random-order";
document
  .getElementsByClassName("order-dropdown-content")[0]
  .addEventListener("click", (event) => {
    if (elementOrder !== event.target.id) {
      elementOrder = event.target.id;
      if (sorting) {
        state = [];
        slider.value = 0;
        slider.max = 0;
        sorting = false;
        p5Canvas.noLoop();
        startPauseButton.innerHTML = "START";
        isPaused = true;
      }
      createRandomArray(elementQtySlider.value);
      drawGraph();
    }
    document.getElementById("selected-order").innerHTML =
      event.target.innerText;
  });

function selectSortMethod(method) {
  selectedSort = method;
  if (sorting) {
    state = [];
    slider.value = 0;
    slider.max = 0;
    sorting = false;
    createRandomArray(elementQtySlider.value);
    drawGraph();
    p5Canvas.noLoop();
    startPauseButton.innerHTML = "START";
    isPaused = true;
  }
}

function preSort(sortAscending) {
  for (let i = sortedElements.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (sortAscending) {
        if (sortedElements[j].num > sortedElements[j + 1].num) {
          let temp = sortedElements[j];
          sortedElements[j] = sortedElements[j + 1];
          sortedElements[j + 1] = temp;
        }
      } else if (sortedElements[j].num < sortedElements[j + 1].num) {
        let temp = sortedElements[j];
        sortedElements[j] = sortedElements[j + 1];
        sortedElements[j + 1] = temp;
      }
    }
  }
}
