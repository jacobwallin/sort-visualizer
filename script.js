const BAR_SPACING = 3;
let sortArray = [];
let sorting = false;
let startButton = document.getElementById("bubble-sort");
startButton.addEventListener("click", () => {
  sorting = true;
});
let mergeSortButton = document.getElementById("merge-sort");
mergeSortButton.addEventListener("click", () => {
  console.log("before Merge", sortArray);
  mergeSort(0, sortArray.length - 1);
  draw();
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
      if (sortArray[j] > sortArray[j + 1]) {
        // swap numbers
        let temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
      }
    }
  }
  draw();
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
  createCanvas(1000, 500);
  frameRate(200);
  createRandomArray(50);
  noLoop();

  slider = createSlider(5, 100, 7, 1);
  slider.position(10, 10);
  slider.style("width", "200px");
  // slider.touchMoved(() => {
  //   createRandomArray(slider.value());
  //   draw();
  // });
}

function draw() {
  console.log("draw");
  background(210, 210, 210);
  if (sorting) {
    const newIndeces = bubbleSortStep(count1, count2);
    count1 = newIndeces.i;
    count2 = newIndeces.j;
  } else {
    if (slider.value() !== sortArray.length) {
      createRandomArray(slider.value());
    }
  }
  drawGraph();
  noLoop();
}

function drawGraph() {
  let barWidth =
    (width - (BAR_SPACING * sortArray.length + BAR_SPACING)) / sortArray.length;

  for (let i = 0; i < sortArray.length; i++) {
    stroke(30);
    fill(51, 102, 255);
    rect(
      BAR_SPACING + BAR_SPACING * i + barWidth * i,
      height,
      barWidth,
      -height * sortArray[i]
    );
  }
}
