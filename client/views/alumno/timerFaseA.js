Template['timerFaseA'].onRendered(function() {
  var instance = this;
  console.log(this)
  var datapartida = PartidaData.findOne({idPartida:instance.data._id})
  document.setHeaderTitle("Periodo "+datapartida.periodos.length+"/10")
  instance.autorun(function() {
    var datapartida = PartidaData.findOne({idPartida:instance.data._id})
    document.setHeaderTitle("Periodo "+datapartida.periodos.length+"/10")
  });
})

Template.timerFaseA.helpers({
	partida: function() {
		//console.log("partida")
		console.log(this)
		return this
	}
})