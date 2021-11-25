const router = require('express').Router()
const {Follow} = require('../../models')

router.post('/', async (req, res) => {
    const isFollowing = await Follow.findOne({
        where: {
            followedId: req.body.followedId,
            followerId: req.body.followerId
        }
    })
    if (isFollowing) {
        res.status(400).json({ message: 'following relationship already exists' }).end()
    }
    Follow.create({
        followedId: req.body.followedId,
        followerId: req.body.followerId
    })
    .then(dbUserData => {
        res.status(200).json(dbUserData)
    })
    .catch(err => res.status(500).json(err))
})

router.delete('/', (req, res) => {
    Follow.destroy({
        where: {
            followedId: req.body.followedId,
            followerId: req.body.followerId
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
            followedId: req.params.id
        }
    })
    .then(dbFollowData => res.status(200).json(dbFollowData))
    .catch(err => res.status(500).json(err))
})

module.exports = router