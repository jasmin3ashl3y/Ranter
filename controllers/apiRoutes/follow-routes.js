const router = require('express').Router()
const {Follow} = require('../../models')

router.post('/', (req, res) => {
    Follow.create({
        followedId: req.body.followedId,
        followerId: req.body.followerId
    })
    .then(dbUserData => {
        res.status(200).json(dbUserData)
    })
})

module.exports = router