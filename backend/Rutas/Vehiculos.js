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
module.exports = router