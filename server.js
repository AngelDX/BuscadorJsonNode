var express=require('express');
var app = express();
var server= require('http').Server(app);
//var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/img'));

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

var getCasas = function (data) {
    return data;
};

var getCasasByCiudad = function (ciudad,data) {
    var filteredCasas = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].Ciudad.toUpperCase() === ciudad.toUpperCase()) {
            filteredCasas.push(data[i]);
        }
    }
    return filteredCasas;
};

var getCasasByTipo = function (tipo,data) {
    var filteredCasas = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].Tipo.toUpperCase() === tipo.toUpperCase()) {
            filteredCasas.push(data[i]);
        }
    }
    return filteredCasas;
};

var getCasasByFiltros = function (tipo,ciudad,data) {
    var filteredCasas = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].Tipo.toUpperCase() === tipo.toUpperCase() && data[i].Ciudad.toUpperCase() === ciudad.toUpperCase()) {
            filteredCasas.push(data[i]);
        }
    }
    return filteredCasas;
};

app.get('/test', function(req, res, next) {
	var datos;
	var chk=req.query.chk;
	var ciudad=req.query.ciudad;
	var tipo=req.query.tipo;

	console.log(tipo);
	if(chk=="true"){
		if(tipo!="0" && ciudad!="0"){
			datos=getCasasByFiltros(tipo,ciudad,casas);
		}else if(tipo!="0"){
			console.log("busca tipo");
			datos=getCasasByTipo(tipo,casas);
		}else if(ciudad!="0"){
			datos=getCasasByCiudad(ciudad,casas);
		}else{
			datos=getCasas(casas);
		}
		

	}else{
		datos=getCasas(casas);
	}
	
 	res.send(datos);
	
});

server.listen(8090,function(){
	console.log("el servidor arranco en puerto 80",app.settings.env);
});