const express = require('express')
const app = express()

const db = require('./db')

require('dotenv').config();

const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json()); // req.body

const Book = require('./models/book');
const Person = require('./models/person');
const Menu = require('./models/menu');

// middleware functions
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
};

app.use(logRequest);

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  // authentication logic here
  try{
    const user = await Person.findOne({username: USERNAME});

    if(!user){
      return done(null, false, {message: 'Incorrect username'});
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null, user);
    }else{
      return done(null, false, {message: 'Incorrect password'});
    }

  }catch(err){
    return done(err);
  }
}));

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', localAuthMiddleware, (req, res) => {
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

// app.get('/person/:workType', async(req, res) => {
//   try{
//     const workType = req.params.workType;
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

//       const response = await Person.find({work: workType});
//       console.log('data fatched');
//       res.status(200).json(response);
//     }else{
//       res.status(404).json({error: 'Invalid work type'});
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal server error'});
//   }
// })



const personRoutes = require('./routes/personRoutes');

const bookRoutes = require('./routes/bookRoutes');


app.use('/person', personRoutes);

app.use('/book', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listen on port 3000');
})

