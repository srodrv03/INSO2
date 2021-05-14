const express = require("express")
const router = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("../database/db")
const Reparacion = require("../Modelos/reparacion")
router.use(cors())

router.post("/crea", (req,res) =>{
    const userdata={
        descripcion:req.body.descripcion,
        idVehiculo:req.body.id
    }
    Reparacion.create(userdata)
    .then(reparacion => {
        res.json({ correcto: "Reparacion solicitada correctamente." })
    }).catch(err => {
        res.json({ error: "No se ha podido añadir correctamente la reparacion." })
    })
})

module.exports = router