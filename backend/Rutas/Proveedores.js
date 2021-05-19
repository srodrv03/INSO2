const express = require("express")
const router = express.Router()
const cors = require("cors")


const Proveedor = require("../Modelos/proveedor")

router.use(cors())

router.get("/listado", (req,res) =>{
    Proveedor.findAll({
    
    }).then((reparaciones) =>{
        res.json(reparaciones)
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router