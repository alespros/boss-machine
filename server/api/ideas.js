const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./../db');
const checkMillionDollarIdea = require('./../checkMillionDollarIdea.js');

const ideasRouter = express.Router();

ideasRouter.get('/test', (req, res, next) => {
    const error = new Error('This is a test.');
    error.status = 400;
    return next(error);
});

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send("Idea not found.");
    }
});

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedUdea = updateInstanceInDatabase('ideas', req.body);

    if (updatedUdea !== null) {
        res.send(updatedUdea);
    } else {
        const error = new Error('Invalid input.');
        error.status = 400;
        return next(error);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const result = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (result) {
        res.sendStatus(204);
    } else {
        const error = new Error('Couldn\'t perform delete.');
        error.status = 500;
        return next(error);
    }
});

module.exports = ideasRouter;