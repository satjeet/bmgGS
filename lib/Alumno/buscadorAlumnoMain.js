Meteor.GL = Meteor.GL || {};
Meteor.GL.Buscador = Meteor.GL.Buscador || {};
Meteor.GL.Buscador.Alumno = Meteor.GL.Buscador.Alumno || {};
var metodos = Meteor.GL.Buscador.Methods;
Meteor.GL.Buscador.Alumno.getGrupo = function(_idPartida, _userId){
	//Utilizado  '{$not: {$ne: } }' en vez de '{$eq: }' ya que no existe en miniMongo aun!
	//return Grupos.find({idPartida: _idPartida, miembros: { $elemMatch: {$not: {$ne: metodos.getUserId(_userId) } } } });
	//

	return Grupos.find({idPartida: _idPartida, miembros: { $in: [metodos.getUserId(_userId)]} });
	
}
Meteor.GL.Buscador.Alumno.getPartida = function(_idPartida, _userId){
	var grupo = this.getGrupo(_idPartida, metodos.getUserId(_userId));
	if(metodos.existe(grupo)){
		return Partidas.find({_id: _idPartida});
	}
}
// Meteor.GL.Buscador.Alumno.getRespuestaGL = function(_idPartida, _userId){
// 	// var grupo = this.getGrupo(_idPartida, metodos.getUserId(_userId));
// 	// if(metodos.existe(grupo)){
// 	// 	grupo = grupo.fetch()[0];
// 	// 	return RespuestasGL.find({idGrupo: grupo._id});
// 	// }
// 	var partida = this.getPartida(_idPartida, metodos.getUserId(_userId));
// 	if(metodos.existe(partida)){
// 		var grupos = Grupos.find({idPartida: _idPartida});
//         if(grupos != null){
// 	        var idGrupos = [];
// 	        grupos.forEach(function(grupo){
// 	        	idGrupos.push(grupo._id);
// 	        });
// 	        return RespuestasGL.find({idGrupo: {$in: idGrupos}});
//         }
//     }
// }