import snapshot from "../utils/snapshot";

let animationState = [];

export default function mergeSort(array) {
  mergeSortHelper(0, array.length - 1, array);
  return animationState;
}

function mergeSortHelper(low, high, array) {
  if (low < high) {
    const middle = Math.floor((low + high) / 2);
    mergeSortHelper(low, middle, array);
    mergeSortHelper(middle + 1, high, array);
    merge(low, middle, high, array);
  }
}

function merge(low, middle, high, array) {
  let leftIndex = low;
  let rightIndex = middle;

  while (leftIndex <= rightIndex && rightIndex < high) {
    array[leftIndex].status = "MOVED";
    array[rightIndex + 1].status = "MOVED";
    if (array[leftIndex].num <= array[rightIndex + 1].num) {
      // left element is in correct spot
      snapshot(animationState, array);
      leftIndex++;
    } else {
      // element in right index must be moved to left index position, and all other elements inbetween shifted
      snapshot(animationState, array);
      const temp = array[rightIndex + 1];

      for (let i = 0; i < rightIndex + 1 - leftIndex; i++) {
        array[rightIndex + 1 - i] = array[rightIndex - i];
      }

      array[leftIndex] = temp;

      rightIndex++;
      leftIndex++;
    }

    array.forEach((element) => {
      element.status = "UNSORTED";
    });
  }

  if (low === 0 && high === array.length - 1) {
    snapshot(animationState, array);
    array.forEach((element) => {
      element.status = "SORTED";
    });

    snapshot(animationState, array);
  }
}
