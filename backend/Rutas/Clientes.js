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
            email: req.body.email
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

//REGISTRO
router.post('/registro', (req,res) => {
    const userData = {
        nombre : req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.pass
    }

    Cliente().findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            User.create(userData).then(user => {
                res.json({ correcto: "Usuario añadido correctamente"})
            }).catch(err => {
                res.json( {error:  err})
            })
        }else{
            res.json({ error: "El usuario ya estaba añadido"})
        }
    })


})
module.exports = router