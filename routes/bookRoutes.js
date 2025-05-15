const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // adjust path as needed


router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newBook = new Book(data);

    const response = await newBook.save();
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
    const data = await Book.find();
    console.log('data fetched');
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

module.exports = router;