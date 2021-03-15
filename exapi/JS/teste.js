const fs = require('fs')

const readfile = file => new Promise((resolve, reject) =>{
	fs.readFile(file, (err, contents) => {
		if(err){
			return reject(err)
		} else{
			return resolve(contents)
		}
	})
})

const promessa = readfile('./text.txt')
.then(contents =>{
	console.log(String(contents))
    return readfile('./text2.txt')
    
})
.then(contents =>{
    console.log(String(contents))
    console.log(promessa) // Promise { <pending> }
})
.catch(err =>{
    throw new Error(err)
})
setTimeout(() =>{console.log(promessa)}, 1000) // Promise { undefined }