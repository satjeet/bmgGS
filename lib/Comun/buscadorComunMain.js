Meteor.GL = Meteor.GL || {};
Meteor.GL.Buscador = Meteor.GL.Buscador || {};
Meteor.GL.Buscador.Comun = Meteor.GL.Buscador.Comun || {};
var buscador = Meteor.GL.Buscador;
var metodos = Meteor.GL.Buscador.Methods;
Meteor.GL.Buscador.Comun.getPartida = function(_idPartida, _userId){
	var role = Roles.getRolesForUser(_userId)[0];
	if(role == "alumno"){
    	return buscador.Alumno.getPartida(_idPartida, metodos.getUserId(_userId));
    }
  	else if(role == "profesor"){
  		return buscador.Profesor.getPartida(_idPartida, metodos.getUserId(_userId));
	}
}
Meteor.GL.Buscador.Comun.getEscenario = function(_idPartida, _userId){
	var partida = this.getPartida(_idPartida, metodos.getUserId(_userId));
	if(metodos.existe(partida)){
		console.log("getEscenario existe partida")
		return Escenarios.find({idPartida: partida.idEscenario});
	}
}