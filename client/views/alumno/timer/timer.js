
Template['ttimer'].onCreated(function() {
	var instance = this
	instance.timer = new ReactiveVar();
	instance.timer.set(Meteor.GL.TimerFase.getInstance());
	//TimerFase
	instance.lastTime = -1;
	instance.isFirst = true;
})

Template['ttimer'].helpers({
  time: function() {
    return "00:00"
  },
  tiempoRestante: function() {

  	var instance = Template.instance()

    var timer = Template.instance().timer.get();

    var datapartida = PartidaData.findOne({idPartida:this._id})
    var lastPeriodo = datapartida.periodos[datapartida.periodos.length-1];



	//reset isfirst on timer increasement
	var tnow = timer.getMiliRestante();
	if(tnow>instance.lastTime){//new time
		instance.isFirst = true;
		console.log("Ready for next!")
	}
	instance.lastTime = tnow;

	if(timer.isTimerOver()){//Si se acaba el tiempo
		if(instance.isFirst){
			instance.isFirst = false;
			console.log("Template.instance().withProfesor")
			//console.log(Template.instance().withProfesor)
			//if(Template.instance().withProfesor==false){
				console.log("periodos", datapartida.periodos.length)
				if(datapartida.periodos.length==10){
					Meteor.call("siguienteFase", this._id, function(err) {
						if(err) return console.log(err);//reporta error en el callback
						console.log("terminarfase")
						Router.go('/choose/' + instance.data._id);
						
					});
				}else{
					Meteor.call("nextPeriod", {nextPeriod:datapartida.periodos.length+1, idPartida:this._id}, function(err) {
						if(err) return console.log(err);//reporta error en el callback
						console.log("terminarPeriodo")
					});
				}
			//}
		}else{
			console.log("Laaatee!")
		}
		// if(faseC.periodos.length==faseC.cantPeriodos){
		// 	console.log("the game is over");
		// 	Router.go('/resultadosFaseC/'+partida._id);
		// }
	}


    var fechaFin = lastPeriodo.fechaFin;
    timer.setMaxDate(fechaFin);
    return timer.getTiempoRestante();
  },
});