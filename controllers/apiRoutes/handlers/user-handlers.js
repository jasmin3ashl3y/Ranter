const { User, Follow } = require('../../../models')
const {Op} = require('sequelize')
const sequelize = require('../../../config/connection')

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
                attributes: ['id', 'username'],
                through: Follow,
                as: 'followers'
            }
        ]
    })
}

function getUsers(searchTerm) {
    return User.findAll({
        attributes: [
            'id',
            'username',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM post WHERE post.user_id = user.id)'), 'post_count'],
            [sequelize.literal('(SELECT COUNT (*) FROM comment WHERE comment.user_id = user.id)'), 'comment_count']
    
        ],
        where: {
            username: {
                [Op.like]: `%${searchTerm}%`
            }
        }
    })
}

module.exports = {createUser, getAllUsers, getUser, getUsers}