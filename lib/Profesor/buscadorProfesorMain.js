Meteor.GL = Meteor.GL || {};
Meteor.GL.Buscador = Meteor.GL.Buscador || {};
Meteor.GL.Buscador.Profesor = Meteor.GL.Buscador.Profesor || {};
var metodos = Meteor.GL.Buscador.Methods;
Meteor.GL.Buscador.Profesor.getPartida = function(_idPartida, _userId){
	return Partidas.find({_id: _idPartida, idProfesor: metodos.getUserId(_userId)});
}
// Meteor.GL.Buscador.Profesor.getListaRespuestasGL = function(_idPartida, _userId){
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
// Meteor.GL.Buscador.Profesor.getRespuestaEspecificaGL = function(_idPartida, _idGrupo, _userId){
// 	var partida = this.getPartida(_idPartida, metodos.getUserId(_userId));
// 	if(metodos.existe(partida)){
// 		return RespuestasGL.find({idGrupo: _idGrupo});
// 	}
// }