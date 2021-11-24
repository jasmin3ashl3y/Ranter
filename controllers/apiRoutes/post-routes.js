const router = require('express').Router()
const { User, Post, Comment, Like } = require('../../models')
const sequelize = require('../../config/connection')
//routes - create a post, view all posts, get posts by a specific user, 
//edit a post, delete a post

//create a post WORKS
router.post('/', (req, res) => {
    Post.create({
        text: req.body.text,
        user_id: req.body.user_id
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//view all posts WORKS (except like_count)
router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'text',
            'created_at',
            //[sequelize.literal('(SELECT COUNT (*) FROM like WHERE post.id = like.post_id)','like_count')]
        ],
        order: [['created_at', 'DESC']],
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
    })
      .then(data => res.json(data))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
    
});

//WORKS (except like_count)git ad
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'text', 
            'created_at',
            //[sequelize.literal('(SELECT COUNT (*) FROM like WHERE post.id = like.post_id)','like_count')]
            
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
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No post found with this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update a post
router.put('/:id', (req,res) => {
    Post.update(
        {
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
              }
              res.json(data); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//like a post using custom static method in Post.js
router.put('/like', (req, res) => {
    
        Post.like({ ...req.body, user_id: req.body.user_id }, { Like, Comment, User })
            .then(updatedData => res.json(updatedData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        
});

//delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router