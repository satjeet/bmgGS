
Template['faseB'].onRendered(function() {
  var instance = this;

});

Template['faseB'].helpers({
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        //console.log("informacion de THIS faseB");
        //console.log("informacion de THIS instance faseB", this.data);

        //Meteor.call('CrearSegmentos');
        return 'pantallaFase1';
      case 'profesor':
       // Meteor.call('CrearSegmentos');
        return 'LoadingProfesor';
      default:
        return '';
    }
  }
});

Template['faseB'].events({

});
