const express = require('express');
const minionsRouter = require('./api/minions.js');
const ideasRouter = require('./api/ideas.js');
const meetingsRouter = require('./api/meetings.js');

const apiRouter = express.Router();
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

// Error handling middleware
apiRouter.use((err, req, res, next) => {
    console.log("Triggered the custom error handler in api.js.");
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = apiRouter;