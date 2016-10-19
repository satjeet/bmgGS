Template['tbuttons'].helpers({

});

Template['tbuttons'].events({
	'click #nextperiod':function(event) {
		console.log("nextperiod")
		//var id = event.target.dataset.id;
		var instance = Template.instance()
    	var datapartida = PartidaData.findOne({idPartida:this._id})

		// Meteor.call("nextPeriod", {nextPeriod:datapartida.periodos.length+1, idPartida:this.idPartida}, function() {
		// 	console.log("done")
		// });

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
	}
});