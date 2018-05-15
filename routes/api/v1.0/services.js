var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
var User = require("../../../database/collections/user");
var Img = require("../../../database/collections/img");
var Vecindario = require("../../../database/collections/vecindario");
var Casa = require("../../../database/collections/casa");

var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");;



//CRUD Create, Read, Update, Delete
//Creation of users
router.post("/userimg", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:5000" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( () => {
        //content-type
        res.status(200).json(
          req.file
        );
      });
    }
  });
});
router.post("/user", (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    name : req.body.name,
    codigo : req.body.codigo,
    Idvendedor : req.body.Idvendedor,
    Id : req.body.Id,
    Idciudad : req.body.Idciudad,
    email : req.body.email,
    Region : req.bod.Region,
    Zona : req.body.Zona,
    Precio : req.body.Precio,
    Descripcion : req.body.Descripcion,
    Servicios : req.body.Servicios,
    Telefono : req.body.telefono
  };
  var userData = new User(user);

  userData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "Registro con exito "
    });
  });
});

// READ all users
router.get("/user", (req, res, next) => {
  User.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
// Read only one user
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});

router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});
router.patch(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for (var i = 0; i < keys.length; i++) {
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(user);
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
router.put(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'codigo', 'Idvendedor', 'Id', 'Idciudad', 'email', 'Region', 'Zona', 'Precio', 'Descripcion', 'Servicios', 'telefono'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch"
    });
    return;
  }
  var user = {
    name : req.body.name,
    codigo : req.body.codigo,
    Idvendedor : req.body.Idvendedor,
    Id : req.body.Id,
    Idciudad : req.body.Idciudad,
    email : req.body.email,
    Region : req.bod.Region,
    Zona : req.body.Zona,
    Precio : req.body.Precio,
    Descripcion : req.body.Descripcion,
    Servicios : req.body.Servicios,
    Telefono : req.body.telefono
  };

  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});



/* GET home page. */



router.post("/propiedad", (req, res) => {
console.log("mensaje");
    res.status(200).json({
      "msn" : "Registro con exito "
    });
    return
});
//-----------------------------------------------------------

router.post('/imc', function(req, res, next) {
	var imc = Number(req.body.masa) / Math.pow(Number(req.body.altura), 2)
	if (imc < 16) {
		res.send(
		{
			"msn" : "Delgadez severa"
		});
	}else if (imc > 16 && imc < 16.99) {
		res.send(
		{
			"msn" : "Delgadez moderada"
		});
	}else if (imc > 17 && imc < 18.49) {
		res.send(
		{
			"msn" : "Delgadez leve"
		});
	}else if (imc >= 18.5 && imc <= 24.99) {
		res.send(
		{
			"msn" : "Normal"
		});
	}else if (imc >= 25 && imc <= 29.99) {
		res.send(
		{
			"msn" : "Sobre Peso"
		});
	}else if (imc >= 30 && imc <= 39.99) {
		res.send(
		{
			"msn" : "Obesidad "
		});
	}else  if(imc >= 40){
		res.send(
		{
			"msn" : "Obesidad morbida"
		});
	}else {
		res.send(
		{
			"msn" : "Error en los datos "
		});
	}
  //res.render('index', { title: 'Express' });
});





router.post("/neighborhood", (req, res) => {
  if (req.body.name == ""  && req.body.codigo == "" && req.body.idciudad == "" && req.body.descripcion == "" && req.body.latitud == "" && req.body.longitud == "") {
    res.status(400).json({
      "msn" : "Los datos incorrectos"
    });
    return;
  }

  var vecindario = {
    name : req.body.name,
    codigo : req.body.codigo,
    idCiudad : req.body.idciudad,
    descripcion : req.body.descripcion,
    latitud:req.body.latitud,
    longitud:req.body.longitud
  };
  var vecindarioData = new Vecindario(vecindario);
  vecindarioData.save().then( () => {
    res.status(200).json({
      "msn" : "Vecindario registrado con exito "
    });
    return;
  });
});

router.get("/neighborhood", (req, res, next) => {
  Vecindario.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  });
});
router.post('/home',(req, res) =>{
  if (req.body.departamento == ""  && req.body.nombre == "" && req.body.zoom == "" && req.body.lat == "" && req.body.lng == "" && req.body.idVecindario == "") {
    res.status(400).json({
      "msn" : "Los datos incorrectos"
    });
    return;
  }

  var casa = {
    departamento : req.body.departamento,
    nombre : req.body.nombre,
    zoom : req.body.zoom,
    lat : req.body.lat,
    lng:req.body.lng,
    idVecindario:req.body.idVecindario
  };
  var casaData = new Casa(casa);
  casaData.save().then( () => {
    res.status(200).json({
      "msn" : "Casa registrada con exito "
    });
    return;
  });
});
router.get("/home", (req, res, next) => {
  console.log(req.query.search);
  if(req.query.search==undefined){
    Casa.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
    });
  }else{
    Casa.find({_id:req.query.search}).exec( (error, docs) => {
      res.status(200).json(docs);
    });
  }

});


router.get('/homeSearch/', function(req, res, next) {

  var wordkey = req.body.search;

  var expreg = new RegExp(wordkey);
  var result=Casa.find({'_id':wordkey}).exec();
  res.send(
    {
      "wordkey" : wordkey,
      "result" : result
    });
});





module.exports = router;
