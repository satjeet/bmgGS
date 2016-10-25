
Meteor.publish('losGrupos',function(){
  return Grupos.find();
});

Meteor.publish('losSegmentos',function(){
  return Segmentos.find();
});

Meteor.publish('losCanales',function(){
  return Canales.find();
});

Meteor.publish("PartidaDataActual", function(_idPartida){
  check(_idPartida, String);
  return PartidaData.find({idPartida:{$regex:'^'+_idPartida}});
});


Meteor.publish('misCanalesProfesor',function(){
  var userId =this.userId;
  //console.log("user id: " + userId);
 	var partida = Partidas.findOne({"idProfesor": userId, "inProgress":true});
	//console.log("la id de la partida es :"+ partida._id);
   let canal = Canales.find({idPartida: partida._id});
    return canal;
});


Meteor.publish('miGrupo',function(){
  var userId =this.userId;
  console.log("user id: " + userId);
 // var migrupo=Grupos.find({'miembros.$':userId});
 
// solo permite una partida activa en el servidor
 //var partida = Partidas.findOne({"inProgress":true});

 //me entrega todos los grupos en los que estoy registrado.SOLO PERMITE UNA PARTIDA ACTIVA POR SERVER.
 var grupos = Grupos.find({
         idPartida: Partidas.findOne({"inProgress":true})._id,  
          //podria tambien hacer un arreglo de idpartidas y buscar una en donde el grupo este incliuido
          // las publicaciones retornan cursores o arreglos de cursores
          miembros: {

            $in: [userId]
          }
      });

 	//console.log("Migrupo, los grupos que tengo ",grupos.fetch());

/*
    var auxgrupo;
	grupos.forEach(function(grupo){
		var partida=Partidas.findOne({"_id":grupo.idPartida});
		console.log("vemoas la id de la partida"+partida._id);
		if(partida.inProgress==true){
			console.log("es verdad");
			auxgrupo=grupo._id;
			console.log("contenido del grupo verdad",grupo);

		}else console.log("no encontro partida")

	});
	return Grupos.find({"_id":auxgrupo});
*/
  //if(grupo){

    return grupos;

 // }
  //return this.ready();
});



Meteor.publish('misGruposProfesor',function(){
  var userId =this.userId;
  //console.log("Profesor id: " + userId);
 // var migrupo=Grupos.find({'miembros.$':userId})

 	//let partida = Partidas.findOne({},{fields:{_id: idPartida, inProgress:false}});     sirve para eliminar esos fields del resultado
 //console.log("la id de la partida esdededede :"+ idPartida);
 	
 	var partida = Partidas.findOne({"idProfesor": userId, "inProgress":true});
        
	//console.log("la id de la partida es :"+ partida._id);
   let grupos = Grupos.find({idPartida: partida._id});
	//console.log("los grupos del profesor son:", grupos.fetch());


  //if(grupo){

    return grupos;

 // }
  //return this.ready();
});

Meteor.publish('miSegmento',function(_idPartida){
   check(_idPartida, String);

  var userId =this.userId;
  //console.log("entre a mi segmento"); 
  //console.log("id de la partida desde mi segmento: ",htis.data);

  //var idpartida=Session.get('idpartida');
   var grupos = Grupos.findOne({
          idPartida: _idPartida,
          miembros: {
            $in: [userId]
          }
      });
  

  console.log("tengo los grupos donde esta el usuario en mi poder");
/*
   var idGrupo=[];
	grupos.forEach(function(grupo){
		var mipartida=Partidas.findOne({"_id":grupo.idPartida});

		if(mipartida.inProgress==true){
			console.log("entre al each del grupo en misegmento")
			console.log("antes del grupo id"+ grupo._id);
			idGrupo.push(grupo._id);	
		}
	});
  	console.log("id del grupo en partida activa ",idGrupo);
	var segmento = Segmentos.find({idGrupo: {$in: idGrupo}});
*/
var segmento= Segmentos.find({idPartida:_idPartida,idGrupo:grupos._id});
    return segmento;

});

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
}


Meteor.publish('misSegmentosProfesor',function(){
  var userId =this.userId;
  console.log("user id: " + userId);
 	//let partida = Partidas.findOne({},{fields:{_id: idPartida, inProgress:false}});     sirve para eliminar esos fields del resultado
 	var partida = Partidas.findOne({"idProfesor": userId, "inProgress":true});
	console.log("la id de la partida es :"+ partida._id);
   let grupos = Grupos.find({idPartida: partida._id});
	console.log("el contenido del grupo: ", grupos.fetch());
	console.log("el tipo del grupo: ", toType(grupos) );
	
	var idGrupos=[];
	grupos.forEach(function(grupo){
		idGrupos.push(grupo._id);	
		console.log("probando algo");
	});
	var segmentos = Segmentos.find({idGrupo: {$in: idGrupos}});
   
	//console.log("el tipo del segmento: ", toType(segmento) );
	console.log("el contenido del idgrupos: "+ idGrupos );

	console.log("el contenido del segmento: ", segmentos.fetch() );


  //if(grupo){

    return segmentos;

 // }
  //return this.ready();
});

Meteor.publish("misCanalesPartidas", function(_idPartida){
  check(_idPartida, String);
  return Canales.find({idPartida:{$regex:'^'+_idPartida}});
});
