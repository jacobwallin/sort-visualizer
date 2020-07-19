import snapshot from "../utils/snapshot";

let animationState = [];

export default function heapSort(array) {
  animationState = [];
  snapshot(animationState, array);

  // create max heap
  heapify(array);

  // sort the max heap
  sort(array);

  return animationState;
}

function heapify(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    // index where left child of current element will be if it exists
    let leftChildIdx = (i + 1) * 2 - 1;
    let heapedNumIdx = i;

    while (leftChildIdx < array.length) {
      if (leftChildIdx + 1 < array.length) {
        // there is a left and right child, find the larger of the two
        let largerIdx =
          array[leftChildIdx].num > array[leftChildIdx + 1].num
            ? leftChildIdx
            : leftChildIdx + 1;

        if (array[heapedNumIdx].num < array[largerIdx].num) {
          array[heapedNumIdx].status = "SWAP";
          array[largerIdx].status = "SWAP";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[largerIdx].status = "UNSORTED";
          // swap
          let temp = array[heapedNumIdx];
          array[heapedNumIdx] = array[largerIdx];
          array[largerIdx] = temp;

          // reset markers
          heapedNumIdx = largerIdx;
          leftChildIdx = (heapedNumIdx + 1) * 2 - 1;
        } else {
          array[heapedNumIdx].status = "GOOD";
          array[largerIdx].status = "GOOD";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[largerIdx].status = "UNSORTED";
          // element is in the correct spot
          break;
        }
      } else {
        // there is only a left child
        if (array[heapedNumIdx].num < array[leftChildIdx].num) {
          array[heapedNumIdx].status = "SWAP";
          array[leftChildIdx].status = "SWAP";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[leftChildIdx].status = "UNSORTED";
          // swap
          let temp = array[heapedNumIdx];
          array[heapedNumIdx] = array[leftChildIdx];
          array[leftChildIdx] = temp;
        }
        array[heapedNumIdx].status = "GOOD";
        array[leftChildIdx].status = "GOOD";
        snapshot(animationState, array);
        array[heapedNumIdx].status = "UNSORTED";
        array[leftChildIdx].status = "UNSORTED";
        // break out of while loop since end of complete binary tree has been reached
        break;
      }
    }
  }
}

function sort(array) {
  let heapRightBound = array.length - 1;

  // swap first element with last element in heap
  while (heapRightBound >= 0) {
    let temp = array[0];
    array[0] = array[heapRightBound];
    array[heapRightBound] = temp;

    array[heapRightBound].status = "SORTED";
    snapshot(animationState, array);

    heapRightBound--;

    let leftChildIdx = 1;
    let heapedNumIdx = 0;

    while (leftChildIdx <= heapRightBound) {
      if (leftChildIdx + 1 <= heapRightBound) {
        // there is a left and right child, find the larger of the two
        let largerIdx =
          array[leftChildIdx].num > array[leftChildIdx + 1].num
            ? leftChildIdx
            : leftChildIdx + 1;

        if (array[heapedNumIdx].num < array[largerIdx].num) {
          array[heapedNumIdx].status = "SWAP";
          array[largerIdx].status = "SWAP";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[largerIdx].status = "UNSORTED";

          // swap
          let temp = array[heapedNumIdx];
          array[heapedNumIdx] = array[largerIdx];
          array[largerIdx] = temp;

          // reset markers
          heapedNumIdx = largerIdx;
          leftChildIdx = (heapedNumIdx + 1) * 2 - 1;
        } else {
          array[heapedNumIdx].status = "GOOD";
          array[largerIdx].status = "GOOD";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[largerIdx].status = "UNSORTED";

          // element is in the correct spot
          break;
        }
      } else {
        // there is only a left child
        if (array[heapedNumIdx].num < array[leftChildIdx].num) {
          array[heapedNumIdx].status = "SWAP";
          array[leftChildIdx].status = "SWAP";
          snapshot(animationState, array);
          array[heapedNumIdx].status = "UNSORTED";
          array[leftChildIdx].status = "UNSORTED";
          // swap
          let temp = array[heapedNumIdx];
          array[heapedNumIdx] = array[leftChildIdx];
          array[leftChildIdx] = temp;
        }
        array[heapedNumIdx].status = "GOOD";
        array[leftChildIdx].status = "GOOD";
        snapshot(animationState, array);
        array[heapedNumIdx].status = "UNSORTED";
        array[leftChildIdx].status = "UNSORTED";
        // break out of while loop since end of complete binary tree has been reached
        break;
      }
    }
  }
}
