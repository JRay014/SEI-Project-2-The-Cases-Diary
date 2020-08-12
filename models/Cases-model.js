const db = require('../db/config');
const { normalizeUnits } = require('moment');
const casesController = require('../controllers/cases-controller');

class Case {
    constructor(newCase) {
        this.id = newCase.id || null;
        this.title = newCase.title;
        this.date = newCase.date;
        this.keywords = newCase.keywords;
        this.description = newCase.description;
        this.decision = newCase.decision;
    }

    static getAll() {
        return db
            .manyOrNone('SELECT * FROM cases ORDER BY id ASC')
            .then((cases) => {
                return cases.map((certainCase) => {
                    return new this(certainCase);
                });
            });
    }

    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM cases WHERE id = $1', id)
        .then((certainCase) => {
            if (certainCase) return new this(certainCase);
            throw new Error('Case not found!')
        });
    }

    save() {
        return db
            .one(
                `INSERT INTO cases (title, date, keywords, description, decision)
                VALUES ($/title/, $/date/, $/keyword/, $/description/, $/decision/)
                RETURNING *`,
                this
            )
            .then((certainCase) => {
                return Object.assign(this, certainCase);
            });
    }

    update(changes) {
        Object.assign(this, changes);
        return db
            .oneOrNone(
                `UPDATE cases SET
                    title = $/title/,
                    date = $/date/,
                    keywords = $/keywords/,
                    description = $/description/,
                    decision = $/decision/
                WHERE id = $/id/
                RETURNING *`,
                this
            )
            .then((certainCase) => {
                return Object.assign(this, certainCase);
            });
    }

    delete() {
        return db.oneOrNone(
            `DELETE FROM cases WHERE id = $1`, this.id
        );
    }
}

module.exports = Case;