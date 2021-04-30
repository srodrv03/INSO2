const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Vehiculo = require("../Modelos/vehiculo")
router.use(cors())

router.get("/listado", (req,res)=>{
    Vehiculo().findAll({
    }).then(async (vehiculos) =>{
        if(vehiculos){
            res.json(vehiculos)
        }else{
            console.log("Error al consultar el listado de los vehiculos")
        }
    })
})
router.post("/delete", (req, res) => {
    console.log(req.body)
    Vehiculo().destroy({
        where: {
            matricula: req.body.matricula
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