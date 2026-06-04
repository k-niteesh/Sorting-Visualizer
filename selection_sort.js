async function selection(){
    const ele = document.querySelectorAll('.bar');
    for(let i = 0; i < ele.length; i++){
        let min_index = i;
        ele[i].style.background = C.compare;
        for(let j = i + 1; j < ele.length; j++){
            ele[j].style.background = C.pivot;
            await waitforme(delay);
            updateComparisons(1);
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                if(min_index !== i) ele[min_index].style.background = C.default;
                min_index = j;
            } else {
                ele[j].style.background = C.default;
            }
        }
        await waitforme(delay);
        swap(ele[min_index], ele[i]);
        ele[min_index].style.background = C.default;
        ele[i].style.background         = C.sorted;
    }
}

document.querySelector('.selectionSort').addEventListener('click', async function(){
    setActiveAlgo('selection');
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await selection();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    clearActiveAlgo();
});
