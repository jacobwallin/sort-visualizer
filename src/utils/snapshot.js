export default function snapshot(animationState, sortedArray) {
  animationState.push(
    sortedArray.map((value) => ({ num: value.num, status: value.status }))
  );
}
