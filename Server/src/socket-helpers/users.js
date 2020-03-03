const {
    User
} = require('../models')

module.exports = {
    async getallusers() {
        try {
            // console.log(req.query.user_id)
            let usersJson = []
            const users = await User.findAll();
            users.forEach(element => {
                usersJson.push(element.dataValues)
            });
            // console.log(usersJson);

            return usersJson
        } catch (err) {
            console.error(err)
            return []
        }
    }
}