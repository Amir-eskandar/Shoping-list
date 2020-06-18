const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const path = require('path');

const app = express();


// Bodyparser Middleware
app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//Use routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  const port = process.env.PORT || 5000;
  app.listen(5000, () => {
    console.log(`Server is running on port: ${port}`);
  });
