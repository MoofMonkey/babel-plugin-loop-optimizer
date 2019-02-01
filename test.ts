//  Optimizes `.forEach`, `.every`, `.find`, `.map`, `.filter` statements to `for` stements
let ar = [1, 2, 3]

// loop-optimizer: FORWARD, POSSIBLE_UNDEFINED
ar.forEach(console.log)

 // loop-optimizer: KEEP
ar.forEach(console.log)

// nothing (default transform)
ar.forEach(console.log)

// nothing (default transform)
ar.every(el => {
    console.log(el)
    return true
})

// loop-optimizer: POSSIBLE_UNDEFINED
ar.every(el => {
    console.log(el)
    return true
})

// nothing (default transform)
console.log(ar.map(console.log))

// loop-optimizer: POSSIBLE_UNDEFINED
console.log(ar.map(console.log))

// nothing (default transform)
console.log(ar.filter(el => {
    console.log(el)
    return false
}))

// loop-optimizer: POSSIBLE_UNDEFINED
console.log(ar.filter(el => {
    console.log(el)
    return false
}))