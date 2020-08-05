import snapshot from "../utils/snapshot";

let animationState = [];

export default function cocktailShakerSort(array) {
  animationState = [];
  snapshot(animationState, array);
  // debugger;
  let swapped = true;
  let loopCounter = 0;
  while (swapped) {
    swapped = false;
    // loop from right to left
    for (let i = 1 + loopCounter; i < array.length - loopCounter; i++) {
      if (array[i].num < array[i - 1].num) {
        array[i].status = "SWAP";
        array[i - 1].status = "SWAP";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[i - 1].status = "UNSORTED";

        // set swapped to true so loop continues
        swapped = true;
        //swap
        let temp = array[i];
        array[i] = array[i - 1];
        array[i - 1] = temp;
      } else {
        array[i].status = "GOOD";
        array[i - 1].status = "GOOD";
        snapshot(animationState, array);
        array[i].status = "UNSORTED";
        array[i - 1].status = "UNSORTED";
      }
    }

    array[array.length - 1 - loopCounter].status = "SORTED";
    snapshot(animationState, array);
    // loop from right to left, but only if a swap was made in first loop
    if (swapped) {
      for (let i = array.length - 2 - loopCounter; i > loopCounter; i--) {
        if (array[i].num < array[i - 1].num) {
          array[i].status = "SWAP";
          array[i - 1].status = "SWAP";
          snapshot(animationState, array);
          array[i].status = "UNSORTED";
          array[i - 1].status = "UNSORTED";

          // set swapped to true so loop continues
          swapped = true;
          //swap
          let temp = array[i];
          array[i] = array[i - 1];
          array[i - 1] = temp;
        } else {
          array[i].status = "GOOD";
          array[i - 1].status = "GOOD";
          snapshot(animationState, array);
          array[i].status = "UNSORTED";
          array[i - 1].status = "UNSORTED";
        }
      }
      array[loopCounter].status = "SORTED";
      snapshot(animationState, array);
    }
    loopCounter++;
  }

  // set each element's status to sorted for last snapshot
  array.forEach((element) => {
    element.status = "SORTED";
  });

  snapshot(animationState, array);
  return animationState;
}
