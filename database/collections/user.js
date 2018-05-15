const mongoose = require("../connect");
var userSchema = {
  Name : String,
  Codigo : Number,
  Idvendedor : Number,
  Id : Number,
  Idciudad : String,
  Region : String,
  Zona : String,
  Precio : Number,
  Descripcion : String,
  Servicios : String,
  telefono : Number
  //Name : String,
  //Lastname : String
};
var user = mongoose.model("user", userSchema);
module.exports = user;
