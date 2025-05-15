const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // adjust path as needed


router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
  
})

// GET method to get the person
router.get('/', async(req, res) => {
  try{
    const data = await Person.find();
    console.log('data fetched');
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.put('/:id', async(req, res) => {
  try{
    const personId = req.params.id;
    const updatedPersonData =req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    })

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('Data updated');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.delete('/:id', async(req, res) => {
  try{
    const personId = req.params.id;
  const updatedPersonData = req.body;

  const response = await Person.findByIdAndDelete(personId);

  if(!response){
    return res.status(404).json({error: 'Person not found'});
  }

  console.log('Data Deleted');
  res.status(200).json(response);
  }catch{
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }

})

// command added for testing purpose

module.exports = router;