const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors'); 
const { notFound, errorHandler } = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware')

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);       // User registration and login routes
app.use('/api/users', userRoutes);      // Friend request routes
app.use('/api/posts', postRoutes);      // Post creation and comment routes     // Feed routes

app.use(notFound);                    
app.use(errorHandler);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
