var buscador = Meteor.GL.Buscador;
var routing = Meteor.GL.Routing;

// function autoLogin(){
//   //Codigo Temporal hasta implementar Gamestew!
//   var user = Meteor.user();
//   if (!user) {
//     Meteor.loginWithPassword("alumno", "test");
//   }
// }

Router.configure({
  layoutTemplate: 'common'
});

Router.route('/escenarios', {
  name: 'listaEscenarios'
});

Router.route('/escenarios/nuevo', {
  name: 'escenarioNuevo'
});

Router.route('/escenarios/:_id', {
  name: 'escenario',
  data: function() {
    return Escenarios.findOne(this.params._id);
  }
});

Router.route('/partidas',{
  name: 'partidas',
  waitOn: function(){
    return this.subscribe('PartidasActuales');
  },
  action: function(){
    if (!(Meteor.user() || Meteor.loggingIn())){
      Router.go('/');
    }else{
      if (this.ready() && GS_usuarios.userLoggedIn(this)) {
        this.render('partidas');
      }else{
        Router.go('/');
      }
    }
  }
});

Router.route('/partidaNueva', {
  name: 'partidaNueva',
  action: function(){
    if (GS_usuarios.userLoggedIn(this)) {
      this.render('partidaNueva');
    }
  },
  subscriptions: function() {
    this.subscribe('AllEscenarios');
    this.subscribe('Encuestas');
  }
});

Router.route('/lobby/:_id',{
  name: 'lobby.show',
  waitOn: function(){
    return this.subscribe('PartidaActual', this.params._id);
  },
  action: function() {
    if(this.ready()){
      if (GS_usuarios.userLoggedIn(this)) {
        var partida = Partidas.findOne({_id:{$regex:'^'+this.params._id}});
        if(partida != null){
          if(routing.isLobby(partida.estadoActual)){
            this.render('lobby');
          }else{
            routing.redireccionarPartida(partida);
          }
        }else{
          Router.go('/');
        }
      }
    }
  },
  subscriptions: function(){
   this.subscribe('users');
   this.subscribe('AllGrupos');
  },
  data: function() {
    return Partidas.findOne({_id:{$regex:'^'+this.params._id}});
  }
});


Router.route('/faseA/:_id',{
  name: 'faseA',
    waitOn: function(){
    
    
    if(Roles.getRolesForUser(Meteor.userId())[0]=="alumno"){
      return [this.subscribe('PartidaActual', this.params._id),
              //this.subscribe('AllGrupos')
              ];
    }
    if(Roles.getRolesForUser(Meteor.userId())[0]=="profesor"){
      console.log("suscribiendo al profesor en fase 0");
      return [this.subscribe('PartidaActual', this.params._id),
              this.subscribe('Grupos', this.params._id),
              this.subscribe('losSegmentos'),
              this.subscribe('PartidaDataActual',this.params._id),

              
              ];
    }
    
  },
 
   action: function() {
    if(this.ready()){
      if (GS_usuarios.userLoggedIn(this)) {
        console.log("rutas partida");
        var partida = Partidas.findOne({_id:{$regex:'^'+this.params._id}});
        if(partida != null){
          if(routing.isFaseA(partida.estadoActual)){
            console.log("deberia entrar a faseA");
            this.render('faseA');
          }else{
            routing.redireccionarPartida(partida);
          }
        }else{
          console.log("vamos a partidas");
          Router.go('/');
        }
      }
    }
  },
   subscriptions: function(){
   this.subscribe('users');
  // this.subscribe('AllGrupos');
  },

   data: function() {
      return Partidas.findOne({_id:{$regex:'^'+this.params._id}});
    },



    

});


Router.route('/faseB/:_id',{
  name: 'faseB',
    waitOn: function(){
    
    if(Roles.getRolesForUser(Meteor.userId())[0]=="alumno"){
      return [this.subscribe('PartidaActual', this.params._id),
              this.subscribe('miSegmento', this.params._id),
              this.subscribe('misCanalesPartidas', this.params._id),
              
              //this.subscribe('AllGrupos')
              ];
    }
    if(Roles.getRolesForUser(Meteor.userId())[0]=="profesor"){
      console.log("suscribiendo al profesor en fase b");
      return [this.subscribe('PartidaActual', this.params._id),
              this.subscribe('Grupos', this.params._id),
              this.subscribe('misSegmentosPartida',this.params._id),
              this.subscribe('PartidaDataActual',this.params._id),
              
              ];
    }
    
  },
 
   action: function() {
    if(this.ready()){
      if (GS_usuarios.userLoggedIn(this)) {
        console.log("rutas partida");
        var partida = Partidas.findOne({_id:{$regex:'^'+this.params._id}});
        if(partida != null){
          if(routing.isFaseB(partida.estadoActual)){
            console.log("deberia entrar a faseB");
            this.render('faseB');
          }else{
            routing.redireccionarPartida(partida);
          }
        }else{
          console.log("vamos a partidas");
          Router.go('/');
        }
      }
    }
  },
   subscriptions: function(){
   this.subscribe('users');
  // this.subscribe('AllGrupos');
  },

   data: function() {
      return Partidas.findOne({_id:{$regex:'^'+this.params._id}});
    },



    

});