const bcrypt = require('bcrypt')
bcrypt.hash("Sybil", 10)
.then(hashed => {
    console.log(hashed)
    bcrypt.compare("Sybil",hashed).then(res => {
        console.log(res)
    })
})

// console.log(hashedPassword)