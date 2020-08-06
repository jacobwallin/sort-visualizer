import snapshot from "../utils/snapshot";

let animationState = [];

export default function cycleSort(array) {
  animationState = [];
  snapshot(animationState, array);

  for (let i = 0; i < array.length - 1; i++) {
    let pos = i;

    array[i].status = "OTHER";

    // find final sorted position for the number at i index
    for (let j = i + 1; j < array.length; j++) {
      let currentStatus = array[j].status;
      if (array[j].num < array[i].num) {
        array[j].status = "SELECTED";
        pos++;
      } else {
        array[j].status = "GOOD";
      }
      snapshot(animationState, array);
      array[j].status = currentStatus;
    }

    if (pos === i) {
      array[i].status = "SORTED";
      continue;
    }

    array[pos].status = "SWAP";
    snapshot(animationState, array);
    array[i].status = "UNSORTED";
    array[pos].status = "UNSORTED";

    let temp = array[pos];
    array[pos] = array[i];
    array[i] = temp;

    array[pos].status = "SORTED";

    while (pos !== i) {
      pos = i;
      array[i].status = "OTHER";
      for (let j = i + 1; j < array.length; j++) {
        let currentStatus = array[j].status;
        if (array[j].num < array[i].num) {
          array[j].status = "SELECTED";
          pos++;
        } else {
          array[j].status = "GOOD";
        }
        snapshot(animationState, array);
        array[j].status = currentStatus;
      }

      array[pos].status = "SWAP";
      snapshot(animationState, array);
      array[i].status = "UNSORTED";
      array[pos].status = "UNSORTED";

      let temp = array[pos];
      array[pos] = array[i];
      array[i] = temp;

      array[pos].status = "SORTED";
    }
  }

  snapshot(animationState, array);
  return animationState;
}
