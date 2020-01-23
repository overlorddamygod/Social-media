import Api from '@/services/Api'

export default {
  getusers (userId) {
    return Api().get(`user?user_id=${userId}`)
  },
  allposts() {
    return Api().get(`posts/all`)
  }
}
