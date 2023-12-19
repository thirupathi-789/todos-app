const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const TodoModel = require('./Models/Todo');

app.use(cors());
app.use(express.json());

const port = 3002;

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/save', async (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});