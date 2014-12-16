---
title: This is my title
layout: post
categories: [test, javascript]
---

## {{ page.title }}

Here is my page.

<!--?prettify lang=basic linenums=true?-->

{% highlight basic %}
Class CustomerInfo
    Protected PreviousCustomer As CustomerInfo
    Protected NextCustomer As CustomerInfo
    Public ID As Integer
    Public FullName As String

    Public Sub InsertCustomer(ByVal FullName As String)
        ' Insert code to add a CustomerInfo item to the list.
    End Sub

    Public Sub DeleteCustomer()
        ' Insert code to remove a CustomerInfo item from the list.
    End Sub

    Public Function GetNextCustomer() As CustomerInfo
        ' Insert code to get the next CustomerInfo item from the list.
        Return NextCustomer
    End Function

    Public Function GetPrevCustomer() As CustomerInfo
        'Insert code to get the previous CustomerInfo item from the list.
        Return PreviousCustomer
    End Function
End Class
{% endhighlight %}

`test`

Check *out* this neat program I wrote:

```
x = 0
x = 2 + 2
what is x
```

{% highlight r %}
hanoi = function(N,A,B,C){
  if(N == 1)
    cat(paste(A,"=>",C,"\n")) else
      if(N > 1){
        Recall(N-1,A,C,B)
        cat(paste(A,"=>",C,"\n"))
        Recall(N-1,B,A,C)
      }
}
hanoi(3, "A", "B", "C")
{% endhighlight %}

{% highlight c linenos %}
int combinational_lock() {
		int v1, v2, v3;
		// test coments: inheritance: keywords “extends” and “with” inside class header
		int c1[3] = {1, 2, 3};
		int c2[3] = {3, 2, 4};
		// Built for those who build the Web. Introducing the only browser made for developers like you.
		while (!new_value());
		v1 = read_value();
		if (v1 == c1[0]) {
			v2 = read_value();
			if (v2 == c1[1]) {
				v3 = read_value();
				if (v3 == c1[2]) return 1; // open
				else error = 1;
			} else error = 1;
		} else if (v1 == c2[0]) {
			v2 = read_value();
			if (v2 == c2[1]) {
				v3= read_value();
				if(v3 == c2[2]) return 1; // open
				else error = 1;
			} else error = 1;
		} else {
			error = 1;
			return 0;
		}
}
{% endhighlight %}

C# Code:

<pre class="brush: csharp; highlight: [2,4]">
public IEnumerator&lt;String> GetEnumerator()// 注意：返回什么，泛型就为什么类型
{
    for (int i = 0; i&lt;arr_Course.Length; i++)
    {
        Course course = arr_Course[i];
        yield return "选修：" + course.Name;
        yield return Environment.NewLine;// 两个 yield return
    }
}
</pre>

with `` ` ` ` ``:

```
public IEnumerator<String> GetEnumerator()// 注意：返回什么，泛型就为什么类型
{
    for (int i = 0; i < arr_Course.Length; i++)
    {
        Course course = arr_Course[i];
        yield return "选修：" + course.Name;
        yield return Environment.NewLine;// 两个 yield return
    }
}
```

Tab indent:

	public IEnumerator<String> GetEnumerator()// 注意：返回什么，泛型就为什么类型
	{
		for (int i = 0; i < arr_Course.Length; i++)
		{
			Course course = arr_Course[i];
			yield return "选修：" + course.Name;
			yield return Environment.NewLine;// 两个 yield return
		}
	}

Highlight Java:

{% highlight java %}
public IEnumerator<String> GetEnumerator()// 注意：返回什么，泛型就为什么类型
{
    for (int i = 0; i < arr_Course.Length; i++)
    {
        Course course = arr_Course[i];
        yield return "选修：" + course.Name;
        yield return Environment.NewLine;// 两个 yield return
    }
}
{% endhighlight%}

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

- - -

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字，更棒的是，它还可以...

<!--?prettify lang=go linenums=true?-->
```go
package main

import ("fmt"; "math")

func distance(x1, y1, x2, y2 float64) float64 {
	a := x2 - x1
	b := y2 - y1
	return math.Sqrt(a*a + b*b)
}
func rectangleArea(x1, y1, x2, y2 float64) float64 {
	l := distance(x1, y1, x1, y2)
	w := distance(x1, y1, x2, y1)
	return l * w
}
func circleArea(x, y, r float64) float64 {
	return math.Pi * r*r
}
func main() {
	var rx1, ry1 float64 = 0, 0
	var rx2, ry2 float64 = 10, 10
	var cx, cy, cr float64 = 0, 0, 5

	fmt.Println(rectangleArea(rx1, ry1, rx2, ry2))
	fmt.Println(circleArea(cx, cy, cr))
}
type Circle struct {
	x float64
	y float64
	r float64
}
```

~~delete the word~~

Although it <u>would</u> be possible for <font color="red">us</font> to write programs only using Go's built-in data types, at some point it would become quite tedious. Consider a program that interacts with shapes.
