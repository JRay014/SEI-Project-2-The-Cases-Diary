const express = require('express');
const casesController = express.Router();
const Case = require('../models/Cases-model');

casesController.get("/", (req, res, next) => {
    Case.find( {}, (err, foundCases, next) => {
        if (err) { 
            console.log(err)
            next(err)
        } else {
            res.render('cases-views/home.ejs', 
            { cases: foundCases })
        }
    });
});

casesController.get('/new', (req, res) => {
    res.render('cases-views/new.ejs');
});

casesController.get('/:id', (req, res) => {
    Case.findById(req.params.id, (err, foundCase) => {
        if (err) {
            console.log(err)
        } else {
        res.render('cases-views/show.ejs', { certainCase: foundCase })
        }
    });
});

casesController.post("/", (req, res, next) => {
    Case.create(req.body, (error, createdCase) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(createdCase)
            res.redirect(`/${createdCase.id}`)
        }
    })
});

casesController.get('/:id/edit', (req, res) => {
    Case.findById(req.params.id, (err, foundCase) => {
        res.render('cases-views/edit.ejs', {
            certainCase: foundCase,
        })
    })
});

casesController.put("/:id", (req, res, next) => {
    console.log(req.body);
    console.log(req.params.id);
    Case.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCase) => {
        if (err) {
            console.log(err);
            next(err);
        } else{
            res.redirect(`/${updatedCase.id}`)
        }
    })
});

casesController.delete("/:id", (req, res, next) => {
    Case.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
});

module.exports = casesController;