export default {
  bubble: {
    title: "Bubble Sort",
    about:
      'Bubble sort works by looping through the list once per item, each time comparing adjacent items and swapping them if they are out of order. This results in the largest unsorted item ”bubbling" to the end of the list into its final sorted position after each pass.',
    timeExplanation:
      "Bubble sort has an average time complexity of O(n²) as the algorithm loops through the unsorted elements in the list once per element. If any single loop completes without any swaps being made, the list is sorted and bubble sort will not make any further comparisons. This means that if bubble sort is given a pre-sorted list it will only loop through the items once, resulting in a best case time complexity of O(n). The worst case time complexity would be a list that is in reverse order as it will require the maximum number of swaps and comparisons.",
    spaceExplanation:
      "Bubble sort has an O(1) space complexity as the only space required is a single temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stability: "Stable",
  },
  cocktail: {
    title: "Cocktail Shaker Sort",
    about:
      "Cocktail shaker sort works identical to bubble sort, but instead of finding the largest unsorted element at each iteration through the list, it works in both directions by alternating between “bubbling” the largest item to the end and the smallest item to the beginning of the unsorted list. This improvement helps better deal with smaller elements sometimes called “turtles” that initially start towards the end of the list before sorting. These elements can slow down bubble sort since they can only move one spot towards their sorted position per iteration through the list and can cause many more loops through the list to be necessary.",
    timeExplanation:
      "Cocktail shaker sort has an average and worst case time complexity of O(n²) as it loops through the list once per element. In the best case, if the list is already sorted only one pass is necessary as just like bubble sort it will detect the list is sorted if no swaps were necessary during any single iteration. ",
    spaceExplanation:
      "Cocktail shaker sort has an O(1) space complexity as the only space required is a single temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stability: "Stable",
  },
  cycle: {
    title: "Cycle Sort",
    about:
      'Cycle Sort works by completing a sorting "cycle" once for each element in the list. The first cycle begins by comparing the first element in the list with each other element and counting how many are smaller than it. This finds the first element’s final sorted position within the list and if it is not already in the correct position it will be swapped into place. If a swap was made, the cycle continues by repeating this same process on the element that was originally in the position the first element was swapped into. The total amount of smaller items are counted, and it is swapped into its correct position. The cycle continues until the the element that belongs in the original position the cycle began from is found, which in the case of the first cycle is the smallest element. Once the first cycle is complete, a cycle will be performed on each remaining element regardless of if it was already moved to its sorted position in a previous cycle. The benefit of cycle sort is that it performs the minimum number of writes to disk possible, which can be useful when dealing with storage that has a limited lifespan such as flash memory.',
    timeExplanation:
      "Cycle sort has a best, average, and worst case time complexity of O(n²). Although it will not change the overall complexity, an already sorted array will result in the minimal amount of comparisons and swaps as each cycle will only loop through the list once and will not have to move any elements. In the worst case, no elements would initially be in their final sorted position causing n number of swaps and the maximum number of comparisons. ",
    spaceExplanation:
      "Cycle sort has an O(1) space complexity as the only space required is a single temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stability: "Unstable",
  },
  insertion: {
    title: "Insertion Sort",
    about:
      "Insertion sort works by inserting each element one at a time into a sorted subset of items within the entire list. It iterates through the sorted subset once per element, each time comparing the item to be inserted against the elements in the subset until it finds the correct sorted position. Once the insertion position is found, the sorted subset is shifted to make room and the element is swapped into the subset.",
    timeExplanation:
      "In the average case, insertion sort will run in O(n²) time as for each element in the list, it loops through the sorted subset of elements to find the correct position. The best case time is O(n) and will only occur if the list is already pre-sorted since no swaps would be required and only a single comparison per item. The worst case time occurs when the list to be sorted is in reverse order as this will cause the maximum number of comparisons to be made.",
    spaceExplanation:
      "Insertion sort has an O(1) space complexity as the only space required is a temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stability: "Stable",
  },
  comb: {
    title: "Comb Sort",
    about:
      "Comb sort works similar to bubble sort by iterating through the list comparing two items at a time and swapping them if they are out of order. While bubble sort always compares adjacent elements, comb sort starts with a much larger gap between the elements being compared. The gap is determined by a “shrink factor” which is typically 1.3. The initial gap is determined by dividing the total number of elements being sorted by the shrink factor (n / 1.3). Before each following iteration, the gap is divided by the shrink factor until it reaches 1. Once the gap reaches 1, comb sort continues to iterate through the list with a gap of 1 and swap elements until sorting is complete.",
    timeExplanation:
      "Comb sort has a best case time complexity of O(n log n). This occurs with an already sorted list as once the gap reaches 1, only a single pass is required. The average and worst case are O(n²).",
    spaceExplanation:
      "Insertion sort has an O(1) space complexity as the only space required is a temporary value used to swap items in the list.",
    timeComplexity: {
      average: "O(n²)",
      best: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stability: "Unstable",
  },
  merge: {
    title: "Merge Sort",
    about:
      "Merge sort works by dividing the list of items into subsets until each subset consists of only a single element. The subsets are then repeatedly merged together two at a time, each time combining the two subsets into a single sorted subset of items. Once only two sorted subsets remain, they are merged to create the final sorted list of items. Merge sort does not sort in place, but rather creates a complete copy of the two subsets at each merge, and then uses that copy to build the new sorted subset of elements.",
    timeExplanation:
      "Merge sort has a O(n log n) time complexity for the average, best, and worst cases.  Although the overall complexity will not change, merge sort will run faster or slower overall depending on how many comparisons it has to make during each merge. The best case would be an already sorted list of items where each merge step only has to make n/2 comparisons. In the worst case, each merge step will have to compare every item. This happens when the two subsets being merged have the elements sorted in alternating order between each subset (e.g. [0,2,4,6] and [1,3,5,7]).",
    spaceExplanation:
      "Merge sort has an O(n) space complexity as it does not sort in place and creates a full copy of both subsets when merging.",
    timeComplexity: {
      average: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stability: "Stable",
  },
  quick: {
    title: "Quick Sort",
    about:
      "Quick sort works by first selecting a pivot element, and then partitioning the remaining items into a subset with the items smaller than the pivot, and a subset with the items larger than the pivot. The pivot item is then placed between these two subsets into its final sorted position. Quick sort is then called recursively on the two subsets until the list is sorted. There are many different methods of selecting the pivot element, but this implementation selects the middle item from the list being partitioned. Once the pivit is selected it is then swapped with the item at the end of the list so that the subsets can be created.",
    timeExplanation:
      "Quick sort has an average time complexity of O(n log n). The best case occurs when each partition divides the items into two subsets of equal size. This results in the least recursive calls possible as the depth of the call tree will be base 2 log(n). Since this implementation of quick sort selects the middle item as the pivot, the best case complexity is achieved with a list that is already in sorted or reverse order. The worst case occurs when each pivot selected is either the largest or smallest element in the list. This creates a call tree with a single branch containing n - 1 number of calls, resulting in O(n²) time. A common implementation of quick sort selects the last item in the list as the pivot, which can result in the worst case if the list is already in sorted or reverse order. Using better methods to select the pivot item make the worst case or anything near the worst case extremely rare.",
    spaceExplanation:
      "Quick sort has an O(log n) space complexity on average because of the recursive call stack. ",
    timeComplexity: {
      average: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stability: "Unstable",
  },
  heap: {
    title: "Heap Sort",
    about:
      "Heap sort works by first ordering the elements in the list to form a max heap data structure. Second, the list is sorted by repeatedly removing the root element in the heap, and then adjusting the remaining elements to re-form a valid max heap. Since the root element of the max heap will always be the largest element in the list, the elements are removed in sorted order.",
    timeExplanation:
      "Heap sort has a best, average, and worst case of O(n log n). The heapify method used to form the max-heap in the first step of the algorithm has been proven to have an average time complexity of O(n). In the second step of the algorithm, the time complexity to remove a single element and then re-structure the max heap is O(log n). This means the total time to remove all the elements from the max heap is O(n log n),  resulting in an overall time complexity of O(n + (n log n)) for both steps in the algorithm, which can be simplified to O(n log n).",
    spaceExplanation:
      "Heap sort has a space complexity of O(1) as the list is sorted in place and the only extra space required is a single temporary value used for swapping elements within the list.",
    timeComplexity: {
      average: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    stability: "Unstable",
  },
};
