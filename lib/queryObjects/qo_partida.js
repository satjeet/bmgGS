Meteor.GL = Meteor.GL || {};
Meteor.GL.QueryObjects = Meteor.GL.QueryObjects || {};
Meteor.GL.QueryObjects.Partida = {
  get:function(param){
    return Meteor.GL.QueryObjects.Aux.executeGet(param, Partidas);
  },
  getGrupos:function(idPartida){

  },
  getProfesor:function(idPartida){
    
  }
}
