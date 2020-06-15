const express = require('express');
const mongoose =require('mongoose');
const items = require('./client/routes/api/Items');
const path = require('path')

const app = express();

// Middleware
app.use(express.json());

//DB config
db=require('./config/key').mongoURI;

//connect to mongoose
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(()=>console.log("connected to monggose DB"))
    .catch(err => console.log(err));

//use routes 
app.use('/api/items', items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`running on ${port}`));