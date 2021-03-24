// const db = require('../db/config');

const mongoose = require('mongoose');
const {Schema, model} = mongoose;
// const { normalizeUnits } = require('moment');



const casesSchema = new Schema({
    title: {type: String, required: true},
    date: { type: Date, required: true },
    keywords: { type: String, required: true },
    description: { type: String, required: true },
    decision: { type: String, required: true },
});

const Case = model('Case', casesSchema);

module.exports = Case;