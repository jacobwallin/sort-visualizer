const ARR_LENGTH = 50;
const BAR_SPACING = 3;
let sortArray = [];
let startButton = document.getElementById("bubble-sort");
startButton.addEventListener("click", () => loop());

function createRandomArray() {
  for (let i = 0; i < ARR_LENGTH; i++) {
    sortArray.push(Math.random());
  }
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
  return { i, j };
}

function mergeSort() {}

let count1, count2;
function setup() {
  createCanvas(1000, 500);
  frameRate(200);
  createRandomArray();
  count1 = sortArray.length - 1;
  count2 = 0;
  noLoop();
}

function draw() {
  console.log("draw");
  background(200, 200, 200);
  drawGraph();
  const newIndeces = bubbleSortStep(count1, count2);
  count1 = newIndeces.i;
  count2 = newIndeces.j;
}

function drawGraph() {
  let barWidth =
    (width - (BAR_SPACING * sortArray.length + BAR_SPACING)) / sortArray.length;

  for (let i = 0; i < sortArray.length; i++) {
    stroke(30);
    fill(102, 0, 102);
    rect(
      BAR_SPACING + BAR_SPACING * i + barWidth * i,
      height,
      barWidth,
      -height * sortArray[i]
    );
  }
}
