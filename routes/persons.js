require('../customModules/DB');
const express = require('express');
const router = express.Router();
const personModel = require('../customModules/person');


// GET All persons 

router.get('/get/', (req,res, next) => {
    personModel.find({}, (err,docs) => {
    err? console.log(err) : res.send(docs);
    })
});


router.post('/post/', (req,res) => {
    console.log('post req')
    var person = new personModel(req.body);
    person.save().then(() => console.log('person Saved!'));
})


// GET by id 

// router.get('/:id', (req,res,next) => {
// personModel.findOne({id:req.params.id}, (err,doc) =>{
// err? console.log(err) : res.send(doc)
// })
// })


// router.delete('/', (req,res) => {
//     personModel.findOneAndDelete({id: req.body.id}, (err) => {
//         err? console.log(err) : console.log(`person ${req.body.id} deleted!`)
//     })
// })



module.exports = router;


