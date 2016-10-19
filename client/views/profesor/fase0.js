
Template['pantallaFase0'].onRendered(function() {
  var instance = this;
  console.log("informacion de THIS fase0");
  console.log("informacion de THIS fase0", this.data);
  Meteor.call('CrearCanales',this.data._id);

  
});
Template.pantallaFase0.helpers({

  "grupos" : function(){
    //var nombrePartida= Session.get("nombredelapartida");
    //var idPartidaActiva=Partidas.findOne({"inProgress":true})._id;
    grupos=Grupos.find();


    //console.log("usuarios",grupo);

    if(Meteor.userId()){
      //var usuario=arrayDelUsuario(nombrePartida);
      return grupos;
    }else return false;

   
  },


  



});

