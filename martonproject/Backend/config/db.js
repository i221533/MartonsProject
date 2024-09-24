const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000 // 5 seconds
  })
  .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
  