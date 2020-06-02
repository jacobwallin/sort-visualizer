let sortedElements = [];
function createRandomArray(length) {
  sortedElements = [];
  // creates array of objects, each with a random floating-point number and color
  for (let i = 0; i < length; i++) {
    sortedElements.push({ num: Math.random(), status: "UNSORTED" });
  }
}

function testyBoi() {
  createRandomArray(5);
  let copy = [];
  for (i = 0; i < sortedElements.length; i++) {
    copy[i] = sortedElements[i];
  }

  copy[0] = 1;
  sortedElements[0] = 2;
  const temp = copy[0];
  copy[0] = sortedElements[0];
  console.log("TEMP", temp);
  sortedElements[0] = temp;
  console.log("copy:", copy, "\nsortedElements:", sortedElements);
}

testyBoi();
