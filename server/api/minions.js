const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./../db');

const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send("Minion not found.");
    }
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        if (work.minionId === req.params.minionId) {
            req.work = work;
            next();
        } else {
            res.status(400).send('Work ID doesn\'t match the minionId.');
        }
    } else {
        res.status(404).send("Work not found.");
    }
});

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);

    if (updatedMinion !== null) {
        res.send(updatedMinion);
    } else {
        const error = new Error('Invalid input.');
        error.status = 400;
        return next(error);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const result = deleteFromDatabasebyId('minions', req.params.minionId);
    if (result) {
        res.sendStatus(204);
    } else {
        const error = new Error('Couldn\'t perform delete.');
        error.status = 500;
        return next(error);
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(e => {
        return e.minionId === req.params.minionId;
    })
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const newWork = addToDatabase("work", workToAdd);
    res.status(201).send(newWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body);

    if (updatedWork !== null) {
        res.send(updatedWork);
    } else {
        const error = new Error('Invalid input.');
        error.status = 400;
        return next(error);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const result = deleteFromDatabasebyId('work', req.params.workId);
    if (result) {
        res.sendStatus(204);
    } else {
        const error = new Error('Couldn\'t perform delete.');
        error.status = 500;
        return next(error);
    }
});

module.exports = minionsRouter;