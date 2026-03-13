---
title: 'Step 1: Initial Commit'
description: 'Learn more about BuildABrowser. Initialize your repository.'
status: 'Draft'
next-step: 'step_2'
hashes:
  predraft: 'ac35e0bcafd2b7570e71a30f9f0af9c5469eca9c' 
---

## Prelude

Hello! And welcome to BuildABrowser, where you - you guessed it - build a browser!

Specifically, you rebuild BuildABrowser, a Java-Based browser.

BuildABrowser, while encompassing elements from the entire browser, is primarily focused on building the *rendering engine*.
You can think of this as the part of the web browser focused on showing the web page itself.

This is as opposed to UI elements such as the URL bar and navigation elements.
We shall call these elements the browser chrome.
We will always use a lowercase "c" in the phrase "the browser chrome" in order to distinguish it from the phrase "The Browser Chrome"
(which could otherwise be taken to refer to Google Chrome).

In order to help you distinguish which part of the web browser is the browser chrome, and which part is the rendering engine (displaying a web page)
this helpful graphic has been included.

[TODO: Insert Graphic]

We will still have some degree of browser chrome, it's just not the primary focus.

As it is hard to tell from a visual graphic as above, we must also distinguish the rendering engine from a web page.

You can think of a web page as the bundle of files containing HTML, CSS, and other web languages sent by a web server.
These define what a website looks like. When you refer to a page by its name (such as when you say "Reddit" or "Google"),
you are referring to the web page and NOT the rendering engine.

The rendering engine refers to the technologies that then retrieves and parses the HTML and CSS, as well as lays out
(determine the sizes and positions of) and paints (shows on screen) any UI elements found in those files.

The rendering engine also integrates with the JavaScript engine (a piece of code that implements the ECMAScript specification).
At this time, BuildABrowser does not aim to include a scripting engine (if this changes, this sentence will be updated accordingly).

Now that we have distinguished what a rendering engine is from what a web page is, it is important to note:
BuildABrowser is NOT a tutorial on how to create a web page. Those kinds of tutorials are very plentiful, and you can easily
find them by searching for them online. Instead, BuildABrowser focuses on how to build a browser and its rendering engine.

While on the subject, BuildABrowser is not a tutorial for beginner programmers. Browser rendering engines are highly complex pieces of
software, and attempting to build one without already knowing programming is a recipe for pain (well, really, trying to build one at all
is a recipe for pain, but this tutorial tries to reduce that for those who already have a good deal of programming experience). If you're
not discouraged by that, you're still welcome to give it a try (with time and persistence, you can do many things), but just know that it
likely will not go well.

Most tutorials of this nature include code blocks for each new feature added, such that if you read only the text segments, you can compose
any contained code blocks into a coherent program. While this tutorial will certainly include code blocks for points of interest, the finished
product is over 10K lines of code, and as such it is not practical to include every line in the markdown files. Instead, this tutorial opts for
a step-by-step commit reference repository. Each page of this tutorial will include a hyperlink to the diff between two commits, and that diff will
include the total code changes from the step. At times, you may even desire to try your own hand at implementing something before referencing the diffs
(just reset if it goes awry, and be aware that deviations may cause merge conflicts).

Since the rendering engine is the famously complex portion of a web browser, that's what this tutorial puts the bulk of its focus into. If you simply want
to add cool new features to the browser chrome, it may be better to instead look into using an existing rendering engine such as Blink, Webkit, or Gecko.

Though the abovementioned rendering engines have been the major players for a long time, cool new rendering engines such as those used by
Ladybird and Servo have been emerging. As such, it is as good a time as any to create a new rendering engine built using your unique architectural
ideas.

It's good to know what you're building before you begin building. The BuildABrowser website includes a download for the most up-to-date BuildABrowser
build, which serves as a target goal in this tutorial. Feel free to give it a try.

Lastly, there are of course already other browser tutorials such as https://browser.engineering/ that you may wish to also check out. It could be
good to get multiple perspectives on engine development. What sets BuildABrowser apart from other tutorials is its focus on spec compliance and
its goal of both allowing you to build a browser that passes conformance tests. Due to this, however, the browser built in BuildABrowser may be
significantly larger than those built in other tutorials. To keep this manageable, BuildABrowser is split into many smaller contigous steps.
At any time, if you get lost, feel free to checkout a copy of the repo at the step you were on. Or, if you're interested in something specific,
you may wish to checkout an arbitrary commit (just don't get lost on any concepts you skipped!). Since browsers are infinitely growing, what is
currently the last step may not be the last step in the future. Don't feel obliged to complete these steps to the end - simply complete as much of
the tutorial as you wish to, and for what you do attempt, take it step-by-step. Don't look ahead too far, and don't rush.

Oh, also: Be prepared to read.

But enough talking. Let's begin!

## Gradle Setup

[TODO: Gradle setup steps]
