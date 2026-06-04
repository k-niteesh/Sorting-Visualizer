async function partitionLomuto(ele, l, r){
    let i = l - 1;
    ele[r].style.background = C.pivot;
    for(let j = l; j <= r - 1; j++){
        ele[j].style.background = C.compare;
        await waitforme(delay);
        updateComparisons(1);
        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            ele[i].style.background = C.compare;
            if(i !== j) ele[j].style.background = C.compare;
            await waitforme(delay);
        } else {
            ele[j].style.background = C.default;
        }
    }
    i++;
    await waitforme(delay);
    swap(ele[i], ele[r]);
    ele[r].style.background = C.default;
    ele[i].style.background = C.sorted;
    await waitforme(delay);
    for(let k = 0; k < ele.length; k++){
        if(!hasColor(ele[k], C.sorted))
            ele[k].style.background = C.default;
    }
    return i;
}

async function quickSort(ele, l, r){
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    } else {
        if(l >= 0 && r >= 0 && l < ele.length && r < ele.length){
            ele[r].style.background = C.sorted;
            ele[l].style.background = C.sorted;
        }
    }
}

document.querySelector('.quickSort').addEventListener('click', async function(){
    setActiveAlgo('quick');
    let ele = document.querySelectorAll('.bar');
    let l = 0, r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    clearActiveAlgo();
});
