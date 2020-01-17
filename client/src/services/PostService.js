import Api from '@/services/Api'

export default {
  postpost (credentials) {
    return Api().post('posts', credentials)
  },
  getp (userId) {
    return Api().get(`posts?user_id=${userId}`)
  }
}
