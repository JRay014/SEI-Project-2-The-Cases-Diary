const express = require('express');
const caseRouter = express.Router();

const casesController = require('../controllers/cases-controller');

caseRouter.get('/', casesController.index);
caseRouter.post('/', casesController.create);
caseRouter.get('/new', (req, res) => {
    res.render('cases/new');
});

caseRouter.get('/cases', casesController.index)

caseRouter.get('/:id([0-9]+)', casesController.show, (req, res) => {
    res.render('cases/show', {
        certainCase: res.locals.certainCase,
    })
});

caseRouter.get('/:id([0-9]+)/edit', casesController.show, (req, res) => {
    res.render('cases/edit', {
        certainCase: res.locals.certainCase,
    })
});

caseRouter.put('/:id([0-9]+)', casesController.update);
caseRouter.delete('/:id([0-9]+)', casesController.delete);

module.exports = caseRouter;