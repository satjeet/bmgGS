Meteor.GL = Meteor.GL || {};
Meteor.GL.QueryObjects = Meteor.GL.QueryObjects || {};
Meteor.GL.QueryObjects.Grupo = {
  get:function(param){
    return Meteor.GL.QueryObjects.Aux.executeGet(param, Grupos);
  },
  getMiembros:function(idGrupo){
    
  },
  getRespuestaFaseA:function(idGrupo){
    
  },
  getRespuestaFaseB:function(idGrupo){
    
  }
}
