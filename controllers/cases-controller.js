const express = require('express');
const router = express.Router();
const Case = require('../models/Cases-model');

router.get("/", (req, res, next) => {
    Case.find({}, (err, foundCases, next) => {
        if (err) { 
            console.log(err)
            next(err)
        } else {
            res.render('home.ejs', { cases: foundCases })
        }
    });
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.get('/:id', (req, res) => {
    Case.findById(req.params.id, (err, foundCase) => {
        res.render('show.ejs', { case: foundCase })
    });
});

router.post("/", (req, res, next) => {
    Case.create(req.body, (error, createdCase) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(createdCase)
            res.redirect('/:id/show')
        }
    })
});

router.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundCase) => {
        res.render('edit.ejs', {
            case: foundCase
        })

    })
});

router.put("/:id", (req, res, next) => {
    Case.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
        res.redirect('/:id/show')
    })
});

router.delete("/:id", (req, res, next) => {
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