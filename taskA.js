function arrSignal (arr) {
    if (arr.length===0) {
        return '';
    }
    function isCode (str) {
        return str.startsWith('0') ||  str.startsWith('1');
    }
    let maxLengthIndex = 0;
    for(let j=0; j<arr.length; j++) {
        if(!arr[j].value ){
            continue;
        }
        if (!isCode(arr[j].value)) {
            continue;
        }
        if (arr[j].time>arr[maxLengthIndex].time){
            maxLengthIndex=j;
        }
    }
    let maxLength = arr[maxLengthIndex].time + arr[maxLengthIndex].value.length;
    let fullStr = Array(maxLength);
    let fullCode = [];
    let result = [];
    for (const item of arr) {
        if(!item.value ){
            continue;
        }
        if(isCode(item.value)){
            for(let i=0; i<item.value.length; i++){
                if(item.value[i]==='1') {
                    fullCode.push(i+1+item.time);
                }
            }
        } else {
            let startIndex = item.time+1;
            if(startIndex>maxLength-1){
                continue;
            }
            for(let i=startIndex, j=0; j<item.value.length; i++, j++){
                fullStr[i]=item.value[j];
            } 
        }
    }
    for (let sign of fullCode) {
        result.push(fullStr[sign])
    }
    return result.join('');
}

module.exports = arrSignal;