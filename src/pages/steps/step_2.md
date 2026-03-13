# Step 2: Show a window

One question you might have when looking into browser development is "where do I even start?".

I think a good place to start might be with one of the simplest units of work possible: Showing a window.
By starting with this, you can immediately start to get visual feedback, and visual feedback is the most motivating form of feedback.

So make a Main class, and inside the main method, you can just put

```java
JFrame frame = new JFrame("BuildABrowser Test Program");
frame.setVisible(true);
```

Although Swing is not a good GUI library, it is bundled with Java and probably the simplest option to get started with right now.

We'll do our initial work using Swing, so we can get into the "swing" of development quickly. In the future, we'll switch to using Java2D 
directly for the renderer (and, even later, we'll get fancy with Skija, a Skia wrapper).

Let's quickly improve a few things.

You can optionally put these lines at the top of your main method:

```java
try {
  UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | UnsupportedLookAndFeelException e) {
  throw new RuntimeException(e);
}
```

While it has no effect on my current system, on Windows it gives you a nice retro UI.

If your windowing system doesn't draw it's own decorations, you can also add `frame.setUndecorated(true);` after the window creation to use
Swing's client-side window decorations.

Now, a window by itself is, of course, not *that* interesting, and it would make for a very anticlimatic step if that's all you did.
So, we'll do the most basic flow to make it a bit more browser-like.

At it's most basic level, you might say a browser has a flow somewhat like this:

[TODO: Draw Diagram]

Find out what page the user wishes to go to
vvv
Fetch the contents of that page
vvv
Render that page

(thanks for reading my award-winning series "How to Write a Browser in 3 Steps")

So let's do that!

First, we "find out what page the user wishes to go to"

```java
URL url = new URI(args[0]).toURL();
```

You can pass the URL using Gradle's --args flag (the exact path format varies per system).

```java
./gradlew run --args="file:///home/me/my_web_page.html"
```

Next, we "'fetch' the contents of that page". In this case, we'll just load the file off of disk:

```java
private static String loadURL(URL url) throws IOException {
  String filePath = url.getPath();

  try (InputStream inputStream = new FileInputStream(filePath)) {
    return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
  }
}
```

Lastly, we'll "render that page". And by that I mean we'll just dump the raw text on to the screen.

```java
JTextPane textPane = new JTextPane();
textPane.setText(text);
// ...
frame.add(textPane);
frame.pack();
// ...
```

And now we have a really, really basic pipeline, but this could already be considered a usable application to some degree.

--

But loading data from a file isn't very cool, is it? This is a "web" browser, so it would be nice to load something from the web.

What we'll write in this step is certainly not a proper fetch implementation, but it is meant to serve as a basic starting point upon which
we can start building some meaningful stuff. We can improve upon it later.

We can switch on the URL protocol. Nothing fancy, as we'll be replacing this later anyways.

```java
private static String loadURL(URL url) throws IOException {
  try (InputStream inputStream = request(url)) {
    return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
  }
}

private static InputStream request(URL url) throws IOException {
  return switch (url.getProtocol()) {
    case "file" -> new FileInputStream(url.getPath());
    case "http" -> url.openConnection().getInputStream();
    case "https" -> url.openConnection().getInputStream();
    default -> throw new UnsupportedOperationException("Not Implemented!");
  };
}
```

So if the URL has a file protocol, we'll use a FileInputStream, otherwise we'll open a connection to the server.

--

Keep in mind that it is expected that you've opened the code diff for this guide and are primarily following the code diff.
These steps are meant more as a "diff annotation" then to actually tell you each line of code to write and where to place those snippets of code. Future steps will be much more involved and have much more code, so it is often not practical to include all of the code here. In fact, sometimes it will be assumed that you've learned enough from previous steps that you can implement chunks of code yourself.