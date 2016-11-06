Template['LoadingProfesorFaseB'].onCreated(function() {
 	
	this.templateLoadingrofesor = new ReactiveDict();
	this.templateLoadingrofesor.set( 'valorNombreGrupo',"grupo");
	this.templateLoadingrofesor.set( 'valorEstadoGrupo',"estado");

});



Template['LoadingProfesorFaseB'].onRendered(function() {
  


	       



			
});



Template.LoadingProfesorFaseB.helpers({


});



//////////////////////////////////////////// alumnosTerminandoTurno
Template['alumnosTerminandoTurno'].onRendered(function() {
  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.templateLoadingrofesor = collectingTmplInstance.templateLoadingrofesor;

});

Template['LoadingProfesorFaseB'].onCreated(function() {
 	

	
});



Template.alumnosTerminandoTurno.helpers({
	grupos:function(){

		var misgrupos=[];
		var miData={};

    misgrupos[0]={nombre:"Grupo",estado: "Estado Grupo"};

		console.log("info de misgrupos inicio ", misgrupos);

		console.log("lista de grupos",Segmentos.find().fetch());

		
		var segmentos=Segmentos.find().fetch();
		console.log("numero de grupos "+segmentos.length);

		

		//tengo que hacerle llegar una variable reactiva. tiene dos valore sin eso//////////

		for(var i=0;i<segmentos.length;i++){
			console.log("quiero cada segmento",segmentos[i]);
			idGrupo=segmentos[i].idGrupo;
			if(segmentos[i].estadoFase=="esperando"){

				miData.nombre=Grupos.findOne({_id:idGrupo}).nombre;
				console.log("en el ciclo "+ i);

				console.log("mi nombre esperando "+miData.nombre);

				miData.estado="Listo";


			}else{
				
				miData.nombre=Grupos.findOne({_id:idGrupo}).nombre;
				console.log("mi nombre decidiendo "+ miData.nombre);

				miData.estado="Tomando decisiones";
				

					
			}
			misgrupos[i]=JSON.parse(JSON.stringify(miData));
			console.log("mis grupos por turno ",misgrupos[i]);




		}

			console.log("info de misgrupos ", JSON.parse(JSON.stringify(misgrupos)));

		return misgrupos;
		
	}


});


Template.alumnosTerminandoTurno.events({
  'click .comenzarFaseC': function(event, instance){
 
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

    

  },

});


