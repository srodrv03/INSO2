const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Vehiculo = require("../Modelos/vehiculo")
const Cliente = require("../Modelos/Cliente")
router.use(cors())

router.get("/listado", (req, res) => {
    Vehiculo.findAll({
    }).then((vehiculos) => {
        if (vehiculos) {
            res.json(vehiculos)
        } else {
            console.log("Error al consultar el listado de los vehiculos")
        }
    }).catch(err => {
        console.log(err)
    })
})
router.post("/listadoUsuario", (req, res) => {
    Cliente.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user){
            console.log("errrrrror")
        }else{
            Vehiculo.findAll({
                where:{
                    clienteId:user.id
                }
            }).then((vehiculos) => {
                if (vehiculos) {
                    res.json(vehiculos)
                } else {
                    console.log("Error al consultar el listado de los vehiculos")
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
})
router.post("/delete", (req, res) => {

    Vehiculo.destroy({
        where: {
            matricula: req.body.matricula
        }
    }).then(respuesta => {
        if (respuesta == 1) {
            res.json({ correcto: "Vehiculo eliminado correctamente" })
        } else {
            res.json({ error: "No se ha podido eliminar el vehiculo" })
        }

    })
})

router.post("/add", (req, res) => {
    Cliente.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            res.json({ error: "No existe ningun usuario con ese email." })
        } else {
            Vehiculo.findOne({
                where: {
                    matricula: req.body.matricula
                }
            }).then(vehiculo => {
                if (!vehiculo) {
                    const userData = {
                        marca: req.body.marca,
                        modelo: req.body.modelo,
                        anio: req.body.anio,
                        matricula: req.body.matricula,
                        clienteId: user.id,
                    };
                    Vehiculo.create(userData)
                        .then(vehiculo => {
                            res.json({ correcto: "Vehiculo a??adido correctamente." })
                        }).catch(err => {
                            res.json({ error: "No se ha podido a??adir correctamente el vehiculo." })
                        })
                } else {
                    res.json({ error: "Ya existe un vehiculo con esa matricula." })
                }
            })
        }
    })
})
module.exports = router