# Sorting Visualizer

A web-based visualizer for common sorting algorithms, built using vanilla HTML, CSS, and JavaScript. I built this project to visualize how different sorting algorithms work in real-time and to practice handling asynchronous operations and custom control flows in JavaScript.

## Features
- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort (Lomuto partition), and Merge Sort.
- **Real-time Customization**: Sliders to adjust the array size and the animation speed while sorting.
- **Pause & Reset Controls**: You can pause and resume the sorting process in the middle, or stop/reset it entirely if you want to select another algorithm.
- **Modern Theme**: A dark glassmorphic design system using CSS custom properties with clear color-coded states (indigo for unsorted, amber for comparisons, magenta for pivots, and emerald for sorted elements).

## How it works (Asynchronous Control Flow)
To visualize the sorting steps, the algorithms run asynchronously using JavaScript `async/await` along with a custom delay timer. 

The Pause and Stop buttons work globally without modifying the core logic of the individual algorithm files:
1. A helper `waitforme()` function handles the delay between sorting steps.
2. If **Pause** is clicked, the timer enters a short delay loop that holds the execution thread in place.
3. If **Stop** is clicked, the timer throws a cancel exception.
4. The sorting functions are wrapped inside a global interceptor that catches the exception, cancels the active sort gracefully, and resets the board to a new random array.

## How to Run the Project
Because this is built with standard web technologies, there are no dependencies or setup required.

1. Download or clone this folder.
2. Open `index.html` in any web browser.

If you prefer to run it using a local development server, you can run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
