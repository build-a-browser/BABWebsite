---
title: 'Step 3: A Very Basic DOM'
description: 'Get a feel for the browser DOM, creating a basic tree that will suffice for some basic HTML parsing.'
status: 'Draft'
hashes:
  predraft: 'a34ac1a12a8609dfa62da1ee2670c9e56dee6e27' 
---

The previous step, step 2, was extremely simple. Consider that a warm-up. Because now, we're immeadietly diving into the real stuff!

So if you think of web development (and web development experience is surely a prerequisite to browser development), one of the first
things you probably think of is HTML. HTML basically defines your page, so let's start there.

Imagine this basic HTML snippet:

```html
<p>I am building a browser!</p>
```

If you save this to an HTML file, or use the handy copy linked here [TODO: provide URL to server copy], you'll see that (although we omitted
a ton of fluff like doctypes, <html>, and <body>) this markup results in a paragraph with the text "I am building a browser!" being displayed.

In the example HTMl snippet above, you might say that the `p` element "contains" some text.
Using a record for simplicity, we might represent that as `record P(Text text);`. So you could then represent the above as
`new P(new Text("I am building a browser!"))`. Of course, that's a bit of an oversimplification. First off, HTML has other "elements" beyond
just "p". For example, there is "span" and there is "div". We'll call this the name of the element - so we might have
`record Element(String name, Text text)`. However, it is possible to put other elements inside an element (think `<div><span></span></div>`)
or even to mix multiple Element and Text into the same parent. We can make a superinterface of Element and Text called `Node`, allowing us to
store both together in a `List<Node>`.

With that, we might derive a set of interfaces and records such as

```java
public interface Node {}

public record Element(String name, List<Node> children) {}

public record Text(String text) {}
```

For completeness, let's also add a "Document" to represent the containing page.

```java
public record Document(List<Node> children) implements Node {}
```

While records here are easier to demonstrate with, we will need to store state later, so let's just convert them to interfaces and classes now.

While at it, to allow easier `println` debugging, we'll add pretty-printers to all of them to make it look more HTML-like

[TODO: Convert the below to interfaces and classes]
```java
public record Element(String name, List<Node> children) implements Node {
  
  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder("<");
    builder.append(name);
    builder.append(">");
    for (Node child: children) {
      builder.append(child.toString());
    }
    builder
      .append("</")
      .append(name)
      .append(">");
    
    return builder.toString();
  }

}

public record Document(List<Node> children) implements Node {
  
  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    for (Node child: children) {
      builder.append(child.toString());
    }
    
    return builder.toString();
  }

}

public record Text(String text) implements Node {

  @Override
  public String toString() {
    return text;
  }

}
```

With all of these classes, we have just built a simplistic representation of a browser's Document Object Model (DOM).

The DOM is a tree of nodes (elements, text, etc). If you've worked with parsers before, you can think of it like an AST but for a document.

Speaking of, let's start writing a parser in the next step!
