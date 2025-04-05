require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const app=express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.Mongo_uri,{
  
}).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.use('/api/auth', authRoutes);
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res)=>{
    res.send('API is running...');
});


const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log('Server started on port ${PORT}'));