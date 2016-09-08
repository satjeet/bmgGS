Meteor.GL = Meteor.GL || {};
Meteor.GL.QueryObjects = Meteor.GL.QueryObjects || {};
Meteor.GL.QueryObjects.Profesor = {
  get:function(param){
    return Meteor.GL.QueryObjects.Aux.executeUserRoleGet(param, 'profesor');
  },
  getPartidas:function(idProfesor){
        
  }
}
