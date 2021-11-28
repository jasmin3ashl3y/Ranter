const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')

const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({helpers})

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: process.env.SECRET,
    cookie: {secure:true},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

const app = express()
const PORT = process.env.PORT 

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
})