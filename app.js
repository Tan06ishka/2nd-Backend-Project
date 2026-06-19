require('dotenv').config();
 
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
 
 
 
const express = require('express');
const app = express();
 
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
 
app.use(express.json());
 
// Connect MongoDB
connectDB();
 
app.use('/user', userRoutes);
 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});