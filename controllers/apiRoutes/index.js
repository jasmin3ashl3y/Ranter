const userRoutes = require('./user-routes')
const commentRoutes = require('./comment-routes')
const postRoutes = require('./post-routes')
const likeRoutes = require('./like-routes')

const router = require('express').Router()

router.use('/user',userRoutes)
router.use('/comment', commentRoutes)
router.use('/post', postRoutes)
router.use('/like', likeRoutes)

module.exports = router