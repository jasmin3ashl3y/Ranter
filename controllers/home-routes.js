const router = require('express').Router()

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/feed', (req, res) => {
    res.render('feed')
})

module.exports = router