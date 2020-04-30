const ARR_LENGTH = 75;
const BAR_SPACING = 3;
let sortArray = [];
let startButton = document.getElementById("bubble-sort");
startButton.addEventListener("click", bubbleSort);

function createRandomArray() {
  for (let i = 0; i < ARR_LENGTH; i++) {
    sortArray.push(Math.random());
  }
}

function bubbleSort(i, j) {
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

function mergeSort() {}

function setup() {
  createCanvas(1000, 500);
  createRandomArray();
}

function draw() {
  background(200, 200, 200);
  drawGraph();
  noLoop();
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
