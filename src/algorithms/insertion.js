import snapshot from "../utils/snapshot";

let animationState = [];

export default function insertionSort(array) {
  animationState = snapshot(animationState, array);
  for (let i = 1; i < array.length; i++) {
    let swapIndex = i;
    array[i].status = "MOVED";
    animationState = snapshot(animationState, array);
    for (let j = i - 1; j >= 0; j--) {
      if (array[j].num > array[swapIndex].num) {
        const temp = array[swapIndex];
        array[swapIndex] = array[j];
        array[j] = temp;

        array[swapIndex].status = "UNSORTED";
        array[j].status = "MOVED";
        swapIndex--;
        animationState = snapshot(animationState, array);
      } else {
        array[swapIndex].status = "UNSORTED";
        break;
      }
    }
    array[0].status = "UNSORTED";
  }
  array.forEach((element) => (element.status = "SORTED"));
  animationState = snapshot(animationState, array);
  return animationState;
}
