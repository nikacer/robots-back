const users = require('../models/users.model')
const security = require('./seguridad')

const userObtain = ({ nickname, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await users.findOne({ where: { nickname, password } });
            if (!user) throw 'no existe usuario'
            resolve({ token: security.crearToken() })

        } catch (err) {
            reject({ err })
        }
    })

}

module.exports = {
    userObtain
}