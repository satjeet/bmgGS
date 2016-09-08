Meteor.GL = Meteor.GL || {};
Meteor.GL.QueryObjects = Meteor.GL.QueryObjects || {};
Meteor.GL.QueryObjects.Alumno = {
  get: function(param) {
    return Meteor.GL.QueryObjects.Aux.executeUserRoleGet(param, 'alumno');
  },
  getPartidas: function(id) {
    
  },
  getGrupos: function(id) {
    
  }
}
