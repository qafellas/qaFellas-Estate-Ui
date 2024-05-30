let generateNum = function(){
    const num = Math.random()*1000 // 0,1236 * 1000 = 123,6
    return Math.ceil(num)
}

export { generateNum }