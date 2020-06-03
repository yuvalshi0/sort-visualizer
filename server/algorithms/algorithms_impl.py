class Algorithm:
    def __init__(self, socket, func):
        self.socket = socket
        self.func = func

    def swap(self, list, a, b):
        list[a], list[b] = list[b], list[a]
        self.func(self, a, b)

    def bubblesort(self, list):
        for iter_num in range(len(list)-1, 0, -1):
            for idx in range(iter_num):
                if list[idx] > list[idx+1]:
                    self.swap(list, idx, idx+1)
        return list

    def merge_sort(self, list, l, r):
        def merge(list, start, mid, end):
            start2 = mid + 1
            if (list[mid] <= list[start2]):
                return
            while (start <= mid and start2 <= end):
                if (list[start] <= list[start2]):
                    start += 1

                else:
                    value = list[start2]
                    index = start2
                    while (index != start):
                        self.swap(list, index, index - 1)
                        index -= 1

                    #self.swap(func, list, start2, start)
                    list[start] = value
                    start += 1
                    mid += 1
                    start2 += 1

        if (l < r):
            m = l + (r - l) // 2
            self.merge_sort(list, l, m)
            self.merge_sort(list, m + 1, r)
            merge(list, l, m, r)
        return list

    def quick_sort(self, arr, low, high):
        def partition(arr, low, high):
            i = (low-1)         # index of smaller element
            pivot = arr[high]     # pivot

            for j in range(low, high):

                # If current element is smaller than or
                # equal to pivot
                if arr[j] <= pivot:

                    # increment index of smaller element
                    i = i+1
                    self.swap(arr, i, j)

            self.swap(arr, high, i+1)
            return (i+1)

        if low < high:

            # pi is partitioning index, arr[p] is now
            # at right place
            pi = partition(arr, low, high)

            # Separately sort elements before
            # partition and after partition
            self.quick_sort(arr, low, pi-1)
            self.quick_sort(arr, pi+1, high)

    def insertion_sort(self, arr): 
    
        # Traverse through 1 to len(arr) 
        for i in range(1, len(arr)): 
    
            key = arr[i] 
    
            # Move elements of arr[0..i-1], that are 
            # greater than key, to one position ahead 
            # of their current position 
            j = i-1
            while j >= 0 and key < arr[j] : 
                self.swap(arr, j + 1, j)
                j -= 1
            
            arr[j + 1] = key

        return arr