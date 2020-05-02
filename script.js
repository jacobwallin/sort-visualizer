const BAR_SPACING = 1;
let sortArray = [];
let sorting = false;
let startButton = document.getElementById("bubble-sort");
startButton.addEventListener("click", () => {
  bubbleSort();
  console.log(state);
});
let mergeSortButton = document.getElementById("merge-sort");
mergeSortButton.addEventListener("click", () => {
  noLoop();
  console.log("before Merge", sortArray);
  mergeSort(0, sortArray.length - 1);
  console.log("after Merge", sortArray);
});

function createRandomArray(length) {
  sortArray = [];
  for (let i = 0; i < length; i++) {
    sortArray.push(Math.random());
  }
  count1 = sortArray.length - 1;
  count2 = 0;
}

function bubbleSort() {
  for (let i = sortArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      saveState();
      if (sortArray[j] > sortArray[j + 1]) {
        // swap numbers
        let temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
      }
    }
  }
}

let state = [];
function saveState() {
  state.push(sortArray.map((value) => value));
}

function bubbleSortStep(i, j) {
  if (i >= 0) {
    if (j < i) {
      if (sortArray[j] > sortArray[j + 1]) {
        // swap numbers
        let temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
        return { i, j: j + 1 };
      } else {
        return { i, j: j + 1 };
      }
    } else {
      return { i: i - 1, j: 0 };
    }
  }
  sorting = false;
  // noLoop();
  return { i, j };
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
    mergeCount++;
  }

  if (low > middle) {
    while (mid < high) {
      sortArray[mergeCount] = copy[mid + 1];
      mid++;
      mergeCount++;
    }
  } else {
    while (low <= middle) {
      sortArray[mergeCount] = copy[low];
      low++;
      mergeCount++;
    }
  }
}

let count1, count2;

function setup() {
  console.log("SETUP");
  createCanvas(1000, 500);
  frameRate(200);
  createRandomArray(500);
  bubbleSort();
  console.log(state);

  // noLoop();

  slider = createSlider(5, state.length - 1, 0, 1);
  slider.position(5, 600);
  slider.style("width", "1000px");
  // slider.touchMoved(() => {
  //   createRandomArray(slider.value());
  //   draw();
  // });
}

let count = 0;
function draw() {
  console.log("DRAW");
  background(210, 210, 210);
  count = slider.value();
  sortArray = state[count];
  drawGraph();
  // noLoop();
}

function drawGraph() {
  let barWidth =
    (width - (BAR_SPACING * sortArray.length + BAR_SPACING)) / sortArray.length;

  for (let i = 0; i < sortArray.length; i++) {
    // stroke(30);
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
