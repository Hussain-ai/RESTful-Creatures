const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req,res) => {
    // let creature = fs.readFileSync("./prehistoric_creatures.json")
    // let dinoData = JSON.parse(prehistoric_creatures);
    let creatureData = require('../prehistoric_creatures.json');
    // console.log(creatureData)
    res.render('prehistoric_creatures/index.ejs', {myCreature: creatureData})
})


router.get('/new', (req,res) => {
    res.render('prehistoric_creatures/new')
})

router.get('/:idx', (req,res) => {
    // let creature = fs.readFileSync('./dinosaurs.json')
    // let creatureData = JSON.parse(dinosaurs);
    let creatureData = require('../prehistoric_creatures.json');
    console.log('This is the req.params object! ', req.params)
    let creatureIndex = parseInt(req.params.idx)
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]})
})

router.post('/', (req, res)=> {
    console.log('This is the Request Body: ', req.body)
    
    // let  creature= fs.readFileSync('./prehistoric_creatures.json')
    // let creatureData = JSON.parse(prehistoric_creatures)
    let creatureData = require('../prehistoric_creatures.json');

//     let newDino = {
//     name: req.body.myDinosaurName,
//     type: req.body.DinosaurTypeInput
// }
    creatureData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))

    res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req,res)=>{
console.log('this is my req params object', req.params)
res.redirect('/prehistoric_creatures')

// let creature = fs.readFileSync('./prehistoric_creatures.json');
//   let creatureData = JSON.parse(prehistoric_creatures);

let creatureData = require('../prehistoric_creatures.json');

  // remove the deleted creature from the creature array
  creatureData.splice(req.params.idx, 1)

  // save the new prehistoric_creatures to the data.json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData));

  //redirect to the GET /prehistoric_creatures route (index)
  res.redirect('/prehistoric_creatures');
})

router.get('/edit/:idx', (req, res) => {
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    let creatureData = require('../prehistoric_creatures.json');
    //Display edit page
    res.render('prehistoric_creatures/edit', {creature: creatureData[req.params.idx], creatureId: req.params.idx});
  });

  //its router.put to match the method in edit.ejs
  router.put('/:idx', (req, res) => {

    // let prehistoric_creatures = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    let creatureData = require('../prehistoric_creatures.json');
  
    //re-assign the name and type fields of the dinosaur to be editted
    creatureData[req.params.idx].name = req.body.name;
    creatureData[req.params.idx].type = req.body.type;
  
     // save the editted dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
    //redirct to home page
    res.redirect('/prehistoric_creatures');
  });




module.exports = router;