const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = 3000 || process.env.PORT

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.use((req, res, next) => {
    const log = `${new Date().toString()}, "${req.method}", "${req.url}" \n`
    console.log(log)
    
    fs.appendFileSync('server.log', log, (err) => {
        if (err) {
            console.log(err)
        }
    })
    next()
})
// app.use((req, res, next) => {
//     res.render('maint.hbs')
// })
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs',{
        user: "somebody",
        pageTitle: 'Home',
        currentYear: new Date().getFullYear()
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
        currentYear: new Date().getFullYear()
    })
})
app.get('/projects',(req,res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        currentYear: new Date().getFullYear()
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to process request'
    })
})

app.listen(port, () => {
    console.log(`running`)
})