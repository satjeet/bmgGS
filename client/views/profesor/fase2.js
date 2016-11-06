
Template.pantallaFase2.helpers({
	

});
/*

var losGrupos=[];
  var grupos=Grupos.find().fetch();
  console.log("algo salio mal aqui");
  grupos.forEach(function(grupo){
    if(grupo.nombre!="Sin Grupo"){
      losGrupos.push(grupo);

    }*/

Template.pantallaFase2.events({
'click .pasarFaseD': function(){
        console.log("Terminando el fase2");
        if(Meteor.userId()){
		    var instance = Template.instance();
		    var idpartida=instance.data._id;
		    console.log("valor de la idopartida: "+instance.data._id);
		    //aqui podria ir un control que solo deje avanzar si todos estan listos, o asigne valores a los que no estuvieron listos
		   
		      Meteor.call('siguienteFase',idpartida , function(error,resultado){
		          if(error){
		              alert('Error');
		           }else{
		              return true;
		           }
		         });
      
        }
         

    
      
    },

});

Template.resumenElecciones.helpers({
	Grupos: function(){
		 grupos=Grupos.find();

	    if(Meteor.userId()){
	    	console.log("que grupos hay now: ",grupos.fetch());
      		return grupos;
    	}else return false;


	},
	textoFidelidad: function(grupo, segmento){

			//var nombrePartida= Session.get("nombredelapartida");
	    //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
	    if(grupo.nombre!="Sin Grupo"  ){
	    	console.log("con grupo ",grupo);
	    	console.log("un segmento al azar ",Segmentos.findOne());
	    	var segment= Segmentos.findOne({idGrupo:grupo._id});
	     //if(segment.segmentos[segmen].fidelidad==fideli){
	     	console.log("que tiene Segment ",segment);
			if(Meteor.userId() && segment != undefined){
				if(segment.segmentos[segmento].canalPicked!=0){
	    			console.log("el canal ",Canales.find().fetch());

					var canalPicked=segment.segmentos[segmento].canalPicked  ; 
					var nCanal= Canales.findOne().canal[canalPicked].nombreCanal;
					console.log("nombre del canal : "+nCanal)
						return nCanal;
					}else{
						var seleccion="sin seleccion";
						return seleccion;
					}

		    }else{
		    	return false;
		    }
		   
			}
		}


	////////////////





});