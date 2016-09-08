Template['lobby'].onRendered(function() {
});

Template['lobby'].helpers({
  grupos: function() {
    return Grupos.find({idPartida: this._id});
  },
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        return 'lobbyAlumnoNav';
      case 'profesor':
        return 'lobbyProfesorNav';
      default:
        return '';
    }
  }
});

Template['lobby'].events({});