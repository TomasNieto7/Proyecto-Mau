const express = require('express')
const jwt = require('jsonwebtoken')
const user = express.Router()
const db = require('../database.js')

user.get('/', (req, res, next) => {
    return res.status(200).json({
        code: 1,
        message: 'Bienvenido a Users'
    })
})

user.post('/register', async (req, res, next) => {
    const {
        name,
        last_name,
        email,
        phone_number,
        password
    } = req.body
    console.log(name, last_name, email, phone_number, password);
    const query = `INSERT INTO USERS(name, last_name, mail, phone_number, password) VALUES('${name}', '${last_name}', '${email}', '${phone_number}', '${password}')`
    try {
        if (name && last_name && email && phone_number && password) {
            const user = await db.query(query)
            console.log(user);
            user ? res.status(201).json({
                code: 201,
                message: "User registered!!"
            }) : res.status(200).json({
                code: 200,
                message: "Something went wrong"
            })
        } else res.status(200).json({
            code: 200,
            message: "data missing"
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            code: 404,
            message: error
        })
    }
})

user.patch("/edit/mail", async (req, res, next) => {
    const {
        id,
        mail
    } = req.body
    const query = `UPDATE USERS SET MAIL='${mail}' WHERE ID = '${id}'`
    if (id && query) {
        try {
            const user = await db.query(query)
            user ? res.status(201).json({
                code: 201,
                message: 'user mail edited'
            }) : res.status(404).json({
                code: 404,
                message: "Something went wrong"
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

user.put('/edit', async (req, res, next) => {
    const {
        id,
        name,
        last_name,
        mail,
        phone_number,
        password
    } = req.body
    const query = `UPDATE USERS SET NAME = '${name}', LAST_NAME = '${last_name}', MAIL = '${mail}', PHONE_NUMBER = '${phone_number}', PASSWORD = '${password}' WHERE ID = '${id}'`
    if (id && name && last_name && mail && phone_number && password) {
        try {
            const user = await db.query(query)
            console.log(user);
            user ? res.status(201).json({
                code: 201,
                message: "User edited!!"
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

user.delete('/delete', async (req, res, next) => {
    const query = `DELETE FROM USERS WHERE ID = '${req.body.id}'`
    if (req.body.id) {
        try {
            const user = await db.query(query)
            res.status(201).json({
                code: 201,
                message: 'user deleted'
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

user.post('/login', async (req, res, next) => {
    const {
        email,
        password
    } = req.body
    const query = `SELECT * FROM USERS WHERE MAIL = '${email}' AND PASSWORD = '${password}'`
    if (email && password) {
        try {
            const user = await db.query(query)
            if (user.length === 1) {
                const token = jwt.sign({
                    userID: user[0].id,
                    userMail: user[0].mail
                }, "debugKey")
                res.status(200).json({
                    code: 200,
                    message: token
                })
            } else {
                res.status(401).json({
                    code: 401,
                    message: "Mail or Password incorrect"
                })
            }     
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

module.exports = user