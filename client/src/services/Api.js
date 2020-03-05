import axios from 'axios'
// import store from '@/store/'
// For production
export default () => {
  return axios.create({
    baseURL: process.env.URL || `https://young-temple-53403.herokuapp.com/`
  })
}
// For development
// export default () => {
//   return axios.create({
//     baseURL: process.env.URL || `http://localhost:3000/`
//   })
// }