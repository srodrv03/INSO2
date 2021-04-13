const express = require("express")
const router = express.Router()
const cors = require("cors")
const db = require("../database/db")
const Empleado = require("../Modelos/empleado")
router.use(cors())

//loggin
router.post("/login", (req, res) => {
    Empleado().findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (req.body.pass == user.password) {
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