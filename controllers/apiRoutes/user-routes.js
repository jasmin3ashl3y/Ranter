const router = require('express').Router()
const {User, Post, Comment, Like} = require('../../models')
const { userHandlers } = require('./handlers')



router.post('/', (req, res) => {
    userHandlers.createUser(req.body.username, req.body.email, req.body.password)
    .then(dbUserData => {
        req.session.user_id = dbUserData.id 
        req.session.username = dbUserData.username
        req.session.loggedIn = true 
        res.status(200).json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    
    User.findOne({
        where: {
            //email: req.body.email
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'Incorrect username or password'})
            return
        }

        // uncomment at launch
        // if(!dbUserData.checkPassword(req.body.password)) {
        //     res.status(400).json({message: 'Incorrect username or password'})
        //     return
        // }

        req.session.save(() => {
            console.log(dbUserData.id)
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username
            req.session.loggedIn = true

            res.json({ user: dbUserData, message: 'Successful login'})
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

router.get('/', (req, res) => {
    userHandlers.getAllUsers()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    userHandlers.getUser(req.params.id)
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'no user found'})
        }
        res.status(200).json(dbUserData)
    })
    .catch(err => res.status(500).json(err))
})

router.get('/find/:term', (req, res) => {
    userHandlers.getUsers(req.params.term)
    .then(dbUserData => {
        console.log(dbUserData.length)
        if (dbUserData.length) {
            res.status(200).json(dbUserData)
        } else {
            res.status(404).json({message: 'no users found matching that query'})
        }
    })
    .catch(err => res.status(500).json(err))
})

router.put('/update-bio', (req, res) => {
    console.log(req.body.newBio)
    console.log(req.session.user_id)
    User.update(
        {
            bio: req.body.newBio
        },
        {
            where: {
                id: req.session.user_id
            }
        }
    )
    .then(dbUserData => {
        console.log(dbUserData)
    })
    .catch(err => {
        res.status(400).json({err})
        console.log(err)
    })
})

module.exports = router 