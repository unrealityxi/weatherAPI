var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a == "number" && typeof b == "number"){
                resolve(a + b);
            } 
            else {
                reject("Args must be numbers");
            }


        }, 1500)
    })
}

// var somePromise = new Promise((resolve, reject) => {
//    setTimeout(() => {
//     resolve("Hey, it worked!");
//    }, 2500); 
// });

// somePromise.then((val) => {
//     console.log("Success: ", val);
// })

asyncAdd("5a", 15).then((res)=>{
    return asyncAdd(res, 50);
}).then((res) => {
    return asyncAdd(res, 30);
}).then((res) => {
    return console.log(res);
}).catch((err) => {
    return console.log("Error: ", err);
})