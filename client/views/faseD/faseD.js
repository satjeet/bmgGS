
Template['faseD'].onRendered(function() {
  var instance = this;

});

Template['faseD'].helpers({
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        //console.log("informacion de THIS faseB");
        //console.log("informacion de THIS instance faseB", this.data);

        //Meteor.call('CrearSegmentos');
        return 'pantallaFase3';
      case 'profesor':
       // Meteor.call('CrearSegmentos');
        return 'LoadingMain';
      default:
        return '';
    }
  }
});

Template['faseD'].events({

});
