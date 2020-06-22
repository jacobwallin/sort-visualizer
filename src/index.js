import "./main.scss";

import p5 from "p5";

import algorithmData from "./algorithmData";

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
    p.background(210, 210, 210);
    drawLegend("bubble");
    createRandomArray(elementQtySlider.value);
    updateAlgorithmInfo("bubble");
    p.noLoop();
  };

  // p5 draw function
  p.draw = function () {
    stepGraph();
    drawGraph();
  };
}

function drawLegend(algorithm) {
  p5Canvas.noStroke();
  p5Canvas.fill(210, 210, 210);
  p5Canvas.rect(0, 0, p5Canvas.width, 40);

  let xOffset = 20;

  switch (algorithm) {
    case "bubble":
    case "insertion":
      drawLegendItem(xOffset, "rgb(0, 102, 255)", "sorted");
      drawLegendItem(xOffset + 110, "rgb(255, 220, 0)", "current item");
      drawLegendItem(
        xOffset + 255,
        "rgb(255, 153, 153)",
        "swapped with current"
      );
      drawLegendItem(xOffset + 470, "rgb(0, 153, 0)", "not swapped");
      break;
    case "merge":
      drawLegendItem(xOffset, "rgb(0, 102, 255)", "sorted");
      drawLegendItem(xOffset + 110, "rgb(255, 220, 0)", "not merged");
      drawLegendItem(xOffset + 260, "rgb(0, 153, 0)", "merged item");
      break;
    case "quick":
      drawLegendItem(xOffset, "rgb(0, 102, 255)", "sorted");
      drawLegendItem(xOffset + 105, "rgb(153, 51, 255)", "pivot");
      drawLegendItem(xOffset + 200, "rgb(255, 153, 153)", "swapped");
      drawLegendItem(xOffset + 320, "rgb(0, 153, 0)", "not swapped");
      drawLegendItem(
        xOffset + 470,
        "rgb(255, 220, 0)",
        "pivot sorted position"
      );
      break;
    default:
      break;
  }
}

function drawLegendItem(x, color, text) {
  p5Canvas.noStroke();
  p5Canvas.fill(color);
  p5Canvas.rect(x, 10, 25, 25);
  p5Canvas.fill("black");
  p5Canvas.textSize(16);
  p5Canvas.text(`${text}`, x + 35, 29);
}

function stepGraph() {
  if (state.length > 0 && slider.value < state.length) {
    sortedElements = state[slider.value];
    slider.value++;
  }
}

const BAR_SPACING = 1;
function drawGraph() {
  p5Canvas.noStroke();
  // clear chart area of canvas
  p5Canvas.fill(210, 210, 210);
  p5Canvas.rect(0, p5Canvas.height, p5Canvas.width, -p5Canvas.height + 40);

  let barWidth =
    (p5Canvas.width - (BAR_SPACING * sortedElements.length + BAR_SPACING)) /
    sortedElements.length;
  for (let i = 0; i < sortedElements.length; i++) {
    switch (sortedElements[i].status) {
      case "UNSORTED":
        p5Canvas.fill(
          `rgba(100, 100, 100, ${p5Canvas.map(
            sortedElements[i].num,
            0,
            1,
            0.2,
            1
          )})`
        );
        break;
      case "SORTED":
        p5Canvas.fill(
          `rgba(0, 102, 255, ${p5Canvas.map(
            sortedElements[i].num,
            0,
            1,
            0.25,
            1
          )})`
        );
        break;
      case "SELECTED":
        p5Canvas.fill(255, 220, 0);
        break;
      case "SWAP":
        p5Canvas.fill(255, 153, 153);
        break;
      case "GOOD":
        p5Canvas.fill(0, 153, 0);
        break;
      case "OTHER":
        p5Canvas.fill(153, 51, 255);
        break;
      default:
        p5Canvas.fill(0, 0, 0);
        break;
    }
    p5Canvas.rect(
      BAR_SPACING + BAR_SPACING * i + barWidth * i,
      p5Canvas.height,
      barWidth,
      (-p5Canvas.height + 40) * sortedElements[i].num
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
let selectedSort = "bubble";
function startAnimation() {
  switch (selectedSort) {
    case "bubble":
      state = bubbleSort(sortedElements);
      sorting = true;
      break;
    case "merge":
      state = mergeSort(sortedElements);
      sorting = true;
      break;
    case "quick":
      state = quickSort(sortedElements);
      sorting = true;
      break;
    case "insertion":
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
    updateAlgorithmInfo(event.target.id);
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
  drawLegend(method);
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

function updateAlgorithmInfo(algorithm) {
  document.getElementById("algorithm-title").innerHTML =
    algorithmData[algorithm].title;
  document.getElementById("algorithm-about").innerHTML =
    algorithmData[algorithm].about;
  document.getElementById("algorithm-time").innerHTML =
    algorithmData[algorithm].timeExplanation;
  document.getElementById("algorithm-space").innerHTML =
    algorithmData[algorithm].spaceExplanation;
  document.getElementById("average-time-complexity").innerHTML =
    algorithmData[algorithm].timeComplexity.average;
  document.getElementById("best-time-complexity").innerHTML =
    algorithmData[algorithm].timeComplexity.best;
  document.getElementById("worst-time-complexity").innerHTML =
    algorithmData[algorithm].timeComplexity.worst;
  document.getElementById("space-complexity").innerHTML =
    algorithmData[algorithm].spaceComplexity;
}
