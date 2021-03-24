const Case = require('../models/Cases-model');

const casesController = {};

casesController.index = (req, res, next) => {
    Case.getAll()
        .then((cases) => {
            res.render('cases/cases', {

            });
        })
        .catch(next);
};

casesController.show = (req, res, next) => {
    Case.getById(req.params.id)
        .then((cases) => {
            res.local.cases = cases;
            next();
        })
        .catch(next);
};

casesController.create = (req, res, next) => {
    new Case ({
        title: req.body.title,
        date: req.body.date,
        keywords: req.body.keywords,
        description: req.body.description,
        decision: req.body.decision,
    })
    .save()
    .then(() => {
        res.redirect('/cases')
    })
    .catch(next);
};

casesController.update = (req, res, next) => {
    Case.getById(req.params.id)
        .then((cases) => {
            return cases.update(req.body);
        })
        .then((updatedCase) => {
            res.redirect(`/cases/${updatedCase.id}`);
        })
        .catch(next);
};

casesController.delete = (req, res, next) => {
    Case.getById(req.params.id)
        .then((cases) => {
            return cases.delete();
        })
        .then(() => {
            res.redirect('/cases');
        })
        .catch(next);
};

module.exports = casesController;