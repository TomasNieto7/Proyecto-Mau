const express = require('express')
const jwt = require('jsonwebtoken')
const papelera = express.Router()
const db = require('../database.js')

papelera.post('/', async (req, res, next) => {
    const {
        owner
    } = req.body
    const query = `SELECT * FROM PAPELERA WHERE OWNER = '${owner}'`
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

papelera.post('/getNote', async (req, res, next) => {
    const {
        id
    } = req.body
    const query = `SELECT * FROM PAPELERA WHERE ID = '${id}'`
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

papelera.post('/newNote', async (req, res, next) => {
    const {
        owner,
        title,
        description,
        type
    } = req.body
    const query = `INSERT INTO PAPELERA(owner, titulo, description, type) VALUES('${owner}', '${title}', '${description}', '${type}')`
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

papelera.put('/edit', async (req, res, next) => {
    const {
        id,
        owner,
        title,
        description,
        type
    } = req.body
    const query = `UPDATE NOTES SET OWNER = '${owner}', TITULO = '${title}', DESCRIPTION = '${description}', TYPE = '${type}' WHERE ID = '${id}'`
    if (id && owner && title && description && type) {
        try {
            const note = await db.query(query)
            console.log(note);
            note ? res.status(201).json({
                code: 201,
                message: note
            }) : res.status(404).json({
                code: 404,
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

papelera.delete('/delete', async (req, res, next) => {
    const query = `DELETE FROM PAPELERA WHERE ID = '${req.body.id}'`
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



papelera.post('/restoreNote/:id', async (req, res) => {
    const noteId = req.params.id;

    const query = `SELECT * FROM PAPELERA WHERE id = '${req.body.id}'`;
    if(req.body.id){
        try{
            const note = await db.query(query)
            res.status(201).json({
                code: 201,
                message: 'note obtained successfully'
            })
        }catch(error){
            console.log(error);
            return res.status(404).json({
                code: 404,
                message: "something went wrong"
            })
        }
    } else res.status(404).json({
        code: 404,
        message: "data missing"
    })











    app.post('/moveNoteToNotes/:id', async (req, res) => {
        const noteId = req.params.id;

        // Obtén la nota de la papelera
        const getNoteQuery = 'SELECT * FROM PAPELERA WHERE id = ?';
        trashDb.query(getNoteQuery, [noteId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    message: 'Error fetching note from PAPELERA'
                });
            }
            
            if (results.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: 'Note not found in PAPELERA'
                });
            }
    

        const note = results[0];

        const insertNote = 'INSERT INTO NOTAS (owner, titulo, description, type) VALUES (?, ?, ?, ?)';
        notes.query(insertNote, [note.owner, note.titulo, note.description, note.type], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    message: 'Error inserting note into NOTAS'
                });
            }

            const deleteNote = 'DELETE FROM PAPELERA WHERE id = ?';
            papelera.query(deleteNote, [noteId], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        code: 500,
                        message: 'Error deleting note from PAPELERA'
                    });
                }

                res.status(200).json({
                    code: 200,
                    message: 'Note moved to NOTAS successfully'
                });
            });
        });
    });
    });
});



module.exports = papelera