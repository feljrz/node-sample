const fs = require('fs')

console.log(1)
// // Callback
// function callback(err, contents){
//     return console.log(err, String(contents))
// }

// fs.readFile('./text.txt', (err, contents) =>{
//     return console.log(err, String(contents))
// })

// Promise

const readfile = file => new Promise((resolve, reject) =>{
    fs.readFile(file, (err, contents) => {
        if(err){
            return reject(err)
        } else{
            return resolve(contents)
        }
    })
})
// Promisse

// const promessa = readfile('./text.txt')
//     .then( contents => {
//         console.log(String(contents))
//         return readfile('./text2.txt') //Retorno outra promisse
//     })
//     .then ( contents2 => {
//             console.log(String(contents2))
//             console.log(promessa)       
//     })
        
// setTimeout(() => console.log(promessa), 1000)

const init = async() =>{
    try{
    const content1 = await readfile('text.txt')
    const content2 = await readfile('text2.txt')
    return content1 + '\n' + content2
    }
    catch(err){
        console.log(err)
    }
}

init().then(contents => console.log(String(contents)))

console.log(2)

console.log(3)