---
title: This is my title
layout: post
categories: [test, javascript]
---

## {{ page.title }}

Here is my page.
<!--?prettify lang=basic linenums=true?-->
<pre>
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
</pre>

test

<!--?prettify lang=go linenums=true?-->

	package main

	import ("fmt"; "math")

	func distance(x1, y1, x2, y2 float64) float64 {
		a := x2 – x1
		b := y2 – y1
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

Although it would be possible for us to write programs only using Go's built-in data types, at some point it would become quite tedious. Consider a program that interacts with shapes.
