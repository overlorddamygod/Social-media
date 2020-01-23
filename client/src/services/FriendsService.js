import Api from '@/services/Api'

export default {
  addfriend (friend) {
    return Api().post(`friends/add`,friend)
  },
  getfriends (userId) {
    return Api().get(`friends?user_id=${userId}`)
  },
  removefriend (userId) {
    return Api().delete(`friends?friend_id=${userId}`)
  },
  findfriends(userId) {
    return Api().get(`findfriends?user_id=${userId}`)
  },
}
