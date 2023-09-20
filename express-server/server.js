const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
//app.use(cors());

// Your other route handlers and server setup

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
  app.use(cors(corsOptions));
  