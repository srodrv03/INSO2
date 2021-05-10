const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Cliente = require("../Modelos/cliente")
router.use(cors())

//loggin
router.post("/login", (req, res) => {
    Cliente.findOne({
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

    Cliente.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            Cliente.create(userData).then(user => {
                res.json({ correcto: "Usuario añadido correctamente"})
            }).catch(err => {
                res.json( {error:  err})
            })
        }else{
            res.json({ error: "El usuario ya estaba añadido"})
        }
    })
})
router.get("/listado", (req,res)=> {
    Cliente.findAll({

    }).then(async (clientes) =>{
        if(clientes){
            res.json(clientes)
        }else{
            console.log("Error al consultar el listado de los clientes")
        }
    })
})

router.post('/delete', (req, res) => {
    const userData = {
        email: req.body.email,
    }

    Cliente.destroy({
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