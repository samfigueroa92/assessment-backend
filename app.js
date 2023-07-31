const express = require('express');
const data = require('./data/data.json');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ data: 'Service is running!'});
});

app.get('/items', (req, res) => {
    try {
        res.status(200).json({ data: data });
    } catch (err){
        res.status(500).json({ error: err.message })
    };
});

app.get('/items/:id', (req, res) => {
    try {
        const { id } = req.params;
        const item = data.find((item) => item.id === id);

        if(item){
            res.status(200).json({ data: item })
        }else{
            res.status(404).json({ error: `Item - ${id} - not found!` })
        }

    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = app;