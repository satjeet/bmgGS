
Template['LoadingProfesorFaseB'].onRendered(function() {
  var instance = this;

});



Template.LoadingProfesorFaseB.helpers({


});



//////////////////////////////////////////// alumnosTerminandoTurno
Template['alumnosTerminandoTurno'].onRendered(function() {
  var instance = this;

});



Template.alumnosTerminandoTurno.helpers({
	grupos:function(){

		console.log("lista de grupos",Segmentos.find().fetch());


		var misgrupos=[];
		var segmentos=Segmentos.find().fetch();
		console.log("numero de grupos "+segmentos.length);

		var miData={};
		

		/*

		segmentos.forEach(function(segmento){
			

			idGrupo=segmento.idGrupo;
			if(segmento.estadoFase=="esperando"){

				miData.nombre=Grupos.findOne({_id:idGrupo}).nombre;
				miData.estado="Listo";
				misgrupos.push(miData);
			}

		});

		*/

		//tengo que hacerle llegar una variable reactiva. tiene dos valore sin eso//////////

		for(var i=0;i<segmentos.length;i++){
			console.log("quiero cada segmento",segmentos[i]);
			idGrupo=segmentos[i].idGrupo;
			if(segmentos[i].estadoFase=="esperando"){

				miData.nombre=Grupos.findOne({_id:idGrupo}).nombre;
				console.log("en el ciclo "+ i);

				console.log("mi nombre esperando "+miData.nombre);

				miData.estado="Listo";
				misgrupos[i]=miData;
				console.log("mis grupos por turno ",misgrupos[i]);


			}else{

				miData.nombre=Grupos.findOne({_id:idGrupo}).nombre;
				console.log("mi nombre decidiendo "+ miData.nombre);

				miData.estado="Tomando decisiones";
				misgrupos[i]=miData;
				console.log("mis grupos por turno ",misgrupos[i]);


			}



		}
			console.log("info de misgrupos ", misgrupos);

		return misgrupos;
		
	}


});

