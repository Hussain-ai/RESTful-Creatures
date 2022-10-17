// npm i: ejs, express, express-ejs-layouts, method-override
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override');
const app = express()

//MiddleWare
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use('/dinosaurs', require('./controllers/dinosaurs'))
//Deliverable: prehistoric_creatures Controller path VVV
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.get('/', (req,res) => {
    res.redirect('/dinosaurs')
})

app.listen(3500, () => {
    console.log('App listening on port 3500!')
})

//--------Deliverable---VVV
app.get('/', (req,res) => {
    res.redirect('/prehistoric_creatures')
})
