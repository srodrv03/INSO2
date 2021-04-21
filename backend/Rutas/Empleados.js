const express = require("express")
const router = express.Router()
const cors = require("cors")
const db = require("../database/db")
const Empleado = require("../Modelos/empleado")
const Admin = require("../Modelos/admin")
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
//Login del addmin
router.post("/loginAdmin", (req, res) => {
    Admin().findOne({
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
        console.log(err)
        res.json({ error: err })
    })
})
//REGISTRO
router.post('/registro', (req, res) => {
    const userData = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.pass
    }

    Empleado().findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            User.create(userData).then(user => {
                res.json({ correcto: "Usuario añadido correctamente" })
            }).catch(err => {
                res.json({ error: err })
            })
        } else {
            res.json({ error: "El usuario ya estaba añadido" })
        }
    })
})
router.get('/listado', (req, res) => {

    Empleado().findAll({

    }).then(async (empleados) => {
        if (empleados) {
            res.json(empleados)
        } else {
            console.log("error")
        }
    })
})


router.post('/delete', (req, res) => {
    const userData = {
        email: req.body.email,
    }

    Empleado().destroy({
        where: {
            email: req.body.email
        }
    }).then(respuesta => {
        if(respuesta==1){
            res.json({ correcto: "Empleado eliminado correctamente" })
        }else{
            res.json({ error: "No se ha podido eliminar al empleado" })
        }

    })
})

module.exports = router