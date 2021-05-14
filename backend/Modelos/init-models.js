
var _categoria_componente = require("./categoria_componente");
var _categoria_reparacion = require("./categoria_reparacion");
var _cliente = require("./cliente");
var _componente = require("./componente");
var _empleado = require("./empleado");
var _estado = require("./estado");
var _factura = require("./factura");
var _proveedor = require("./proveedor");
var _reparacion = require("./reparacion");
var _vehiculo = require("./vehiculo");

function initModels(sequelize) {
  /*
  var categoria_componente = _categoria_componente(sequelize);
  var categoria_reparacion = _categoria_reparacion(sequelize);
  */
  var cliente = new _cliente(sequelize);
  /*var componente = _componente(sequelize);*/
  var empleado = new _empleado(sequelize);
  /*var estado = _estado(sequelize);
  var factura = _factura(sequelize);
  var proveedor = _proveedor(sequelize);*/
  var reparacion = new _reparacion(sequelize);
  var vehiculo = new _vehiculo(sequelize);
  /*
  componente.belongsTo(categoria_componente, { as: "id_categoria_categoria_componente", foreignKey: "id_categoria"});
  categoria_componente.hasMany(componente, { as: "componentes", foreignKey: "id_categoria"});
  reparacion.belongsTo(categoria_reparacion, { as: "id_reparacion_categoria_reparacion", foreignKey: "id_reparacion"});
  categoria_reparacion.hasMany(reparacion, { as: "reparacions", foreignKey: "id_reparacion"});
  
  
  reparacion.belongsTo(empleado, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleado.hasMany(reparacion, { as: "reparacions", foreignKey: "id_empleado"});
  reparacion.belongsTo(estado, { as: "id_estado_estado", foreignKey: "id_estado"});
  estado.hasMany(reparacion, { as: "reparacions", foreignKey: "id_estado"});
  reparacion.belongsTo(factura, { as: "id_factura_factura", foreignKey: "id_factura"});
  factura.hasMany(reparacion, { as: "reparacions", foreignKey: "id_factura"});
  componente.belongsTo(proveedor, { as: "id_proveedor_proveedor", foreignKey: "id_proveedor"});
  proveedor.hasMany(componente, { as: "componentes", foreignKey: "id_proveedor"});
  componente.belongsTo(reparacion, { as: "id_reparacion_reparacion", foreignKey: "id_reparacion"});
  reparacion.hasMany(componente, { as: "componentes", foreignKey: "id_reparacion"});
  */
 console.log(_vehiculo)
  .belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(vehiculo, { as: "vehiculos", foreignKey: "id_cliente"});
  reparacion.belongsTo(vehiculo, { as: "id_vehiculo_vehiculo", foreignKey: "id_vehiculo"});


  vehiculo.hasMany(reparacion, { as: "reparacions", foreignKey: "id_vehiculo"});

  return {
    categoria_componente,
    categoria_reparacion,
    cliente,
    componente,
    empleado,
    estado,
    factura,
    proveedor,
    reparacion,
    vehiculo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
