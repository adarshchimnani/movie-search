const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
    const {title} = req.query;

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while fetching movie data'});
    }
});

app.listen (3001, () => {
    console.log('Server is running on port 3001');
});