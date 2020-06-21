import snapshot from "../utils/snapshot";

let animationState = [];

export default function insertionSort(array) {
  animationState = [];
  snapshot(animationState, array);
  for (let i = 1; i < array.length - 1; i++) {
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      array[swapIndex].status = "SELECTED";
      if (array[j].num > array[swapIndex].num) {
        // take snapshot showing swap
        array[j].status = "SWAPPED";
        snapshot(animationState, array);
        array[swapIndex].status = "UNSORTED";
        array[j].status = "UNSORTED";
        // swap elements
        const temp = array[swapIndex];
        array[swapIndex] = array[j];
        array[j] = temp;
        swapIndex--;
      } else {
        array[j].status = "NOSWAP";
        snapshot(animationState, array);
        array[swapIndex].status = "UNSORTED";
        array[j].status = "UNSORTED";
        break;
      }
    }
    array[0].status = "UNSORTED";
  }

  // last pass through array is separated to mark elements as sorted one by one
  let swapIndex = array.length - 1;
  for (let j = swapIndex - 1; j > 0; j--) {
    array[swapIndex].status = "SELECTED";
    if (array[j].num > array[swapIndex].num) {
      // take snapshot showing swap
      array[j].status = "SWAPPED";
      snapshot(animationState, array);
      array[swapIndex].status = "UNSORTED";
      array[j].status = "UNSORTED";
      // swap elements
      const temp = array[swapIndex];
      array[swapIndex] = array[j];
      array[j] = temp;
      array[swapIndex].status = "SORTED";
      swapIndex--;
    } else {
      array[j].status = "NOSWAP";
      snapshot(animationState, array);
      array[swapIndex].status = "UNSORTED";
      array[j].status = "UNSORTED";
      break;
    }
  }

  // mark remaining elements that did not need to be swapped as sorted
  for (let i = swapIndex; i >= 0; i--) {
    array[i].status = "SORTED";
  }

  // final snapshot
  snapshot(animationState, array);

  return animationState;
}
