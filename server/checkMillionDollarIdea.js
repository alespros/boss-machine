const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);

    if (!(numWeeks > 0 && weeklyRevenue > 0)) {
        res.status(400).send('The revenue per week and # of weeks need to be larger than 0.');
    } else if (numWeeks * weeklyRevenue < 1000000) {
        res.status(400).send('The idea has to be worth at least 1 million dollars.');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;