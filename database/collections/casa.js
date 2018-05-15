const mongoose = require("../connect");
var casaSchema = {
  departamento:String,
  nombre:String,
  zoom:Number,
  lat:Number,
  lng:Number,
  idVecindario:String,
};
var casa = mongoose.model("casa", casaSchema);
module.exports = casa;
