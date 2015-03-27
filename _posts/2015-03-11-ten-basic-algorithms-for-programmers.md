---
# layout: post
title: 十个基础算法及其讲解
category: Algorithms
tags: [Algorithms]
updated: 2015-03-19 02:28
keywords: Algorithms, 算法
description: 做为程序员，以下着十大10大基础实用算法及其讲解是必须知道的。
---

![Algorithms]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/suanfa.jpg)


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


没仔细研究 **[QuickSort][]** 前，一直以为 `Partition` 的实现大约存在两个版本：一个是 **CLRS** （算法导论）的实现（单方向一趟遍历，数据交换频繁），另一个是严蔚敏数据结构的实现（双方向进行，变换方向和数据）。  
后来，看了不少资料（与后文所述的 **BFPRT** 相关）后，才知道原来严蔚敏书中所讲的 `Partition` 的实现来自 **QuickSort** 原作者，即 **[HOARE-PARTITION][]**。  
经过简单的测试发现，两种方法存在一倍的时间差距，也即双方向对数据序列遍历更高效。

http://www.austinrochford.com/posts/2013-10-28-median-of-medians.html



[CLRS]: http://mitpress.mit.edu/books/introduction-algorithms
[QuickSort]: http://dx.doi.org/10.1145%2F366622.366644 "Hoare, C. A. R. (1961). "Algorithm 64: Quicksort". Comm. ACM 4 (7): 321"
[HOARE-PARTITION]: http://dx.doi.org/10.1145%2F366622.366642 "Hoare, C. A. R. (1961). "Algorithm 63: Partition". Comm. ACM 4 (7): 321"

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


**示例代码**（Java 实现便于书写）

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

{% highlight java linenos %}
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
{% endhighlight %}

E. 另一非递归归并算法（堆栈）

{% highlight java linenos %}
// 非递归实现(感觉跟二叉树后序遍历的非递归实现很像)
void NonRecursiveMergeSort(int[] array, int[] temp, int len) {
    Stack<Region> region_stack = new Stack<Region>();
    Region beginRegion = new Region(0, len - 1, Type.PARTITION);
    region_stack.push(beginRegion);
    while (!region_stack.empty()) {
        Region region = region_stack.pop(); // 从栈中删除
        if (Type.MERGE.equals(region.getFlag())) {// 应该归并
            this.merge(array, temp, region.getFirst(),
                    (region.getFirst() + region.getEnd()) / 2, region.getEnd());// 归并之
        } else {// 应该划分
            if (region.getFirst() + 1 >= region.getEnd()) {// 如果区域是两个相邻的数
                this.merge(array, temp, region.getFirst(),
                        (region.getFirst() + region.getEnd()) / 2, region.getEnd());// 直接合并之
            } else { // 否则应该划分
                region.setFlag(Type.MERGE); // 下次应该归并
                region_stack.push(region);
                int mid = (region.getFirst() + region.getEnd()) / 2;

                Region region_low = new Region(region.getFirst(), mid,
                        Type.PARTITION);
                region_stack.push(region_low);

                Region region_high = new Region(mid + 1, region.getEnd(),
                        Type.PARTITION);
                region_stack.push(region_high);
            }
        }
    }
}

public enum Type {
    MERGE, // Need to merge
    PARTITION // Need to divide
}

public class Region {
    private final int first; // 起始位置
    private final int end; // 结束位置
    private Type flag; // 标记该区域是应该划分还是应该归并

    private Region(int first, int end, Type flag) {
        super();
        this.first = first;
        this.end = end;
        this.flag = flag;
    }

    public int getFirst() {
        return first;
    }
    public int getEnd() {
        return end;
    }
    public Type getFlag() {
        return flag;
    }
    public void setFlag(Type flag) {
        this.flag = flag;
    }
}
{% endhighlight %}




## 算法四：二分查找算法

二分查找算法是一种在有序数组中查找某一特定元素的搜索算法。搜素过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜素过程结束;如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。折半搜索每次把搜索区域减少一半，时间复杂度为 Ο(logN) 。


```c
int binary_search(const int *array, const int n, int key)
{
    int low = 0;
    int high = n - 1;
    int mid = 0;

    while (low <= high) {
        /*if (key == array[low]) {
            return low;
        }
        if (key == array[high]) {
            return high;
        }*/

        /*使用(low+high)/2会有整数溢出的问题
        问题会出现在当low+high的结果大于表达式结果类型所能表示的最大值时，
        这样，产生溢出后再/2是不会产生正确结果的，而low+((high-low)/2)不存在这个问题*/
        mid = low + (high - low) / 2;

        if (key == array[mid]) {
            return mid;
        }
        if (key < array[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1;
}
```


## 算法五：BFPRT(线性查找算法)

**BFPRT 算法**解决的问题十分经典，即从某n个元素的序列中选出第 k 小（第 k 大）的元素，通过巧妙的分析，**BFPRT** 可以保证在最坏情况下仍为线性时间复杂度。该算法的思想与快速排序思想相似，当然，为使得算法在最坏情况下，依然能达到 O(n) 的时间复杂度，五位算法作者做了精妙的处理。

算法步骤：

1. 将 n 个元素每 5 个一组，分成 n/5 (上界)组。
2. 取出每一组的中位数，任意排序方法，比如插入排序。
3. 递归的调用 select 算法查找上一步中所有中位数的中位数，设为 x，偶数个中位数的情况下设定为选取中间小的一个。
4. 用 x 来分割数组，设小于等于 x 的个数为 m ，大于 x 的个数即为 n-m。
5. 若 k==m，返回 x；若 k<m ，在小于 x 的元素中递归查找第 k 小的元素；若 k>m，在大于 x 的元素中递归查找第 k-m 小的元素。

终止条件：n=1 时，返回的即是 k 小元素。

阅读这篇文章：http://www.johndcook.com/blog/2009/06/23/tukey-median-ninther/

递归调用单独寻找中位数的算法，得到的并不是中位数的中位数。

这个算法看起来简单，似乎可以直接认为是快排改进快速选择。  
然则要理解这个算法，有一定的难度，其中有几个点要特别注意：

A. 划分方法的基准选取，即算法所讲的中位数的中位数，如何计算它更加高效 ？  
B. 递归调用 Select 计算中位数的中位数（看起来复杂，实际可行），并非递归寻找中位数的方法  
C. 将第一次找到的中位数集合交换到数组最左边，更方便递归寻找它们的中位数；花费额外空间存储中位数，递归返回是元素值，还需要额外 O(N) 的时间定位其下标；虽然与前者 Swap 的时间相抵消，但是空间的开销需要考虑  
D. Select 返回值是元素值，而不是下标索引，Partition 基准参数也是下标；计算中位数的中位数过程，一定会将中位数放置到计算前设定的下标上  
E. Partition 要保证一个值从原数据序列中隔离出来，不参与下次划分，这个值就是边界，同时也是第 i 小元素

----------

> Like **RANDOMIZED-SELECT**, the algorithm **SELECT** finds the desired element by recursively partitioning the input array. Here, however, we guarantee a good split upon partitioning the array. **SELECT** uses the deterministic partitioning algorithm **PARTITION** from quicksort (see Section 7.1), but modified to take the element to partition around as an input parameter.  
> The **SELECT** algorithm determines the **i**th smallest of an input array of **n > 1** distinct elements by executing the following steps. (If **n == 1**, then **SELECT** merely returns its only input value as the **i**th smallest.)

1. Divide the **n** elements of the input array into **&lceil;n / 5&rceil;** groups of 5 elements each and at most one group made up of the remaining **n mod 5** elements.
2. Find the median of each of the **&lceil;n / 5&rceil;** groups by first insertion-sorting the elements of each group (of which there are at most 5) and then picking the median from the sorted list of group elements.
3. Use **SELECT** recursively to find the median **x** of the **&lceil;n / 5&rceil;** medians found in step 2. (If there are an even number of medians, then by our convention, **x** isthe lower median.)
4. Partition the input array around the median-of-medians **x** using the modified version of **PARTITION**. Let **k** be one more than the number of elements on the low side of the partition, so that **x** is the kth smallest element and there are **n - k** elements on the high side of the partition.
5. If **i == k**, then return **x**. Otherwise, use **SELECT** recursively to find the **i**th smallest element on the low side if **i < k**, or the **(i - k)**th smallest element on the high side if **i > k**.


性能分析：

BFPRT 算法最出色的地方在于，精心设计的 pivot 选取方法，使得最坏情形理论上达到了线性时间复杂度。  
然而实际应用中，寻找中位数的中位数的时间开销很大，即便是 O(n) 平均查找时间，相比固定的选取 pivot 的 Quick-Select 算法，效率不但不高，反而很差。  
博主亲测，双核 2.27 GHz CPU、x86架构、VS2010，随机产生 256MB 整型数据，选出第 14 小元素，BFPRT 算法花费CPU时间 1293756ms，而固定选择最低位作为 pivot 的 Quick-Select 算法仅需要 1043ms，而以三元素取中值作为 pivot 的 Quick-Select 时间为 4085ms。  
由此可见，BFPRT 还不适合应用于实践，一般而言最坏情形发生的可能性还是比较低的，选择高效适宜的算法才是关键。

同样地，我们都知道快排和归并的平均时间复杂度都是 O(nlogn)，但是实际应用中相比归并排序，快排耗费的时间更少；然而，对于链式存储结构的，我们还是倾向选择归并排序，原因就是快排在一趟划分过程中需要花费更多时间去定位元素，而归并排序需要额外的辅存空间，适用于链表结构。那么，对于顺序存储结构，快速排序就是优先选择了。


**示例代码**

```c
void insertsort(int *array_t, int start, int end)
{
    for (int i = start; i <= end; i++) {
        int inserted_data = array_t[i];
        int j = i;
        for (; j > start; j--) {
            if (inserted_data < array_t[j - 1]) {
                array_t[j] = array_t[j - 1];
            } else {
                break;
            }
        }
        if (j != i) {
            array_t[j] = inserted_data;        
        }
    }
}

int partition(int *array_t, int low, int high, int pivot_index)
{
    int pivot_value = array_t[pivot_index];
    swap(array_t, low, pivot_index);

    while (low < high) {
        while (low < high && array_t[high] >= pivot_value) {
            high--;
        }
        if (low < high) {
            array_t[low++] = array_t[high];
        }

        while (low < high && array_t[low] <= pivot_value) {
            low++;
        }
        if (low < high) {
            array_t[high--] = array_t[low];
        }
    }

    array_t[low] = pivot_value;
    return low;
}

// 五划分中项：中位数的中位数（the median of medians algorithm）
// Return the kth value
int select(int *array_t, int left, int right, int k)
{
    const int k_group_size = 5;
    int size = right - left + 1;

    if (size <= k_group_size) {
        insertsort(array_t, left, right);
        return array_t[k + left - 1];
    }
    // (right - left) / 2 + left
    const int num_group = (size % k_group_size) > 0 ? (size / k_group_size) + 1 : (size / k_group_size);
    //int *medians_arr = new int[num_group];
    for (int i = 0; i < num_group; i++) {
        int sub_left = left + i * k_group_size;
        int sub_right = sub_left + k_group_size - 1;
        if (sub_right > right) {
            sub_right = right;
        }
        insertsort(array_t, sub_left, sub_right);
        // IMPORTANT !!
        // Place these median in front of array_t, so as to recurse to find the median of median
        int median = sub_left + ((sub_right - sub_left) >> 1);
        swap(array_t, left + i, median);
        //medians_arr[i] = array_t[sub_left + (sub_right - sub_left) >> 1];
        // Better not to use new array to store the medians, otherwise have to traverse the array_t to find the pivot index due to select function returning pivot value.
    }
    // IMPORTANT !!
    // Get the index of median
    int pivot_index = left + ((num_group - 1) >> 1);

    //int pivotValue = select(medians_arr, 0, num_group - 1, pivot_index);

    // IMPORTANT !!
    // Recurse to call and place the median on the pivot_index, without care about the median value
    // Because the value of pivot_index must be the median after select function recursive call.
    select(array_t, left, left + num_group - 1, (num_group + 1) >> 1);

    int mid_index = partition(array_t, left, right, pivot_index);
    int _ith = mid_index - left + 1;
    // _ith_element == array_t[_ith]
    if (k == _ith) {
        return array_t[mid_index];
    } else if (k < _ith) {
        return select(array_t, left, mid_index - 1, k);
    } else {
        return select(array_t, mid_index + 1, right, k - _ith);
    }
}
```




## 算法六：DFS(深度优先搜索)

**深度优先搜索**算法（Depth-First-Search），是搜索算法的一种。  
它沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点v的所有边都己被探寻过，搜索将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止。DFS属于盲目搜索。

深度优先搜索是图论中的经典算法，利用深度优先搜索算法可以产生目标图的相应拓扑排序表，利用拓扑排序表可以方便的解决很多相关的图论问题，如最大路径问题等等。一般用堆数据结构来辅助实现DFS算法。

深度优先遍历图算法步骤：

1. 访问顶点v；
2. 依次从v的未被访问的邻接点出发，对图进行深度优先遍历；直至图中和v有路径相通的顶点都被访问；
3. 若此时图中尚有顶点未被访问，则从一个未被访问的顶点出发，重新进行深度优先遍历，直到图中所有顶点均被访问过为止。

上述描述可能比较抽象，举个实例：

DFS 在访问图中某一起始顶点 v 后，由 v 出发，访问它的任一邻接顶点 w1；再从 w1 出发，访问与 w1邻 接但还没有访问过的顶点 w2；然后再从 w2 出发，进行类似的访问，… 如此进行下去，直至到达所有的邻接顶点都被访问过的顶点 u 为止。

接着，退回一步，退到前一次刚访问过的顶点，看是否还有其它没有被访问的邻接顶点。如果有，则访问此顶点，之后再从此顶点出发，进行与前述类似的访问；如果没有，就再退回一步进行搜索。重复上述过程，直到连通图中所有顶点都被访问过为止。



## 算法七：BFS(广度优先搜索)

**广度优先搜索**算法（Breadth-First-Search），是一种图形搜索算法。  
简单的说，BFS是从根节点开始，沿着树(图)的宽度遍历树(图)的节点。如果所有节点均被访问，则算法中止。BFS同样属于盲目搜索。一般用队列数据结构来辅助实现BFS算法。

算法步骤：

1. 首先将根节点放入队列中。
2. 从队列中取出第一个节点，并检验它是否为目标。
   如果找到目标，则结束搜寻并回传结果；
   否则将它所有尚未检验过的直接子节点加入队列中。
3. 若队列为空，表示整张图都检查过了——亦即图中没有欲搜寻的目标。结束搜寻并回传“找不到目标”。
4. 重复步骤2。

![BFS]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/bfs.gif)


## 算法八：Dijkstra 算法


![Dijkstra]({{ site.picture_dir }}/ten-basic-algorithms-for-programmers/dijkstra.gif)



## 算法九：动态规划算法






## 算法十：朴素贝叶斯分类算法

简介：  
http://www.cnblogs.com/leoo2sk/archive/2010/09/17/naive-bayesian-classifier.html

朴素贝叶斯分类器的应用：  
http://www.ruanyifeng.com/blog/2013/12/naive_bayes_classifier.html




