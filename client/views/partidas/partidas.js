Template['partidas'].onRendered(function(){ })

Template['partidas'].helpers({
  partidas: function() {
    return Partidas.find({estadoActual: {$ne: "Finalizada"}});
  },
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        return 'unirPartida';
      case 'profesor':
        return 'partidasNav';
      default:
        return '';
    }
  },
  hayPartidas: function(){
    return Partidas.find().count() > 0;
  }
});