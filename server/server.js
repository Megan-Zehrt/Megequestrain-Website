const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/mongoose.config'); // Ensure database connection

const app = express();
const port = process.env.PORT || 5000;
const websiteRoutes = require('./routes/website.routes'); // Import routes

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api', websiteRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));
