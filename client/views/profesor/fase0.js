
Template['pantallaFase0'].onRendered(function() {
  var instance = this;
  console.log("informacion de THIS fase0");
  console.log("informacion de THIS fase0", this.data);
  Meteor.call('CrearCanales',this.data._id);

  
});




function gruposUsados(){

  grupos=Grupos.find();


  //console.log("usuarios",grupo);

  if(Meteor.userId()){
    //var usuario=arrayDelUsuario(nombrePartida);

    var grupitos=[];
   grupos.forEach(function(grupo){
       //console.log("contenido de grupo es",grupo);
      if(grupo.nombre=="Sin Grupo"){
        //console.log("ignoro este grupo");

      }else{
        // console.log("el nombre del grupo es: " +grupo.nombre);
        grupitos.push(grupo);
      }
    });
  //console.log("grupitos tiene", grupitos);
  
  return grupitos;
  }else return false;


}

Template.pantallaFase0.helpers({

  "grupos" : function(){
    //var nombrePartida= Session.get("nombredelapartida");
    //var idPartidaActiva=Partidas.findOne({"inProgress":true})._id;
    //por ruta ya vienen filtrados por la partida
  return gruposUsados();

   
  },
  "gruposxSegmento" : function(numeroSegmento){

    grupos=Grupos.find();
   var grupitos={};
    users.forEach(function(usuario){
      if(usuario.name==Meteor.user().username){
        grupitos=usuario;  
      }
    });
    return grupitos;

   
  },

  verdadGrupoFidelidad : function(grupo,segmen,fideli){

    if(Meteor.userId()){

      //var nombrePartida= Session.get("nombredelapartida");
      //partida=Partidas.findOne({'npartida':nombrePartida});

     // console.log("probando si tiene problemas");
     //console.log("el segmento es :" +segmen+" La fidelidad es " + fideli);
     // console.log("probando muere antes del array");
     //var usuario=arrayDelUsuario(nombrePartida);
    //  console.log("probando"+ usuario.name);
      console.log("que tiene grupo "+grupo.nombre);
       console.log("llega aqui sin problema"); // el problema era que solo tenia un segmento.
      var segment= Segmentos.findOne({idGrupo:grupo._id});
      console.log("que tiene una ID grupo "+grupo._id);
      //console.log(" me da un error"+ segment._id );

      console.log(" me da un error", segment );
      //if(segment ==false) return false
     if(segment.segmentos[segmen].fidelidad==fideli){
      console.log("llega aqui");
      return true;
     }else return false;
    }

  },


    partidaTurno: function(){

      var partida=PartidaData.findOne();

      
      console.log("que tiene partida: " , partida);
      //console.log("que tiene partida: " , PartidaData.find().fetch());
      //console.log("que tiene partida: " , Partidas.find().fetch());


      return partida.turno;
  
    },



});






////////////////////

Template.pantallaFase0.events({

  'click .EmpezarTurno': function(event,template){
    var instance = Template.instance();
      //var datapartida = PartidaData.findOne({idPartida:this.idPartida})
    console.log("Terminando el turno");
    if(Meteor.userId()){
    
      var idpartida=instance.data._id;
     console.log("valor de la idopartida: "+instance.data._id);
      Meteor.call('siguienteFase',idpartida );

      
     
    }else { console.log("no esta logeado")}



  },


});

