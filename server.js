var express=require('express');
var app = express();
var server= require('http').Server(app);


app.use(express.static(__dirname + '/js'));

app.get('/',function(req,res){
	res.sendfile(__dirname + '/public/index.html');
});

var jsonFile = require('jsonfile')
var fileName = 'data-1.json'

var jd = jsonFile.readFileSync(fileName);

var casa = function (Id,Direccion,Ciudad,Telefono,Codigo_Postal,Tipo,Precio) {
    this.Id = Id;
    this.Direccion = Direccion;
    this.Ciudad = Ciudad;
    this.Telefono = Telefono;
    this.Codigo_Postal = Codigo_Postal;
    this.Tipo = Tipo;
    this.Precio = Precio;
}

var casas = [];
for (var i = 0; i < jd.length; ++i) {
	casas.push(new casa(jd[i].Id,jd[i].Direccion,jd[i].Ciudad,jd[i].Telefono,jd[i].Codigo_Postal,jd[i].Tipo,jd[i].Precio));
}

// Get all Vehicles
var getCasas = function (callback) {
    callback(null, casas);
};


var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
 

/*
for (var i = 0; i < jsonData.length; ++i) {

	console.log("Emp ID : "+jsonData[i].Id);
	console.log("Emp Name : "+jsonData[i].Direccion);
	console.log("Emp Address : "+jsonData[i].Ciudad);
	console.log("Designation : "+jsonData[i].Telefono);
	console.log("----------------------------------");
}

*/


server.listen(80,function(){
	console.log("el servidor arranco en puerto 80",app.settings.env);
});