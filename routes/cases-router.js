const express = require('express');
const caseRouter = express.Router();

const casesController = require('../controllers/cases-controller');

caseRouter.get('/', casesController.index);
caseRouter.post('/', casesController.create);

