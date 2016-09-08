Template['partidasNav'].helpers({
	dropPartidas:function() {
	    var res = [];//[{value:1, text:"test"}];

	    var partidas = Partidas.find({estadoActual: {$ne: "Finalizada"}}).fetch();

	    partidas.sort(function(a,b){
        	return b.createdAt - a.createdAt;
      	});

	    for(var np in partidas){
	      var partida = partidas[np];
	      var d = (partida.createdAt+'').split(' ');
	      res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});
	    }

	    return {data:res,config:{placeholder:TAPi18n.__("partida.partidasAnteriores")}};
	},
	dropPresets:function() {
	    var res = [];//[{value:1, text:"test"}];

	    // var partidas = Partidas.find({estadoActual: {$ne: "Finalizada"}}).fetch();

	    // partidas.sort(function(a,b){
     //    	return b.createdAt - a.createdAt;
     //  	});

	    // for(var np in partidas){
	    //   var partida = partidas[np];
	    //   var d = (partida.createdAt+'').split(' ');
	    //   res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});
	    // }

	    return {data:res,config:{placeholder:TAPi18n.__("partida.presets")}};
	}
});

Template['partidasNav'].events({
  'click #btnNewPartida': function(event) {
    Router.go('/partidaNueva');
  },
  'click #listPartidas li': function(event) {
    //console.log(event)
    var id = event.target.dataset.val;
    Router.go('/lobby/' + id);
  }
});
