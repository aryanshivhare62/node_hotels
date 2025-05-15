const express = require('express')
const app = express()

const db = require('./db')

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const Book = require('./models/book');
const Person = require('./models/person');
const Menu = require('./models/menu');

app.get('/', (req, res) => {
  res.send('Hello World')
})



// GET method to get the menu
app.get('/menu', async(req, res) => {
  try{
    const data = await Menu.find();
    console.log('data fetched');
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})



app.post('/menu', async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new Menu(data);

    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
  
})

app.get('/person/:workType', async(req, res) => {
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

      const response = await Person.find({work: workType});
      console.log('data fatched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

const personRoutes = require('./routes/personRoutes');

const bookRoutes = require('./routes/bookRoutes');


app.use('/person', personRoutes);

app.use('/book', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listen on port 3000');
})

