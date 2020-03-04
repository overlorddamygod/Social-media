import axios from 'axios'
// import store from '@/store/'

export default () => {
  return axios.create({
    baseURL: process.env.URL || `https://young-temple-53403.herokuapp.com/`
    // headers: {
    //   Authorization: `Bearer ${store.state.auth.token}`
    // },
    // params: {
    //   api_key:'8af00d10-3848-11ea-a367-55e9684d2396'
    // }
  })
}