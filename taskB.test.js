const proms = require('./taskB');

test('a', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: () => Promise.resolve([])
    }], 5);

    expect(result).toEqual(['1']);
});

test('b', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: () => Promise.resolve([{
            id: "2",
            priority: 2,
            transfer: () => Promise.resolve([])
        }])
    }], 5);

    expect(result).toEqual(["1", "2"]);
});

test('c', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: ()=> Promise.resolve([{
            id: "2",
            priority: 4,
            transfer: ()=> Promise.resolve([])
        }, {
            id: "3",
            priority: 8,
            transfer: ()=> Promise.resolve([])
        }])
    }], 5);

    expect(result).toEqual(["1", "3", "2"]);
});


test('d', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: ()=> Promise.resolve([])
    },
    {
        id: "2",
        priority: 1,
        transfer: ()=> Promise.resolve([])
    },
    {
        id: "3",
        priority: 1,
        transfer: ()=> Promise.resolve([])
    }
    ], 2);

    expect(result).toEqual(['1', '2', '3']);
});

test('e', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: ()=> Promise.resolve([])
    },
    {
        id: "2",
        priority: 2,
        transfer: ()=> Promise.resolve([])
    },
    {
        id: "3",
        priority: 3,
        transfer: ()=> Promise.resolve([])
    }
    ], 2);

    expect(result).toEqual(['3', '2', '1']);
});

test('f', async () => {
    var result = await proms([{
        id: "1",
        priority: 1,
        transfer: () => new Promise((resolve, _) => resolve([])),
    },
    {
        id: "2",
        priority: 2,
        transfer: () => new Promise((resolve, _) => resolve([])),
    },
    {
        id: "3",
        priority: 3,
        transfer: () => new Promise((resolve, _) => {
            setTimeout(()=>{
                resolve([{
                    id: "4",
                    priority: 3,
                    transfer: () => new Promise((resolve, _) => resolve([])),
                }])
            }, 200)
        } )  
    },
    {
        id: "5",
        priority: 3,
        transfer: () => new Promise((resolve, _) => resolve([])),
    }
    ], 1);

    expect(result).toEqual(['3', '5', '4', '2', '1']);
});