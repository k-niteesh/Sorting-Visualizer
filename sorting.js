/* ── color tokens matching style.css variables ────────── */
const C = {
  default:  '#6366f1', // Vibrant Indigo
  compare:  '#f59e0b', // Warm Amber
  pivot:    '#d946ef', // Electric Magenta
  sorted:   '#10b981', // Clean Emerald
  merge_l:  '#f43f5e', // Rose Red
  merge_r:  '#3b82f6', // Vivid Blue
  merging:  '#8b5cf6', // Indigo/Purple
};

function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    if (typeof swapsCount !== 'undefined') {
        updateSwaps(1);
    }
}

function hasColor(element, hexColor) {
    const bg = element.style.backgroundColor || element.style.background;
    if (!bg) return false;
    
    const temp = document.createElement('div');
    temp.style.color = hexColor;
    document.body.appendChild(temp);
    const rgbColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    const norm = s => s.replace(/\s+/g, '').toLowerCase();
    return norm(bg).includes(norm(hexColor)) || norm(bg).includes(norm(rgbColor));
}


function disableSortingBtn(){
    document.querySelectorAll('.btn-algo').forEach(b => b.disabled = true);
}
function enableSortingBtn(){
    document.querySelectorAll('.btn-algo').forEach(b => b.disabled = false);
}
function disableSizeSlider(){
    document.querySelector('#arr_sz').disabled = true;
}
function enableSizeSlider(){
    document.querySelector('#arr_sz').disabled = false;
}
function disableNewArrayBtn(){
    document.querySelector('.newArray').disabled = true;
}
function enableNewArrayBtn(){
    document.querySelector('.newArray').disabled = false;
}

let isPaused = false;
let stopRequested = false;
let stepRequested = false;
let comparisonsCount = 0;
let swapsCount = 0;
let startTime = null;
let timerInterval = null;

function resetStats() {
    comparisonsCount = 0;
    swapsCount = 0;
    const compEl = document.getElementById('comparisons-val');
    const swapEl = document.getElementById('swaps-val');
    if (compEl) compEl.textContent = '0';
    if (swapEl) swapEl.textContent = '0';
    resetTimer();
}

function updateComparisons(count = 1) {
    comparisonsCount += count;
    const el = document.getElementById('comparisons-val');
    if (el) el.textContent = comparisonsCount;
}

function updateSwaps(count = 1) {
    swapsCount += count;
    const el = document.getElementById('swaps-val');
    if (el) el.textContent = swapsCount;
}

function startTimer() {
    resetTimer();
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        const el = document.getElementById('time-val');
        if (el) el.textContent = elapsed + 's';
    }, 10);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    const el = document.getElementById('time-val');
    if (el) el.textContent = '0.00s';
}

function addPerformanceHistory(algoName) {
    const elapsed = startTime ? ((Date.now() - startTime) / 1000).toFixed(2) : '0.00';
    const tbody = document.getElementById('perf-history-body');
    if (!tbody) return;
    
    const emptyRow = document.getElementById('no-history-row');
    if (emptyRow) {
        emptyRow.style.display = 'none';
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><strong>${algoName.toUpperCase()}</strong></td>
        <td>${arraySize.value}</td>
        <td>${comparisonsCount}</td>
        <td>${swapsCount}</td>
        <td>${elapsed}s</td>
    `;
    tbody.appendChild(row);
}

function updateControlButtons(running) {
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const stepBtn = document.getElementById('stepBtn');
    if (running) {
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        stepBtn.disabled = !isPaused;
    } else {
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        stepBtn.disabled = true;
        isPaused = false;
        pauseBtn.classList.remove('paused');
        const pauseBtnText = document.getElementById('pauseBtnText');
        if (pauseBtnText) pauseBtnText.textContent = 'Pause';
        const pauseIcon = document.getElementById('pauseIcon');
        if (pauseIcon) pauseIcon.style.display = 'inline-block';
        const playIcon = document.getElementById('playIcon');
        if (playIcon) playIcon.style.display = 'none';
    }
}

async function waitforme(milisec) {
    if (stopRequested) {
        throw new Error('STOP');
    }
    while (isPaused) {
        if (stopRequested) {
            throw new Error('STOP');
        }
        if (stepRequested) {
            stepRequested = false;
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    return new Promise(resolve => setTimeout(() => resolve(''), milisec));
}


function setActiveAlgo(name) {
    document.getElementById('active-algo').textContent = name;
    document.querySelectorAll('.btn-algo').forEach(b => {
        b.classList.toggle('active', b.dataset.algo === name);
    });
}
function clearActiveAlgo() {
    document.getElementById('active-algo').textContent = 'idle';
    document.querySelectorAll('.btn-algo').forEach(b => b.classList.remove('active'));
}

/* ── Sliders ──────────────────────────────────────────── */
let arraySize = document.querySelector('#arr_sz');
let szVal     = document.getElementById('sz_val');
arraySize.addEventListener('input', function(){
    szVal.textContent = arraySize.value;
    createNewArray(parseInt(arraySize.value));
});

let delay = 260;
let delayElement = document.querySelector('#speed_input');
let spVal = document.getElementById('sp_val');
delayElement.addEventListener('input', function(){
    spVal.textContent = delayElement.value;
    delay = 320 - parseInt(delayElement.value);
});

/* ── Array ────────────────────────────────────────────── */
let array = [];
createNewArray();

function createNewArray(noOfBars = 60) {
    deleteChild();
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 240) + 10);
    }
    const bars = document.querySelector('#bars');
    const maxH = 480;
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement('div');
        bar.style.height = `${array[i] * 2}px`;
        bar.style.background = C.default;
        const w = Math.max(2, Math.floor((bars.offsetWidth - noOfBars * 2) / noOfBars));
        bar.style.width = w + 'px';
        bar.classList.add('bar', 'flex-item', `barNo${i}`);
        bars.appendChild(bar);
    }
}

function deleteChild() {
    document.querySelector('#bars').innerHTML = '';
}

const newArray = document.querySelector('.newArray');
newArray.addEventListener('click', function(){
    enableSortingBtn();
    enableSizeSlider();
    clearActiveAlgo();
    createNewArray(arraySize.value);
});

/* ── Asynchronous Execution Interceptor & Control Buttons ── */
window.addEventListener('DOMContentLoaded', () => {
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const stepBtn = document.getElementById('stepBtn');
    const pauseBtnText = document.getElementById('pauseBtnText');
    const pauseIcon = document.getElementById('pauseIcon');
    const playIcon = document.getElementById('playIcon');

    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
            pauseBtn.classList.add('paused');
            if (pauseBtnText) pauseBtnText.textContent = 'Resume';
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (playIcon) playIcon.style.display = 'inline-block';
            if (stepBtn) stepBtn.disabled = false;
        } else {
            pauseBtn.classList.remove('paused');
            if (pauseBtnText) pauseBtnText.textContent = 'Pause';
            if (pauseIcon) pauseIcon.style.display = 'inline-block';
            if (playIcon) playIcon.style.display = 'none';
            if (stepBtn) stepBtn.disabled = true;
        }
    });

    stopBtn.addEventListener('click', () => {
        stopRequested = true;
        isPaused = false;
        if (stepBtn) stepBtn.disabled = true;
    });

    if (stepBtn) {
        stepBtn.addEventListener('click', () => {
            if (isPaused) {
                stepRequested = true;
            }
        });
    }

    // Wrap the global sorting functions to catch STOP errors
    const algos = ['bubble', 'insertion', 'selection', 'quickSort', 'mergeSort'];
    algos.forEach(name => {
        if (typeof window[name] === 'function') {
            const original = window[name];
            window[name] = async function(...args) {
                updateControlButtons(true);
                resetStats();
                startTimer();
                try {
                    await original(...args);
                    stopTimer();
                    addPerformanceHistory(name);
                } catch (err) {
                    stopTimer();
                    if (err.message === 'STOP') {
                        // Clean visualizer states and reload unsorted array
                        createNewArray(arraySize.value);
                    } else {
                        console.error(err);
                    }
                } finally {
                    isPaused = false;
                    stopRequested = false;
                    updateControlButtons(false);
                }
            };
        }
    });
});

