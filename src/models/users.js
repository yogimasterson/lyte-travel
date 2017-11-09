const db = require('./db/users')

module.exports = {
    create: db.create,
    findById: db.findById,
    getUsername: db.getUsername,
    findByUsername: db.findByUsername,
    isValidPassword: db.isValidPassword,
    updateUsername: db.updateUsername,
    updateImage: db.updateImage,
    userCity: db.userCity,
    deleteUser: db.deleteUser
}