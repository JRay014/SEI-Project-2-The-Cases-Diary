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
    Fruit.findById(req.params.id, (err, foundCase) => {
        res.render('edit.ejs', {
            certainCase: foundCase
        })

    })
});

casesController.put("/:id", (req, res, next) => {
    Case.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
        res.redirect('/:id')
    })
});

casesController.delete("/:id", (req, res, next) => {
    Case.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.redirect('/home')
        }
    })
});

module.exports = casesController;