const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Reparacion = require("../Modelos/reparacion")
const Cliente = require("../Modelos/cliente")
const Vehiculo = require("../Modelos/vehiculo")
const Componente = require("../Modelos/componente")
const Comp_rep = require("../Modelos/componente_reparacion")
const { Op } = require("sequelize");
router.use(cors())

router.post("/crea", (req,res) =>{
    const userdata={
        descripcion:req.body.descripcion,
        idVehiculo:req.body.id,
        estado:"PENDIENTE"
    }
    Reparacion.create(userdata)
    .then(reparacion => {
        res.json({ correcto: "Reparacion solicitada correctamente." })
    }).catch(err => {
        res.json({ error: "No se ha podido añadir correctamente la reparacion." })
    })
})
router.post("/listado", (req,res) =>{
    const userdata={
        email:req.body.email,
    }
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
            }).then(async (vehiculos) => {
                if (vehiculos) {
                    var idVehiculos=[]
                    for (var i of Object.keys(vehiculos)) {
                        idVehiculos.push(vehiculos[i].dataValues.id)
                    }
                    await Reparacion.findAll({
                        where: {
                            idVehiculo:{ [Op.in]: idVehiculos}
                        }
                    }).then((reparaciones) =>{
                        res.json(reparaciones)
                    })

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

router.get("/listadototal", (req,res) =>{
    Reparacion.findAll({
    
    }).then((reparaciones) =>{
        res.json(reparaciones)
    }).catch(err => {
        console.log(err)
    })
})
router.post("/listadopiezas",(req,res) =>{
    Comp_rep.findAll({
        where:{
            idReparacion:req.body.idRep
        }
    
    }).then( async (piezas) =>{
        
        if (piezas) {
            var idpiezas=[]
            for (var i of Object.keys(piezas)) {
                idpiezas.push(piezas[i].dataValues.idComponente)
            }
            await Componente.findAll({
                where: {
                    id:{ [Op.in]: idpiezas}
                }
            }).then((listado) =>{
                res.json(listado)
            })

        } else {
            console.log("Error al consultar el listado de los vehiculos")
        }
    }).catch(err => {
        console.log(err)
    })
})
router.post("/iniciareparacion", (req,res) =>{

    Reparacion.findOne({
        where:{
            id:req.body.idReparacion
        }
    })
    .then(reparacion => {
        reparacion.update({
            idEmpleado:req.body.idEmpleado,
            estado:"REPARANDO"
        }).then(user => {
            res.json({resp:"correcto"})
        })
    }).catch(err => {
        res.json({ error: "No se ha podido modificar correctamente el estado" })
    })
})

module.exports = router