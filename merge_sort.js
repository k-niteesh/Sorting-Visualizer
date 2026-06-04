async function merge(ele, low, mid, high){
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left  = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitforme(delay);
        ele[low + i].style.background = C.merge_l;
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await waitforme(delay);
        ele[mid + 1 + i].style.background = C.merge_r;
        right[i] = ele[mid + 1 + i].style.height;
    }
    await waitforme(delay);
    let i = 0, j = 0, k = low;
    const finalMerge = (n1 + n2) === ele.length;
    while(i < n1 && j < n2){
        await waitforme(delay);
        ele[k].style.background = finalMerge ? C.sorted : C.merging;
        updateComparisons(1);
        if(parseInt(left[i]) <= parseInt(right[j])){ 
            ele[k].style.height = left[i];  
            i++; 
        } else { 
            ele[k].style.height = right[j]; 
            j++; 
        }
        updateSwaps(1);
        k++;
    }
    while(i < n1){
        await waitforme(delay);
        ele[k].style.background = finalMerge ? C.sorted : C.merging;
        ele[k].style.height = left[i]; 
        updateSwaps(1);
        i++; k++;
    }
    while(j < n2){
        await waitforme(delay);
        ele[k].style.background = finalMerge ? C.sorted : C.merging;
        ele[k].style.height = right[j]; 
        updateSwaps(1);
        j++; k++;
    }
}

async function mergeSort(ele, l, r){
    if(l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

document.querySelector('.mergeSort').addEventListener('click', async function(){
    setActiveAlgo('merge');
    let ele = document.querySelectorAll('.bar');
    let l = 0, r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await mergeSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    clearActiveAlgo();
});
