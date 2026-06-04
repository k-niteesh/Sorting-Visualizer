async function bubble() {
    const ele = document.querySelectorAll('.bar');
    for(let i = 0; i < ele.length - 1; i++){
        for(let j = 0; j < ele.length - i - 1; j++){
            ele[j].style.background   = C.compare;
            ele[j+1].style.background = C.compare;
            updateComparisons(1);
            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                await waitforme(delay);
                swap(ele[j], ele[j+1]);
            }
            ele[j].style.background   = C.default;
            ele[j+1].style.background = C.default;
        }
        ele[ele.length - 1 - i].style.background = C.sorted;
    }
    ele[0].style.background = C.sorted;
}

document.querySelector('.bubbleSort').addEventListener('click', async function(){
    setActiveAlgo('bubble');
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bubble();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    clearActiveAlgo();
});
