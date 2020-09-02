---
layout: post.njk 
title: "Interval partitioning: Greedy Algorithm"
subtitle: "Allocating time-sensitive tasks to resources"
year: "2020"
month: "SEP"
day: "2"
excerpt: "Allocating time-sensitive tasks to resources."
tags: ['blog', 'algorithms']

---

## Paper trouble at Donder Muffin

Donder Muffin is a famous paper company. Unfortunately, due to the incompetence of one of its branch managers, Donder Muffin is under fire. You see, recently, a disgruntled employee printed papers on which curse words were written. The quabbity assuance manager is an old guy named Breed, who totally forgot about his duties, and now, the customer care employee Kelliane Konner is under heavy load. Customers have scheduled calls to complain to her about the paper situation, but the call schedules overlap. Now, the branch manager, Michael Brott, has decided that all the other employees need to help Kelliane.

&nbsp;

The thing is, no one really wants to miss their own sales calls to help Kelliane, and there's only so many people Michael can pursuade to help her. As such, we need to find out the maximum number of extra employees Michael needs to convince to help with the customer care calls.

## Visualizing the problem with calls

There are some customers, who have called ahead in the day to schedule a call with Kelliane. The call schedule looks like this:

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



## Greedy Solution

Let's construct a simple greedy solution to this problem. Let's take a single employee at a time. If another call comes in, and the employee is free, then s/he will answer the new call. Otherwise, Michael will need to convince another employee to wo/man the call. Simple as that, right?
&nbsp;

```text
1. Start
2. Customer care employee list = [Kelliane]
2. While calls are not finished:
    a. Accept a call
    b. if any employee in Customer care employee list is free:
            i. Assign the call to free employee
       otherwise, 
            i. Convince a new employee to wo/man the phone
            ii. Add the new employee to the Customer care employee list
3. End
```

This is a naive algorithm at best. How do we find out, how to schedule the calls? 

For the same, let's first arrange the scheduled calls in order of their starting. The calls are arranged in order of their beginning time into a list $calls$. Then, we initialize an empty pool of workers. For each $call$ in $calls$, we check the pool to see if there are any free workers. If there are free workers, we will assign the $call$ to them, else we will add a new $worker$. The implementation in python is fairly simple for this task.

```python

def sortJobs(jobList):
    # assume job list looks like [{"start": 10, "end": 10.75}, {"start": 10.5, "end": 1}, ...]
    return jobList.sort(key = lambda x: x.keys())

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

## Where you'll see this algorithm in practice

This algorithm can be seen widely in usage, while deciding the number of classrooms required to conduct classes. The scheduled calls are scheduled lectures, and the number of employees denotes the number of classrooms required.

## References:

- [This excellent video tutorial](https://www.youtube.com/watch?v=i_G8hZYcKnI)
- [Good old Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling#Greedy_polynomial_solution)