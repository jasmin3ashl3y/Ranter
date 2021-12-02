const router = require('express').Router()
const {Post, Comment, User, Follow} = require('../models')
const sequelize = require('../config/connection')
const {userHandlers} = require('../controllers/apiRoutes/handlers')
const { Op, QueryTypes, json } = require('sequelize')
const { is_following } = require('../utils/helpers')

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/feed', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login')
        return
    }
    const usersFollowing = await sequelize.query(`(SELECT followed_id FROM follow WHERE follower_id = ${req.session.user_id})`, { type: QueryTypes.SELECT })
    const userIds = usersFollowing.map(({followed_id}) => followed_id)
    userIds.push(req.session.user_id)
    Post.findAll({
        where: {
            user_id: {
                [Op.or]: userIds
            }
        },
        attributes: [
            'id', 
            'text', 
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM heart WHERE post.id = heart.post_id)'),'heart_count'],
            [sequelize.literal('(SELECT COUNT (*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
            
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        order: [
            ['created_at', 'DESC']
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            //put logic to display no posts from followers page
        }
        const posts = dbPostData.map(post => post.get({plain: true}))
        res.render('feed', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            id: req.session.user_id
        })
    })
})

router.use('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'text', 
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM heart WHERE post.id = heart.post_id)'),'heart_count'],
            [sequelize.literal('(SELECT COUNT (*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
            
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id'});
                return;
            }
            const post = dbPostData.get({plain: true})
            res.render('feed', {post})
            console.log(post)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.use('/users/find/:query', async (req, res) => {
    const usersFollowing = await sequelize.query(`(SELECT followed_id FROM follow WHERE follower_id = ${req.session.user_id})`, { type: QueryTypes.SELECT })
    const usersFollowingIds = usersFollowing.map(({followed_id}) => followed_id)
    userHandlers.getUsers(req.params.query)
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({plain: true}))
        users.forEach(user => user.following = is_following(user.id, usersFollowingIds))
        res.render('user-search', {
            users, 
            username: req.session.username,
            id: req.session.user_id,
            loggedIn: req.session.loggedIn,
            usersFollowingIds
        })
    })
})

router.get('/user/:id', async (req, res) => {
    const usersFollowing = await sequelize.query(`(SELECT followed_id FROM follow WHERE follower_id = ${req.session.user_id})`, { type: QueryTypes.SELECT })
    const usersFollowingIds = usersFollowing.map(({followed_id}) => followed_id)
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
            model: Post,
            where: {
                user_id: req.params.id
            },
            required: false,
            attributes: [
                'id', 
                'text', 
                'created_at',
                [sequelize.literal('(SELECT COUNT (*) FROM heart WHERE posts.id = heart.post_id)'),'heart_count'],
                [sequelize.literal('(SELECT COUNT (*) FROM comment WHERE comment.post_id = posts.id)'), 'comment_count']
                
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        } ]
    })
    .then(dbUserResult => {
        console.log(dbUserResult)
        const {id, username, bio, email, createdAt, posts} = dbUserResult.get({plain: true})
        res.render('user-profile', {
            loggedIn: req.session.loggedIn,
            id, 
            isFollowing: is_following(id, usersFollowingIds),
            isCurrentUser: (id == req.session.user_id),
            username,
            bio,
            email,
            createdAt,
            posts
        })
    })
    .catch(err => {
        res.status(404).json(err)
        console.log(err)
        console.log(req.params.id)
    })
})

module.exports = router