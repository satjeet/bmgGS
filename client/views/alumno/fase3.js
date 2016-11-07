
// tiene la id de la partida
Template['pantallaFase3'].onRendered(function() {
  var instance = this;
  var idpartida=instance.data.id;
  //var idpartida=Partidas.findOne({'nombrePartida':npartida})._id || false;
  console.log("el id resumida de la partida es : " +idpartida);


  ///////

  	//idpartida=this.id;
   	console.log("la ide de partida que me entrega es "+idpartida);
           var userId =Meteor.userId();
    var grupo = Grupos.findOne({
             idPartida: idpartida,
             miembros: {
                $in: [userId]
               }
           });

     var segment = Segmentos.findOne({ "idGrupo": grupo._id });
   	console.log("el segmento que me entrega es ", segment);


  	if(segment.segmentos[0].eficienciaPicked != 0 || segment.segmentos[1].eficienciaPicked !=0 || segment.segmentos[2].eficienciaPicked !=0 
  		|| segment.segmentos[3].eficienciaPicked !=0 || segment.segmentos[4].eficienciaPicked !=0){
  				console.log("entra en el if");
  		//  idpartida=this.id;
           var userId =Meteor.userId();
     var grupo = Grupos.findOne({
             idPartida: idpartida,
             miembros: {
                $in: [userId]
               }
     });

     var segment = Segmentos.findOne({ "idGrupo": grupo._id });
     console.log("el segmento que tengo es : ", segment);

        Meteor.call('RollDices',idpartida,segment,grupo, function(error,resultado){
          if(error){
              alert('Error');
           }else{
              return console.log("se completo el roll dice. "); 
           }
        });

        var resultadoJugador=Session.get("resultadoJugador");
        Meteor.call('ActualizarResultado',idpartida,resultadoJugador,grupo);
   	}

  
  instance.autorun(function() {
    console.log('Iniciando autorun');
  //var idPartida= Grupos.findOne({"_id": idgrupo}).idPartida || false;
    console.log("el id de la partida es : " +idpartida);
    var mipartida=Partidas.findOne({"_id": idpartida});
  	console.log("justo afuerade if porIniciar");

    /////////////////////////////////// ROLL DICE////////////////////////////
   
   	
    
/////////////////////////////// FIN ROLL DICE/////////////////////////


  if(mipartida.estadoActual=="PorIniciarFase1"){
  	console.log("entra al if PorIniciarFase1");
    
  	console.log("por iniciar");
  	console.log("veamos que es id: "+idpartida)

  	Router.go('pantallaFase1',{id: idpartida});  
  }
  
   	
    });

});

/*
function desactiva_enlace(enlace)
{
      enlace.disabled='disabled';
}
*/
Template.pantallaFase3.events({
   

    'click .RollDices': function(event){
    	/*var nombrePartida= Session.get("nombredelapartida");
        var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
        var usuario=arrayDelUsuario(nombrePartida);
        */

        event.target.disabled='disabled';
        idpartida=this.id;
        console.log("boton de dados");
           var userId =Meteor.userId();
       console.log("user id: " + userId);
     // var migrupo=Grupos.find({'miembros.$':userId});
     var grupo = Grupos.findOne({
             idPartida: idpartida,
             miembros: {
                $in: [userId]
               }
           });

     var segment = Segmentos.findOne({ "idGrupo": grupo._id });
     console.log("e segmento que tengo es : ", segment);

        //grupo=Grupos.findOne({"idpartida":idpartida, "miembros.$":userId})
        console.log("e grupo que tengo es : ", grupo);
        //Meteor.call('RollDices',partida._id,usuario.name,usuario);

        Meteor.call('RollDices',idpartida,segment,grupo);
        var resultadoJugador=Session.get("resultadoJugador");
        Meteor.call('ActualizarResultado',idpartida,resultadoJugador,grupo);




    },
    'click .FinTurno': function(){
        console.log("Terminando el turno");
        if(Meteor.userId()){
        	var resultadoJugador=Session.get("resultadoJugador");

        	var nombrePartida= Session.get("nombredelapartida");
        	var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
        	var usuario=arrayDelUsuario(nombrePartida);
        	Meteor.call('FinTurno',partida._id,usuario.name,usuario,resultadoJugador);


        	Router.go('/profesor/fase0');
         
        }else { console.log("no esta logeado")}

    },

});

Template.pantallaFase3.helpers({
	'defHigh': function(){

		var canalHiIn= Session.get("canalHighIncome");
		return canalHigh;
	},
	'nameHighIncome': function(){


        //var fidelidad=segmento.segmentos[segment].fidelidad ; 

		//var nombrePartida= Session.get("nombredelapartida");
		//var usuario=arrayDelUsuario(nombrePartida);
		 let segmento=Segmentos.findOne();
     console.log("mi segmento es ",segmento);
		var fidelidad=segmento.segmentos[0].fidelidad; 
	
      	if(fidelidad==0) {var seleccionado="Unawereness";}
      	else if(fidelidad==1) {var seleccionado="Awereness";}
      	else if(fidelidad==2) {var seleccionado="Consideration";}
      	else if(fidelidad==3) {var seleccionado="Trial";}
      	else if(fidelidad==4) {var seleccionado="Repertoire";}
      	else if(fidelidad==5) {var seleccionado="Regular";}
      	else if(fidelidad==6) {var seleccionado="Loyal";}
      	else {var seleccionado="la cague";}

      	return seleccionado;
	},
	'ingresosHighIncome': function(template){
		var idpartida=this.id;
		console.log("el id en ingresos: "+idpartida )
		var total=CalculoIngresoShares(0);
		return total;
	},

		'nameInnovators': function(){

		//var nombrePartida= Session.get("nombredelapartida");
		//var usuario=arrayDelUsuario(nombrePartida);

		let segmento=Segmentos.findOne();
		var fidelidad=segmento.segmentos[1].fidelidad; 
	
      	if(fidelidad==0) {var seleccionado="Unawereness";}
      	else if(fidelidad==1) {var seleccionado="Awereness";}
      	else if(fidelidad==2) {var seleccionado="Consideration";}
      	else if(fidelidad==3) {var seleccionado="Trial";}
      	else if(fidelidad==4) {var seleccionado="Repertoire";}
      	else if(fidelidad==5) {var seleccionado="Regular";}
      	else if(fidelidad==6) {var seleccionado="Loyal";}
      	else {var seleccionado="la cague";}

      	return seleccionado;
	},
	'ingresosInnovators': function(template){
		var idpartida=this.id;
		var total=CalculoIngresoShares(1);
		return total;
	},

	'nameFamilyFirst': function(){

	//	var nombrePartida= Session.get("nombredelapartida");
	//	var usuario=arrayDelUsuario(nombrePartida);

		let segmento=Segmentos.findOne();
		var fidelidad=segmento.segmentos[2].fidelidad;

	
      	if(fidelidad==0) {var seleccionado="Unawereness";}
      	else if(fidelidad==1) {var seleccionado="Awereness";}
      	else if(fidelidad==2) {var seleccionado="Consideration";}
      	else if(fidelidad==3) {var seleccionado="Trial";}
      	else if(fidelidad==4) {var seleccionado="Repertoire";}
      	else if(fidelidad==5) {var seleccionado="Regular";}
      	else if(fidelidad==6) {var seleccionado="Loyal";}
      	else {var seleccionado="la cague";}

      	return seleccionado;
	},
	'ingresosFamilyFirst': function(template){
		var idpartida=this.id;
		var total=CalculoIngresoShares(2);
		return total;
	},

	'nameStatusSeekers': function(){

		let segmento=Segmentos.findOne();
		var fidelidad=segmento.segmentos[3].fidelidad;

	
      	if(fidelidad==0) {var seleccionado="Unawereness";}
      	else if(fidelidad==1) {var seleccionado="Awereness";}
      	else if(fidelidad==2) {var seleccionado="Consideration";}
      	else if(fidelidad==3) {var seleccionado="Trial";}
      	else if(fidelidad==4) {var seleccionado="Repertoire";}
      	else if(fidelidad==5) {var seleccionado="Regular";}
      	else if(fidelidad==6) {var seleccionado="Loyal";}
      	else {var seleccionado="la cague";}

      	return seleccionado;
	},
	'ingresosStatusSeekers': function(template){
		var idpartida=this.id;

		var total=CalculoIngresoShares(3);
		return total;
	},

	'nameAdventurers': function(){

		let segmento=Segmentos.findOne();
		var fidelidad=segmento.segmentos[4].fidelidad;

	
      	if(fidelidad==0) {var seleccionado="Unawereness";}
      	else if(fidelidad==1) {var seleccionado="Awereness";}
      	else if(fidelidad==2) {var seleccionado="Consideration";}
      	else if(fidelidad==3) {var seleccionado="Trial";}
      	else if(fidelidad==4) {var seleccionado="Repertoire";}
      	else if(fidelidad==5) {var seleccionado="Regular";}
      	else if(fidelidad==6) {var seleccionado="Loyal";}
      	else {var seleccionado="la cague";}

      	return seleccionado;
	},
	'ingresosAdventurers': function(template){
		var idpartida=this.id;

		var total=CalculoIngresoShares(4);
		return total;
	},

	'Ganancias': function(template){
		var ganancias= 0;
		var idpartida=this.id;

		for (var i = 0; i <= 4; i++) {

			ganancias=ganancias+CalculoIngresoShares(i);
			console.log("entrega ganancias "+ganancias);
		}
		Session.set("gananciasJugador",ganancias);
		return ganancias;
		
	},

	'Resultado': function(template){
		if(Meteor.userId()){
			var ganancias=parseInt(Session.get("gananciasJugador"));

		    var instance = Template.instance();
      var idpartida=instance.data._id;

      console.log("la id de partida: "+idpartida);
      // funciona impecable este filtro para los sin grupo.
      /*
      var grupos=Grupos.find({"idPartida":idpartida,
                              nombre :{
                                      $ne :"Sin Grupo"
                                      }});
      */
      var userId =Meteor.userId();

      var grupo = Grupos.findOne({
             idPartida: idpartida,
             miembros: {
                $in: [userId]
               }
     });

      segment= Segmentos.findOne({idGrupo:grupo._id});
			var resultado =parseInt( segment.dineroInicial) +parseInt(ganancias);
			console.log("vamos ue entrega " + resultado);
			Session.set("resultadoJugador",resultado);

			return resultado;  /// falta esto, no esta resultando xD
		}

	},


});

function CalculoIngresoShares(segm){
	 if(Meteor.user())
  	{

      var instance = Template.instance();
      var idpartida=instance.data._id;

      console.log("la id de partida: "+idpartida);
      // funciona impecable este filtro para los sin grupo.
	  	var grupos=Grupos.find({"idPartida":idpartida,
                              nombre :{
                                      $ne :"Sin Grupo"
                                      }});

		var totalShare=0;
		console.log("los grupos", grupos.fetch());
	  	grupos.forEach(function(grupo){
        
	  		console.log("el grupo", grupo);
	  		//console.log("tira erorr por aqi");
        console.log("los segmentos que tengo", Segmentos.find().fetch());
	  		segment= Segmentos.findOne({idGrupo:grupo._id});	
        console.log("segm: "+segm);
	  		console.log("me entrega el segmento del grupo: ",segment);
		  totalShare=totalShare+segment.segmentos[segm].marketShare;
		  console.log("el total share que me entrega es " + totalShare);
		//    console.log("llega aqui3");

  		});


  		if(totalShare==0) var actionValue=0;
	  	else var actionValue =parseInt(segment.segmentos[segm].value / totalShare);

	  	console.log("el actionValue que me entrega es " + actionValue)
	  	return parseInt(actionValue * parseInt(segment.segmentos[segm].marketShare) )

	  	/*
		var users=partida.usuarios;  
		var poli={};
		var totalShare=0;
		users.forEach(function(usuario){
		  totalShare=totalShare+parseInt(usuario.segmentos[segmento].marketShare);
		//    console.log("llega aqui3");

  		});
  		*/
	 // var usuario=arrayDelUsuario(nombrePartida);

	  //console.log("el total de acciones es:" +totalShare);
	  /*
	  if(totalShare==0) var actionValue=0;
	  else var accionValue =parseInt(usuario.segmentos[segmento].value / totalShare);

	  return parseInt(accionValue * parseInt(usuario.segmentos[segmento].marketShare) );
	  	*/



	}else{console.log(" falta un usuario");}



}