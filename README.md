# Sorting Visualizer

A dynamic web-based application built to visually illustrate sorting algorithms using interactive bar graphs. This project delivers a responsive, intuitive interface that enhances the understanding of sorting logic through real-time visualization, interactive controls, and dynamic animations.

## Features
- **5 Sorting Algorithms**: Implemented and visualized Bubble, Selection, Insertion, Merge, and Quick Sort (Lomuto partition).
- **Responsive Layout**: Integrated Bootstrap alongside modern CSS Grid and Flexbox to deliver a fully responsive, cross-device interface.
- **Real-Time Customization**: Interactive sliders to customize the array size and control animation speed during sorting.
- **Asynchronous Playback Controls**: Supports pausing, resuming, stopping, and **stepping through** algorithms step-by-step in real-time.
- **Performance Analytics**: Real-time stats counters tracking Comparisons, Swaps/Writes, and Execution Time.
- **Performance Comparison History**: A session-history table that logs stats for each executed algorithm, enabling direct comparison of algorithm behavior, execution flow, and sorting performance.
- **Premium Aesthetics**: A dark glassmorphic design system using CSS custom properties with clear color-coded states (indigo for unsorted, amber for comparisons, magenta for pivots, and emerald for sorted elements).

## How it works (Asynchronous Control Flow)
To visualize the sorting steps, the algorithms run asynchronously using JavaScript `async/await` along with a custom delay timer. 

The player controls (Pause, Step, Stop) work globally through a centralized interceptor:
1. A helper `waitforme()` function handles the delay between sorting steps.
2. If **Pause** is active, the execution thread enters a short delay loop.
3. If **Step** is clicked while paused, the thread advances by exactly one iteration before pausing again.
4. If **Stop** is clicked, the timer throws a cancel exception, resetting the visualizer state gracefully.

## How to Run the Project
Because this is built with standard web technologies, there are no dependencies or setup required.

1. Download or clone this repository.
2. Open `index.html` in any web browser.

If you prefer to run it using a local development server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
