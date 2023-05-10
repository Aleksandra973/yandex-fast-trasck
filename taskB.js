function proms (quantums, n) {
    return new Promise(async(resolve, reject) => {
        let result = [];
        try {
            quantums.sort((a, b) => b.priority - a.priority);
    
            while(quantums.length>0){
                let pack = [];
                for(let i = 0; i<n; i++){
                    if(quantums.length === 0){
                        break;
                    }
                    let task = quantums.shift();
                    var tr = task.transfer();
                    tr.then((data) =>{
                        result.push(task.id);
                        if(data){
                            quantums = [...quantums, ...data];
                        }
                    })
                    pack.push(tr);
                }
                await Promise.all(pack);
                quantums.sort((a, b) => b.priority - a.priority);
            }
            
            resolve(result);
        } catch (e) {
            reject()
        }
    });  
}

module.exports = proms;