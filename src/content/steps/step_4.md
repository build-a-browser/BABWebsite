---
title: 'Step 4: A Very Basic HTML Parser'
description: 'Learn how an HTML parser uses a state machine to convert HTML to a DOM.'
status: 'Draft'
hashes:
  predraft: '26e3847a932ea2dfb44156e9fd50f70c810fadfb'
specs:
  - 'https://html.spec.whatwg.org/multipage/parsing.html'
---

In this step, we will start parsing HTML.

For reference implementations, HTML is traditionally implemented via a state machine of "Tokenize States".

NOTE: HTML should not be parsed with recursive descent. Most HTML parsers designed with recursive descent can generally only handle a small
subset of the language, and will not produce the expected output for any non-trivial page. Furthermore, HTML defines a great number of edge
cases that result in massive context switches that recursive descent cannot easily handle.

Basically, let's start with some markup like so:

```html
<p>Hello, World!</p>
```

Our parser will switch between various modes while parsing, and start with an initial mode. We'll call the modes states, and the inital state
the Data State.

The data state has a series of simple rules. It might say something like

Data State:
1. If the current character is a <, start a tag token and switch to the tag less-than sign state.
2. Otherwise, emit the current character

NOTE: This is a simplified example, and the real Data State is more involved.

Well, let us start with the first character:

`<`

It happens to match the first rule, so we'll begin by initializing a new tag token. A token is essentially a data structure that tracks what a
parser has found. A tag token might indicate that the parser found an opening or closing tag in the HTML. A tag token bundles a bit of
information, such as the name of the element (or at least the part of it that has been parsed so far) or whether it's a starting or end tag.

In most cases (but there are exceptions - we'll cover that shortly), we advance to the next character.

`p`

It then tells us to switch to the tag less-than sign state. This might be another rule that looks something like this:

Tag less-than sign state:
1. If the current character is '/', set the current tag token's end-tag flag and switch to the tag name state
2. Otherwise, switch to the tag name state and reconsume the current charactrer.

Here's that exception I mentioned - when we "reconsume the current character", we use the same character again, instead of the next character.

Since the current character is not '/', we reconsume 'p' and switch to the tag-name state.

So, we are still working on the character:

`p`

Next, we do whatever the tag name state says to do, and so on, until we reach the end of the input.
We also pass a special EOF value once we reach the end of input (technically, we go until an instruction says to stop parsing, but in
practicality we can ignore this).

In some cases, we might be told to emit a token. This passes the token onto an "insertion state". However, insertion modes are a bit
too complex for us to handle right now, so for now we'll just use a bit of hard-coded logic to handle tokens and build the DOM tree. We'll switch to proper insertion modes in a future step.

In some cases, it may be useful to visualize the state machine as a diagram. Here's an example of a diagram for a state machine just complex
enough to parse the example HTML we were given:

[TODO: Insert diagram]

...
