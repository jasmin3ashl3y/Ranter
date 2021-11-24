const { User } = require('../../../models')

function createUser(username, email, password) {
    return User.create({
        username, 
        email,
        password
    })
}

function getAllUsers() {
    return User.findAll({
        attributes: { exclude: ['password'] }
    })
}

function getUser(id) {
    return User.findOne({
        where: {
            id
        },
        include: [
            //write logic to get posts here
        ]
    })
}

module.exports = {createUser, getAllUsers, getUser}