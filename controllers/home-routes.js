const router = require('express').Router()
const {Post, Comment, User} = require('../models')
const sequelize = require('../config/connection')

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/feed', (req, res) => {
    res.render('feed')

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
            [sequelize.literal('(SELECT COUNT (*) FROM heart WHERE post.id = heart.post_id)'),'heart_count']
            
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


module.exports = router