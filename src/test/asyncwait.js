const add = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}
add(12,23).then((sum) => {
    return sum + 23
}).then((res) => {
    console.log(res)
}).catch((res) => {
    console.log(err)
})