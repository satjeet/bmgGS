
Template['faseC'].onRendered(function() {
  var instance = this;

});

Template['faseC'].helpers({
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        //console.log("informacion de THIS faseB");
        //console.log("informacion de THIS instance faseB", this.data);

        //Meteor.call('CrearSegmentos');
        return 'LoadingMain';
      case 'profesor':
       // Meteor.call('CrearSegmentos');
        return 'pantallaFase2';
      default:
        return '';
    }
  }
});

Template['faseC'].events({

});
