const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

var hash = bcrypt.hashSync("narutoa77a1a");
console.log(hash);

console.log(bcrypt.compareSync("narutoa7sasa7a1a","$2a$10$Kniv1d8xHWAC906xaEd5nOOn2FVJHtUZSpXHHg1R3MBo3ntKJpJNy"))

// bcrypt
//     .genSaltAsync(10)
//     .then(salt => bcrypt.hashAsync("overlord77", salt, null))
//     .then(hash => {
//       console.log(hash)
//       console.log(bcrypt.compareSync("narutoa77a1a","$2a$08$7/0yPJbrF9s/lvaPSTUsMesT/r3oJ2AGQV9fWX/w1NSwWFLlfVtZ6"))
//     })