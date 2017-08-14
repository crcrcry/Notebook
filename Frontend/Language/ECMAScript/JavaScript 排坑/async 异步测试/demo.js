async function demo1() {
    let count = 0;
    count = await pausePromiseTodo(count);
    console.log(count++);
    count = await pausePromiseTodo(count);
    return count
}

function pausePromiseTodo(item){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log("async:", item)
            resolve(item+1);
        }, 2000);
    })
}

async function demo2() {
    let count = 0;
    await pauseTodo(count+1);
    console.log(0);
    await pauseTodo(count+2);
    return count
}

function pauseTodo(item){
    setTimeout(function(){
        console.log("async:", item);
    }, 2000);
}

console.log(demo1().then((data) => {
    console.log(data);
}));

console.log('hello');

// console.log(demo2());


