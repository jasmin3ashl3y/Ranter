const { User, Follow } = require('../../../models')
const {Op} = require('sequelize')

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
            {
                model: User,
                attributes: ['username'],
                through: Follow,
                as: 'followers',
                where: {followed_id: id}
            }
        ]
    })
}

function getUsers(searchTerm) {
    return User.findAll({
        where: {
            username: {
                [Op.like]: `%${searchTerm}%`
            }
        }
    })
}

module.exports = {createUser, getAllUsers, getUser, getUsers}