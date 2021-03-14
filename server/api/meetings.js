const express = require('express');
const { getAllFromDatabase, createMeeting, addToDatabase,
        deleteAllFromDatabase } = require('./../db');

const messagesRouter = express.Router();

messagesRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

messagesRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

messagesRouter.delete('/', (req, res, next) => {
    const result = deleteAllFromDatabase('meetings');
    res.status(204).send(result);
});

module.exports = messagesRouter;