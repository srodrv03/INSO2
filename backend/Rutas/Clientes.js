const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Cliente = require("../Modelos/cliente")
router.use(cors())

//loggin
router.post("/login", (req, res) => {
    Cliente().findOne({
        where: {
            Email: req.body.email
        }
    }).then(user => {
        if(bcrypt.compareSync(req.body.pass, user.password)) {
            res.json({ autorizacion: "correcto" })
        }
        else {
            res.json({ error: "Datos incorrectos" })
        }
    }).catch(err => {
        res.json({ error: err })
    })
})
module.exports = router