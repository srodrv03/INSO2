const express = require("express")
const router = express.Router()
const cors = require("cors")

const Pieza = require("../Modelos/componente")
const Proveedor = require("../Modelos/proveedor")

const Comp_rep = require("../Modelos/componente_reparacion")
router.use(cors())

router.get("/listado", (req, res) => {
    Proveedor.findAll({

    }).then((proveedores) => {
        res.json(proveedores)
    }).catch(err => {
        console.log(err)
    })
})

router.post("/listadopiezas", (req, res) => {
    Proveedor.findOne({
        where: {
            nombre: req.body.nombreProveedor
        }
    }).then((proveedor) => {
        Pieza.findAll({
            where: {
                idProveedor: proveedor.id
            }
        }).then((piezas) => {
            res.json(piezas)
        })
    }).catch(err => {
        console.log(err)
    })
})
router.post("/addpiezas", (req, res) => {
    console.log(req.body.listaPiezas)
    for (const pieza of req.body.listaPiezas) {
        Pieza.findOne({
            where: {
                nombre: pieza
            }
        }).then((elempieza) => {
            const userdata = {
                idComponente: elempieza.id,
                idReparacion: req.body.idReparacion
            }
            Comp_rep.create(userdata).then(elemento => {
                res.json({ correcto: "pieza añadida correctamente" })
            }).catch(err => {
                res.json({ error: err })
            })
        })
    }

})

module.exports = router