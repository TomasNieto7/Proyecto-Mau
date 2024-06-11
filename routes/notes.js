const express = require('express')
const jwt = require('jsonwebtoken')
const notes = express.Router()
const db = require('../database.js')

notes.post('/', async (req, res, next) => {
    const {
        owner
    } = req.body
    const query = `SELECT * FROM NOTES WHERE OWNER = '${owner}'`
    if (owner) {
        try {
            const notes = await db.query(query)
            res.status(200).json({
                code: 200,
                message: notes
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                code: 404,
                message: error
            })
        }
    } else res.status(200).json({
        code: 200,
        message: "data missing"
    })
})

notes.post('/getNote', async (req, res, next) => {
    const {
        id
    } = req.body
    const query = `SELECT * FROM NOTES WHERE ID = '${id}'`
    if (id) {
        try {
            const note = await db.query(query)
            res.status(200).json({
                code: 200,
                message: note
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                code: 404,
                message: error
            })
        }
    } else res.status(200).json({
        code: 200,
        message: "data missing"
    })
})

notes.post('/newNote', async (req, res, next) => {
    const {
        owner,
        title,
        description,
        type
    } = req.body
    const query = `INSERT INTO NOTES(owner, titulo, description, type) VALUES('${owner}', '${title}', '${description}', '${type}')`
    if (owner && title && description && type) {
        try {
            const note = await db.query(query)
            res.status(201).json({
                code: 201,
                message: "note registered!!"
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                code: 404,
                message: error
            })
        }
    } else res.status(200).json({
        code: 200,
        message: "data missing"
    })


})

notes.put('/edit', async (req, res, next) => {
    const {
        id,
        title,
        description,
        type
    } = req.body
    console.log(id), title, description, type;
    const query = `UPDATE NOTES SET TITULO = '${title}', DESCRIPTION = '${description}', TYPE = '${type}' WHERE ID = '${id}'`
    if (id && title && description && type) {
        try {
            const note = await db.query(query)
            console.log(note);
            note ? res.status(201).json({
                code: 201,
                message: note
            }) : res.status(401).json({
                code: 401,
                message: "Something went wrong"
            })

        } catch (error) {
            console.log(error);
            return res.status(404).json({
                code: 404,
                message: error
            })
        }
    } else res.status(404).json({
        code: 404,
        message: "data missing"
    })

})

notes.delete('/delete', async (req, res, next) => {
    const query = `DELETE FROM NOTES WHERE ID = '${req.body.id}'`
    if (req.body.id) {
        try {
            const note = await db.query(query)
            res.status(201).json({
                code: 201,
                message: 'note deleted'
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({
                code: 404,
                message: "Something went wrong"
            })
        }
    } else res.status(404).json({
        code: 404,
        message: "data missing"
    })
})

module.exports = notes