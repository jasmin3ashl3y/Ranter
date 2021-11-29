const router = require('express').Router()
const { User, Post, Comment, Like } = require('../../models')


//create a comment WORKS
router.post('/', (req, res) => {
  Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
  })
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err))
});

// view all comments WORKS
router.get('/', (req, res) => {
  Comment.findAll()
      .then(data => res.json(data))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});
// delete a comment WORKS
router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//PUT - edit a comment (owned by logged in user) WORKS
router.put('/:id', (req,res) => {
  Comment.update(
      {
          comment_text: req.body.comment_text
      },
      {
          where: {
              id: req.params.id
          }
      }
  )
      .then(data => {
          if (!data) {
              res.status(404).json({ message: 'No comment found with this id' });
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
