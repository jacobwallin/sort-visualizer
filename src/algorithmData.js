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
    about:
      "Merge sort works by dividing the list of items into subsets until each subset consists of only a single item. The subsets are then repeatedly merged together into sorted subsets until only two remain, and then they are merged one last time to create the final sorted list. Merge sort does not swap items within the list in the same way as other algorithms, but rather creates a complete copy of the subsets being merged, and then uses that copy to replace the items in the list in the correct order.",
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
    about:
      "Quick sort works by first selecting a pivot element, and then partitioning the remaining items into a subset with the items smaller than the pivot, and a subset with the items larger than the pivot. The pivot item is then placed between these two subsets into its final sorted position. Quick sort is then called recursively on the two subsets until the list is sorted. There are many different methods of selecting the pivot element, but this implementation selects the middle item from the list being partitioned. Once the pivit is selected it is then swapped with the item at the end of the list so that the subsets can be created.",
    timeExplanation:
      "Quick sort has an average time complexity of O(n log(n)). The best case occurs when each partition divides the items into two subsets of equal size. This results in the least recursive calls possible as the depth of the call tree will be base 2 log(n). Since this implementation of quick sort selects the middle item as the pivot, the best case complexity is achieved with a list that is already in sorted or reverse order. The worst case occurs when each pivot selected is either the largest or smallest element in the list. The results in a call tree with a single branch with n - 1 calls, resulting in O(n²) time. A common implementation of quick sort selects the last item in the list as the pivot, which can result in the worst case if the list is already in reverse or sorted order. Using better methods to select the pivot item make the worst case or anything near the worst case extremely rare.",
    spaceExplanation:
      "Quick sort has a O(log(n)) space complexity on average because of the recursive call stack. ",
    timeComplexity: {
      average: "O(n log(n))",
      best: "O(n log(n))",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log(n))",
  },
};
