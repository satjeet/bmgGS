
Template['faseA'].onRendered(function() {
  var instance = this;
  // console.log(this)
  // var datapartida = PartidaData.findOne({idPartida:instance.data._id})
  // document.setHeaderTitle("Periodo "+datapartida.periodos.length+"/10")
  // instance.autorun(function() {
  //   var datapartida = PartidaData.findOne({idPartida:instance.data._id})
  //   document.setHeaderTitle("Periodo "+datapartida.periodos.length+"/10")
  // });
});

Template['faseA'].helpers({
  roleTemplate: function() {
    var role = Roles.getRolesForUser(Meteor.userId())[0];
    switch (role) {
      case 'alumno':
        console.log("informacion de THIS faseA");
        console.log("informacion de THIS instance faseA", this.data);

        //Meteor.call('CrearSegmentos');
        return 'LoadingMain';
      case 'profesor':
       // Meteor.call('CrearSegmentos');
        return 'pantallaFase0';
      default:
        return '';
    }
  }
});

Template['faseA'].events({

});
