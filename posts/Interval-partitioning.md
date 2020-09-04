---
layout: post.njk 
title: "Interval Partitioning: Greedy Algorithm"
subtitle: "Allocating time-sensitive tasks to resources"
year: "2020"
month: "SEP"
day: "2"
hero: "https://y.yarn.co/74528713-3ade-4f40-abc2-49e4e2c665ef_screenshot.jpg"
excerpt: "Allocating time-sensitive tasks to resources."
tags: ['blog', 'algorithms']

---



![Kelly](https://y.yarn.co/74528713-3ade-4f40-abc2-49e4e2c665ef_screenshot.jpg)

## Paper trouble at Dunder Mifflin



Dunder Mifflin is a famous paper company. Unfortunately, due to the incompetence of one of its branch managers, Dunder Mifflin is under fire. You see, recently, a disgruntled employee printed papers on which curse words were written. The quabbity assuance manager is an old guy named Creed, who totally forgot about his duties, and now, the customer care employee Kelly Kapoor is under heavy load. Customers have scheduled calls to complain to her about the paper situation, but the call schedules overlap. Now, the branch manager, Michael Scott, has decided that all the other employees need to help Kelly.

&nbsp;

The thing is, no one really wants to miss their own sales calls to help Kelly, and there's only so many people Michael can pursuade to help her. As such, we need to find out the maximum number of extra employees Michael needs to convince to help with the customer care calls.

## Visualizing the problem with calls

There are some customers, who have called ahead in the day to schedule a call with Kelly. The call schedule looks like this:

&nbsp;

Mr. Rogers: 10 AM to 11 AM

Mr. Tim: 10:30 AM to 1 PM 

Ms. Jan: 10:40 AM to 1 PM 

Mr. Hunter: 2 PM to 3 PM

&nbsp;

If we look closely, we can see that the timing schedules can be put in a number line as such:


![Scheduling calls](https://i.imgur.com/jJuVNMM.png)

From the image above, it is quite evident, that the total number of employees that Michael needs to convince is equal to 3,
since at any given time, there are at most 3 conversations going on!

![Maximum number of overlaps indicates the maximum number of employees required.](https://i.imgur.com/OCLROTs.png)



## Solution

Let's construct a simple solution to this problem. Let's take a single employee at a time. If another call comes in, and the employee is free, then s/he will answer the new call. Otherwise, Michael will need to convince another employee to wo/man the call. Simple as that, right?
&nbsp;

```text

1. Start
2. Customer care employee list = [Kelly]
3. Sort the calls in order of their starting times
4. While calls are not finished:
    a. Accept a call
    b. if any employee in Customer care employee list is free:
            i. Assign the call to free employee
       otherwise, 
            i. Convince a new employee to wo/man the phone
            ii. Add the new employee to the Customer care employee list
5. End
&nbsp;
```

This is a solution to our problem. You can see that for each call, it tries to find a empty employee and assign the call immediately. What you just read was an algorithm that falls under the class of "greedy" algorithms, that try to find optimal solutions based on the current best outcome. The given algorithm seems sound, but we are yet to prove its correctness. Let's first take a look at its bounds.

&nbsp;

**Output Bounds**

While looking at any algorithm, we shoult try to ascertain its input/output bounds. To analyze the required output bounds, let's take some extreme-case scenarios into consideration first:

1. No one calls the customer care hotline - In this case, Michael does not need to convince anyone
2. Everyone calls the customer care hotline at the same time - In this case, Michael needs to convince as many employees as the number of callers right now. This is the most extreme scenario.

The first scenario might never occur, so let's assume that there's at least one caller in the queue. Taking that assumption, the maximum number of employees required will be $0 < e \leq n$, where $n$ is the number of callers, and $e$ denotes the number of employees required 

&nbsp;

**Termination**

Every algorithm is required to be checked for termination. We can see that even if every caller calls at the same time, equal number of employees can pick the calls. If the call lengths are not indefinite, then every call is bound to be complete and every employee becomes free in the end. So this algorithm will terminate. (Proof left to the reader. Can we use pigeonhole principle here?)

&nbsp;

**Time Bound**

The next thing that we're going to do is check the algorithm for its timing bounds. There are some steps in this algorithm, for which the timing bounds are different. 

1. Start - No time
2. Customer Care employee List = [Kelly] - No time required, simple array initialization
3. Sort calls according to start time - This operation requires the same amount of time as the sorting algorithm taken into consideration. For this example, let's assume MergeSort, which requires $O(nlog(n))$ complexity to sort a given list of size $n$.
4. Now, we enter a loop. This loop is repeated $n$ times; i.e. for every call in the queue. So the time complexity contributed by this loop is $O(n)$.
5. We are yet to complete analysing the operations *inside* the loop. Inside the loop, the tasks are: 
   1. Searching for a free employee
   2. Adding a new employee to the list
6. We can see that adding a new employee to the list takes no time whatsoever, but searching for a free employee can take some time. Naiively, you would store the employee end times in an array and look up each element in the array for the finish time, but using a [min priority queue](https://www.gyanblog.com/gyan/coding-interview/min-priority-queue-with-heap/), this time can be reduced to $log(n)$. 
7. Hence, the total time contributed by the loop becomes $O(nlog(n))$
8. The overall time complexity is reduced to $2* O(nlog(n))$, or asymptotically, $O(nlog(n))$ which is pretty fast. 

&nbsp;

**Finally, Proof of Correctness**

We have proved that the outputs for the algorithm are bounded, and it indeed, terminates for the given input. Now we have to prove that the greedy solution that we have proposed is true. Proving correctness of greedy algorithms can be tricky. 

Let us assume that our algorithm outputs $e$ employees as the required count. The $e$-th employee was persuaded, because all $e-1$ employees were busy with their own calls. So this must mean that for the current call to be allocated to a new employee, the call must've started later than some $x$ calls before it and those calls will end sometime later than the current call. Thus, we have $e$ calls overlapping at the current time, which denotes the depth in our previous image. So this means that for any instance of time, the maximum depth required was $e$, as employees can be freed after calls but remain in the free queue. So our queue of employees will increase to a maximum size of $e$. 

&nbsp;

## Code in Python:

To implement this algorithm, let's first arrange the scheduled calls in order of their starting. The calls are arranged in order of their beginning time into a list $calls$. Then, we initialize an empty pool of workers. For each $call$ in $calls$, we check the pool to see if there are any free workers. If there are free workers, we will assign the $call$ to them, else we will add a new $worker$. The implementation in python is fairly simple for this task.

```python

def sortJobs(jobList):
    # assume job list looks like [{"start": 10, "end": 10.75}, {"start": 10.5, "end": 1}, ...]
    return jobList.sort(key = lambda x: x['start'])

def maxEmployeesRequired(jobList):
	sortedJobList = sortJobs(jobList)
	customerCare = []
	for call in sortedJobList:
		assigned = False
		for employee in customerCare:
			if employee['end'] <= call['start']: # This employee is free!
				assigned = True
				employee['end'] = call['end']
				break

		if not assigned:
			newEmployee = {"end": call['end']}
			customerCare.append(newEmployee)
	return len(customerCare)


```

**Note:** In this implementation I have used a linear search which increases the bounds to $O(n^2)$. To implement the search, we can use a priority queue, which I have explained in [this]() tutorial. 

## Where you'll see this algorithm in practice

This algorithm can be seen widely in usage, while deciding the number of classrooms required to conduct classes. The scheduled calls are scheduled lectures, and the number of employees denotes the number of classrooms required.

&nbsp;

At the end of the day, Dunder Mifflin is saved!

&nbsp;

![Michael Scott laughing](https://i.redd.it/8hzjzbpfbks11.jpg)

## References:

- [This excellent video tutorial](https://www.youtube.com/watch?v=i_G8hZYcKnI)
- [Good old Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling#Greedy_polynomial_solution)
- [Hong Kong University of Science and Technology's Lecture slides](http://www.cs.ust.hk/mjg_lib/Classes/COMP3711H_Fall16/lectures/09greedy.pdf)
- [Priority queue - Gyan Blog](https://www.gyanblog.com/gyan/coding-interview/min-priority-queue-with-heap/)
- 