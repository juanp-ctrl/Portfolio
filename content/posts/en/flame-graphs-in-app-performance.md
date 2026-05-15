---
slug: flame-graphs-in-app-performance
title: 'Flame Graphs in App Performance'
excerpt: 'Did you know that our web applications produce flames?'
date: '2025-10-27'
readingTime: 5
tags: ['Graphs', 'Web', 'Performance']
category: 'Category'
coverImage: '/images/blog/flame-graphs-in-app-performance/cover.webp'
---

Did you know that our web applications produce flames?

To talk about flame graphs we need to talk about Brendan Gregg, Brendan is a computer engineer who authored 2 books, Systems Performance and BPF Performance Tools, a highly respected performance engineer, this guy

![Brendan Gregg, performance engineer](/images/blog/flame-graphs-in-app-performance/Brendan-Gregg.webp '400')

In December of 2011, Brendan was working on a MySQL performance issue at Netflix, and needed to understand CPU usage quickly and in depth, the visualizer of that time had the passage of time on the x-axis and made the final visualization too dense to read when spanning multiple seconds so he ditched the time on the x-axis and replaced it with the relative frequency of each function call, sorted alphabetically and made the y-axis shows the call stack depth from bottom to top. The other visualizers used random colors to differentiate frames so he instead chose warm colors initially as it explained why the CPUs were "hot", and with this, since it resembled flames, it quickly became known as **Flame Graphs**

![Example flame graph visualization](/images/blog/flame-graphs-in-app-performance/cover.webp '520')

Each colored rectangle is a function, and the wider it is, the more frequently it appeared in the profiling samples, the _"flames"_ rise from the bottom (root functions) to the top, making it easy to identify performance bottlenecks at a glance by spotting the widest frames and tallest _"towers"_.

With all of this work, it makes sense that he now works at Intel, a lot of CPU and performance is needed there.

Okay so now lets use a more formal definition of a Flame Graph

A flame graph is an ==interactive visualization of hierarchical stack trace data that shows which code paths are consuming the most resources== (CPU, memory, etc.) in a program.

Think of a flame graph like a campfire: The base of the fire (bottom) represents your program's entry point, and the flames shoot upward through various function calls. The hottest, brightest parts of the fire (the widest rectangles) are where your code is spending the most time – these are your performance "hot spots"!

Just like how you can see which parts of a fire burn brightest, you can instantly see which code paths are "burning" the most CPU cycles

## Flame Charts

The usage of flame charts were introduced in Chrome into the Webkit web inspector in April 2013, inspired by flame graphs but they work differently, this charts are time-based, not frequency-based, the formal definition would be:

A Flame Chart is a time-ordered, hierarchical visualization that displays function call stacks over time, where the ==x-axis represents chronological time during the profiling session, and the y-axis represents call stack depth==.

**X-Axis** — Time:

- Represents the chronological passage of time during your profiling session

- Left to right = Start to end of recording

- Position indicates when a function was called

- This is the key difference from Flame Graphs (which sort alphabetically)

**Y-Axis** — Call Stack Depth:

- Represents the depth of function calls in the call stack

- Chrome DevTools uses INVERTED orientation (Icicle Chart):

- TOP to BOTTOM = Root to Leaf (shallow to deep)

- TOP rows: Entry-point functions (e.g., Main thread, event handlers)

- BOTTOM rows: Deeply nested function calls (leaf functions doing actual work)

- Each level DOWN represents a function called by the function above it

#### Reading Strategy

Identify Bottlenecks, look for wide rectangles across the timeline:

- Wide blocks = Long-running functions

- Repeated wide blocks = Frequently called expensive functions

- Gaps = Idle time or waiting

Also look for:

- Deep stacks (many rows down): Deep nesting might indicate inefficient recursion or call chains

- Consistent blocks: Regular patterns might indicate polling or animation frames (requestAnimationFrame)

- Jagged edges: Context switches or interrupted tasks

- Wide bars at any level: Performance bottlenecks - investigate these first

**Example**

![Chrome DevTools flame chart example](/images/blog/flame-graphs-in-app-performance/flame-chart-example.webp '800')

```
TOP     ┌─────────────────────────────────────┐
        │ Main — http://localhost:3000        │ ← Root: Main thread
        └─────────────────────────────────────┘
              ↓ (calls)
        ┌─────────────────────────────────────┐
        │ Evaluate script                     │ ← Script execution
        └─────────────────────────────────────┘
              ↓ (calls)
        ┌─────────────────────────────────────┐
        │ goToWork (pink bar, ~150ms)         │ ← Your function
        └─────────────────────────────────────┘
              ↓ (calls)
        ┌──────────────┬─────────────────────┐
        │grabSomeCoffee│   petADog           │ ← Nested functions
        └──────────────┴─────────────────────┘
              ↓ (calls)
BOTTOM  ┌──────────────┐
        │ orderCoffee  │                      ← Deepest nested call
        └──────────────┘
```

With this two concepts understood we can now remember that Flame Charts are like watching a movie of your code execution frame-by-frame, while Flame Graphs are like looking at a summary of which scenes appeared most often!

#### References

https://www.brendangregg.com/flamegraphs.html

https://www.developerway.com/posts/client-side-rendering-flame-graph#part3

https://developer.chrome.com/docs/devtools/performance/reference#flame-chart
