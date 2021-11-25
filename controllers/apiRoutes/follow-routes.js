const router = require('express').Router()
const {Follow} = require('../../models')

router.post('/', async (req, res) => {
    const isFollowing = await Follow.findOne({
        where: {
            followed_id: req.body.followedId,
            follower_id: req.body.followerId
        }
    })
    if (isFollowing) {
        res.status(400).json({ message: 'following relationship already exists' }).end()
        return;
    }
    Follow.create({
        followed_id: req.body.followedId,
        follower_id: req.body.followerId
    })
    .then(dbUserData => {
        res.status(200).json(dbUserData)
    })
    .catch(err => res.status(500).json(err))
})

router.delete('/', (req, res) => {
    Follow.destroy({
        where: {
            followed_id: req.body.followedId,
            follower_id: req.body.followerId
        }
    })
    .then(dbFollowData => {
        res.status(200).json(dbFollowData)
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
    Follow.findAll({
        where: {
            followed_id: req.params.id
        }
    })
    .then(dbFollowData => res.status(200).json(dbFollowData))
    .catch(err => res.status(500).json(err))
})

module.exports = router