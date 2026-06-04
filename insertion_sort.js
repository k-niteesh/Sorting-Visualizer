async function insertion(){
    const ele = document.querySelectorAll('.bar');
    ele[0].style.background = C.sorted;
    for(let i = 1; i < ele.length; i++){
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = C.compare;
        await waitforme(delay);
        updateComparisons(1);
        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            ele[j].style.background     = C.compare;
            ele[j + 1].style.height     = ele[j].style.height;
            updateSwaps(1);
            j--;
            await waitforme(delay);
            for(let k = i; k >= 0; k--){
                ele[k].style.background = C.sorted;
            }
            if (j >= 0) {
                updateComparisons(1);
            }
        }
        ele[j + 1].style.height     = key;
        updateSwaps(1);
        ele[i].style.background     = C.sorted;
    }
}

document.querySelector('.insertionSort').addEventListener('click', async function(){
    setActiveAlgo('insertion');
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    clearActiveAlgo();
});
