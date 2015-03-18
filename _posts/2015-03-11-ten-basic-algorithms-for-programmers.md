---
# layout: post
title: 十个基础算法及其讲解
category: Algorithms
tags: [Algorithms]
updated: 2015-03-19 02:28
keywords: Algorithms, 算法
description: 做为程序员，以下着十大10大基础实用算法及其讲解是必须知道的。
---

## 算法一：快速排序算法

快速排序是由东尼·霍尔所发展的一种排序算法。  
在平均状况下，排序 n 个项目要 Ο(nlogn) 次比较。在最坏状况下则需要 Ο(n^2) 次比较，但这种状况并不常见。事实上，快速排序通常明显比其他 Ο(nlogn) 算法更快，因为它的内部循环(inner loop)可以在大部分的架构上很有效率地被实现出来。

快速排序使用分治法(Divide and conquer)策略来把一个串行(list)分为两个子串行(sub-lists)。

![QuickSort]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/quicksort.gif)

算法步骤：

1. 从数列中挑出一个元素，称为 “基准”(pivot)。
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面(相同的数可以到任一边)。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区(partition)操作。
3. 递归地(recursive)把小于基准值元素的子数列和大于基准值元素的子数列排序。

递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递归下去，但是这个算法总会退出，因为在每次的迭代(iteration)中，它至少会把一个元素摆到它最后的位置去。


<!--more-->


选择排序：

http://blog.csdn.net/shuilan0066/article/details/8659163

具体方法为：

初始化最值元素索引位置，遍历一次，记录下最值元素索引位置，遍历结束后，将此最值元素调整到合适的位置（初始化索引位置）  
这样一次遍历，只需一次交换，便可将最值放置到合适位置


快速排序：

http://blog.csdn.net/yunzhongguwu005/article/details/9455991

http://www.cnblogs.com/zhangchaoyang/articles/2234815.html

http://blog.csdn.net/sicofield/article/details/8901989


[]({ % post_url 2010-07-21-name-of-post % })





## 算法二：堆排序算法

堆排序(Heap sort)，是指利用堆这种数据结构所设计的一种排序算法。  
堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于(或者大于)它的父节点。

堆排序的平均时间复杂度为 Ο(NlogN) 。

![HeapSort]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/heapsort.gif)

基本思想：

1. 先将初始文件 R[1..n] 建成一个大顶堆，此堆为初始的无序区
2. 再将关键字最大的记录 R[1]（即堆顶）和无序区的最后一个记录 R[n] 交换，由此得到新的无序区 R[1..n-1] 和有序区 R[n]，且满足 R[1..n-1].keys≤R[n].key
3. 由于交换后新的根 R[1] 可能违反堆性质，故应将当前无序区 R[1..n-1] 调整为堆。然后再次将 R[1..n-1] 中关键字最大的记录 R[1] 和该区间的最后一个记录 R[n-1] 交换，由此得到新的无序区 R[1..n-2] 和有序区 R[n-1..n]，且仍满足关系 R[1..n-2].keys≤R[n-1..n].keys，同样要将 R[1..n-2] 调整为堆。

算法步骤：

1. 构建一个堆 H[0..n-1]。建堆是不断调整堆的过程，从 len/2 处（最后一个非叶节点）开始调整，一直到第一个节点，此处 len 是堆中元素的个数。建堆的过程是线性的过程，从 len/2 到 0 处一直调用调整堆的过程，相当于 o(h1)+o(h2)…+o(hlen/2) 其中 h 表示节点的深度，len/2 表示节点的个数，这是一个求和的过程，结果是线性的 O(N)。
2. 把堆首(最大值)和堆尾互换。
3. 把堆的尺寸缩小 1，调整堆，把新的数组顶端数据调整到相应位置。其思想是比较节点 i 和它的孩子节点 left(i)、right(i)，选出三者最大(或者最小)值，如果最大（小）值不是节点 i 而是它的一个孩子节点，那边交互节点 i 和该节点，然后再调用调整堆过程，这是一个递归的过程。调整堆的过程时间复杂度与堆的深度有关系，是 logN 的操作，因为是沿着深度方向进行调整的。
4. 重复步骤 2，直到堆的尺寸为 1。




## 算法三：归并排序

归并排序(Merge sort)，是建立在归并操作上的一种有效的排序算法。该算法是采用分治法(Divide and Conquer)的一个非常典型的应用。

归并过程为：

比较 a[i] 和 a[j] 的大小，若 a[i]≤a[j]，则将第一个有序表中的元素 a[i] 复制到 r[k] 中，并令 i 和 k 分别加上 1；  
否则将第二个有序表中的元素 a[j] 复制到 r[k] 中，并令 j 和 k 分别加上 1，如此循环下去，直到其中一个有序表取完，然后再将另一个有序表中剩余的元素复制到 r 中从下标 k 到下标 t 的单元。  
归并排序的算法我们通常用递归实现，先把待排序区间 [s,t] 以中点二分，接着把左边子区间排序，再把右边子区间排序，最后把左区间和右区间用一次归并操作合并成有序的区间 [s,t]。

![MergeSort]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/mergesort.gif)

算法步骤：

1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
4. 重复步骤 3 直到某一指针达到序列尾
5. 将另一序列剩下的所有元素直接复制到合并序列尾


性能分析：

1. 归并排序，速度仅次于快速排序，是**稳定的排序算法**（相等元素的相对位置前后不会改变），适用于总体无序，但是各**子项相对有序**的数列。  
2. 时间复杂度，比较次数最好、最坏、平均时间都是 O(NlogN)，与堆排序一样，而空间复杂度是 O(N)，比较占用内存。  
3. 另一种用法，用来**求逆序对数**，在归并的过程中计算每个小区间的逆序对数，进而计算出大区间的逆序对数（也可以用树状数组来求解）。  
   （对于一个包含 N 个非负整数的数组 A[1...n]，如果有 i < j，且 A[i] > A[j]，则称 (A[i] ,A[j]) 为数组 A 中的一个逆序对。）


**示例代码**

A. 2-路归并 Merge 算法（优化）

```java
/**
 * @param source
 *            the array to be sorted
 * @param buffer
 *            the temporary space for sorted data
 * @param start
 *            the 1st partition's start position for source array
 * @param mid
 *            the 1st partition's end position for source array
 * @param end
 *            the 2nd partition's end position for source array
 */

private void merge(int[] source, int[] buffer, int start, int mid, int end) {
    int i = start;
    int k = start;
    int j = mid + 1;

    while (i <= mid && j < end + 1) {
        if (source[i] > source[j]) {
            buffer[k++] = source[j++];
        } else {
            buffer[k++] = source[i++];
        }
    }

    // If the 1st partition doesn't go to the end, which means the 2nd partition has been merged to the buffer, 
    // then just need move the left data of the 1st partition to the right position, and no need copy to and 
    // then copy back again; but must consider the data overlapping.
    // Otherwise, the 2nd partition's data is left and there is no sense to move or copy them.
    if (i != mid + 1) {
        // System.arraycopy(source, i, source, i + (end - mid), mid + 1 - i);
        System.arraycopy(source, i, source, i + (j - mid - 1), mid - i + 1);
    }
    System.arraycopy(buffer, start, source, start, i - start + j - mid - 1);

    // if (i != mid + 1) {
    // while (i <= mid) {
    // buffer[k++] = source[i++];
    // }
    // }
    // System.arraycopy(buffer, start, source, start, i - start + j - mid - 1);

    // if (i != mid + 1) {
    // while (i <= mid) {
    // buffer[k++] = source[i++];
    // }
    // }
    // if (j != end + 1) {
    // while (j <= end) {
    // buffer[k++] = source[j++];
    // }
    // }
    // System.arraycopy(buffer, start, source, start, end - start + 1);

    // while (start <= end) {
    // source[start] = buffer[start];
    // start++;
    // }
}
```

B. 递归归并算法（分治法：自顶向下）

```java
/**
 * @param array
 *            the source array
 * @param temp
 *            the buffer array to store sorted data
 * @param start
 *            the start position of target array
 * @param end
 *            the end position of target array
 */

public void mergeSort(int[] array, int[] temp, int start, int end) {
    if (start < end) {
        int midIndex = (start + end) / 2;
        mergeSort(array, temp, start, midIndex);
        mergeSort(array, temp, midIndex + 1, end);
        merge(array, temp, start, midIndex, end);
    }
}
```

C. 归并算法（自底向上）

```java
/**
 * 若子文件个数为奇数，则最后一个子文件无须和其它子文件归并(即本趟轮空)
 * 
 * 若子文件个数为偶数，则要注意最后一对子文件中后一子文件的区间上界是 n
 */

public void mergeSort2(int[] array, int[] temp, int n) {
    int i = 0;
    // 待排序的文件 R[1..n] 看作是 n 个长度为 1 的有序子文件
    // 各子文件长度为 length (最后一个子文件的长度可能小于 length)
    for (int length = 1; length < n; length *= 2) {
        for (i = 0; i + 2 * length <= n; i += 2 * length) { // i+2*len-1<=n-1
            this.merge(array, temp, i, i + length - 1, i + 2 * length - 1);
        }
        if (i + length < n) { // i+len-1<n-1
            this.merge(array, temp, i, i + length - 1, n - 1);
            // 尚有两个子文件，其中后一个长度小于length,归并最后两个子文件
            // 注意：若i≤n-1且i+length-1≥n-1时，则剩余一个子文件轮空，无须归并
        }
    }
}
```

D. 非递归归并算法（堆栈）

```java
public void mergeSortNoRecur(int[] array, int[] temp) {
    int start = 0;
    int end = array.length - 1;

    if (start < end) {
        int mid = (start + end) / 2;
        Stack<Integer> indexStack = new Stack<Integer>();
        indexStack.push(end);
        indexStack.push(start);

        while (!indexStack.isEmpty()) {
            mid = start;
            start = indexStack.pop();
            if (mid == (start + indexStack.peek()) / 2 + 1) {
                end = indexStack.pop();
                this.merge(array, temp, start, mid - 1, end);

                // Maybe the last two partition has been merged, so that 
                // the stack should be empty and certainly the sort work is finished.
                if (indexStack.isEmpty()) {
                    break;
                }

                mid = start;

                // Judge if need to traverse and divide the right child
                start = indexStack.pop();
                if (end == (start + indexStack.peek()) / 2) {
                    end = indexStack.peek();
                    indexStack.push(start);
                    mid = (start + end) / 2;
                    if (end > mid + 1) {
                        indexStack.push(end);
                        indexStack.push(mid + 1);
                    } else {
                        // If can't divide on the left side, then turn to the right side
                        start = mid + 1;
                    }
                } else {
                    // Restore the previous value if don't divide the right child,
                    // which means should merge the last merge with another merge partition again
                    indexStack.push(start);
                    start = mid;
                }
            } else {
                // Start to divide the left child
                end = indexStack.peek();
                indexStack.push(start);
                mid = (start + end) / 2;
                if (start < mid) {
                    indexStack.push(mid);
                    indexStack.push(start);
                } else {
                    start = mid + 1;
                }
            }
        }
    }
}
```




## 算法四：二分查找算法

二分查找算法是一种在有序数组中查找某一特定元素的搜索算法。搜素过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜素过程结束;如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。折半搜索每次把搜索区域减少一半，时间复杂度为 Ο(logN) 。




## 算法五：BFPRT(线性查找算法)





## 算法六：DFS(深度优先搜索)





## 算法七：BFS(广度优先搜索)


![BFS]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/bfs.gif)


## 算法八：Dijkstra 算法


![Dijkstra]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/dijkstra.gif)



## 算法九：动态规划算法






## 算法十：朴素贝叶斯分类算法

简介：  
http://www.cnblogs.com/leoo2sk/archive/2010/09/17/naive-bayesian-classifier.html

朴素贝叶斯分类器的应用：  
http://www.ruanyifeng.com/blog/2013/12/naive_bayes_classifier.html




