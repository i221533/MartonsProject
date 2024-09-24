// backend/server.js
const express = require('express');

const  dotenv= require('dotenv');
const mongoose=require('./config/db.js');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/routes.js');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use(express.json());




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
