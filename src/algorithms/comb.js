import snapshot from "../utils/snapshot";

let animationState = [];

export default function combSort(array) {
  animationState = [];
  snapshot(animationState, array);

  const shrinkFactor = 1.3;
  let gap = array.length;
  let sorted = false;
  // debugger;
  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap < 1) {
      gap = 1;
      // array could be sorted since gap is only one
      sorted = true;
    }

    let comparisonIdx = 0;
    for (let i = gap; i < array.length; i++) {
      if (array[i].num < array[comparisonIdx].num) {
        // take snapshot showing items were swapped
        array[i].status = "SWAP";
        array[comparisonIdx].status = "SWAP";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[comparisonIdx].status = "UNSORTED";

        // set sorted to false so while loop continues
        sorted = false;

        // swap items
        let temp = array[i];
        array[i] = array[comparisonIdx];
        array[comparisonIdx] = temp;
      } else {
        // take snapshot showing items did not have to be swapped
        array[i].status = "GOOD";
        array[comparisonIdx].status = "GOOD";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[comparisonIdx].status = "UNSORTED";
      }

      comparisonIdx++;
    }
  }

  // set each element's status to sorted for last snapshot
  array.forEach((element) => {
    element.status = "SORTED";
  });

  snapshot(animationState, array);
  return animationState;
}
