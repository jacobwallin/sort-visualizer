import snapshot from "../utils/snapshot";

let animationState = [];

export default function quickSort(array) {
  animationState = [];
  snapshot(animationState, array);
  quickSortHelper(0, array.length - 1, array);
  return animationState;
}

function quickSortHelper(low, high, array) {
  let sortedIndex = partition(low, high, array);
  if (low < sortedIndex - 1) {
    quickSortHelper(low, sortedIndex - 1, array);
  }
  if (high > sortedIndex + 1) {
    quickSortHelper(sortedIndex + 1, high, array);
  }
}

function partition(low, high, array) {
  // pivot index
  let pivotIndex = Math.floor((low + high) / 2);
  let pivot = array[pivotIndex].num;

  // swap pivot with element in high index
  array[high].status = "SWAP";
  array[pivotIndex].status = "OTHER";
  snapshot(animationState, array);
  array[high].status = "UNSORTED";
  array[pivotIndex].status = "UNSORTED";
  let temp = array[pivotIndex];
  array[pivotIndex] = array[high];
  array[high] = temp;

  array[high].status = "OTHER";
  snapshot(animationState, array);

  let swapIndex = low;
  for (let i = low; i < high; i++) {
    array[swapIndex].status = "SELECTED";

    if (array[i].num <= pivot) {
      if (i > swapIndex) {
        array[i].status = "SWAP";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[swapIndex].status = "UNSORTED";
        let temp2 = array[i];
        array[i] = array[swapIndex];
        array[swapIndex] = temp2;
      } else {
        snapshot(animationState, array);
        array[swapIndex].status = "UNSORTED";
      }
      swapIndex++;
    } else {
      if (i > swapIndex) {
        array[i].status = "GOOD";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[swapIndex].status = "UNSORTED";
      } else {
        snapshot(animationState, array);
        array[swapIndex].status = "UNSORTED";
      }
    }
  }

  // swap pivot element into it's sorted position
  array[swapIndex].status = "SWAP";
  snapshot(animationState, array);
  array[high].status = "UNSORTED";
  array[swapIndex].status = "UNSORTED";
  let temp3 = array[high];
  array[high] = array[swapIndex];
  array[swapIndex] = temp3;

  // set pivot element status to sorted
  array[swapIndex].status = "SORTED";
  snapshot(animationState, array);
  if (low >= swapIndex - 1) {
    array[low].status = "SORTED";
    snapshot(animationState, array);
  }
  if (high <= swapIndex + 1) {
    array[high].status = "SORTED";
    snapshot(animationState, array);
  }

  return swapIndex;
}
