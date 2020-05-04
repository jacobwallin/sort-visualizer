function bubbleSort() {
  snapshot();
  for (let i = sortArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (sortArray[j] > sortArray[j + 1]) {
        // swap numbers
        let temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
      }
      snapshot();
    }
  }
}

function mergeSort(low, high) {
  if (low < high) {
    const middle = Math.floor((low + high) / 2);
    mergeSort(low, middle);
    mergeSort(middle + 1, high);
    merge(low, middle, high);
  }
}

function merge(low, middle, high) {
  let copy = [];
  for (i = low; i <= high; i++) {
    copy[i] = sortArray[i];
  }

  let mergeCount = low;
  let mid = middle;

  while (low <= middle && mid < high) {
    if (copy[low] <= copy[mid + 1]) {
      sortArray[mergeCount] = copy[low];
      low++;
    } else {
      sortArray[mergeCount] = copy[mid + 1];
      mid++;
    }
    snapshot();
    mergeCount++;
  }

  if (low > middle) {
    while (mid < high) {
      sortArray[mergeCount] = copy[mid + 1];
      snapshot();
      mid++;
      mergeCount++;
    }
  } else {
    while (low <= middle) {
      sortArray[mergeCount] = copy[low];
      snapshot();
      low++;
      mergeCount++;
    }
  }
}

function quickSort(low, high) {
  let sortedElement = partition(low, high);
  console.log(sortedElement);
  if (low < sortedElement - 1) {
    quickSort(low, sortedElement - 1);
  }
  if (high > sortedElement) {
    quickSort(sortedElement, high);
  }
}

function partition(low, high) {
  // pivot index
  let pivot = sortArray[Math.floor((low + high) / 2)];
  let i = low;
  let j = high;

  while (i <= j) {
    while (sortArray[i] < pivot) {
      i++;
    }
    while (sortArray[j] > pivot) {
      j--;
    }
    if (i <= j) {
      // swap numers
      var temp = sortArray[i];
      sortArray[i] = sortArray[j];
      sortArray[j] = temp;
      snapshot();
      i++;
      j--;
    }
  }
  return i;
}

let state = [];
function snapshot() {
  state.push(sortArray.map((value) => value));
}

let sortArray = [];
function createRandomArray(length) {
  sortArray = [];
  for (let i = 0; i < length; i++) {
    sortArray.push(Math.random());
  }
}

// p5 setup function
function setup() {
  createCanvas(1000, 500);
  frameRate(60);
  createRandomArray(elementQtySlider.value);
  noLoop();
}

// p5 draw function
function draw() {
  console.log("DRAW");

  stepGraph();
  drawGraph();
}

function stepGraph() {
  if (state.length > 0 && slider.value < state.length) {
    sortArray = state[slider.value];
    slider.value++;
  }
}

const BAR_SPACING = 1;
function drawGraph() {
  background(210, 210, 210);
  let barWidth =
    (width - (BAR_SPACING * sortArray.length + BAR_SPACING)) / sortArray.length;
  for (let i = 0; i < sortArray.length; i++) {
    noStroke();
    fill(51, 102, 255);
    rect(
      BAR_SPACING + BAR_SPACING * i + barWidth * i,
      height,
      barWidth,
      -height * sortArray[i]
    );
  }
}

let selectedSort = "";
function startAnimation() {
  switch (selectedSort) {
    case "bubble-sort":
      bubbleSort();
      sorting = true;
      break;
    case "merge-sort":
      mergeSort(0, sortArray.length - 1);
      sorting = true;
      break;
    case "quick-sort":
      quickSort(0, sortArray.length - 1);
      snapshot();
      sorting = true;
      break;
    default:
      return;
  }

  slider.max = state.length - 1;
  loop();
}

let slider = document.getElementById("progress-bar");
slider.addEventListener("click", () => {});
slider.oninput = function () {
  noLoop();
  sortArray = state[slider.value];
  drawGraph();
  if (state.length > 0) {
    pauseButton.classList.add("selected");
    startButton.classList.remove("selected");
  }
};

let elementQty = document.getElementById("elements");
let elementQtySlider = document.getElementById("qty-slider");
elementQty.innerHTML = elementQtySlider.value;
elementQtySlider.oninput = function () {
  // pause p5 draw loop
  noLoop();
  // reset state array and slider
  state = [];
  slider.value = 0;
  slider.max = 0;
  sorting = false;
  pauseButton.classList.remove("selected");
  startButton.classList.remove("selected");
  // create new random array and draw it on canvas
  elementQty.innerHTML = this.value;
  createRandomArray(this.value);
  drawGraph();
};

// let frSlider = document.getElementById("frame-rate");
// frSlider.oninput = function () {
//   console.log("FR", this.value);
//   frameRate(2);
// };

let sorting = false;
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  if (sorting) {
    loop();
  } else {
    startAnimation();
  }
  if (state.length > 0) {
    startButton.classList.add("selected");
    pauseButton.classList.remove("selected");
  }
});

let pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
  noLoop();
  if (state.length > 0) {
    pauseButton.classList.add("selected");
    startButton.classList.remove("selected");
  }
});

let sortButtons = [];

let bubbleSortButton = document.getElementById("bubble-sort");
sortButtons.push(bubbleSortButton);
bubbleSortButton.addEventListener("click", () => {
  selectSortMethod("bubble-sort");
});

let mergeSortButton = document.getElementById("merge-sort");
sortButtons.push(mergeSortButton);
mergeSortButton.addEventListener("click", () => {
  selectSortMethod("merge-sort");
});

let quickSortButton = document.getElementById("quick-sort");
sortButtons.push(quickSortButton);
quickSortButton.addEventListener("click", () => {
  selectSortMethod("quick-sort");
});

function selectSortMethod(method) {
  selectedSort = method;
  sortButtons.forEach((button) => {
    if (button.id === method) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
  if (sorting) {
    state = [];
    slider.value = 0;
    slider.max = 0;
    sorting = false;
    createRandomArray(elementQtySlider.value);
    drawGraph();
    noLoop();
    pauseButton.classList.remove("selected");
    startButton.classList.remove("selected");
  }
}

// function bubbleSortStep(i, j) {
//   if (i >= 0) {
//     if (j < i) {
//       if (sortArray[j] > sortArray[j + 1]) {
//         // swap numbers
//         let temp = sortArray[j];
//         sortArray[j] = sortArray[j + 1];
//         sortArray[j + 1] = temp;
//         return { i, j: j + 1 };
//       } else {
//         return { i, j: j + 1 };
//       }
//     } else {
//       return { i: i - 1, j: 0 };
//     }
//   }
//   sorting = false;
//   // noLoop();
//   return { i, j };
// }
