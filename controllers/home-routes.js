const router = require('express').Router()

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/feed', (req, res) => {
    if (req.session.loggedIn) {
        res.render('feed')
    } else {
        res.redirect('/login')
    }

})

module.exports = router