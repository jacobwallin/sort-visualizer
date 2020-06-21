export default {
  bubble: {
    title: "Bubble Sort",
    about:
      'Bubble sort works by looping through the list once per item, each time comparing adjacent items and swapping them if they are out of order. This results in the largest unsorted item ”bubbling" to the end of the list into its final sorted position after each pass.',
    timeExplanation:
      "Bubble sort has an average time complexity of O(n²) as the algorithm loops through the list once per element. If any single loop completes without any swaps being made, the list is sorted and bubble sort does not make any further comparisons. This means that if bubble sort is given a pre-sorted list it will only make one pass, resulting in a best case time complexity of O(n). The worst case time complexity would be a list that is in reverse order as it will require the maximum number of swaps.",
    spaceExplanation:
      "The space complexity of bubble sort is O(1) as the only space required is a single temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
  },
  insertion: {
    title: "Insertion Sort",
    about:
      "Insertion sort works by first comparing the first two items in the list and swapping them if they are out of order. These two items form a sorted subset of the complete list. Insertion sort then continues iterating through the list, “inserting” each item one at a time into its correct position within the sorted subset of items. ",
    timeExplanation:
      "In the average case, insertion sort will run in O(n²) time as for each item in the list, it loops through the sorted subset of items to find the correct position. The best case time is O(n) and will only occur if the list of items is already pre-sorted since no swaps would be required and only a single comparison per item. The worst case time occurs with a list in reverse order as each item will have to be swapped the maximum number of times.",
    spaceExplanation:
      "The space complexity of insertion sort is O(1) as the only space required is a single temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
  },
  merge: {
    title: "Merge Sort",
    about: "N/A",
    timeExplanation: "N/A",
    spaceExplanation: "N/A",
    timeComplexity: {
      average: "O(n log(n))",
      best: "O(n log(n))",
      worst: "O(n log(n))",
    },
    spaceComplexity: "O(n)",
  },
  quick: {
    title: "Quick Sort",
    about: "N/A",
    timeExplanation: "N/A",
    spaceExplanation: "N/A",
    timeComplexity: {
      average: "O(n log(n))",
      best: "O(n log(n))",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log(n))",
  },
};
